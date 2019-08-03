// @flow
import React, { /* useEffect, */ useState } from 'react';
import { dashCat } from '@client/util';
import { defaultToStrict } from 'rambdax';
import {
	actions,
	appClient,
	useAppContainer,
} from '@client/containers/AppContainer';

type Props = {
	children?: Array<Object>,
	label?: string,
};

export default function AppLogin({ children, label }: Props) {
	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useAppContainer();

	const [email, setEmail] = useState('');
	const [passcode, setPasscode] = useState('');

	const login = () => {
		const client = appClient();
		if (client && !state.login) {
			const password = passcode;
			setPasscode(''); // clear password field ASAP
			dispatch(actions.update({ email }));
			client
				.authenticate({
					strategy: 'local',
					email,
					password,
				})
				.then(() => {
					client.authenticate({
						strategy: 'jwt',
					});
				})
				.catch(err => {
					dispatch(actions.reset(err));
				});
		}
	};

	const signup = async () => {
		const client = appClient();
		if (client) {
			// register new user with server
			await client
				.service('users')
				.create({ email }) // no password registration needed for JWT-based authentication
				.catch(err => {
					dispatch(actions.reset(err));
				});
			login();
		}
	};

	if (state.login) {
		return <div>{children}</div>;
	}

	const id = (...ids: Array<string>) =>
		dashCat(defaultToStrict('', label), ...ids);

	return (
		<main className='login container'>
			<div className='row'>
				<div className='col-12 col-6-tablet push-3-tablet text-center heading'>
					<h1 className='font-100'>Login or signup</h1>
					<p
						className='errorMessage'
						data-testid={id('errorMessage')}
					>
						{state.error && state.error.message}
					</p>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop'>
					<form className='form'>
						<fieldset>
							<label className='email' id={id('email')}>
								Email
							</label>
							<input
								required
								className='email'
								type='email'
								name='email'
								placeholder='email'
								aria-labelledby={id('email')}
								data-testid={id('email')}
								onChange={ev => setEmail(ev.target.value)}
							/>
						</fieldset>

						<fieldset>
							<label className='password' id={id('password')}>
								Password
							</label>
							<input
								required
								className='password'
								type='password'
								name='password'
								placeholder='password'
								aria-labelledby={id('password')}
								data-testid={id('password')}
								onChange={ev => setPasscode(ev.target.value)}
							/>
						</fieldset>
						<button
							type='button'
							className='button button-primary block signup'
							aria-labelledby={id('login')}
							data-testid={id('login')}
							onClick={() => login()}
						>
							<label className='login' id={id('login')}>
								Login
							</label>
						</button>

						<button
							type='button'
							className='button button-primary block signup'
							aria-labelledby={id('signup')}
							data-testid={id('signup')}
							onClick={() => signup()}
						>
							<label className='signup' id={id('signup')}>
								Signup
							</label>
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
