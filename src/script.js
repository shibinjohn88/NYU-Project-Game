"use strict";
var game = {
    backImages: ["jack_of_hearts2.png", "jack_of_spades2.png", "king_of_clubs2.png", "king_of_diamonds2.png", "king_of_hearts2.png", "king_of_spades2.png", "queen_of_clubs2.png",
        "queen_of_diamonds2.png", "queen_of_hearts2.png", "queen_of_spades2.png", "jack_of_hearts2.png", "jack_of_spades2.png", "king_of_clubs2.png", "king_of_diamonds2.png", "king_of_hearts2.png", "king_of_spades2.png", "queen_of_clubs2.png",
        "queen_of_diamonds2.png", "queen_of_hearts2.png", "queen_of_spades2.png"],
    cardsSelected: [],
    cardsMatched: [],
    pendingMoves: 100,
    shuffledBackImages: [],
    time: 0,
    timeInterval: 0
};
//event listener for play button
var playButton = document.querySelector("#play");
playButton.addEventListener('click', addCards);
//event listener for quit button
var quitButton = document.querySelector("#quit");
//add cards to card holder
function addCards() {
    var cardHolder = document.getElementById('card-holder');
    cardHolder.innerHTML = '';
    cardHolder.classList.remove('card-holder');
    game.shuffledBackImages = shuffle(game.backImages);
    var pendingMoves = document.querySelector('#moves');
    pendingMoves.innerHTML = "".concat(game.pendingMoves);
    for (var i = 0; i < 20; i++) {
        var card = document.createElement('div');
        card.addEventListener('click', flipCard);
        var backFace = getBackImage(i);
        card.className = 'card';
        card.innerHTML = "\n        <div class=\"front-face\"><img src=\"./images/card-face.png\"></div>\n        <div class=\"back-face\"><img src=./images/".concat(backFace, "></div>");
        cardHolder.appendChild(card);
    }
    //remove event listener from play button once cards are added to the card holder
    playButton.style.cursor = 'default';
    playButton.removeEventListener('click', addCards);
    quitButton.addEventListener('click', quitGame);
    gameStart();
}
//shuffle an array randomly adopted from stackoverflow
function shuffle(ar) {
    var _a;
    var array = [];
    for (var i = 0; i < ar.length; i++) {
        array.push(ar[i]);
    }
    var currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
//pick an image from the shuffled image array
function getBackImage(i) {
    var imageArray = game.shuffledBackImages;
    return imageArray[i];
}
//flip cards 
function flipCard() {
    var cardsSelected = game.cardsSelected;
    var cd = this;
    if (cardsSelected.length < 2) {
        cd.classList.toggle('flipcard');
        cd.removeEventListener('click', flipCard);
        cd.style.cursor = 'default';
        cardsSelected.push(cd);
        game.pendingMoves -= 1;
        var pendingMoves = document.querySelector('#moves');
        pendingMoves.innerHTML = "".concat(game.pendingMoves);
        if (game.pendingMoves === 0) {
            gameOver();
        }
        if (cardsSelected.length === 2) {
            setTimeout(function () {
                matchCard();
            }, 300);
        }
    }
}
//match selected cards
function matchCard() {
    var cards = game.cardsSelected;
    var cardsMatched = game.cardsMatched;
    var card1_Img = cards[0].lastElementChild.querySelector('img').src;
    var card2_Img = cards[1].lastElementChild.querySelector('img').src;
    if (card1_Img === card2_Img) {
        cards[1].classList.add('flipcard');
        cardsMatched.push(cards.pop());
        cards[0].classList.add('flipcard');
        cardsMatched.push(cards.pop());
        if (cardsMatched.length === 20) {
            gameWon();
        }
    }
    else {
        setTimeout(function () {
            cards[0].classList.toggle('flipcard');
            cards[0].addEventListener('click', flipCard);
            cards[0].style.cursor = 'pointer';
            cards[1].classList.toggle('flipcard');
            cards[1].addEventListener('click', flipCard);
            cards[1].style.cursor = 'pointer';
            cards.pop();
            cards.pop();
        }, 300);
    }
}
//start a timer when game start
function gameStart() {
    var timeElement = document.querySelector('#time');
    game.timeInterval = setInterval(function () {
        game.time++;
        timeElement.innerHTML = "".concat(Math.floor(game.time / 3600).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }), ":\n        ").concat(Math.floor((game.time % 3600) / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }), ":\n        ").concat(((game.time % 3600) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }));
    }, 1000);
}
//when a game is won display message and restart the game
function gameWon() {
    var cardHolder = document.getElementById('card-holder');
    cardHolder.innerHTML = "<h2>Congratulations! You won the game. To play again click play button.</h2>";
    gameRestart();
}
//function to clear an array
function clearArray(array) {
    while (array.length) {
        array.shift();
    }
}
//game restart reset all counters in game
function gameRestart() {
    clearArray(game.cardsMatched);
    clearArray(game.cardsSelected);
    clearArray(game.shuffledBackImages);
    game.pendingMoves = 100;
    game.time = 0;
    clearInterval(game.timeInterval);
    setTimeout(function () {
        playButton.style.cursor = 'pointer';
        playButton.addEventListener('click', addCards);
    });
}
//game over display message and restart game
function gameOver() {
    var cardHolder = document.getElementById('card-holder');
    cardHolder.innerHTML = "<h2>Sorry you lost the game. To play again click play button.</h2>";
    gameRestart();
}
//quit the game and display message
function quitGame() {
    var cardHolder = document.getElementById('card-holder');
    cardHolder.innerHTML = "<h2>To restart the game click play button.</h2>";
    gameRestart();
}
