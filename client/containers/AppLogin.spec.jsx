// @flow
/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { expect } from 'chai';
import '@testing-library/jest-dom/extend-expect';

import AppContainer from '@client/containers/AppContainer';
// import ChatApp from '@client/components/ChatApp';

//
// Shared counter in composite component
//

const composite = render(
	<div>
		<AppContainer authenticate='user' label='chatContainer'>
			<div data-testId='loginNeeded'>User authentication required.</div>
		</AppContainer>
	</div>,
);

test('ChatApp: Login needed', () => {
	const { getByTestId } = composite;
	expect(() => {
		getByTestId('loginNeeded');
	}).throw();
});

test('ChatApp: Login fields empty', () => {
	const { getByLabelText } = composite;
	const email = getByLabelText('Email');
	expect(email.value.length).to.equal(0);
	const password = getByLabelText('Password');
	expect(password.value.length).to.equal(0);
});
