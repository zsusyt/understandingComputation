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

class DFARulebook {
  constructor(rules) {
    this.rules = rules;
  }

  static prod(...args) {
    return new DFARulebook(...args)
  }

  next_state(state, character) {
    return this.rule_for(state, character).follow()
  }

  rule_for(state, character) {
    return this.rules.filter( rule => rule.applies_to(state, character))[0]
  }
}

class DFA {
  constructor(current_state, accept_states, rulebook) {
    this.current_state = current_state;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  static prod(...args) {
    return new DFA(...args)
  }

  accepting() {
    return this.accept_states.includes(this.current_state)
  }

  read_character(character) {
    this.current_state = this.rulebook.next_state(this.current_state, character)
  }

  read_string(string) {
    for(let letter of string) {
      this.read_character(letter);
    }
  }
}

class DFADesign {
  constructor(start_state, accept_states, rulebook) {
    this.start_state = start_state;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  static prod(...args) {
    return new DFADesign(...args)
  }

  toDfa() {
    return new DFA(this.start_state, this.accept_states, this.rulebook)
  }

  accepts(string) {
    const dfa = this.toDfa();
    dfa.read_string(string)
    return dfa.accepting()
  }
}

export default {
  FARule: FARule.prod,
  DFARulebook: DFARulebook.prod,
  DFA: DFA.prod,
  DFADesign: DFADesign.prod,
}