const questions = [
    {
      question: "Which object has the same volume as a cylinder with a radius of 3 cm and height of 5 cm?",
      answers: [
        { text: "Sphere with radius 4.5 cm", correct: false, feedback: "Incorrect; misunderstands volume formulas" },
        { text: "Cube with side 6 cm", correct: true, feedback: "Correct; shows good understanding of volume equivalence" },
        { text: "Rectangular prism with dimensions 5x5x5 cm", correct: false, feedback: "Misunderstands dimensions and volume" },
        { text: "Cone with radius 3 cm and height 6 cm", correct: false, feedback: "Major misunderstanding of volume calculations" }
      ]
    },
    {
      question: "If you view an object from different angles and see different shapes, what type of perspective is this?",
      answers: [
        { text: "Linear perspective", correct: false, feedback: "Confusion about perspective types" },
        { text: "Aerial perspective", correct: false, feedback: "Misunderstands spatial representation" },
        { text: "Axonometric perspective", correct: true, feedback: "Correct; shows understanding of perspectives" },
        { text: "Isometric perspective", correct: false, feedback: "Major misunderstanding of perspective principles" }
      ]
    },
    {
      question: "If you move a box 3 steps forward and 2 steps to the left, what is the new position relative to the starting point?",
      answers: [
        { text: "(3, 2)", correct: false, feedback: "Misunderstands directional movement" },
        { text: "(2, 3)", correct: false, feedback: "Confusion about coordinates" },
        { text: "(3, -2)", correct: true, feedback: "Correct; shows understanding of coordinate movement" },
        { text: "(0, 0)", correct: false, feedback: "Major misunderstanding; indicates lack of spatial reasoning" }
      ]
    },
    {
      question: "What will be the shape of the shadow of a cylinder when light is cast directly overhead?",
      answers: [
        { text: "Circle", correct: true, feedback: "Correct; understands shadow properties" },
        { text: "Rectangle", correct: false, feedback: "Misunderstands projection shapes" },
        { text: "Ellipse", correct: false, feedback: "Shows confusion about shadow shape" },
        { text: "Triangle", correct: false, feedback: "Major misunderstanding of shadow casting" }
      ]
    },
    {
      question: "Which of the following shapes cannot be transformed into a cylinder by rotating?",
      answers: [
        { text: "Rectangle", correct: false, feedback: "Understands rotation properties" },
        { text: "Triangle", correct: true, feedback: "Correct; knows which shapes can be rotated into cylinders" },
        { text: "Square", correct: false, feedback: "Shows partial understanding" },
        { text: "Circle", correct: false, feedback: "Misunderstands shape transformations" }
      ]
    },
    {
      question: "Which shape has the largest area?",
      answers: [
        { text: "Circle with radius 1 cm", correct: true, feedback: "Correct; understands area calculations" },
        { text: "Square with side 1 cm", correct: false, feedback: "Underestimates; confuses area comparisons" },
        { text: "Triangle with base 1 cm and height 1 cm", correct: false, feedback: "Major underestimation; miscalculates area" },
        { text: "Rectangle with length 1 cm and width 1 cm", correct: false, feedback: "Major misunderstanding of area properties" }
      ]
    },
    {
      question: "What shape do you get when you cut a sphere in half?",
      answers: [
        { text: "Cube", correct: false, feedback: "Major misunderstanding of geometry" },
        { text: "Circle", correct: false, feedback: "Misunderstands 3D to 2D transitions" },
        { text: "Hemisphere", correct: true, feedback: "Correct; understands 3D shape properties" },
        { text: "Oval", correct: false, feedback: "Confuses spherical properties" }
      ]
    },
    {
      question: "In a 3D model, which axis represents height?",
      answers: [
        { text: "X-axis", correct: false, feedback: "Major misunderstanding of coordinate systems" },
        { text: "Y-axis", correct: false, feedback: "Confusion about axis representations" },
        { text: "Z-axis", correct: true, feedback: "Correct; understands 3D models" },
        { text: "W-axis", correct: false, feedback: "Indicates confusion; lacks understanding of dimensionality" }
      ]
    },
    {
      question: "What is the angle between two parallel lines?",
      answers: [
        { text: "45 degrees", correct: false, feedback: "Misunderstands parallel line properties" },
        { text: "90 degrees", correct: false, feedback: "Confuses angle measurements" },
        { text: "0 degrees", correct: true, feedback: "Correct; understands angle relationships" },
        { text: "180 degrees", correct: false, feedback: "Major misunderstanding of parallel lines" }
      ]
    },
    {
      question: "Which shape can be folded into a cube?",
      answers: [
        { text: "T-shape", correct: true, feedback: "Correct; understands folding patterns" },
        { text: "L-shape", correct: false, feedback: "Misunderstands folding possibilities" },
        { text: "I-shape", correct: false, feedback: "Confusion about 3D shapes" },
        { text: "Z-shape", correct: false, feedback: "Major misunderstanding; lacks knowledge of cube formation" }
      ]
    }
  ];
  
// DOM Elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const reportButton = document.getElementById("report-btn");
const resultElement = document.getElementById("result");
const questionCounter = document.getElementById("question-counter");
const progressBar = document.getElementById("progress-bar");

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = {};

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = {};
    reportButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;
    questionCounter.textContent = `${questionNo}/${questions.length}`;
    
    progressBar.style.width = `${(questionNo / questions.length) * 100}%`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(answer.correct, index));
        answerButtonsElement.appendChild(button);
    });

    prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
    
    // Handle last question differently
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Submit";
    } else {
        nextButton.textContent = "Next";
    }
    nextButton.style.display = "block";
    reportButton.style.display = "none";

    // Restore previous selection if exists
    if (selectedAnswers[currentQuestionIndex] !== undefined) {
        const selectedIndex = selectedAnswers[currentQuestionIndex].index;
        const buttons = answerButtonsElement.querySelectorAll(".answer-btn");
        const correctIndex = currentQuestion.answers.findIndex(answer => answer.correct);
        
        buttons.forEach((button, i) => {
            button.disabled = true;
            if (i === correctIndex) {
                button.classList.add("correct");
            }
            if (i === selectedIndex && selectedIndex !== correctIndex) {
                button.classList.add("incorrect");
            }
        });
    }
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(isCorrect, index) {
    const buttons = answerButtonsElement.querySelectorAll(".btn");
    const currentQuestion = questions[currentQuestionIndex];
    
    // Store selected answer
    selectedAnswers[currentQuestionIndex] = { 
        index, 
        isCorrect, 
        feedback: currentQuestion.answers[index].feedback 
    };
    
    // Disable all buttons and highlight answers
    buttons.forEach((button, i) => {
        button.disabled = true;
        if (currentQuestion.answers[i].correct) {
            button.classList.add("correct");
        } else if (i === index) {
            button.classList.add("incorrect");
        }
    });
    
    // Update score if correct
    if (isCorrect) score++;
}

function showResults() {
    resetState();
    questionElement.textContent = "Test Completed";
    questionCounter.style.display = "none";

    const percentage = Math.round((score / questions.length) * 100);
    const feedbackList = questions.map((q, i) => 
        `<li><strong>Q${i+1}:</strong> ${selectedAnswers[i].feedback}</li>`
    ).join('');

    resultElement.innerHTML = `
        <div class="score">
            <h3>Your Score: ${score}/${questions.length} (${percentage}%)</h3>
            <p>${getResultMessage(percentage)}</p>
        </div>
        <div class="feedback">
            <h3>Question Feedback:</h3>
            <ul>${feedbackList}</ul>
        </div>
    `;
    
    // Store results and redirect to report page
    localStorage.setItem('spatialCompleted', 'true');
    localStorage.setItem('spatialScore', score);
    localStorage.setItem('spatialFeedback', JSON.stringify(
        questions.map((q, i) => selectedAnswers[i].feedback)
    ));
    
    // Show report button that will redirect to report.html
    reportButton.style.display = "block";
    reportButton.textContent = "View Detailed Report";
}

function getResultMessage(percentage) {
    if (percentage >= 80) return "Excellent spatial reasoning skills!";
    if (percentage >= 60) return "Good spatial awareness.";
    if (percentage >= 40) return "Average spatial ability.";
    return "Consider practicing more spatial reasoning exercises.";
}

// Navigation handlers
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

nextButton.addEventListener("click", () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) {
        alert("Please select an answer before continuing.");
    } else if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
});

reportButton.addEventListener("click", () => {
    window.location.href = "report.html";
});

// Verify previous test was completed
if (!localStorage.getItem('verbalCompleted')) {
    window.location.href = "verbal.html";
} else {
    startQuiz();
}tQuiz();

