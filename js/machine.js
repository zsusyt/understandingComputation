class Machine {
  constructor(expression, environment) {
    this.expression = expression;
    this.environment = environment;
  }

  step() {
    this.expression = this.expression.reduce(this.environment);
  }

  run() {
    let step = 0;
    while(this.expression.reducible()) {
      console.log('==========================')
      console.log('step:', ++step);
      console.log(this.expression.toString());
      this.step()
    }

    console.log('========================')
    console.log('result')
    console.log(this.expression.toString())
  }
}

export {
  Machine
}