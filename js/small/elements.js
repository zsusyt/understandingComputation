class Num {
  constructor(value) {
    this.value = value;
  }

  static prod(value) {
    return new Num(value);
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

  toString() {
    return `${this.left.toString()} + ${this.right.toString()}`
  }

  reduce(environment) {
    if(this.left.reducible()) {
      return new Add(this.left.reduce(environment), this.right);
    } else if(this.right.reducible()) {
      return new Add(this.left, this.right.reduce(environment))
    } else {
      return new Num(this.left.value + this.right.value);
    }
  }

  reducible() {
    return true;
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

  toString() {
    return `${this.left.toString()} * ${this.right.toString()}`
  }

  reduce(environment) {
    if(this.left.reducible()) {
      return new Multiply(this.left.reduce(environment), this.right);
    } else if(this.right.reducible()) {
      return new Multiply(this.left, this.right.reduce(environment))
    } else {
      return new Num(this.left.value * this.right.value);
    }
  }

  reducible() {
    return true;
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

  reduce(environment) {
    if(this.left.reducible()) {
      return new LessThan(this.left.reduce(environment), this.right);
    } else if(this.right.reducible()) {
      return new LessThan(this.left, this.right.reduce(environment))
    } else {
      return new Bool(this.left.value < this.right.value);
    }
  }

  reducible() {
    return true;
  }
}

export default {
  Num: Num.prod,
  Bool: Bool.prod,
  Variable: Variable.prod,
  Add: Add.prod,
  Multiply: Multiply.prod,
  LessThan: LessThan.prod,
}