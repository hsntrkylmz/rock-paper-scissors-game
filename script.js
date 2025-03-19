// Get DOM elements
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultDiv = document.getElementById('result');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const resetBtn = document.getElementById('reset');
const historyList = document.getElementById('history-list');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');

// Initialize scores and history
let playerScore = 0;
let computerScore = 0;
let gameHistory = [];

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

// Convert choices to font awesome classes
function getChoiceIcon(choice) {
    const choiceIcons = {
        rock: '<i class="fas fa-hand-rock"></i>',
        paper: '<i class="fas fa-hand-paper"></i>',
        scissors: '<i class="fas fa-hand-scissors"></i>'
    };
    
    return choiceIcons[choice];
}

// Function to animate the choices
function animateChoices(playerChoice, computerChoice) {
    // Reset displays
    playerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    computerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    
    // Add spin animation to both displays
    playerChoiceDisplay.classList.add('spin');
    computerChoiceDisplay.classList.add('spin');
    
    // After the spin animation, show the choices
    setTimeout(() => {
        playerChoiceDisplay.classList.remove('spin');
        computerChoiceDisplay.classList.remove('spin');
        
        playerChoiceDisplay.innerHTML = getChoiceIcon(playerChoice);
        computerChoiceDisplay.innerHTML = getChoiceIcon(computerChoice);
        
        // Add appropriate animations based on the result
        const winner = getWinner(playerChoice, computerChoice);
        
        if (winner === 'player') {
            playerChoiceDisplay.classList.add('pulse');
            computerChoiceDisplay.classList.add('shake');
        } else if (winner === 'computer') {
            computerChoiceDisplay.classList.add('pulse');
            playerChoiceDisplay.classList.add('shake');
        } else {
            playerChoiceDisplay.classList.add('pulse');
            computerChoiceDisplay.classList.add('pulse');
        }
        
        // Remove animations after they complete
        setTimeout(() => {
            playerChoiceDisplay.classList.remove('pulse', 'shake');
            computerChoiceDisplay.classList.remove('pulse', 'shake');
        }, 600);
    }, 500);
}

// Function to play a round
function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    
    // Animate the choices
    animateChoices(playerChoice, computerChoice);
    
    // Convert choices to emoji for display
    const choiceEmojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    
    // Update UI after animation completes
    setTimeout(() => {
        let resultMessage = '';
        
        // Update result message and scores based on the winner
        if (winner === 'player') {
            playerScore++;
            playerScoreSpan.textContent = playerScore;
            resultMessage = `<p class="win">You win! ${choiceEmojis[playerChoice]} beats ${choiceEmojis[computerChoice]}</p>`;
            resultDiv.className = 'result win';
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreSpan.textContent = computerScore;
            resultMessage = `<p class="lose">You lose! ${choiceEmojis[computerChoice]} beats ${choiceEmojis[playerChoice]}</p>`;
            resultDiv.className = 'result lose';
        } else {
            resultMessage = `<p class="draw">It's a draw! Both chose ${choiceEmojis[playerChoice]}</p>`;
            resultDiv.className = 'result draw';
        }
        
        resultDiv.innerHTML = resultMessage;
        
        // Add to history
        const historyItem = {
            playerChoice: playerChoice,
            computerChoice: computerChoice,
            winner: winner,
            timestamp: new Date().toLocaleTimeString()
        };
        
        gameHistory.unshift(historyItem); // Add to beginning of array
        updateHistoryDisplay();
    }, 1000);
}

// Function to update history display
function updateHistoryDisplay() {
    historyList.innerHTML = gameHistory.map(item => {
        const playerIcon = getChoiceIcon(item.playerChoice);
        const computerIcon = getChoiceIcon(item.computerChoice);
        
        let resultText = '';
        if (item.winner === 'player') {
            resultText = '<span class="win">You won!</span>';
        } else if (item.winner === 'computer') {
            resultText = '<span class="lose">Computer won!</span>';
        } else {
            resultText = '<span class="draw">Draw!</span>';
        }
        
        return `
            <div class="history-item ${item.winner}">
                <div class="history-result">${resultText}</div>
                <div class="history-choices">${playerIcon} vs ${computerIcon}</div>
                <div class="timestamp">${item.timestamp}</div>
            </div>
        `;
    }).join('');
}

// Function to reset the game
function resetGame() {
    // Add shake animation to the reset button
    resetBtn.classList.add('shake');
    setTimeout(() => {
        resetBtn.classList.remove('shake');
    }, 500);
    
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = '0';
    computerScoreSpan.textContent = '0';
    resultDiv.innerHTML = '<p>Make your choice to start the game!</p>';
    resultDiv.className = 'result';
    
    // Reset choice displays
    playerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    computerChoiceDisplay.innerHTML = '<i class="fas fa-question"></i>';
    
    gameHistory = [];
    updateHistoryDisplay();
}