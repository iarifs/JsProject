//boolean for timer
let timerIsON = false;
//moves counter 
let counter = 0;
//empty array to check the cards
let anEmptyArray = [];
//for counting seconds.
let seconds = 0;
const listContainer = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const stars = document.querySelector('.stars');
const newGame = document.querySelector('.restart');
const starList = stars.getElementsByTagName('li');
const matched = document.getElementsByClassName('match');
const listofDeck = listContainer.getElementsByClassName('card');
const timerClass = document.querySelector('.timer');
let arrayOfCards = ["fa fa-diamond", ///array that hold cards.
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"
];
arrayOfCards = shuffle(arrayOfCards);

//function that creates all the icons and list items

function createIcons() {

    //Creating icons in the html by for of loop...

    for (const array of arrayOfCards) {
        //create "Li" element for the html

        const createList = document.createElement('li');
        listContainer.appendChild(createList);
        createList.classList.add('card');
        //add icons in the html
        createList.innerHTML = `<i class = "${array}"></i>`;
    }
}
createIcons();

//compare cards that is it matching and not matching.

function cardCompare(e) {

    if (e.target.classList.contains('card') &&
        !(e.target.classList.contains('open', 'show')) &&
        !(e.target.classList.contains('match'))) {
        timerIsON = true; //boolean for timer

        // push the e.target to on a array to compare the cards.
        anEmptyArray.push(e.target);
        e.target.classList.add('open', 'show');
        const currentCard = anEmptyArray[0]; //hold card for first position
        const lastCard = anEmptyArray[1]; //hold card for second position
        e.target.classList.add('open','show');
        if ((anEmptyArray.length === 2 )) {
            //check the cards that it is matched 

            if (currentCard.innerHTML === lastCard.innerHTML) { // if these two cards matched it will show cards

                setTimeout(function () {
                    currentCard.classList.add('match', 'animated', 'tada');
                    currentCard.classList.remove('open', 'show');
                    lastCard.classList.add('match', 'animated', 'tada');
                    lastCard.classList.remove('open', 'show');
                }, 200);
                setTimeout(function () {
                    currentCard.classList.remove('animated', 'tada');
                    lastCard.classList.remove('animated', 'tada');
                }, 700);
            } else {
                setTimeout(function () {
                    //add animation for wrong move
                    currentCard.classList.add('animated', 'wobble');
                    lastCard.classList.add('animated', 'wobble');
                    currentCard.classList.remove('open', 'show');
                    lastCard.classList.remove('open', 'show');

                }, 400);
                setTimeout(function () {
                    //remove animation for wrong move
                    currentCard.classList.remove('animated', 'wobble');
                    lastCard.classList.remove('animated', 'wobble');

                }, 700);
            }
            starCounter();
            anEmptyArray = []; // empty the array 
            counter++; //current moves
            moves.innerHTML = `${counter} Moves`; //print the move in th html.
        }
    }
    setTimeout(congratulationBoard, 200);
}

setInterval(starTimer, 1000); // this is for counting star

//star counting when the game start and remove the star from html.

function starCounter() {
    if (counter === 15) { //if counter is eqaul to 11 it will remove one star from the game.
        stars.removeChild(starList[2]);
    } else if (counter === 21) {
        stars.removeChild(starList[1]);
    }
}
//after winning the match this function will show the congratulation message on screen..
function congratulationBoard() {
    if (matched.length === arrayOfCards.length) {
        //I added a sweetAlert javascript library .
        swal({
            type: 'success',
            title: 'Congratulations! New Record!!',
            html: `You won the game with ${seconds} seconds and ${counter } moves and ${starList.length} <i class="fa fa-star"></i>   `,
            heightAuto: 'true',
            grow: 'fullscreen',
            onClose: restartGame,
        })
    }
}
//function that will count seconds.
function starTimer() {
    if (timerIsON) {
        let minute = 0
        seconds = seconds + 1;
        const min = Math.floor(seconds /60);
        const remainMin = (seconds - min*60)+1;
        if(remainMin ===60){
            minute= minute+1;
        }
        timerClass.innerText = `Timer  :${minute} min ${remainMin} sec`
    }
}
//this function will reset the game again.
function restartGame() {
    //if star length is less than 1 or equal to 1 .it will create all the star again.

    if (starList.length >= 1) {
        stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'
    }
    //checking that if there any opened or matched card.
    for (const list of listofDeck) {
        list.classList.remove('open', 'show', 'match');
    }
    timerIsON = false; //make all things to 0 for reseting
    counter = 0;
    seconds = 0;
    moves.innerHTML = `${counter} Moves`;
    timerClass.innerText = `Timer  : ${seconds} sec`;
    arrayOfCards = shuffle(arrayOfCards); //shuffle cards
    //shuffle inner html after  reseting
    for(let i = 0; i < listofDeck.length; i++){
    listofDeck[i].innerHTML = `<i class = "${arrayOfCards[i]}" ></i>`;
    }
    anEmptyArray = [];
}

/*This is the shuffle function
it will shuffle the game*/
function shuffle(arrayOfCards) {
    var currentIndex = arrayOfCards.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arrayOfCards[currentIndex];
        arrayOfCards[currentIndex] = arrayOfCards[randomIndex];
        arrayOfCards[randomIndex] = temporaryValue;
    }

    return arrayOfCards;
}
listContainer.addEventListener('click', cardCompare);
newGame.addEventListener('click', restartGame);