const guessedLetters= document.querySelector(".guessed-letters");
const guessButton= document.querySelector(".guess");
const textInput= document.querySelector(".letter"); //The text input where the player will guess a letter.//
const wordProgress= document.querySelector(".word-in-progress");
const remainingGuessElement= document.querySelector(".remaining"); //The paragraph where the remaining guesses will display.//
const remainingGuessSpan= document.querySelector(".remaining span"); //The span inside the paragraph where the remaining guesses will display.//
const message= document.querySelector(".message");//The empty paragraph where messages will appear when the player guesses a letter.//
const playAgainButton=document.querySelector(".play-again");

const word="magnolia";

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
    e.preventDefault();
    const guessResults = textInput.value;
    console.log(guessResults);
    textInput.value="";
});