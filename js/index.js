import Elements from './elements.js';
import { Machine } from './machine.js';
import Statements from './statements.js';

const { DoNothing, Assign, If } = Statements;

const { Num, Variable, Bool, Add, Multiply, LessThan } = Elements;


let c = If(
  Variable("x"),
  Assign(
    "y",
    Num(1)
  ),
  DoNothing()
)

let environmen = {
  x: Bool(true),
}

let b = new Machine(c, environmen);
b.run();