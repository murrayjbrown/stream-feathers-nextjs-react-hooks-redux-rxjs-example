// @flow
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SimpleTickerApp from '@client/components/SimpleTickerApp';
import store from '@client/redux/store';

export default function SimpleTickerPage() {
	useEffect(() => {
		/* eslint-disable-next-line no-undef, fp/no-mutation */
		document.title = 'Simple Ticker';
	});

	return (
		<Provider store={store}>
			<SimpleTickerApp />
		</Provider>
	);
}
