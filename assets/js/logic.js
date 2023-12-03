
let timer = document.querySelector("#timer")
let startButton = document.querySelector("#start")
let question = document.querySelector("#questions")
let choices = document.querySelector("#choices")
let feedback = document.querySelector("#feedback")
let initial = document.querySelector("#initials")
let submitButton = document.querySelector("#submit")

// function startQuiz() {
// }
// function question() {
// }
// function checkAnswer() {
// }
// function timer() {
// }
// function updateTimer() {
// }
// function endQuiz() {
// }

let currentQuestionIndex = 0;

document.getElementById('start-screen').addEventListener('click', function() {
    document.getElementById('start-screen').setAttribute('class','hide');
    document.getElementById('questions').removeAttribute('class');
    showQuestion();
});
  
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = currentQuestion.title;
    // currentQuestionIndex++;

    // Remove any existing buttons
    document.getElementById('choices').innerHTML = '';

    // Create new buttons for each question choice
    currentQuestion.choices.forEach(function(choice, index) {
        const button = document.createElement('button');
        button.textContent = choice;
        button.setAttribute('value',choice)
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
        }
        currentQuestionIndex++
        if (currentQuestionIndex === questions.length){
            gameOver()
    }
    else {
        showQuestion();
    }}

    function gameOver() {
        document.getElementById('questions').setAttribute('class','hide');
        document.getElementById('end-screen').removeAttribute('class');
    }

    choices.onclick=buttonClick 

    