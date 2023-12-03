
var highScores = [];

function displayHighScores() {

}

function saveHighScore(initials, score) {

  var scoreData = {
    initials: initials,
    score: score
  };
  highScores.push(scoreData);

}

function clearHighScores() {

  highScores = [];

}


