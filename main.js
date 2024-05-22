// Creating all variables
const EnterButton = document.querySelector('.EnterButton');
const NextButton = document.querySelector('.NextButton');
const ResetScoreButton = document.querySelector('.ResetButton');
const ExitButton = document.querySelector('.ExitButton');
const DiplayedWordsContent = document.querySelector('.DiplayedWordsContent');
const WordInput = document.querySelector('#WordInput');
const ScoreCounter = document.querySelector('#score');
const AlertMessageContainer = document.querySelector('.AlertMessage');
const AlertMessage = document.querySelector('.AlertMessage p');
const PlayButton = document.querySelector('#PlayButton');
const Container = document.querySelector('.Container');
const HomeMainContainer = document.querySelector('.HomeMainContainer');
const LevelSelector = document.querySelector('#LevelSelector');
const HintButton = document.querySelector('.fa-lightbulb');
const GuideLineword = document.querySelector('.GuideLineword h4');

let score = 0;
// Array of words for each level
const easyWords = [
    'star', 'lamp', 'ring', 'boat', 'desk', 'cake', 'fish', 'tree', 'wind', 'road'
];
const mediumWords = [
    'planet', 'garden', 'school', 'friend', 'window', 'bottle', 'forest', 'animal', 'market', 'bridge'
];
const hardWords = [
    'vacation', 'elephant', 'computer', 'sunflower', 'rainbow', 'adventure', 'bicycle', 'hospital', 'telescope', 'mountain'
];
const veryHardWords = [
    'encyclopedia', 'transportation', 'refrigerator', 'communication', 'entrepreneur', 'understanding', 'circumference', 'philosopher', 'mathematical', 'environment'
];

// Array of hints for each level
const easyHints = [
    'A celestial object that shines in the night sky.',
    'A device that produces light.',
    'A circular band worn on a finger.',
    'A small vessel for traveling on water.',
    'A piece of furniture with a flat top and legs.',
    'A sweet baked dessert, often with frosting.',
    'An aquatic animal with gills and fins.',
    'A woody plant with leaves and branches.',
    'Air in motion, usually felt as a breeze.',
    'A paved path for vehicles to travel on.'
];

const mediumHints = [
    'A celestial body orbiting a star.',
    'An area with plants and flowers.',
    'An institution for educating children.',
    'A person whom one knows and with whom one has a bond.',
    'An opening in a wall to let in light and air.',
    'A container with a narrow neck used for storing liquids.',
    'A dense collection of trees and plants.',
    'A living organism that feeds on organic matter.',
    'A place where goods are bought and sold.',
    'A structure built to span a physical obstacle.'
];

const hardHints = [
    'A period of time spent away from home or traveling.',
    'A large mammal with a trunk and tusks.',
    'An electronic device for processing data.',
    'A plant with large yellow flowers that follows the sun.',
    'A natural phenomenon forming a colorful arc in the sky.',
    'An exciting or unusual experience.',
    'A vehicle with two wheels powered by pedaling.',
    'A medical institution for treating patients.',
    'An optical instrument for viewing distant objects.',
    'A large landform that rises above the surrounding land.'
];

const veryHardHints = [
    'A comprehensive reference work with articles on various topics.',
    'A system or means of conveying people or goods.',
    'An appliance for keeping food and drinks cold.',
    'The exchange of information through various means.',
    'A person who starts and runs a business.',
    'The ability to understand something.',
    'The distance around a circular object.',
    'A person engaged in the study of fundamental questions.',
    'Relating to the science of numbers and their operations.',
    'The surroundings or conditions in which a person lives.'
];

// Default level easy
let words = easyWords;

 // Function to scramble a word
 function scrambleWord(word) {
    if(word.length < 2) {
        return word;
    }

    let scrambled;
    do{
        scrambled = word.split('');
        for(let i = scrambled.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
        }
        scrambled = scrambled.join('');
    }while(scrambled === word);
    
    return scrambled;
 }

 // Converting words to uppercase
 WordInput.addEventListener('input', ()=> {
    WordInput.value = WordInput.value.toUpperCase();
 })

 // Function to display a scramble word
 function displayScrambledWord(word){
    DiplayedWordsContent.innerHTML = '';

    // Creating div for each letter with specific styles
    for(let i = 0; i < word.length; i++){
        let letterDiv = document.createElement('div');
        letterDiv.classList.add('scrambleletter', `scrambleletter${i + 1}`);
        letterDiv.textContent = word[i];
        DiplayedWordsContent.appendChild(letterDiv);
    }
 }

 // To track the currentwordindex
 let currentWordIndex = -1;

 // Function to get a random from the array and scramble it
 function getRandomScrambledWord(){
    currentWordIndex = Math.floor(Math.random() * words.length);
    const randomScrambledWord = words[currentWordIndex];
    return scrambleWord(randomScrambledWord);
 }

 // Function to get hint for the current word
 function getHint(){
    const selectedLevel = LevelSelector.value;
    let hint;
    switch(selectedLevel){
        case 'easy':
            hint = easyHints[currentWordIndex];
            break;
        case 'medium':
            hint = mediumHints[currentWordIndex];
            break;
        case 'hard':
            hint = hardHints[currentWordIndex];
            break;
        case 'veryHard':
            hint = veryHardHints[currentWordIndex];
            break;
    }

    return hint;
 }

 // Adding to eventlistener to dispay hint for the current word
 HintButton.addEventListener('click', ()=> {
    const hint = getHint();
    GuideLineword.innerHTML = `Hint : ${hint}`;
    GuideLineword.style.textTransform = 'capitalise';
 });

 // Clear input field
 function ClearInputField(){
    WordInput.value = '';
 }

 // Function to check the input word is correct
function checkWord(){
    const inputWord = WordInput.value.trim().toLowerCase();
    const correctWordIndex = words.findIndex(word => word.toLowerCase() === inputWord);
    if(correctWordIndex !== -1 && inputWord === words[correctWordIndex]){
        score++;
        ScoreCounter.textContent = score;
        AlertMessage.classList.remove('AlertIncorrect');
        AlertMessage.classList.add('AlertCorrect');
        AlertMessage.classList.remove('animate__flash');
        AlertMessage.classList.add('animate__pulse');
        AlertMessage.innerHTML = `<p>Correct Guess! <i class="fa-regular fa-face-laugh-beam"></i></p>`;
        ClearInputField();
    }else{
        AlertMessage.classList.remove('AlertCorrect');
        AlertMessage.classList.add('AlertIncorrect');
        AlertMessage.classList.remove('animate__pulse');
        AlertMessage.classList.add('animate__flash');
        AlertMessage.innerHTML = `<p>Wrong Guess! Please Try Again <i class="fa-solid fa-face-sad-tear"></i></i></p>`;
        ClearInputField();
    }
    // Display the alert message
    AlertMessageContainer.style.display = 'block';
    // Hide the alert message after 1.5 seconds
    setTimeout(() => {
        AlertMessageContainer.style.display = 'none';
    }, 1500);
}

// Function to set words array based on selected level
function setWordsLevel(){
    const selectedLevel = LevelSelector.value;
    switch(selectedLevel){
        case 'easy':
            words = easyWords;
            break;
        case 'hard':
            words = hardWords;
            break;
        case 'medium':
            words = mediumWords;
            break;
        case 'veryHard':
            words = veryHardWords;
            break;
    }

    // Display a new scrambledWord when selecting the level
    const newScrambledWord = getRandomScrambledWord();
    displayScrambledWord(newScrambledWord);
}

// Adding event listener to change words display when selecting the level
LevelSelector.addEventListener('change', ()=> {
    setWordsLevel();
    GuideLineword.textContent = '';
});

 // Window onload to method to display word on screen loading
 window.onload = function(){
    const initialScrambledWord = getRandomScrambledWord()
    displayScrambledWord(initialScrambledWord);
 }

EnterButton.addEventListener('click', () => {
    if(WordInput.value === ''){
        alert('Please enter the given word!');
    }else{
        checkWord();
    }
});

// Next button to display next random scrambled word
NextButton.addEventListener('click', () => {
    const nextScrambledWord = getRandomScrambledWord();
    displayScrambledWord(nextScrambledWord);
    // Resetting alert message content
    AlertMessage.textContent = '';
    WordInput.value = '';
    GuideLineword.textContent = '';
});

ResetScoreButton.addEventListener('click', () => {
    score = 0;
    ScoreCounter.textContent = score;
    GuideLineword.textContent = '';
});

ExitButton.addEventListener('click', () => {
    score = 0;
    ScoreCounter.textContent = score;
    Container.style.display = 'none';
    HomeMainContainer.style.display = 'flex';
});

PlayButton.addEventListener('click', () => {
    Container.style.display = 'block';
    HomeMainContainer.style.display = 'none';
})
