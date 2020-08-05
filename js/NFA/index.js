import elements from './elements.js'

const { FARule, NFARulebook, NFA, NFADesign } = elements;

const rulebook = NFARulebook([
  FARule(1, 'a', 1),
  FARule(1, 'b', 1),
  FARule(1, 'b', 2),
  FARule(2, 'a', 3),
  FARule(2, 'b', 3),
  FARule(3, 'a', 4),
  FARule(3, 'b', 4),
])

// console.log(rulebook.next_states([1], 'b'))
// console.log(rulebook.next_states([1, 2], 'a'))
// console.log(rulebook.next_states([1, 3], 'b'))

// const dfa_design = DFADesign(1, [3], rulebook);

// console.log(dfa_design.accepts('a'))
// console.log(dfa_design.accepts('baa'))
// console.log(dfa_design.accepts('baba'))

// const nfa = NFA([1], [4], rulebook);
// nfa.read_string('bab');
// console.log(nfa.accepting())

const nfa_design = NFADesign([1], [4], rulebook);

console.log(nfa_design.accepts('bab'))
console.log(nfa_design.accepts('bbbbb'))
console.log(nfa_design.accepts('bbabb'))