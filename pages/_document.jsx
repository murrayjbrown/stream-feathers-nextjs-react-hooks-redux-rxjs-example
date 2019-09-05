// @flow
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
	render() {
		return (
			<html lang='en' style={{ margin: 0, padding: 0 }}>
				<Head>
					<link
						href='/public/styles/base.css'
						rel='stylesheet'
						type='text/css'
					/>
				</Head>
				<body style={{ margin: 0, padding: 0 }}>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
