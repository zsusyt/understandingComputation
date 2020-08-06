import elements from './NFA.js';
import { start } from 'repl';

const { FARule, NFARulebook, NFA, NFADesign, } = elements;

class Pattern {
  get precedence() {
    return 0
  }

  bracket(outer_precedence) {
    if(this.precedence < outer_precedence) {
      return `(${this.to_s()})`
    } else {
      return `${this.to_s()}`
    }
  }

  to_s() {
    throw('this method must be overided')
  }

  matches(string) {
    return this.to_nfa_design().accepts(string)
  }
}

class Empty extends Pattern {
  get precedence() {
    return 3
  }

  static prod(...args) {
    return new Empty(...args)
  }

  to_s() {
    return ''
  }

  to_nfa_design() {
    const start_state = [new Object(null)];
    const accept_states = start_state;
    const rulebook = NFARulebook([]);

    return NFADesign(start_state, accept_states, rulebook);
  }
}

class Literal extends Pattern {
  constructor(charactor) {
    super();
    this.charactor = charactor;
  }

  static prod(...args) {
    return new Literal(...args)
  }

  get precedence() {
    return 3
  }

  to_s() {
    return `${this.charactor}`
  }

  to_nfa_design() {
    const start_state = new Object(null);
    const accept_state = new Object(null);
    const rule = FARule(start_state, this.charactor, accept_state)
    const rulebook = NFARulebook([rule]);

    return NFADesign([start_state], [accept_state], rulebook)
  }
}

class Concatenate extends Pattern {
  constructor(first, second) {
    super();
    this.first = first;
    this.second = second;
  }

  static prod(...args) {
    return new Concatenate(...args)
  }

  get precedence() {
    return 1
  }
  
  to_s() {
    let mid = [this.first, this.second].map( expression => expression.bracket.call(expression, this.precedence));
    return mid.join('')
  }

  to_nfa_design() {
    const first_nfa_design = this.first.to_nfa_design();
    const second_nfa_design = this.second.to_nfa_design();

    const start_state = first_nfa_design.start_state;
    const accept_states = second_nfa_design.accept_states;
    const first_rules = first_nfa_design.rulebook.rules, second_rules = second_nfa_design.rulebook.rules;
    let retRules = [];
    for(let secRule of second_rules) {
      if(diffRule(first_rules, secRule)) {
        retRules.push(secRule)
      }
    }
    retRules = retRules.concat(first_rules);

    const extraRules = first_nfa_design.accept_states.map( state => FARule(state, null, second_nfa_design.start_state[0]))

    const rulebook = NFARulebook(retRules.concat(extraRules))

    return NFADesign(start_state, accept_states, rulebook)
  }
}

function diffRule(sourceRules, target) {
  for(let rule of sourceRules) {
    if(rule.state === target.state && rule.charactor === target.charactor && rule.next_state === target.next_state) return false
  }
  return true;
}
class Choose extends Pattern {
  constructor(first, second) {
    super();
    this.first = first;
    this.second = second;
  }

  static prod(...args) {
    return new Choose(...args)
  }

  get precedence() {
    return 0
  }
  
  to_s() {
    let mid = [this.first, this.second].map( expression => expression.bracket.call(expression, this.precedence));
    return mid.join('|')
  }

  to_nfa_design() {
    const first_nfa_design = this.first.to_nfa_design();
    const second_nfa_design = this.second.to_nfa_design();

    const start_state = new Object(null);
    const accept_states = first_nfa_design.accept_states.concat(second_nfa_design.accept_states);
    const first_rules = first_nfa_design.rulebook.rules, second_rules = second_nfa_design.rulebook.rules;
    const retRules = second_rules.concat(first_rules);

    const extraRules = [first_nfa_design, second_nfa_design].map( nfa_design => FARule(start_state, null, nfa_design.start_state[0]))

    const rulebook = NFARulebook(retRules.concat(extraRules))

    return NFADesign([start_state], accept_states, rulebook)
  }
}

class Repeat extends Pattern {
  constructor(pattern) {
    super();
    this.pattern = pattern;
  }

  static prod(...args) {
    return new Repeat(...args)
  }

  get precedence() {
    return 2
  }

  to_s() {
    return this.pattern.bracket(this.precedence) + '*';
  }

  to_nfa_design() {
    const pattern_nfa_design = this.pattern.to_nfa_design();

    const start_state = new Object(null);
    const accept_states = pattern_nfa_design.accept_states.concat(start_state);
    const rules = pattern_nfa_design.rulebook.rules;
    const extraRules = pattern_nfa_design.accept_states.map( accept_state => FARule(accept_state, null, pattern_nfa_design.start_state[0]))
      .concat(FARule(start_state, null, pattern_nfa_design.start_state[0]))
    const rulebook = NFARulebook(rules.concat(extraRules));

    return NFADesign([start_state], accept_states, rulebook);
  }
}

export default {
  Empty: Empty.prod,
  Literal: Literal.prod,
  Concatenate: Concatenate.prod,
  Choose: Choose.prod,
  Repeat: Repeat.prod,
}