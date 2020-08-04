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

  equal(other_statement) {
    return other_statement instanceof DoNothing
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

export default {
  DoNothing: DoNothing.prod,
  Assign: Assign.prod,
  If: If.prod,
}