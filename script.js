

const card = {
    backImages: ["3_of_spades.png"],
    cardsSelected: [],
    cardsMatched: [],
    
}

//event listener for play button
let playButton = document.querySelector("#play")
playButton.addEventListener('click', addCards)

function addCards() {
    let cardHolder = document.getElementById('card-holder')
    cardHolder.innerHTML = ''
    cardHolder.classList.remove('card-holder')
    for (let i=0; i < 20; i++) {
        let card = document.createElement('div')
        card.addEventListener('click', flipCard)
        let backFace = getBackImage()
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
        
        
function getBackImage() {
   let imageArray = card.backImages
   return imageArray[0]
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
        
        if (cardsSelected.length === 2) {
            setTimeout(() => {
                matchCard()
              }, "0")
           
        }

        } 
    
}

function matchCard() {
    let cards = card.cardsSelected
    let cardsMatched = card.cardsMatched
    let card1_Img = cards[0].lastElementChild.querySelector('img').src
    let card2_Img = cards[1].lastElementChild.querySelector('img').src
    if (card1_Img === card2_Img) {
        console.log('match')
        cards[1].classList.add('flipcard')
        cardsMatched.push(cards.pop())
        cards[0].classList.add('flipcard')
        cardsMatched.push(cards.pop())
    }
    else {
        console.log('no match')
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
    console.log(cardsMatched.length)
}





