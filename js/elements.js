class Num {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `<<${this.value}>>`
  }

  reducible() {
    return false
  }
}

class Bool {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `<<${this.value}>>`
  }

  reducible() {
    return false
  }
}

class Variable {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return `<<${this.name}>>`
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

  toString() {
    return `<<${this.left.toString()} + ${this.right.toString()}>>`
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

  toString() {
    return `<<${this.left.toString()} * ${this.right.toString()}>>`
  }

  reduce() {
    if(this.left.reducible()) {
      return new Add(this.left.reduce(environment), this.right);
    } else if(this.right.reducible()) {
      return new Add(this.left, this.right.reduce(environment))
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

  toString() {
    return `<<${this.left.toString()} < ${this.right.toString()}>>`
  }

  reduce() {
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

export {
  Num,
  Bool,
  Add,
  Multiply,
  LessThan,
}