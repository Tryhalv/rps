//#region
import * as readlinePromises from "node:readline/promises";
const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//#endregion

import { print } from "./lib/output.mjs";
import { ANSI } from "./lib/ansi.mjs";
import { getRandomItemFromArray } from "./lib/random.mjs";
import GAME_DICTIONARY from "./dictionary.mjs";
import { ShowLogo } from "./startscreen.mjs";

const CHOICES = { rock: 1, paper: 2, scissors: 3 };
const LIST_OF_CHOICES = [CHOICES.rock, CHOICES.paper, CHOICES.scissors];

const chosenLanguage = GAME_DICTIONARY.en; 

ShowLogo(chosenLanguage.logo);
let selection = await askForPlayerChoiceNoValidation(
  chosenLanguage.wantToPlay
);

if (selection == (chosenLanguage.decline)) {
  process.exit();
}
let isPlaying = true;

while (isPlaying == true) {
  let player = await askForPlayerChoice(chosenLanguage.selectionQuestion);
  //console.log(player);
  let npc = makeAIChoice();

  print(
    `${chosenLanguage.youPicked} ${getDesc(player)} ${
      chosenLanguage.aiPicked
    } ${getDesc(npc)}`
  );
  print(chosenLanguage.winner + evaluateWinner(player, npc));

  let replayAnswer = await askForPlayerChoiceNoValidation(
    chosenLanguage.wantToPlayAgain
  );
  if (replayAnswer == chosenLanguage.decline.toLowerCase()) {
    //process.exit();
    isPlaying = false;
  }
}
print (chosenLanguage.endgameGreeting);

// ---- Game functions etc..

function evaluateWinner(p1Ch, p2Ch) {
  // Vi går ut i fra at spiller 2 vinner :)
  let result = chosenLanguage.player2;

  // Men vi må sjekke om noe annet skjedde.
  if (p1Ch == p2Ch) {
    result = chosenLanguage.draw;
  } else if (p1Ch == CHOICES.rock) {
    if (p2Ch == CHOICES.scissors) {
      result = chosenLanguage.player1;
    }
  } else if (p1Ch == CHOICES.paper) {
    if (p2Ch == CHOICES.rock) {
      result = chosenLanguage.player1;
    }
  } else if (p1Ch == CHOICES.scissors) {
    if (p2Ch == CHOICES.paper) {
      result = chosenLanguage.player1;
    }
  }

  return result;
}

function makeAIChoice() {
  return getRandomItemFromArray(LIST_OF_CHOICES);
}

function getDesc(choice) {
  return chosenLanguage.choices[choice - 1];
}

async function askForPlayerChoice(question) {
  let choice = null;

  do {
    print(question);
    let rawChocie = await rl.question("");
    rawChocie = rawChocie.toLowerCase();
    choice = evaluatePlayerChoice(rawChocie);
  } while (choice == null);

  return choice;
}

async function askForPlayerChoiceNoValidation(question) {
  let choice = null;

  do {
    print(question);
    let rawChocie = await rl.question("");
    rawChocie = rawChocie.toLowerCase();
    choice = rawChocie;
  } while (choice == null);

  return choice;
}

function evaluatePlayerChoice(rawChocie) {
  let choice = null;
  

  if (rawChocie == chosenLanguage.rock) {
    choice = CHOICES.rock;
  } else if (rawChocie == chosenLanguage.paper) {
    choice = CHOICES.paper;
  } else if (rawChocie == chosenLanguage.scissors) {
    choice = CHOICES.scissors;
  }
  return choice;
}

process.exit();
