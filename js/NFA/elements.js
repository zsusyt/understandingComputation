class FARule {
  constructor(state, character, next_state) {
    this.state = state;
    this.character = character;
    this.next_state = next_state;
  }

  static prod(...args) {
    return new FARule(...args)
  }

  applies_to(state, character) {
    return this.state === state && this.character === character;
  }

  follow() {
    return this.next_state
  }

}

class NFARulebook {
  constructor(rules) {
    this.rules = rules;
  }

  static prod(...args) {
    return new NFARulebook(...args)
  }

  next_states(states, character) {
    return Array.from(new Set(states.map(state => this.follow_rules_for(state, character)).reduce((acc, next_states) => acc.concat(next_states), [])))
  }

  rules_for(state, character) {
    return this.rules.filter( rule => rule.applies_to(state, character))
  }

  follow_rules_for(state, character) {
    return this.rules_for(state, character).map( rule => rule.follow())
  }
}

class NFA {
  constructor(current_states, accept_states, rulebook) {
    this.current_states = current_states;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  static prod(...args) {
    return new NFA(...args)
  }

  accepting() {
    return this.accept_states.filter( state => this.current_states.includes(state)).length > 0 
  }

  read_character(character) {
    this.current_states = this.rulebook.next_states(this.current_states, character)
  }

  read_string(string) {
    for(let letter of string) {
      this.read_character(letter);
    }
  }
}

class NFADesign {
  constructor(start_state, accept_states, rulebook) {
    this.start_state = start_state;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  static prod(...args) {
    return new NFADesign(...args)
  }

  toNfa() {
    return new NFA(this.start_state, this.accept_states, this.rulebook)
  }

  accepts(string) {
    const nfa = this.toNfa();
    nfa.read_string(string)
    return nfa.accepting()
  }
}

export default {
  FARule: FARule.prod,
  NFARulebook: NFARulebook.prod,
  NFA: NFA.prod,
  NFADesign: NFADesign.prod,
}