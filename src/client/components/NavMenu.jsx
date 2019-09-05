// @flow
import React from 'react';
import Link from 'next/link';

export default function NavMenu() {
	return (
		<div className='navMenu'>
			<ul>
				<li>
					<Link prefetch href='/' passHref>
						<a href='/'>Home</a>
					</Link>
				</li>
				<li> • </li>
				<li>
					<Link prefetch href='/simpleTicker' passHref>
						<a href='/simpleTicker'>Simple Ticker</a>
					</Link>
				</li>
				<li> • </li>
				<li>
					<Link prefetch href='/reduxTicker' passHref>
						<a href='/reduxTicker'>Redux Ticker</a>
					</Link>
				</li>
				<li> • </li>
				<li>
					<Link prefetch href='/reduxColorizer' passHref>
						<a href='/reduxColorizer'>Redux Colorizer</a>
					</Link>
				</li>
				<li> • </li>
				<li>
					<Link prefetch href='/about' passHref>
						<a href='/about'>About</a>
					</Link>
				</li>
			</ul>
		</div>
	);
}
