// @flow
import React from 'react';
import Link from 'next/link';

export default function NavMenu() {
	return (
		<div className='navMenu'>
			<ul>
				<li>
					<Link prefetch href='/' passHref>
						<a>Home</a>
					</Link>
				</li>
				<li> • </li>
				<li>
					<Link prefetch href='/simpleTicker' passHref>
						<a>Simple Ticker</a>
					</Link>
				</li>
				<li> • </li>
				<li>
					<Link prefetch href='/reduxTicker' passHref>
						<a>Redux Ticker</a>
					</Link>
				</li>
				<li> • </li>
				<li>
					<Link prefetch href='/about' passHref>
						<a>About</a>
					</Link>
				</li>
			</ul>
		</div>
	);
}
