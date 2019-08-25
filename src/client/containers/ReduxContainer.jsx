import React from 'react';
import store from '@client/redux/store';
import { Provider } from 'react-redux';

type Props = {
	children: any,
};

export default function ReduxContainer({
	children,
}: Props) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
}
