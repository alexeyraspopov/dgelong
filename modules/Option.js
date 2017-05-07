export default class Option {
  static of(value) {
    return isDefined(value) ? new Just(value) : new Nothing();
  }

  static from(generator, ...args) {
    const iterator = generator(...args);
  	let step;
    let value;

  	while (true) {
      step = iterator.next(value);

      if (step.done || !isDefined(step.value)) {
        iterator.return();
        break;
      }

      if (step.value instanceof Nothing) {
        return step.value;
      }

      if (step.value instanceof Just) {
        value = step.value.valueOf();
      } else {
        value = step.value;
      }
  	}

  	return Option.of(step.value);
  }

  static match(value, matchers) {
    if (value instanceof Just) {
      return matchers.Just(value);
    }

    if (value instanceof Nothing) {
      return matchers.Nothing();
    }

    throw new Error(`Unable to match ${value}`);
  }
}

export class Just {
  constructor(value) {
    this.value = value;
  }

  map(morphism) {
    return Option.of(morphism(this.value));
  }

  valueOf() {
    return this.value;
  }
}

export class Nothing {
  map() {
    return new Nothing();
  }

  valueOf() {
    return null;
  }
}

function isDefined(value) {
  return value !== null && value !== undefined && !(value instanceof Nothing);
}
