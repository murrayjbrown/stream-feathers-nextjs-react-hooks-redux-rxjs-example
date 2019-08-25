// @flow
import React, { useEffect } from 'react';
import IncludeMarkdown from '@client/components/IncludeMarkdown';

// import dynamic from 'next/dynamic';
// const IncludeMarkdown = dynamic(import('../src/client/components/IncludeMarkdown'), { ssr: false });

export default function HomePage() {
	useEffect(() => {
		/* eslint-disable-next-line no-undef, fp/no-mutation */
		document.title = 'Home';
	});

	return (
		<div>
			<IncludeMarkdown src='/public/index.md' />
		</div>
	);
}

