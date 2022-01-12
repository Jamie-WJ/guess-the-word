const guessedLettersElement= document.querySelector(".guessed-letters");// The ul where the player’s guessed letters will appear.//
const guessButton= document.querySelector(".guess"); //The button with the text “Guess!” in it.//
const letterInput= document.querySelector(".letter"); //The text input box where the player will guess a letter.//
const wordProgress= document.querySelector(".word-in-progress"); //The empty paragraph with dotted placeholders where the word in progress will appear.//
const remainingGuessElement= document.querySelector(".remaining"); //The paragraph where the remaining guesses will display.//
const remainingGuessSpan= document.querySelector(".remaining span"); //The span inside the paragraph where the number of remaining guesses will display.//
const message= document.querySelector(".message");//The empty paragraph where messages will appear when the player guesses a letter.//
const playAgainButton=document.querySelector(".play-again");//The hidden button that will appear prompting the player to play again after a guess round is complete.//


let word="magnolia"; 
let guessedLetters=[];
let remainingGuesses=8;


const getWord= async function(){
    const response= await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words= await response.text ();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random()* wordArray.length);
    word= wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function(word){
    const placeholderLetters=[];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordProgress.innerText=placeholderLetters.join("");
};

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
            countGuessesRemaining(guess);
            showGuessedLetters();
            updateWordProgress(guessedLetters);
        }
    };
    
    const showGuessedLetters= function (){
        guessedLettersElement.innerHTML=""; //Clears the list.//
    for (const letter of guessedLetters) {
        const li= document.createElement("li");
        li.innerText=letter;
        guessedLettersElement.append(li);
    }
};
    const updateWordProgress= function(guessedLetters){
        const wordUpper= word.toUpperCase();
        const wordArray=wordUpper.split("");
        const showWord=[];
        for (const letter of wordArray){
            if (guessedLetters.includes(letter)){
                showWord.push(letter.toUpperCase());
            } else {
                showWord.push("●");
            }
        } 
        wordProgress.innerText=showWord.join("");
        checkPlayerWon();
    };

    const countGuessesRemaining= function (guess){
        const uppercaseWord= word.toUpperCase();
        if (!uppercaseWord.includes(guess)){
            message.innerText= `Sorry ${guess} is incorrect!`;
            remainingGuesses -=1;
        } else {
            message.innerText=`Pure genius! The word has the letter ${guess}.`;
        }

        if (remainingGuesses === 0){ 
            message.innerHTML=`Better luck next time! The word was <span class="highlight"> ${word} </span>.`;
        } else if (remainingGuesses === 1) {
            remainingGuessSpan.innerText=`${remainingGuesses} more guess.`;
        } else {remainingGuessSpan.innerText=`${remainingGuesses} guesses`;
    }
        
    };

        const checkPlayerWon= function(){
            if (word.toUpperCase()=== wordProgress.innerText) {
                message.classList.add("win");
                message.innerHTML= `<p class="highlight"> You guessed the correct word! Congrats!</p>`;
            
            startOver();
            }  
        
    };

    const startOver= function (){
        guessButton.classList.add("hide");
        remainingGuessElement.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        playAgainButton.classList.remove("hide");
    };

    playAgainButton.addEventListener("click", function() {
        //reset original values and grab a new word//
            message.classList.remove("win");
            guessedLetters=[];
            remainingGuesses= 8;
            remainingGuessSpan.innerText= `${remainingGuesses} guesses`;
            guessedLettersElement.innerHTML="";
            message.innerText="";

           
            getWord();

            guessButton.classList.remove("hide");
            playAgainButton.classList.add("hide");
            remainingGuessElement.classList.remove("hide");
            guessedLettersElement.classList.remove("hide");
            
    });

    
