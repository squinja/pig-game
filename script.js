'use strict';

let score0 = 0;
let score1 = 0;

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0Bg = document.querySelector('.player--0')
const player1Bg = document.querySelector('.player--1')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const halved0El = document.getElementById('halved--0');
const halved1El = document.getElementById('halved--1');

//Start condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function() {

    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    winnerCheck();

    //Switch score back to 0
    currentScore = 0

    activePlayer = activePlayer == 0 ? 1 : 0;

    player0Bg.classList.toggle('player--active');
    player1Bg.classList.toggle('player--active');
}

const winnerCheck = function() {
    if (scores[activePlayer]>= 100)  {

        playing = false;
        diceEl.classList.add('hidden');

        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
}


//Roll dice functionality
btnRoll.addEventListener('click', function() {

    if (playing) {

        //Generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        //Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //Check if '1' was rolled
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            

        } else {
            //Switch to next player
            currentScore += dice;
            currentScore /= 2;
            currentScore = Math.round(currentScore);

            //Display "HALVED!" warning
            document.getElementById(`halved--${activePlayer}`).classList.replace('hidden', 'halved-anim');
            playing = false;

            setTimeout(() => {
                document.getElementById(`halved--${activePlayer}`).classList.replace('halved-anim', 'hidden');
                playing = true;
                switchPlayer();
            }, 2000)

              

        }

    };

})

btnHold.addEventListener('click', function() {
    //Add current score to active player's score
    console.log('scores = ', scores[activePlayer]);

    //Check if player's score is >=100
    //If so active player wins

    if (scores[activePlayer] >= 100)  {

        playing = false;
        diceEl.classList.add('hidden');


        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');


    } else {
        //If not, switch active player
        switchPlayer();
    }

})

btnNew.addEventListener('click', function() {
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    player0Bg.classList.remove('player--winner', 'player--active');
    player1Bg.classList.remove('player--winner', 'player--active');

    player0Bg.classList.add('player--active');

    score0El.textContent = 0;
    score1El.textContent = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');

})
