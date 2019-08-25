// @flow
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import ReduxTickerApp from '@client/components/ReduxTickerApp';
import store from '@client/redux/store';

export default function ReduxTickerPage() {
	useEffect(() => {
		/* eslint-disable-next-line no-undef, fp/no-mutation */
		document.title = 'Redux Ticker';
	});

	return (
		<Provider store={store}>
			<ReduxTickerApp />
		</Provider>
	);
}
