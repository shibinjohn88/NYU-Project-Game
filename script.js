//event listener for play button

const card = {
    backImages: ["3_of_spades.png"]
}
let playButton = document.querySelector("#play")
console.log(playButton)
playButton.addEventListener('click', addCards)

function addCards() {
    let cardHolder = document.getElementById('card-holder')
    for (let i=0; i < 20; i++) {
        let card = document.createElement('div')
        let backFace = getBackImage()
        card.className = 'card'
        card.innerHTML = `
        <div class="front-face"><img src="./images/card-face.png"></div>
        <div class="back-face"><img src=./images/${backFace}></div>`
        cardHolder.appendChild(card)
    }
}
        
function getBackImage() {
   let imageArray = card.backImages
   return imageArray[0]
}

