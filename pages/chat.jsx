// @flow
import React, { useEffect } from 'react';
import AppContainer from '@client/containers/AppContainer';
import ChatApp from '@client/components/ChatApp';


export default function ChatPage() {
	useEffect(() => {
		/* eslint-disable-next-line no-undef */
		document.title = 'Chat';
	});

	return (
		<div>
			<AppContainer authenticate='user' label='chatContainer'>
				<ChatApp label='chatApp' />
			</AppContainer>
		</div>
	);
}
