import Elements from './elements.js';

const { Num, Variable, Bool, Add, Multiply, LessThan, DoNothing, Assign, If, Sequence, While } = Elements;

// console.log(Num(23).evaluate({}));

// console.log(Variable("x").evaluate({x: Num(22)}));

// console.log(
//   LessThan(
//     Add(Variable("x"), Num(2)),
//     Variable("y")
//   ).evaluate({x: Num(2), y: Num(5)})
// )

const statement = While(
  LessThan(Variable("x"), Num(5)),
  Assign("x", Multiply(Variable("x"), Num(3)))
)

// const statement = LessThan(
//   Variable("x"),
//   Num(5)
// )

console.log(
  statement.evaluate({ x: Num(1) })
)