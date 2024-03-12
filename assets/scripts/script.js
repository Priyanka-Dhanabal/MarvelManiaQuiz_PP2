const QUESTIONS_CONFIG = [
    {
       question: "Who is known as the 'God of Thunder' in the Marvel Universe?",
       answers:[
           {text: "Iron Man"},
           {text: "Captain America"},
           {text: "Thor", correct:true},
           {text: "Hulk"},
       ]
   },{
       question: "What is the name of Tony Stark's AI in the Iron Man suit?",
       answers:[
           {text: "F.R.I.D.A.Y."},
           {text: "J.A.R.V.I.S.", correct:true},
           {text: "H.E.R.B.I.E."},
           {text: "S.H.I.E.L.D."},
       ]
   },{
       question: "Which of these characters is not a member of the Avengers?",
       answers:[
           {text: "Wolverine", correct:true},
           {text: "Black Panther"},
           {text: "Scarlet Witch"},
           {text: "Hawkeye"},
       ]
   },{
       question: "Which Infinity Stone was embedded in Vision's forehead?",
       answers:[
           {text: "Power Stone"},
           {text: "Time Stone"},
           {text: "Reality Stone"},
           {text: "Mind Stone", correct:true},
       ]
   },{
       question: "What is the name of the fictional metal that Captain America's shield is made of?",
       answers:[
           {text: "Adamantium"},
           {text: "Vibranium", correct:true},
           {text: "Titanium"},
           {text: "Plasteel"},
       ]
   },{
       question: "What is the name of the dimension where Doctor Strange draws his mystical powers from?",
       answers:[
           {text: "Dark Dimension", correct:true},
           {text: "Astral Plane"},
           {text: "Quantum Realm"},
           {text: "Mirror Dimension"},
       ]
   },{
       question: "What is the real name of the superhero Black Widow?",
       answers:[
           {text: "Carol Danvers"},
           {text: "Wanda Maximoff"},
           {text: "Jessica Jones"},
           {text: "Natasha Romanoff", correct:true},
       ]
   },{
       question: "What is the name of the fictional planet that Thor comes from?",
       answers:[
           {text: "Titan"},
           {text: "Xandar"},
           {text: "Sakaar"},
           {text: "Asgard", correct:true},
       ]
   },{
       question: "What is the name of the powerful artifact sought after by Thanos in the Marvel Cinematic Universe?",
       answers:[
           {text: "Infinity Gauntlet", correct:true},
           {text: "Aether"},
           {text: "Orb"},
           {text: "Tesseract"},
       ]
   },{
       question: "What is the name of Scott Lang's daughter?",
       answers:[
           {text: "Hope"},
           {text: "Janet"},
           {text: "Cassie", correct:true},
           {text: "Peggy"},
       ]
   }
]

let questionElement = document.getElementById("questions");
let answerBtnsContainer = document.getElementById("answer-btns");
let nextBtn = document.getElementById("next-btn");
let welcomePageDiv = document.getElementById("welcome-page");
let quizDiv = document.getElementById("container");
let questionTracking = document.getElementById("question-tracking");
let startBtn = document.getElementById("start-btn");
let reviewDiv = document.getElementById("review");
let stars = document.querySelectorAll(".rating .star");
let homeBtn = document.getElementById("home-btn");
let ratingValue = document.querySelector(".rating input");


let currentQuestionIndex = 0;
let score = 0;

// Event Listener for the Start Button in Welcome Page

startBtn.addEventListener('click', function(){
    welcomePageDiv.classList.add("hide");
    quizDiv.classList.remove("hide");
    startQuiz();
})

// Function to start the quiz

function startQuiz(){
    initEventListeners();
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion(); // function to display questions from the questions array
}

function initEventListeners() {
    nextBtn.addEventListener('click', handleNextBtn);
    Array.from(answerBtnsContainer.children).forEach((eachAnswerBtn) => {
        eachAnswerBtn.addEventListener('click', selectAnswer);
    });
}

/**
 * Question and answer getting updated from QUESTIONS_CONFIG array.
 */
function showQuestion(){
    resetPrevious()
    let currentQuestion = QUESTIONS_CONFIG[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestion.question;
    questionTracking.innerHTML = `${questionNumber} of ${QUESTIONS_CONFIG.length} questions`;

    answerBtnsContainer.classList.remove("hide");

    Array.from(answerBtnsContainer.children).forEach((eachAnswerBtn, idx) => {
        const answer = currentQuestion.answers[idx];
        eachAnswerBtn.innerHTML = answer.text;
        resetAnswerBtnStyle(eachAnswerBtn);

        if (answer.correct) {
            eachAnswerBtn.dataset.correct = true;
        }
    });


    
}

/**Class are removed, which was set in showQuestions function.
 */

function resetAnswerBtnStyle(answerBtn) {
    answerBtn.classList.remove("correct");
    answerBtn.classList.remove("incorrect");
    answerBtn.disabled = false;
    answerBtn.dataset.correct = false;
}

/** Increments the currentQuestionIndex and checks the QUESTIONS_CONFIG length.
 */
function handleNextBtn(){
    currentQuestionIndex ++;
    
    if(currentQuestionIndex < QUESTIONS_CONFIG.length){
        showQuestion();
    }else{
        showScore();
        
    }
}

/** Once the currentQuestionIndex is >= QUESTIONS_CONFIG length, score obtained is displayed.
 */
function showScore(){
    resetPrevious();
    questionTracking.style.display = "none";
    reviewDiv.classList.remove("hide");
    answerBtnsContainer.classList.add("hide");

    questionElement.innerHTML = `You scored ${score} out of ${QUESTIONS_CONFIG.length} !`;
    questionElement.style.textAlign = "center";

    homeBtn.style.display = "block";
    homeBtn.addEventListener('click',goHome);
    
}

/** Home button is clicked, paged reverts to initial state, i.e welcome Page is shown.
 */
function goHome(){
    resetPrevious();
    welcomePageDiv.classList.remove("hide");
    quizDiv.classList.add("hide");
    questionTracking.remove("hide");
    reviewDiv.classList.add("hide");
    homeBtn.style.display = "none";
}

/** Hides the next Button before displaying next question.
 */
function resetPrevious(){
    nextBtn.style.display = "none";
}


/** Checks if the answer selected has dataset correct and 
 * increments the score, else correct answer is displayed.
 */
function selectAnswer(event){
   let selectedBtn = event.target;
   const isCorrect = selectedBtn.dataset.correct === "true";
   if(isCorrect){
    selectedBtn.classList.add("correct");
    score ++;

   }else{
    selectedBtn.classList.add("incorrect");
   }
   
   let childrenFromAnswerBtn = Array.from(answerBtnsContainer.children);
   for(let childBtn of childrenFromAnswerBtn){
    if(childBtn.dataset.correct === "true"){
        childBtn.classList.add("correct");
    }
    childBtn.disabled = true;

   }
   nextBtn.style.display = "block";

}


// Rating

let reviewSubmitBtn = document.querySelector(".submit-btn");
reviewSubmitBtn.addEventListener('click',function(){
    
    if(ratingValue.value === "" || ratingValue.value === null){
        window.alert("Please provide us a rating.");
        }
    ratingValue.value = 5;      
})


stars.forEach((star, index1) => {
    star.addEventListener('click', function(){
        ratingValue.value = index1 + 1;  
        stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("colored") : star.classList.remove("colored")
        })
    })
})

