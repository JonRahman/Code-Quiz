let timer = document.querySelector("#time")
let startButton = document.querySelector("#start")
let question = document.querySelector("#questions")
let choices = document.querySelector("#choices")
let feedback = document.querySelector("#feedback")
let initial = document.querySelector("#initials")
let submitButton = document.querySelector("#submit")

let time = 50;
let timeCount;

function setupTimer() {
    timeCount = setInterval(function () {
        time--; // Decrement the remaining time
        var timeReset = timer.textContent = time; // Update the timer element's text content
        if (time <= 0) {
            clearInterval(timeCount);
            timer.textContent = timeReset;
            // Add logic for ending the quiz when time is up
            endQuiz();
        }
    }, 1000); // 1000 milliseconds = 1 second
}


// ... other functions ...



// function checkAnswer() {
// }

// function updateTimer() {
// }


let currentQuestionIndex = 0;

document.getElementById('start-screen').addEventListener('click', function () {
    document.getElementById('start-screen').setAttribute('class', 'hide');
    document.getElementById('questions').removeAttribute('class');
    showQuestion();
    setupTimer();
});

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = currentQuestion.title;
    // currentQuestionIndex++;

    // Remove any existing buttons
    document.getElementById('choices').innerHTML = '';

    // Create new buttons for each question choice
    currentQuestion.choices.forEach(function (choice, index) {
        const button = document.createElement('button');
        button.textContent = choice;
        button.setAttribute('value', choice)
        choices.appendChild(button);
        // choices.addEventListener('click', function(event) {
        //     console.log(event.target.value)

        //   });

    });
}

function buttonClick(event) {
    var targetEl = event.target;
    console.log(targetEl.value)
    if (targetEl.value === questions[currentQuestionIndex].correctIndex) {
        console.log('Correct!');
    } else {
        console.log('Incorrect.');
        time -= 25; // Decrease the time by 25 seconds
        if (time < 0) {
            time = 0; // Make sure the time doesn't go below 0
        }
        timer.textContent = time; // Update the timer element's text content
    }
    currentQuestionIndex++
    if (currentQuestionIndex === questions.length) {
        gameOver()
    }
    else {
        showQuestion();
    }
}



choices.onclick = buttonClick

function endQuiz() {
    clearInterval(timeCount); // Stop the timer
    timer.textContent = "0"; // Ensure the timer display shows 0 when time is up

    // Add your logic for ending the quiz, such as displaying a message or showing the final score.
    // For example:
    if (currentQuestionIndex < questions.length) {
        // If there are still questions remaining, the player ran out of time.
        feedback.textContent = "Time's up!";
    } else {
        // All questions have been answered, display the final score or any summary message.
        feedback.textContent = "Quiz completed!";
    }
    gameOver()
    
}

function gameOver() {
    document.getElementById('questions').setAttribute('class', 'hide');
    document.getElementById('end-screen').removeAttribute('class');
}


// when the game ends the timer should stop