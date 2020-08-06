import elements from './elements.js'

const { Empty, Literal, Concatenate, Choose, Repeat } = elements;

const pattern = Repeat(
  Concatenate(Literal('a'), Choose(Empty(), Literal('b')))
)

console.log(pattern.matches(''))
console.log(pattern.matches('a'))
console.log(pattern.matches('ab'))
console.log(pattern.matches('aba'))
console.log(pattern.matches('abab'))
console.log(pattern.matches('abaab'))
console.log(pattern.matches('abba'))