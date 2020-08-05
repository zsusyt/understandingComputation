import { env } from "process";

class Num {
  constructor(value) {
    this.value = value;
  }

  static prod(value) {
    return new Num(value);
  }

  evaluate(environment) {
    return this
  }

  toString() {
    return `${this.value}`
  }

  reducible() {
    return false
  }
}

class Bool {
  constructor(value) {
    this.value = value;
  }

  static prod(value) {
    return new Bool(value);
  }

  evaluate(environment) {
    return this;
  }

  toString() {
    return `${this.value}`
  }

  reducible() {
    return false
  }
}

class Variable {
  constructor(name) {
    this.name = name;
  }

  static prod(name) {
    return new Variable(name);
  }

  evaluate(environment) {
    return environment[this.name];
  }

  toString() {
    return `${this.name}`
  }

  reduce(environment) {
    return environment[this.name];
  }

  reducible() {
    return true
  }
}

class Add {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static prod(left, right) {
    return new Add(left, right);
  }

  evaluate(environment) {
    return new Num(
      this.left.evaluate(environment).value + this.right.evaluate(environment).value
    )
  }

  toString() {
    return `${this.left.toString()} + ${this.right.toString()}`
  }
}

class Multiply {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static prod(left, right) {
    return new Multiply(left, right);
  }

  evaluate(environment) {
    return new Num(
      this.left.evaluate(environment).value * this.right.evaluate(environment).value
    )
  }

  toString() {
    return `${this.left.toString()} * ${this.right.toString()}`
  }

}

class LessThan {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static prod(left, right) {
    return new LessThan(left, right);
  }

  toString() {
    return `${this.left.toString()} < ${this.right.toString()}`
  }

  evaluate(environment) {
    return new Bool(
      this.left.evaluate(environment).value < this.right.evaluate(environment).value
    )
  }

}

class DoNothing {
  static prod() {
    return new DoNothing();
  }
  toString() {
    return 'do-nothing'
  }

  evaluate(environment) {
    return environment
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

  evaluate(environment) {
    return Object.assign({}, environment, {
      [this.name]: this.expression.evaluate(environment)
    })
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

  evaluate(environment) {
    if(this.condition.evaluate(environment)) {
      return this.consequence.evaluate(environment)
    } else {
      return this.alternative.evaluate(environment)
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

  evaluate(environment) {
    return this.second.evaluate(this.first.evaluate(environment))
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

  evaluate(environment) {
    if(this.condition.evaluate(environment).value) {
      return this.evaluate(this.body.evaluate(environment))
    } else {
      return environment
    }
  }
}

export default {
  Num: Num.prod,
  Bool: Bool.prod,
  Variable: Variable.prod,
  Add: Add.prod,
  Multiply: Multiply.prod,
  LessThan: LessThan.prod,
  DoNothing: DoNothing.prod,
  Assign: Assign.prod,
  If: If.prod,
  Sequence: Sequence.prod,
  While: While.prod,
}