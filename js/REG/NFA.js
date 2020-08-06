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

  follow_free_moves(states) {
    const more_states = this.next_states(states, null)

    if(include(states, more_states)) {
      return states
    } else {
      return this.follow_free_moves(add(states, more_states))
    }

  }
}

class NFA {
  constructor(current_states, accept_states, rulebook) {
    this._current_states = current_states;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  get current_states() {
    return this.rulebook.follow_free_moves(this._current_states)
  }

  static prod(...args) {
    return new NFA(...args)
  }

  accepting() {
    return this.accept_states.filter( state => this.current_states.includes(state)).length > 0 
  }

  read_character(character) {
    this._current_states = this.rulebook.next_states(this.current_states, character)
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

function include(master, slave) {
  for(let item of slave) {
    if(!master.includes(item)) return false;
  }

  return true
}

function add(master, slave) {
  return Array.from(new Set(master.concat(slave)))
}

export default {
  FARule: FARule.prod,
  NFARulebook: NFARulebook.prod,
  NFA: NFA.prod,
  NFADesign: NFADesign.prod,
}