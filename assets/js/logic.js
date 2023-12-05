let timer = document.getElementById("time");
let startButton = document.getElementById("start");
let question = document.getElementById("questions");
let choices = document.getElementById("choices");
let initials = document.getElementById("initials");
let submitButton = document.getElementById("submit");
let feedback = document.getElementById("feedback");
let highScores = document.getElementById("highscores");


let time = 30;
let timeCount;

let currentScore = 0;  // Change variable name to avoid conflict

function setupTimer() {
    timeCount = setInterval(function () {
        time--; 
        var timeReset = timer.textContent = time;
        if (time <= 0) {
            clearInterval(timeCount);
            timer.textContent = timeReset;
            endQuiz();
        }
    }, 1000);
}

let currentQuestionIndex = 0;

startButton.addEventListener('click', function () {
    document.getElementById('start-screen').classList.add('hide');
    question.classList.remove('hide');
    
    showQuestion();
    setupTimer();
});

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = currentQuestion.title;
    choices.innerHTML = '';

    currentQuestion.choices.forEach(function (choice, index) {
        const button = document.createElement('button');
        button.textContent = choice;
        button.value = choice;
        choices.appendChild(button);
    });
}

function buttonClick(event) {
    var targetEl = event.target;
    console.log(targetEl.value)

    const currentQuestion = questions[currentQuestionIndex];

    if (targetEl.value === questions[currentQuestionIndex].correctIndex) {
        console.log('Correct!');
        currentScore += 10;
    } else {
        console.log('Incorrect.');
        time -= 10;
        time = (time < 0) ? 0 : time;
        timer.textContent = time;
    }
    currentQuestionIndex++
    if (currentQuestionIndex === questions.length) {
        gameOver()
    } else {
        showQuestion();
    }
}

choices.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        buttonClick(event);
    }
});

function endQuiz() {
    gameOver();
}

function gameOver() {
    clearInterval(timeCount);
    timer.textContent = "0";

    // Display final score
    document.getElementById("final-score").textContent = currentScore;

    question.classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
}


submitButton.addEventListener('click', function () {
    const userInitials = initials.value.trim();
    
    if (initials !== '') {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = {
            initials: initials,
            score: currentScore
        };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score); // Optional: sort scores in descending order

        localStorage.setItem('highScores', JSON.stringify(highScores));
        
        // Optional: Redirect to high scores page or display a confirmation message
        feedback.classList.remove('hide');
        feedback.textContent = 'Score submitted successfully!';

        // Clear input field
        initials.value = '';
    } else {
        feedback.classList.remove('hide');
        feedback.textContent = 'Please enter your initials to submit your score.';
        displayHighScores();
    }
});

function displayHighScores() {
    const highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresElement = document.getElementById('highscores');
    highScoresElement.innerHTML = '';

    highScoresList.forEach(score => {
        const scoreElement = document.createElement('li');
        scoreElement.textContent = `${score.initials}: ${score.score}`;
        highScoresElement.appendChild(scoreElement);
    });
}



document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('highscores')) {
        displayHighScores();
    }
});
