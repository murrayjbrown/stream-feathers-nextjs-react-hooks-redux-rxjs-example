// @flow
/* eslint-disable fp/no-let, fp/no-mutation, react/jsx-props-no-spreading */
import React from 'react';
import App, { Container } from 'next/app';
import NavMenu from '@client/components/NavMenu';

export default class extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<NavMenu />
				<Component {...pageProps} />
			</Container>
		);
	}
}
