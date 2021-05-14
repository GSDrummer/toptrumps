// const compCard = document.querySelector('.compCard')
// const playerCard = document.querySelector('.playerCard')
// const compDeckElement = document.querySelector('.compDeck')
// const playerDeckElement = document.querySelector('.playerDeck')
// const text = document.querySelector('.text')

let playerDeck, compDeck, limboDeck;

let winner = false;

const CHARS = [
  "David Stagg",
  "Tom Hart",
  "Gabriel Austen",
  "Jack Hawk",
  "Marius Winter",
  "Felix Calamity",
  "Jason Snow",
  "David Hart",
  "Emilio Helsing",
  "Corey Dark",
  "Ophelia Wise",
  "Grace Summer",
  "Sabina Blood",
  "October Stoker",
  "Mercy Storm",
  "Willow Sparrow",
  "Dawn Calamity",
  "Lillith Byron",
  "Lily Forest",
  "Liana Forest",
  "Cassandra Byron",
  "Alexia Bane",
  "Kate Darcy",
  "Alexia Stoker",
  "Ophelia Raven",
  "Gabriel Winter",
  "Zander Snow",
  "Eric Winter",
  "Corey Helsing",
  "Brad Keats",
];

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }
}

class card {
  constructor(name, health, strength, stealth, agility, intelligence) {
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.stealth = stealth;
    this.agility = agility;
    this.intelligence = intelligence;
  }
}

function statPt() {
  num = Math.floor(Math.random() * 3);
  return num;
}

function freshDeck() {
  return CHARS.flatMap((name) => {
    return new card(name, statPt(), statPt(), statPt(), statPt(), statPt());
  });
}

function startGame() {
  winner = false;
  const deck = new Deck();
  const deckMid = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMid));
  compDeck = new Deck(deck.cards.slice(deckMid, deck.numberOfCards));
  limboDeck = new Deck(deck.cards.splice(0, deck.length));

  playerTurn();
}

function checkWin() {
  if (playerDeck.numberOfCards === 0) {
    alert("Computer Wins\n\nYou ran out of cards!");
    return (winner = true);
  } else if (compDeck.numberOfCards === 0) {
    alert("You win!\n\nComputer ran out of cards!");
    return (winner = true);
  }
}

function nextTurn() {
  alert("Picking at random who goes next...");
  randNum = Math.floor(Math.random() * 2) + 1;
  if (randNum == 1) {
    alert("You will go next.");
    playerTurn();
  } else {
    alert("Opponent will go next.");
    compTurn();
  }
}

function playerTurn() {
  checkWin();
  if (winner === true) {
    return;
  }

  alert(
    "Your turn, here's your card, choose a stat to pit against your opponent!"
  );
  let playerCard = playerDeck.cards.shift();
  let compCard = compDeck.cards.shift();
  let limboCards = limboDeck.cards.splice(0, limboDeck.cards.length);
  console.log(limboCards);
  let stat =
    prompt(`--------------------------    ${playerCard.name}    --------------------------
Health: ${playerCard.health} 
Strength: ${playerCard.strength}
Stealth: ${playerCard.stealth} 
Agility: ${playerCard.agility}
Intelligence: ${playerCard.intelligence}`);

  if (stat === null) {
    return;
  }

  choice = stat.toLowerCase().replace(/\s/g, "");

  if (choice === "health") {
    alert("You have chosen Health");
    if (playerCard.health > compCard.health) {
      alert(
        `Your Health: ${playerCard.health}\n\nComps health: ${compCard.health}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboCards.splice(0, limboCards.length));
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      checkWin();
      playerTurn();
    } else if (playerCard.health < compCard.health) {
      alert(
        `Your health: ${playerCard.health}\n\nComps health: ${compCard.health}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboCards.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.health === compCard.health) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      console.log(limboDeck);
      checkWin();
      nextTurn();
    }
  } else if (choice === "strength") {
    alert("You have chosen Strength");
    if (playerCard.strength > compCard.strength) {
      alert(
        `Your strength: ${playerCard.strength}\n\nComps strength: ${compCard.strength}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.strength < compCard.strength) {
      alert(
        `Your strength: ${playerCard.strength}\n\nComps strength: ${compCard.strength}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.strength === compCard.strength) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  } else if (choice === "stealth") {
    alert("You have chosen Stealth");
    if (playerCard.stealth > compCard.stealth) {
      alert(
        `Your strength: ${playerCard.stealth}\n\nComps stealth: ${compCard.stealth}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.stealth < compCard.stealth) {
      alert(
        `Your stealth: ${playerCard.stealth}\n\nComps stealth: ${compCard.stealth}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.stealth === compCard.stealth) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  } else if (choice === "agility") {
    alert("You have chosen Agility");
    if (playerCard.agility > compCard.agility) {
      alert(
        `Your agility: ${playerCard.agility}\n\nComps agility: ${compCard.agility}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.agility < compCard.agility) {
      alert(
        `Your agility: ${playerCard.agility}\n\nComps agility: ${compCard.agility}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.agility === compCard.agility) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  } else if (choice === "intelligence") {
    alert("You have chosen Intelligence");

    if (playerCard.intelligence > compCard.intelligence) {
      alert(
        `Your intelligence: ${playerCard.intelligence}\n\nComps intelligence: ${compCard.intelligence}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.intelligence < compCard.intelligence) {
      alert(
        `Your intelligence: ${playerCard.intelligence}\n\nComps intelligence: ${compCard.intelligence}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.intelligence === compCard.intelligence) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  } else {
    alert("Please input a stat");
    playerDeck.cards.unshift(playerCard);
    compDeck.cards.unshift(compCard);
    playerTurn();
  }
}

function compTurn() {
  checkWin();
  if (winner === true) {
    return;
  }
  alert("Opponent is choosing their stat to play");
  let playerCard = playerDeck.cards.shift();
  let compCard = compDeck.cards.shift();
  choice = compChoice();

  function compChoice() {
    num = Math.floor(Math.random() * 5) + 1;
    if (num == 1) {
      return "health";
    } else if (num == 2) {
      return "strength";
    } else if (num == 3) {
      return "stealth";
    } else if (num == 4) {
      return "agility";
    } else if (num == 5) {
      return "intelligence";
    }
  }

  if (choice === "health") {
    alert("They have chosen Health");
    if (playerCard.health > compCard.health) {
      alert(
        `Your Health: ${playerCard.health}\n\nComps health: ${compCard.health}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.health < compCard.health) {
      alert(
        `Your health: ${playerCard.health}\n\nComps health: ${compCard.health}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.health === compCard.health) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  } else if (choice === "strength") {
    alert("They have chosen Strength");
    if (playerCard.strength > compCard.strength) {
      alert(
        `Your strength: ${playerCard.strength}\n\nComps strength: ${compCard.strength}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.strength < compCard.strength) {
      alert(
        `Your strength: ${playerCard.strength}\n\nComps strength: ${compCard.strength}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.strength === compCard.strength) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  } else if (choice === "stealth") {
    alert("They have chosen Stealth");
    if (playerCard.stealth > compCard.stealth) {
      alert(
        `Your strength: ${playerCard.stealth}\n\nComps stealth: ${compCard.stealth}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.stealth < compCard.stealth) {
      alert(
        `Your stealth: ${playerCard.stealth}\n\nComps stealth: ${compCard.stealth}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.stealth === compCard.stealth) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  } else if (choice === "agility") {
    alert("They have chosen Agility");
    if (playerCard.agility > compCard.agility) {
      alert(
        `Your agility: ${playerCard.agility}\n\nComps agility: ${compCard.agility}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.agility < compCard.agility) {
      alert(
        `Your agility: ${playerCard.agility}\n\nComps agility: ${compCard.agility}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.agility === compCard.agility) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  } else if (choice === "intelligence") {
    alert("They have chosen Intelligence");

    if (playerCard.intelligence > compCard.intelligence) {
      alert(
        `Your intelligence: ${playerCard.intelligence}\n\nComps intelligence: ${compCard.intelligence}\n\nPlayer wins this round!`
      );
      playerDeck.cards.push(compCard, limboDeck.cards);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      playerTurn();
    } else if (playerCard.intelligence < compCard.intelligence) {
      alert(
        `Your intelligence: ${playerCard.intelligence}\n\nComps intelligence: ${compCard.intelligence}\n\nComputer wins this round!`
      );
      compDeck.cards.push(playerCard, limboDeck);
      console.log(
        `Player Cards: ${playerDeck.numberOfCards}\n\nComputer Cards: ${compDeck.numberOfCards}`
      );
      compTurn();
    } else if (playerCard.intelligence === compCard.intelligence) {
      alert("It's a tie! Both cards go to Limbo!");
      limboDeck.cards.push(compCard, playerCard);
      nextTurn();
    }
  }
}

startGame();
