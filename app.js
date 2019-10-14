/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, player, gamePlaying, target, prevScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        if (!haveLostScore(dice)) {
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'resources/dice-' + dice + '.png';
        
            if (dice !== 1) {
                roundScore += dice;
                document.getElementById('current-' + player).textContent = roundScore;
                prevScore = dice;
            } else {
                nextPlayer();
            }
        } else {
            scores[player] = 0;
            nextPlayer();
        }
    }
    
    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        scores[player] += roundScore;
        roundScore =  0;
        if (!isWin(scores[player])) {
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-target').addEventListener('click', setTarget);

function init() {
    scores = [0,0];
    player = 0;
    roundScore = 0;
    gamePlaying = true;
    prevScore = 0;
    target = parseInt(document.getElementById('target').value, 10);
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}

function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + player).textContent = 0;
    document.getElementById('score-' + player).textContent = scores[player];
    player = player === 0 ? 1 : 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function isWin(score) {
    if (score >= target) {
        //winner the player
        document.getElementById('name-' + player).textContent = 'Winner!!!'
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';

        gamePlaying = false;
        return true;
    } 
    return false;    
}

function haveLostScore(dice) {
    if (prevScore === 6 && dice === 6) {
        return true;
    }
    return false;
}

function setTarget() {
    target = parseInt(document.getElementById('target').value, 10);
}