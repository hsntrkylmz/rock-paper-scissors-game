// Get DOM elements
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultDiv = document.getElementById('result');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const resetBtn = document.getElementById('reset');

// Initialize scores
let playerScore = 0;
let computerScore = 0;

// Add event listeners to buttons
rockBtn.addEventListener('click', () => playGame('rock'));
paperBtn.addEventListener('click', () => playGame('paper'));
scissorsBtn.addEventListener('click', () => playGame('scissors'));
resetBtn.addEventListener('click', resetGame);

// Function to get computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to determine the winner
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    
    return 'computer';
}

// Function to play a round
function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    
    // Convert choices to emoji for display
    const choiceEmojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    
    let resultMessage = '';
    
    // Update result message and scores based on the winner
    if (winner === 'player') {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
        resultMessage = `<p class="win">You win! ${choiceEmojis[playerChoice]} beats ${choiceEmojis[computerChoice]}</p>`;
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        resultMessage = `<p class="lose">You lose! ${choiceEmojis[computerChoice]} beats ${choiceEmojis[playerChoice]}</p>`;
    } else {
        resultMessage = `<p class="draw">It's a draw! Both chose ${choiceEmojis[playerChoice]}</p>`;
    }
    
    resultDiv.innerHTML = resultMessage;
}

// Function to reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = '0';
    computerScoreSpan.textContent = '0';
    resultDiv.innerHTML = '<p>Make your choice to start the game!</p>';
}