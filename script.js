var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// create our questions
var questions = [
    {
        question : "What animal does Dolores kill in the first episode?",
        imgSrc : "css/img/Dolores.png",
        choiceA : "A Fly",
        choiceB : "A Horse",
        choiceC : "A Snake",
        correct : "A"
    },{
        question : "What is Bernard's job?",
        imgSrc : "css/img/Bernard.png",
        choiceA : "Head of Security",
        choiceB : "Head of Programming",
        choiceC : "Head of Maintenance",
        correct : "B"
    },{
        question : "Who co-founded the park with Robert Ford?",
        imgSrc : "css/img/Arnold.png",
        choiceA : "Arnold Kaufman",
        choiceB : "Arnold Palmer",
        choiceC : "Arnold Webber",
        correct : "C"
    },{
        question : "What does Dolores do at the end of episode one to indicate that she’s overriden her core programming?",
        imgSrc : "css/img/Dolores.png",
        choiceA : "Shoots a Gun",
        choiceB : "Goes off her loop",
        choiceC : "Kills a Fly",
        correct : "C"
    },{
        question : "Bernard Lowe is intended to be an anagram for…",
        imgSrc : "css/img/Bernard.png",
        choiceA : "Arnold Webber",
        choiceB : "Adler Browne",
        choiceC : "Darrel Bowen",
        correct : "A"
    },{
        question : "What device does The Man in Black use to break Hector out of jail?",
        imgSrc : "css/img/Billy.png",
        choiceA : "An exploding Watch",
        choiceB : "An exploding Cigar",
        choiceC : "An exploding Belt Buckle",
        correct : "B"
    }
];

// create some variables

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var TIMER;
var score = 0;

// render a question
function renderQuestion(){
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(var qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// Answer Check

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer = correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    var img = (scorePerCent >= 80) ? "css/img/5.png" :
              (scorePerCent >= 60) ? "css/img/4.png" :
              (scorePerCent >= 40) ? "css/img/3.png" :
              (scorePerCent >= 20) ? "css/img/2.png" :
              "css/img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}