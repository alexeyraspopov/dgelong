import {ITERATOR_SYMBOL, ITERATOR_FUNCTION} from './Iterator';

export function Just(v) {
	return isMonad(v) ? v : {
		type: Just,
		map: fn => Just(fn(v)),
		valueOf: () => v,
		[ITERATOR_SYMBOL]: () => ITERATOR_FUNCTION(v)
	};
}

export function Nothing() {
	return {
		type: Nothing,
		map: fn => Nothing(),
		valueOf: () => null,
		[ITERATOR_SYMBOL]: () => ITERATOR_FUNCTION(null)
	};
}

function isMonad(v) {
	return isDefined(v) && (v.type === Just || v.type === Nothing);
}

function isDefined(v) {
	return v !== void 0 && v !== null;
}
