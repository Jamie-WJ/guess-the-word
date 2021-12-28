const guessedLettersElement= document.querySelector(".guessed-letters");// The ul where the player’s guessed letters will appear.//
const guessButton= document.querySelector(".guess"); //The button with the text “Guess!” in it.//
const letterInput= document.querySelector(".letter"); //The text input box where the player will guess a letter.//
const wordProgress= document.querySelector(".word-in-progress"); //The empty paragraph with dotted placeholders where the word in progress will appear.//
const remainingGuessElement= document.querySelector(".remaining"); //The paragraph where the remaining guesses will display.//
const remainingGuessSpan= document.querySelector(".remaining span"); //The span inside the paragraph where the number of remaining guesses will display.//
const message= document.querySelector(".message");//The empty paragraph where messages will appear when the player guesses a letter.//
const playAgainButton=document.querySelector(".play-again");//The hidden button that will appear prompting the player to play again after a guess round is complete.//


const word="magnolia"; // Test word.//
const guessedLetters=[];

const placeholder = function(word){
    const placeholderLetters=[];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText=placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();//Empties the message paragraph.//
    message.innerText="";
    const guess = letterInput.value;
    const goodGuess= validateInput(guess);

    if(goodGuess){
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function(letterInput){
    const acceptedLetter=/[a-zA-z]/;
    if (letterInput.length===0) //If the input is empty.// 
    {
        message.innerText = "My friend, you forgot to enter a letter!";
    } else if (letterInput.length > 1) {
        message.innerText= "Oh silly, you can only enter 1 letter!";
    } else if (!letterInput.match (acceptedLetter)) { 
        message.innerText="Try entering a letter from A-Z!";
    } //Message occurrs when a character other than A-Z has been entered.//
    else {
        return letterInput;
    }
};

    const makeGuess= function(guess){
        guess=guess.toUpperCase();
        if (guessedLetters.includes(guess)) {
            message.innerText = "You already guessed that letter. Try again!";
        } else {
            guessedLetters.push(guess);
            console.log(guessedLetters);
            showGuessedLetters();
        }
    };
    
    const showGuessedLetters= function (){
        guessedLettersElement.innerHTML="";
    for (const letter of guessedLetters) {
        const li= document.createElement("li");
        li.innerText=letter;
        guessedLettersElement.append(li);
    }
    };
