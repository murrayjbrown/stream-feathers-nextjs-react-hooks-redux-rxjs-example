// @flow
import React, { useEffect, useReducer, useState } from 'react';
import datetime from 'dayjs';
import match from 'rust-match';
import produce from 'immer';
import { dashCat } from '@client/util';
import { defaultToStrict } from 'rambdax';
import { appClient, useAppContainer } from '@client/containers/AppContainer';

type LocalAction = {
	type: string,
	payload: any,
};

type LocalState = {
	isStarted: boolean,
	messages: Array<Object>,
	users: Array<Object>,
};

type Start = {
	messages?: Array<Object>,
	users?: Array<Object>,
};

const initialState: LocalState = {
	isStarted: false,
	messages: [],
	users: [],
};

const chatActions = {
	addMessage: (message: Array<Object>) => ({
		type: 'addMessage',
		payload: message,
	}),
	addUser: (user: Array<Object>) => ({
		type: 'addMessage',
		payload: user,
	}),
	reset: () => ({
		type: 'reset',
	}),
	start: (startProps: Start) => ({
		type: 'start',
		payload: startProps,
	}),
};

const reducer = (state: LocalState, action: LocalAction) =>
	produce(state, draft =>
		match(action.type, {
			addMessage: () => {
				const messages = draft.messages.concat(action.payload);
				return { ...draft, messages };
			},
			addUser: () => {
				const users = draft.users.concat(action.payload);
				return { ...draft, users };
			},
			reset: () => {
				return { ...initialState };
			},
			start: () => {
				const messages = draft.messages.concat(action.payload.messages);
				const users = draft.messages.concat(action.payload.users);
				return { ...draft, messages, users, isStarted: true };
			},
			_: () => {
				throw new Error('Unexpected action: ' + action.type);
			},
		}),
	);

type Props = {
	label: string,
};

export default function ChatApp({ label }: Props) {
	// eslint-disable-next-line no-unused-vars
	const [state, _] = useAppContainer();

	const [chatElem, setChatElem] = useState();
	const [chatState, dispatchChat] = useReducer(reducer, initialState);

	const addMessage = (message: Array<Object>) => {
		dispatchChat(chatActions.addMessage(message));
	};

	const addUser = (user: Array<Object>) => {
		dispatchChat(chatActions.addUser(user));
	};

	const startChat = async () => {
		const client = appClient();
		if (client) {
			const [userPage, messagePage] = await Promise.all([
				client.service('users').find(),
				client.service('messages').find({
					query: {
						$sort: { createdAt: -1 },
						$limit: 25,
					},
				}),
			]);

			dispatchChat(
				chatActions.start({
					messages: messagePage.data.reverse(),
					users: userPage.data,
				}),
			);
		}
	};

	useEffect(() => {
		const client = appClient();
		if (client && !chatState.isStarted) {
			// Add new user(s) to the user list
			client.service('users').removeListener('created');
			client.service('users').on('created', user => {
				addUser(user);
			});

			// Add new message(s) to the message list
			client.service('messages').removeListener('created');
			client.service('messages').on('created', message => {
				addMessage(message);
				scrollToBottom();
			});
			// Retrieve users and past messages
			startChat();
		}

		return () => {
			if (client) {
				client.service('messages').removeListener('created');
				client.service('users').removeListener('created');
			}
		};
	}, [state.isStarted]);

	function logout() {
		const client = appClient();
		if (client) {
			client.logout();
		}
	}

	function sendMessage(ev) {
		const client = appClient();
		if (client && ev) {
			const elem = ev.target.querySelector('[name="text"]');
			if (elem && elem.value) {
				const text = elem.value.trim();
				if (text) {
					client
						.service('messages')
						.create({ text })
						.then(() => {
							elem.value = '';
						});
				}
			}
			ev.preventDefault();
		}
	}

	function scrollToBottom() {
		if (chatElem) {
			chatElem.scrollTop = chatElem.scrollHeight - chatElem.clientHeight;
		}
	}

	const id = (...ids: Array<string>) =>
		dashCat(defaultToStrict('', label), ...ids);

	return (
		<div className='app flex flex-column'>
			<header className='title-bar flex flex-row flex-center'>
				<div className='title-wrapper block center-element'>
					<img
						className='logo'
						src='/public/images/mjbrown_logo-70x66.png'
						alt='Logo'
					/>
					<span className='title'>Chat</span>
				</div>
			</header>

			<main className='flex flex-row flex-1 clear'>
				<aside className='sidebar col col-3 flex flex-column flex-space-between'>
					<header className='flex flex-row flex-center'>
						<h4 className='font-300 text-center'>
							<span
								className='font-600 online-count'
								aria-labelledby={id('users')}
								data-testid={id('users')}
							>
								{chatState.users.length}
							</span>{' '}
							<label id={id('users')}>users</label>
						</h4>
					</header>

					<ul className='flex flex-column flex-1 list-unstyled user-list'>
						{chatState.users.map((user, idx) => (
							<li
								key={user._id}
								aria-labelledby={id('user', idx.toString())}
								data-testid={id('users', idx.toString())}
							>
								<a className='block relative' href='#'>
									<img src={user.avatar} alt={user.email} className='avatar' />
									<span className='absolute username'>
										<label id={id('user', idx.toString())}>{user.email}</label>
									</span>
								</a>
							</li>
						))}
					</ul>
					<footer className='flex flex-row flex-center'>
						<a
							href='#'
							onClick={() => logout()}
							className='button button-primary'
							aria-labelledby={id('signout')}
							data-testid={id('signout')}
						>
							<label id={id('signout')}>Sign Out</label>
						</a>
					</footer>
				</aside>

				<div className='flex flex-column col col-9'>
					<main
						className='chatElem flex flex-column flex-1 clear'
						ref={elem => setChatElem(elem)}
					>
						{chatState.messages.map((message, idx) => (
							<div
								key={message._id}
								className='message flex flex-row'
								aria-labelledby={id('message', idx.toString())}
								data-testid={id('signout', idx.toString())}
							>
								<div className='message-wrapper'>
									<p className='chat-message-header'>
										<span className='chat-message-username font-600'>
											{message.user.email}
										</span>
										<span>&nbsp;</span>
										<span className='chat-message-date font-300'>
											<label id={id('signout', idx.toString())}>
												{datetime(message.createdAt).format('MMM DD, hh:mm:ss')}
											</label>
										</span>
									</p>
									<p className='message-content font-300'>{message.text}</p>
								</div>
							</div>
						))}
					</main>

					<form
						onSubmit={ev => sendMessage(ev)}
						className='flex flex-row flex-space-between'
						aria-labelledby={id('send-message')}
						data-testid={id('send-message')}
						id='send-message'
					>
						<input type='text' name='text' className='flex flex-1' />
						<button className='button-primary' type='submit'>
							<label id={id('send-message')}>Send</label>
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}
