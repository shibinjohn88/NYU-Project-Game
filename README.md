# NYU-Project-Game

Memory game using cards that can be flipped and make identical pairs. A fun card game to boost your memory.

How to play the game
-> cards will be randomly arranged in the table.
-> there will be 10 pairs of identical cards
-> each card can be flipped by clicking on it. when identical cards are selected consecutively the cards will be kept open
-> open all cards to win the game.
-> only 100 moves are allowed and each pick will be counted as one move.


Game Design

-> when game starts there should be a game board and cards randomly arranged in the board
-> each card can be clicked to make it flip and show back side
-> if pairs are clicked consecutively score point and cards should be kept open
-> there should be a count down for moves 
-> if the player makes all pairs within the allowed moves player wins.

Extra Features

-> add more cards to make it more complex for each level 


UI 

-> Score board, game board, game controls

Game Development Model

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
