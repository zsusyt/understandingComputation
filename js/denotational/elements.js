class Num {
  constructor(value) {
    this.value = value;
  }

  static prod(value) {
    return new Num(value);
  }

  toJs() {
    return e => this.value
  }

  toString() {
    return `${this.value}`
  }
}

class Bool {
  constructor(value) {
    this.value = value;
  }

  static prod(value) {
    return new Bool(value);
  }

  toJs() {
    return e => this.value
  }

  toString() {
    return `${this.value}`
  }
}

class Variable {
  constructor(name) {
    this.name = name;
  }

  static prod(name) {
    return new Variable(name);
  }

  toJs() {
    return e => e[this.name]
  }
  toString() {
    return `${this.name}`
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

  toJs() {
    return e => this.left.toJs().call(null, e) + this.right.toJs().call(null, e)
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

  toJs() {
    return e => this.left.toJs().call(null, e) * this.right.toJs().call(null, e)
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

  toJs() {
    return e => {
      let left = this.left.toJs().call(null, e), right = this.right.toJs().call(null, e);
      return left < right;
    }
  }

  toString() {
    return `${this.left.toString()} < ${this.right.toString()}`
  }

}

class DoNothing {
  static prod() {
    return new DoNothing();
  }
  toString() {
    return 'do-nothing'
  }

  toJs() {
    return e => e
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

  toJs() {
    return e => Object.assign({}, e, {
      [this.name]: this.expression.toJs().call(null, e)
    })
  }

  toString() {
    return `${this.name} = ${this.expression}`
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

  toJs() {
    return e => {
      if(this.condition.toJs().call(null, e).value) {
        return this.consequence.toJs().call(null, e)
      } else {
        return this.alternative.toJs().call(null, e)
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

  toJs() {
    return e => this.second.toJs().call(null, this.first.toJs().call(null, e))
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

  toJs() {
    return e => {
      while(this.condition.toJs().call(null, e)) {
        console.log(e)
        e = this.body.toJs().call(null, e)
      }
      return e
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