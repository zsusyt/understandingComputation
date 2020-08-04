class Machine {
  constructor(statement, environment) {
    this.statement = statement;
    this.environment = environment;
  }

  step() {
    [this.statement, this.environment] = this.statement.reduce(this.environment);
  }

  run() {
    let step = 0;
    while(this.statement.reducible()) {
      console.log('==========================')
      console.log('step:', ++step);
      console.log(this.statement.toString(), ',', this.environment);
      this.step()
    }

    console.log('========================')
    console.log('result')
    console.log(this.statement.toString(), ',', this.environment);
  }
}

export {
  Machine
}