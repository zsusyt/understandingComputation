import Elements from './elements.js';
import { Machine } from './machine.js';
import Statements from './statements.js';

const { DoNothing, Assign, If, Sequence, While } = Statements;

const { Num, Variable, Bool, Add, Multiply, LessThan } = Elements;

// const sequenceTest = Sequence(
//   Assign(
//     "x",
//     Add(
//       Num(1),
//       Num(1)
//     )
//   ),
//   Assign(
//     "y",
//     Add(
//       Variable("x"),
//       Num(3)
//     )
//   )
// );

// const sequenceEnvironmen = {};

// const sequenceMachine = new Machine(sequenceTest, sequenceEnvironmen)
// sequenceMachine.run();

// const whileTest = While(
//   LessThan(Variable("x"), Num(5)),
//   Assign(
//     "x",
//     Multiply(Variable("x"), Num(3))
//   )
// );
// const whileEnvironment = { x: Num(1) }
// const whileMachine = new Machine(whileTest, whileEnvironment)
// whileMachine.run();

const rightTest = Sequence(
  Assign("x", Bool(true)),
  Assign("x", Add(Variable("x"), Num(1)))
)
const rightEnv = {}

const rightMachine = new Machine(rightTest, rightEnv);
rightMachine.run()