# Memory Card Game

Memory game using playing cards that can be flipped and make identical pairs. This game is developed for the elderly to improve memory and mental health.

# How to play the game

-> Cards will be randomly arranged on the game board.
-> There will be 10 pairs of identical cards.
-> Each card can be flipped by clicking on it. When identical cards are selected consecutively the cards will be kept open otherwise cards will flip back to their original state.
-> Open all cards on the board to win the game.
-> only 100 moves are allowed and each pick will be counted as one move.
-> Timer will show you the time you took to finish the game.


# Future Project

-> add sound to the game.
-> save the status of the game based on player.
-> show highest score and player.
-> add more levels to the game with more cards and less moves. 


# Game Development Model

-> when play button is clicked cards should be added to the game board
-> cards flip when clicked
-> only two cards can be flipped at a time
-> add the two cards to an array
-> compare the cards in the array for a match
-> if the cards match keep the cards flipped and disable the click
-> if cards didn't match flip back the cards to original position
-> need a counter to track number of flips and if exceeds allowed flips game over player lost the game.
-> need a counter for time
-> check all cards are flipped to win the game 
