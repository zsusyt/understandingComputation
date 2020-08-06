import elements from './elements.js'

const { FARule, NFARulebook, NFA, NFADesign } = elements;

const rulebook = NFARulebook([
  FARule(1, null, 2),
  FARule(1, null, 4),
  FARule(2, 'a', 3),
  FARule(3, 'a', 2),
  FARule(4, 'a', 5),
  FARule(5, 'a', 6),
  FARule(6, 'a', 4),
])

// console.log(rulebook.follow_free_moves([1]))
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

const nfa_design = NFADesign([1], [2, 4], rulebook);

console.log(nfa_design.accepts('aa'))
console.log(nfa_design.accepts('aaa'))
console.log(nfa_design.accepts('aaaaa'))
console.log(nfa_design.accepts('aaaaaa'))