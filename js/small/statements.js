import Elements from './elements.js';

const { Num, Variable, Bool, Add, Multiply, LessThan } = Elements;

class DoNothing {
  static prod() {
    return new DoNothing();
  }
  toString() {
    return 'do-nothing'
  }

  reducible() {
    return false
  }

}

class Assign {
  constructor(name, expression) {
    this.name = name;
    this.expression = expression;
  }

  static prod(name, expression) {
    return new Assign(name, expression);
  }

  toString() {
    return `${this.name} = ${this.expression}`
  }

  reducible() {
    return true
  }

  reduce(environment) {
    if(this.expression.reducible()) {
      return [
        Assign.prod(this.name, this.expression.reduce(environment)),
        environment
      ]
    } else {
      return [
        DoNothing.prod(),
        Object.assign({}, environment, {
          [this.name]: this.expression
        })
      ]
    }
  }

}

class If {
  constructor(condition, consequence, alternative) {
    this.condition = condition;
    this.consequence = consequence;
    this.alternative = alternative;
  }

  static prod(...args) {
    return new If(...args)
  }

  toString() {
    return `if (${this.condition}) { ${this.consequence} } else { ${this.alternative} }`
  }

  reducible() {
    return true
  }

  reduce(environment) {
    if(this.condition.reducible()) {
      return [
        new If(
          this.condition.reduce(environment),
          this.consequence,
          this.alternative
        ),
        environment
      ]
    } else {
      switch(this.condition.value) {
        case Bool(true).value: 
          return [
            this.consequence,
            environment
          ]
        case Bool(false).value:
          return [
            this.alternative,
            environment
          ]
      }
    }
  }

}

class Sequence {
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  static prod(...args) {
    return new Sequence(...args)
  }

  toString() {
    return `${this.first}; ${this.second}`
  }

  reducible() {
    return true
  }

  reduce(environment) {
    switch(this.first.constructor) {
      case DoNothing:
        return [
          this.second, 
          environment
        ]
      default: 
        const [reduce_first, reduced_environment] = this.first.reduce(environment);
        return [
          new Sequence(reduce_first, this.second),
          reduced_environment
        ]
    }
  }

}

class While {
  constructor(condition, body) {
    this.condition = condition;
    this.body = body;
  }

  static prod(...args) {
    return new While(...args)
  }

  toString() {
    return `while (${this.condition}) { ${this.body} }`
  }

  reducible() {
    return true
  }

  reduce(environment) {
    return [
      new If(
        this.condition,
        new Sequence(this.body, this),
        new DoNothing
      ),
      environment
    ]
  }
}

export default {
  DoNothing: DoNothing.prod,
  Assign: Assign.prod,
  If: If.prod,
  Sequence: Sequence.prod,
  While: While.prod,
}