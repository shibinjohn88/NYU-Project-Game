

const game = {
    backImages: ["jack_of_hearts2.png", "jack_of_spades2.png", "king_of_clubs2.png", "king_of_diamonds2.png", "king_of_hearts2.png", "king_of_spades2.png", "queen_of_clubs2.png",
     "queen_of_diamonds2.png", "queen_of_hearts2.png", "queen_of_spades2.png", "jack_of_hearts2.png", "jack_of_spades2.png", "king_of_clubs2.png", "king_of_diamonds2.png", "king_of_hearts2.png", "king_of_spades2.png", "queen_of_clubs2.png",
     "queen_of_diamonds2.png", "queen_of_hearts2.png", "queen_of_spades2.png"],
    cardsSelected: [],
    cardsMatched: [],
    pendingMoves: 100, 
    shuffledBackImages: [],
    time: 0

}


//event listener for play button
const playButton = document.querySelector("#play")
playButton.addEventListener('click', addCards)

function addCards() {
    const cardHolder = document.getElementById('card-holder')
    cardHolder.innerHTML = ''
    cardHolder.classList.remove('card-holder')
    game.shuffledBackImages = shuffle(game.backImages)
    pendingMoves = document.querySelector('#moves')
    pendingMoves.innerHTML = `${game.pendingMoves}`
    for (let i=0; i < 20; i++) {
        let card = document.createElement('div')
        card.addEventListener('click', flipCard)
        let backFace = getBackImage(i)
        card.className = 'card'
        card.innerHTML = `
        <div class="front-face"><img src="./images/card-face.png"></div>
        <div class="back-face"><img src=./images/${backFace}></div>`
        cardHolder.appendChild(card)
    }
    //remove event listener from play button once cards are added to the card holder
    playButton.style.cursor = 'default'
    playButton.removeEventListener('click', addCards)
    gameStart()
}

//shuffle an array randomly adopted from stackoverflow
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }
  

function getBackImage(i) {
   let imageArray = game.shuffledBackImages
   return imageArray[i]
}


function flipCard() {
    let cardsSelected = game.cardsSelected
    let cd = this
    if (cardsSelected.length < 2)
        {
            cd.classList.toggle('flipcard')    
            cd.removeEventListener('click', flipCard)
            cd.style.cursor = 'default'
            cardsSelected.push(cd)
            game.pendingMoves -= 1
            pendingMoves = document.querySelector('#moves')
            pendingMoves.innerHTML = `${game.pendingMoves}`
            if (game.pendingMoves === 0) {
                gameOver()
            }
        
            if (cardsSelected.length === 2) {
               setTimeout(()=> {
                 matchCard()
                }, "300") 
             } 
        }
    }
     
             
  


function matchCard() {
    let cards = game.cardsSelected
    let cardsMatched = game.cardsMatched
    let card1_Img = cards[0].lastElementChild.querySelector('img').src
    let card2_Img = cards[1].lastElementChild.querySelector('img').src
    if (card1_Img === card2_Img) {
        cards[1].classList.add('flipcard')
        cardsMatched.push(cards.pop())
        cards[0].classList.add('flipcard')
        cardsMatched.push(cards.pop())
        if (cardsMatched.length === 20) {
            gameWon()
        }
    }
    else {
        setTimeout(() => {
            cards[0].classList.toggle('flipcard')
        cards[0].addEventListener('click', flipCard)
        cards[0].style.cursor = 'pointer'
        cards[1].classList.toggle('flipcard')
        cards[1].addEventListener('click', flipCard)
        cards[1].style.cursor = 'pointer'
        cards.pop()
        cards.pop()
          }, "300")
        
    }
}

function gameStart() {
    
    const timeElement = document.querySelector('#time')
    setInterval(function () {
        game.time ++
        timeElement.innerHTML = `${Math.floor(game.time/3600)}:${Math.floor((game.time%3600)/60)}:${(game.time%3600)%60}`
    }, 1000)
}


function gameWon() {
    const cardHolder = document.getElementById('card-holder')
    cardHolder.innerHTML = `<h3>Congratulations You won the game. To play again click play button.</h3>`
    // gameRestart()
}

function clearArray(array) {
    while(array.length) {
      array.shift(); 
    }
  }

// function gameRestart() {
//     clearArray(game.cardsMatched)
//     clearArray(game.cardsSelected)
//     clearArray(game.shuffledBackImages)
//     game.pendingMoves = 100
//     game.time = 0
//     setTimeout(() => {
//         playButton.style.cursor = 'pointer'
//         playButton.addEventListener('click', addCards)
//     })
// }

function gameOver() {
    const cardHolder = document.getElementById('card-holder')
    cardHolder.innerHTML = `<h3>Sorry you lost the game. To play again click play button.</h3>`
    // gameRestart()
}
