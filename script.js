let currentQuestion = 0;
let score = 0;
let selectedAnswer = false;

let userName = "";
let gameQuestions = [];

let mode = "";
let modeTitle = "";

let time = 0;
let point = 1;

let timer;


// ELEMENTLAR

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");


const fullname = document.getElementById("fullname");

const startBtn = document.getElementById("startBtn");

const playerName = document.getElementById("playerName");

const modeName = document.getElementById("modeName");


const questionText =
document.getElementById("question");


const answerButtons =
document.querySelectorAll(".answerBtn");


const currentQuestionText =
document.getElementById("currentQuestion");


const totalQuestion =
document.getElementById("totalQuestion");


const progressFill =
document.getElementById("progressFill");


const timeText =
document.getElementById("time");


const nextBtn =
document.getElementById("nextBtn");


const prevBtn =
document.getElementById("prevBtn");


// REJIM TANLASH

document.querySelectorAll(".modeBtn")
.forEach(button=>{


    button.onclick=function(){


        document.querySelectorAll(".modeBtn")
        .forEach(btn=>{
            btn.classList.remove("selected");
        });


        this.classList.add("selected");


        mode=this.dataset.mode;


    };


});




// BOSHLASH

startBtn.onclick=function(){


    if(fullname.value.trim()==""){

        alert("Ism familiyangizni kiriting!");

        return;

    }


    if(mode==""){

        alert("Rejim tanlang!");

        return;

    }



    userName=fullname.value;


    if(mode=="easy"){

        gameQuestions=[...easyQuestions];

        time=600;

        point=1;

        modeTitle="🟢 Oddiy rejim";

    }


    if(mode=="hard"){

        gameQuestions=[...hardQuestions];

        time=420;

        point=2;

        modeTitle="🟡 Qiyin rejim";

    }


    if(mode=="expert"){

        gameQuestions=[...expertQuestions];

        time=300;

        point=3;

        modeTitle="🔴 Olimpiada rejimi";

    }



    // savollarni aralashtirish

    gameQuestions.sort(
        ()=>Math.random()-0.5
    );



    playerName.innerText=userName;

    modeName.innerText=modeTitle;



    startScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");


    totalQuestion.innerText=
    gameQuestions.length;



    startTimer();


    showQuestion();


};





// TIMER

function startTimer(){


    timer=setInterval(()=>{


        let min=Math.floor(time/60);

        let sec=time%60;


        if(sec<10){

            sec="0"+sec;

        }


        timeText.innerText=
        min+":"+sec;


        time--;


        if(time<0){

            clearInterval(timer);

            finishQuiz();

        }


    },1000);


}





// SAVOL CHIQARISH


function showQuestion(){


    selectedAnswer=false;


    let q=gameQuestions[currentQuestion];


    questionText.innerText=
    q.question;



    currentQuestionText.innerText=
    currentQuestion+1;



    progressFill.style.width=
    ((currentQuestion+1)/
    gameQuestions.length*100)
    +"%";



    let answers=[...q.answers];


    answers.sort(
        ()=>Math.random()-0.5
    );



    answerButtons.forEach((btn,index)=>{


        btn.innerText=answers[index];


        btn.className="answerBtn";



        btn.onclick=function(){


            checkAnswer(
                btn,
                answers[index],
                q.correct
            );


        };


    });


}





// JAVOB TEKSHIRISH

function checkAnswer(btn,answer,correct){


    if(selectedAnswer)
    return;


    selectedAnswer=true;



    if(answer==correct){


        btn.classList.add("correct");


        score+=point;


    }

    else{


        btn.classList.add("wrong");



        answerButtons.forEach(button=>{


            if(button.innerText==correct){

                button.classList.add("correct");

            }


        });


    }


}






// KEYINGI

nextBtn.onclick=function(){



    if(!selectedAnswer){

        alert("Javob tanlang!");

        return;

    }



    currentQuestion++;



    if(currentQuestion<
    gameQuestions.length){


        showQuestion();


    }

    else{


        finishQuiz();


    }



};





// OLDINGI

prevBtn.onclick=function(){


    if(currentQuestion>0){


        currentQuestion--;


        showQuestion();


    }


};






// YAKUN

function finishQuiz(){


    clearInterval(timer);



    quizScreen.classList.add("hidden");


    resultScreen.classList.remove("hidden");



    document.getElementById("resultName")
    .innerText=userName;



    document.getElementById("resultMode")
    .innerText=modeTitle;



    document.getElementById("score")
    .innerText=
    score+" ball";



    let maxScore=
    gameQuestions.length*point;



    let percent=
    Math.round(
        score/maxScore*100
    );



    document.getElementById("percent")
    .innerText=
    percent+"%";



    let grade;



    if(percent>=90){

        grade="5 (A'lo)";

    }

    else if(percent>=70){

        grade="4 (Yaxshi)";

    }

    else if(percent>=50){

        grade="3 (Qoniqarli)";

    }

    else{

        grade="2 (Qoniqarsiz)";

    }



    document.getElementById("grade")
    .innerText=grade;



}






// QAYTA BOSHLASH


document.getElementById("restartBtn")
.onclick=function(){

    location.reload();

};