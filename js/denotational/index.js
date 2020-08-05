import Elements from './elements.js';

const { Num, Variable, Bool, Add, Multiply, LessThan, DoNothing, Assign, If, Sequence, While } = Elements;

const statement = While(
  LessThan(Variable("x"), Num(5)),
  Assign(
    "x",
    Multiply( Variable("x"), Num(3) )
  )
)

console.log(
  statement.toJs().call(null, {x: 1})
)