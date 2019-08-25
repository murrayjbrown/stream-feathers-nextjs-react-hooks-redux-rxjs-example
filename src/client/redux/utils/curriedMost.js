import { curry } from 'rambdax';
import { filter as _filter, map as _map } from 'most';

export const filter = curry(_filter);
export const map = curry(_map);
