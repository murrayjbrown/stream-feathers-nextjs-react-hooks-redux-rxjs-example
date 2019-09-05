// @flow
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import ReduxColorizerApp from '@client/components/ReduxColorizerApp';
import store from '@client/redux/store';

export default function ReduxColorizerPage() {
	useEffect(() => {
		/* eslint-disable-next-line no-undef, fp/no-mutation */
		document.title = 'Redux Colorizer';
	});

	return (
		<Provider store={store}>
			<ReduxColorizerApp />
		</Provider>
	);
}
