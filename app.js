var livesLeft;
var hasWon;
var wordBank;
var rawRandomWord;
var unmaskedRandomWord;
var maskedRandomWord;
var usedLetters = [];

async function startGame() {
    // set `lives` to 5
    // set `hasWon` to false
    // creates a random word
    await initGame();

    // if the player still has lives
    while (livesLeft > 0) {
        // if the player has won, it breaks the loop and returns early
        if (hasWon == true) {
            return;
        }
        // if the player hasn't guessed the word
        takeTurn();
    }
    alert("You've lost the game! The correct word was '" + rawRandomWord + "'");
}

async function initGame() {
    livesLeft = 5;
    hasWon = false;
    rawRandomWord = await getRandomWord();
    console.log(rawRandomWord)
    unmaskedRandomWord = createUnmaskedWord(rawRandomWord); // ['r', 'a', 'p', 'h']
    maskedRandomWord = createMaskedWord(rawRandomWord); // ['_', '_', '_', '_', ]
}

function takeTurn () {
    var guessedCorrectly = false;
    var letterGuessed = prompt(maskedRandomWord + ' ' + 'Lives left: ' + livesLeft + ' Letters used: ' + usedLetters).toLowerCase();
    var letterUsed = (usedLetters.indexOf(letterGuessed) !== -1); // sets it to boolean
    // check if its been used, return

    if (letterUsed === true) {
        alert("Already tried that letter. Pick a new one!")
        return; // display error message?
    }
    // TODO: if they've used a letter, don't allow them to use it again, display a message, start take turn again

    for (var i = 0; i < unmaskedRandomWord.length; i++) {
        // TODO: push the letters to the array of usedLetters
        if (letterGuessed === unmaskedRandomWord[i]) {
            maskedRandomWord[i] = letterGuessed;
            guessedCorrectly = true;
        }
    
    }

    if (guessedCorrectly === false) {
        livesLeft--;
    }

    usedLetters.push(letterGuessed);

    if (unmaskedRandomWord.toString() === maskedRandomWord.toString()) {
        alert("You've won the game! The correct word was '" + rawRandomWord + "'")
        hasWon = true;
    }
}


async function getRandomWord() {
    var res = await fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=c23b746d074135dc9500c0a61300a3cb7647e53ec2b9b658e');
    var json = await res.json();
    var word = json.word;
    return word;
}

function createUnmaskedWord(randomWord) {
    return randomWord.split("");
}

function createMaskedWord(randomWord) {;
    return randomWord.split("").map(function() {
        return '_ ';
    });
}

// make used letters visible
// messaging
// API - don't include words without hyphen or space





