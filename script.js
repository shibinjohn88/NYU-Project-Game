

const card = {
    backImages: ["jack_of_hearts2.png", "jack_of_spades2.png", "king_of_clubs2.png", "king_of_diamonds2.png", "king_of_hearts2.png", "king_of_spades2.png", "queen_of_clubs2.png",
     "queen_of_diamonds2.png", "queen_of_hearts2.png", "queen_of_spades2.png", "jack_of_hearts2.png", "jack_of_spades2.png", "king_of_clubs2.png", "king_of_diamonds2.png", "king_of_hearts2.png", "king_of_spades2.png", "queen_of_clubs2.png",
     "queen_of_diamonds2.png", "queen_of_hearts2.png", "queen_of_spades2.png"],
    cardsSelected: [],
    cardsMatched: [],
    moves: 0, 
    shuffledBackImages: []

}



//event listener for play button
let playButton = document.querySelector("#play")
playButton.addEventListener('click', addCards)

function addCards() {
    let cardHolder = document.getElementById('card-holder')
    cardHolder.innerHTML = ''
    cardHolder.classList.remove('card-holder')
    card.shuffledBackImages = shuffle(card.backImages)
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
   let imageArray = card.shuffledBackImages
   return imageArray[i]
}

//shuffle array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard() {
    let cardsSelected = card.cardsSelected
    let cd = this
    if (cardsSelected.length < 2)
        {
        cd.classList.toggle('flipcard')    
        cd.removeEventListener('click', flipCard)
        cd.style.cursor = 'default'
        cardsSelected.push(cd)
        card.moves += 1
        console.log(card.moves)
        
        if (cardsSelected.length === 2) {
            matchCard()
           
        }

        } 
    
}

function matchCard() {
    let cards = card.cardsSelected
    let cardsMatched = card.cardsMatched
    let card1_Img = cards[0].lastElementChild.querySelector('img').src
    let card2_Img = cards[1].lastElementChild.querySelector('img').src
    if (card1_Img === card2_Img) {
        cards[1].classList.add('flipcard')
        cardsMatched.push(cards.pop())
        cards[0].classList.add('flipcard')
        cardsMatched.push(cards.pop())
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






