import {ITERATOR_SYMBOL, ITERATOR_FUNCTION} from './Iterator';

export default function Maybe(v) {
	return isDefined(v) ? Just(v) : Nothing();
}

export function from(generator, ...args) {
	const iterator = generator(...args);
	let step;

	do {
		step = iterator.next();
	} while (!step.done && step.value !== null && step.value !== undefined);

	return step.value === null || step.value === undefined ? null : step.value;
}

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
