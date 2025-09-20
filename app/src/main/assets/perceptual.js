const questions = [
    {
      question: "Which shape completes this pattern: ▲, ■, ▲, ■, ____ ?",
      answers: [
        { text: "●", correct: false, feedback: "Incorrect - doesn't match the alternating pattern" },
        { text: "▲", correct: true, feedback: "Correct - maintains the alternating sequence" },
        { text: "◆", correct: false, feedback: "Not part of the original pattern" },
        { text: "▼", correct: false, feedback: "Breaks the established sequence" }
      ]
    },
    {
      question: "Which figure is the rotated version of the given shape?",
      answers: [
        { text: "Option A", correct: false, feedback: "Mirrored rather than rotated" },
        { text: "Option B", correct: true, feedback: "Correct 90° clockwise rotation" },
        { text: "Option C", correct: false, feedback: "Upside down (180° rotation)" },
        { text: "Option D", correct: false, feedback: "Original position" }
      ]
    },
    {
      question: "Identify the missing segment: ◼◻◼◻?◼",
      answers: [
        { text: "◼", correct: false, feedback: "Would create three squares in a row" },
        { text: "◻", correct: true, feedback: "Correct - maintains the alternating pattern" },
        { text: "◯", correct: false, feedback: "Not part of the sequence" },
        { text: "⬠", correct: false, feedback: "Invalid shape for this pattern" }
      ]
    },
    {
      question: "Which cube cannot be made from this net?",
      answers: [
        { text: "Cube A", correct: false, feedback: "This configuration is possible" },
        { text: "Cube B", correct: true, feedback: "Correct - this arrangement violates cube geometry" },
        { text: "Cube C", correct: false, feedback: "Can be folded from this net" },
        { text: "Cube D", correct: false, feedback: "Valid configuration" }
      ]
    },
    {
      question: "Which shape is the mirror image of the given figure?",
      answers: [
        { text: "Image 1", correct: false, feedback: "Rotated version, not mirrored" },
        { text: "Image 2", correct: true, feedback: "Correct mirror reflection" },
        { text: "Image 3", correct: false, feedback: "Inverted but not mirrored" },
        { text: "Image 4", correct: false, feedback: "Distorted version" }
      ]
    },
    {
      question: "Which pattern comes next: →, ↗, ↑, ↖, ____ ?",
      answers: [
        { text: "←", correct: true, feedback: "Correct - completes the clockwise rotation" },
        { text: "↘", correct: false, feedback: "Wrong direction in sequence" },
        { text: "↓", correct: false, feedback: "Skips a step in the pattern" },
        { text: "→", correct: false, feedback: "Returns to start prematurely" }
      ]
    },
    {
      question: "Which 3D shape corresponds to this 2D net?",
      answers: [
        { text: "Tetrahedron", correct: false, feedback: "Incorrect number of faces" },
        { text: "Cube", correct: true, feedback: "Correct - net folds into a perfect cube" },
        { text: "Pyramid", correct: false, feedback: "Base doesn't match" },
        { text: "Cylinder", correct: false, feedback: "Not a polyhedron" }
      ]
    },
    {
      question: "Which shape is hidden in this complex figure?",
      answers: [
        { text: "Circle", correct: false, feedback: "No complete circles in the figure" },
        { text: "Triangle", correct: true, feedback: "Correct - three lines form a triangle" },
        { text: "Square", correct: false, feedback: "No four equal sides visible" },
        { text: "Pentagon", correct: false, feedback: "Incorrect number of sides" }
      ]
    },
    {
      question: "Which figure completes the analogy: ▲ is to △ as ■ is to ____ ?",
      answers: [
        { text: "□", correct: true, feedback: "Correct - same shape, different size" },
        { text: "◯", correct: false, feedback: "Different shape entirely" },
        { text: "⬠", correct: false, feedback: "Incorrect geometric relationship" },
        { text: "⬛", correct: false, feedback: "Same size, different relationship" }
      ]
    },
    {
      question: "Which pattern is different from the others?",
      answers: [
        { text: "◼◻◼◻◼", correct: false, feedback: "Follows standard alternating pattern" },
        { text: "◻◻◼◻◻", correct: true, feedback: "Correct - breaks the expected sequence" },
        { text: "◼◼◻◼◼", correct: false, feedback: "Mirror of first pattern" },
        { text: "◻◼◻◼◻", correct: false, feedback: "Regular alternation" }
      ]
    },
    {
      question: "Which shape would balance the scale? (Given left side has 2 circles)",
      answers: [
        { text: "1 square", correct: false, feedback: "Incorrect weight equivalence" },
        { text: "2 triangles", correct: false, feedback: "Still unbalanced" },
        { text: "4 small circles", correct: true, feedback: "Correct - equivalent weight" },
        { text: "1 large circle", correct: false, feedback: "Wrong proportion" }
      ]
    },
    {
      question: "How many cubes are in this 3D stack? (Image description: 3x3 base with varying heights)",
      answers: [
        { text: "12", correct: false, feedback: "Underestimates the total" },
        { text: "14", correct: true, feedback: "Correct count of all cubes" },
        { text: "16", correct: false, feedback: "Overcounts hidden cubes" },
        { text: "18", correct: false, feedback: "Incorrect layer calculation" }
      ]
    },
    {
      question: "Which shape will be formed when this net is folded?",
      answers: [
        { text: "Triangular prism", correct: true, feedback: "Correct - net matches this 3D shape" },
        { text: "Square pyramid", correct: false, feedback: "Incorrect base shape" },
        { text: "Hexagonal prism", correct: false, feedback: "Wrong number of sides" },
        { text: "Octahedron", correct: false, feedback: "Too many faces" }
      ]
    },
    {
      question: "Which angle matches the given angle?",
      answers: [
        { text: "45°", correct: false, feedback: "Too acute" },
        { text: "90°", correct: true, feedback: "Correct right angle match" },
        { text: "120°", correct: false, feedback: "Too obtuse" },
        { text: "180°", correct: false, feedback: "Straight angle, doesn't match" }
      ]
    },
    {
      question: "Which pattern follows the same rule as: A, C, E, G, ____ ?",
      answers: [
        { text: "1, 3, 5, 7, 9", correct: true, feedback: "Correct - both skip one item in sequence" },
        { text: "B, D, F, H, J", correct: false, feedback: "Same as original pattern" },
        { text: "AA, BB, CC, DD", correct: false, feedback: "Different sequencing rule" },
        { text: "Z, X, V, T", correct: false, feedback: "Reverse direction" }
      ]
    }
  ];

// DOM Elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const verbalButton = document.getElementById("verbal-btn");
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
    verbalButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;
    questionCounter.textContent = `${questionNo}/${questions.length}`;
    
    // Update progress bar
    progressBar.style.width = `${(questionNo / questions.length) * 100}%`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
    
    // Show "Continue to Verbal" button on last question
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = "none";
        verbalButton.style.display = "block";
    } else {
        nextButton.style.display = "block";
        nextButton.textContent = "Next";
        verbalButton.style.display = "none";
    }

    // Restore previous selection if exists
    if (selectedAnswers[currentQuestionIndex] !== undefined) {
        const selectedIndex = selectedAnswers[currentQuestionIndex];
        const buttons = answerButtonsElement.querySelectorAll(".answer-btn");
        buttons.forEach((button, i) => {
            const isCorrect = button.dataset.correct === "true";
            button.disabled = true;
            if (isCorrect) {
                button.classList.add("correct");
            }
            if (i === selectedIndex && !isCorrect) {
                button.classList.add("incorrect");
            }
        });
        buttons[selectedIndex].classList.add("selected");
    }
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedIndex = [...answerButtonsElement.children].indexOf(selectedButton);
    const isCorrect = selectedButton.dataset.correct === "true";

    // Store selection
    selectedAnswers[currentQuestionIndex] = selectedIndex;

    // Highlight answers
    const buttons = answerButtonsElement.querySelectorAll(".btn");
    buttons.forEach(button => {
        const correct = button.dataset.correct === "true";
        button.disabled = true;
        if (correct) {
            button.classList.add("correct");
        }
        if (button === selectedButton && !isCorrect) {
            button.classList.add("incorrect");
        }
    });

    // Update score
    if (isCorrect) {
        score++;
    }
}

function showResults() {
    resetState();
    questionElement.textContent = "Perceptual Reasoning Results";
    questionCounter.style.display = "none";

    const percentage = Math.round((score / questions.length) * 100);
    let resultsHTML = `
        <div class="score">
            <h3>Your Score: ${score}/${questions.length} (${percentage}%)</h3>
            <p>${getResultMessage(percentage)}</p>
        </div>
        <div class="feedback">
            <h3>Question Feedback:</h3>
            <ul>
    `;

    questions.forEach((question, index) => {
        const selectedIndex = selectedAnswers[index];
        const feedback = question.answers[selectedIndex].feedback;
        resultsHTML += `
            <li>
                <strong>Q${index + 1}:</strong> ${feedback}
            </li>
        `;
    });

    resultsHTML += `</ul></div>`;
    resultElement.innerHTML = resultsHTML;
}

function getResultMessage(percentage) {
    if (percentage >= 80) return "Excellent perceptual reasoning skills!";
    if (percentage >= 60) return "Good visual pattern recognition.";
    if (percentage >= 40) return "Average spatial reasoning ability.";
    return "Consider practicing more visual puzzles.";
}

// Navigation
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
    }
});

verbalButton.addEventListener("click", () => {
    // Save completion status and score
    localStorage.setItem('perceptualCompleted', 'true');
    localStorage.setItem('perceptualScore', score);
    
    // Show results before redirecting
    showResults();
    
    // Redirect after a brief delay to let user see results
    setTimeout(() => {
        window.location.href = "verbal.html";
    }, 3000);
});

// Verify abstract test was completed first
if (!localStorage.getItem('abstractCompleted')) {
    window.location.href = "abstract.html";
} else {
    // Start the quiz
    startQuiz();
}
