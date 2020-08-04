import { Num, Bool, Add, Multiply, LessThan } from './elements.js';
import { Machine } from './machine.js'

// let a = new Add(
//   new Multiply(new Num(1), new Num(2)),
//   new Multiply(new Num(3), new Num(4))
// )

// let b = new Machine(a);
// b.run();

let c = new LessThan(
  new Multiply(new Num(1), new Num(2)),
  new Multiply(new Num(3), new Num(4))
)

let b = new Machine(c);
b.run();