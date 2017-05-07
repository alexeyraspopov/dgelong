export default class Either {
  static of(value) {

  }

  static from(generator, ...args) {
    const iterator = generator(...args);
    let step;

    try {
      do {
        step = iterator.next();
      } while (!step.done && isDefined(step.value));
    } catch (error) {
      return new Failure(error);
    }

    return Either.of(step.value);
  }

  static match(value, matchers) {
    if (value instanceof Success) {
      return matchers.Success(value);
    }

    if (value instanceof Failure) {
      return matchers.Failure();
    }

    throw new Error(`Unable to match ${value}`);
  }
}

export class Success {
  constructor(value) {
    this.value = value;
  }

  map(morphism) {
    return Either.of(morphism(this.value));
  }

  valueOf() {
    return this.value;
  }
}

export class Failure {
  constructor(value) {
    this.value = value;
  }

  map(morphism) {
    return Either.of(morphism(this.value));
  }

  valueOf() {
    return this.value;
  }
}
