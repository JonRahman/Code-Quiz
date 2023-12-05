let timer = document.getElementById("time");
let startButton = document.getElementById("start");
let question = document.getElementById("questions");
let choices = document.getElementById("choices");
let initials = document.getElementById("initials");
let submitButton = document.getElementById("submit");
let feedback = document.getElementById("feedback");

let time = 30;
let timeCount;

let score = 0;

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
        score += 10;
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
    clearInterval(timeCount);
    timer.textContent = "0";

    if (currentQuestionIndex < questions.length) {
        feedback.textContent = "Time's up!";
    } else {
        feedback.textContent = "Quiz completed!";
    }
    gameOver();
}

function gameOver() {
    clearInterval(timeCount);
    timer.textContent = "0";

    if (currentQuestionIndex < questions.length) {
        feedback.textContent = "Time's up!";
    } else {
        feedback.textContent = "Quiz completed! Your score: " + score;
        document.getElementById("final-score").textContent = score;
    }

    question.classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
}
