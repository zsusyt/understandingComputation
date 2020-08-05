import elements from './elements.js'

const { FARule, DFARulebook, DFA, DFADesign } = elements;

const rulebook = DFARulebook([
  FARule(1, 'a', 2),
  FARule(1, 'b', 1),
  FARule(2, 'a', 2),
  FARule(2, 'b', 3),
  FARule(3, 'a', 3),
  FARule(3, 'b', 3),
])

const dfa_design = DFADesign(1, [3], rulebook);

console.log(dfa_design.accepts('a'))
console.log(dfa_design.accepts('baa'))
console.log(dfa_design.accepts('baba'))
