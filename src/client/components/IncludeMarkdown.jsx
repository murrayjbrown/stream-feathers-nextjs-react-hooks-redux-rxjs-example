// @flow
import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import Markdown from 'react-markdown';
import { defaultToStrict } from 'rambdax';

type Props = {
	src: string
};

export default function IncludeMarkdown({ src }: Props) {
	const [state, setState]: [string, Function] = useState('');

	useEffect(() => {
		async function getText() {
			// eslint-disable-next-line fp/no-nil
			const res = await superagent.get(src).catch(err => {
				// eslint-disable-next-line no-console
				console.log('IncludeMarkdown superagent: ', err);
			});
			setState(defaultToStrict('')(res.text));
		}

		getText();
	}, [state]);

	return (
		<article className='content'>
			<Markdown className='markdown' source={state} />
		</article>
	);
}
