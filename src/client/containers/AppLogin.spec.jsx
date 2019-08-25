import React from 'react';
import { render } from '@testing-library/react';
import AppContainer from '@client/containers/AppContainer';

//
// Shared counter in composite component
//
const composite = render(
	<div>
		<AppContainer authenticate='user' label='appContainer'>
			<div data-testId='loginNeeded'>User authentication required.</div>
		</AppContainer>
	</div>,
);

test('App: Login needed', () => {
	const { getByTestId } = composite;
	expect(() => {
		getByTestId('loginNeeded');
	}).toThrow();
});

test('App: Login fields empty', () => {
	const { getByLabelText } = composite;
	const email = getByLabelText('Email');
	expect(email.value.length).to.equal(0);
	const password = getByLabelText('Password');
	expect(password.value.length).to.equal(0);
});
