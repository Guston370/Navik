const questions = [
    {
      question: "Choose the word most similar to 'EPHEMERAL':",
      answers: [
        { text: "Permanent", correct: false, feedback: "Antonym - means the opposite" },
        { text: "Transient", correct: true, feedback: "Correct synonym - both mean short-lived" },
        { text: "Annual", correct: false, feedback: "Related to yearly occurrence" },
        { text: "Historical", correct: false, feedback: "Unrelated to duration" }
      ]
    },
    {
      question: "Select the antonym of 'MUNDANE':",
      answers: [
        { text: "Ordinary", correct: false, feedback: "Synonym - means the same" },
        { text: "Extraordinary", correct: true, feedback: "Correct antonym - means exceptional" },
        { text: "Worldly", correct: false, feedback: "Similar meaning" },
        { text: "Routine", correct: false, feedback: "Near synonym" }
      ]
    },
    {
      question: "Complete the analogy: BOOK is to CHAPTER as ____ is to ACT",
      answers: [
        { text: "Novel", correct: false, feedback: "A novel contains chapters" },
        { text: "Play", correct: true, feedback: "Correct - plays contain acts" },
        { text: "Poem", correct: false, feedback: "Contains stanzas, not acts" },
        { text: "Essay", correct: false, feedback: "Contains paragraphs" }
      ]
    },
    {
      question: "Which word doesn't belong?",
      answers: [
        { text: "Eloquent", correct: false, feedback: "Related to speaking ability" },
        { text: "Articulate", correct: false, feedback: "Also related to speech" },
        { text: "Verbose", correct: false, feedback: "Describes speaking style" },
        { text: "Calligraphy", correct: true, feedback: "Correct - relates to writing, not speech" }
      ]
    },
    {
      question: "Choose the correct spelling:",
      answers: [
        { text: "Accomodate", correct: false, feedback: "Missing one 'm'" },
        { text: "Acommodate", correct: false, feedback: "Missing one 'c' and one 'm'" },
        { text: "Accommodate", correct: true, feedback: "Correct spelling - double 'c' and double 'm'" },
        { text: "Acomodate", correct: false, feedback: "Missing one 'c' and one 'm'" }
      ]
    },
    {
      question: "Identify the grammatically correct sentence:",
      answers: [
        { text: "Neither of the options are correct", correct: false, feedback: "Subject-verb disagreement" },
        { text: "Each of the students were present", correct: false, feedback: "Should use singular verb" },
        { text: "The team is playing well today", correct: true, feedback: "Correct - collective noun agreement" },
        { text: "There's many reasons for this", correct: false, feedback: "Contraction mismatch" }
      ]
    },
    {
      question: "What is the meaning of 'OSTENSIBLE'?",
      answers: [
        { text: "Stubborn", correct: false, feedback: "Incorrect - that's 'obstinate'" },
        { text: "Apparent (but possibly not true)", correct: true, feedback: "Correct definition" },
        { text: "Relating to bones", correct: false, feedback: "That's 'osseous'" },
        { text: "Highly visible", correct: false, feedback: "Partial meaning but incomplete" }
      ]
    },
    {
      question: "Which is the passive form of: 'The committee approved the policy'?",
      answers: [
        { text: "The policy was approved by the committee", correct: true, feedback: "Correct passive construction" },
        { text: "The policy is approved by the committee", correct: false, feedback: "Wrong tense" },
        { text: "The committee was approved the policy", correct: false, feedback: "Incorrect structure" },
        { text: "The policy has been approving by the committee", correct: false, feedback: "Grammatical errors" }
      ]
    },
    {
      question: "Choose the correctly punctuated sentence:",
      answers: [
        { text: "The man, who was tall, entered the room.", correct: true, feedback: "Correct use of commas" },
        { text: "The man who was tall entered the room.", correct: false, feedback: "Needs commas for non-restrictive clause" },
        { text: "The man, who was tall entered the room.", correct: false, feedback: "Missing closing comma" },
        { text: "The man who was tall, entered the room.", correct: false, feedback: "Comma splice error" }
      ]
    },
    {
      question: "Which word best completes: 'Her ____ remarks offended many attendees'?",
      answers: [
        { text: "Incendiary", correct: true, feedback: "Correct - means provocative" },
        { text: "Flammable", correct: false, feedback: "Literal meaning doesn't fit" },
        { text: "Aqueous", correct: false, feedback: "Means watery - irrelevant" },
        { text: "Luminous", correct: false, feedback: "Means glowing - inappropriate" }
      ]
    },
    {
      question: "Identify the sentence with proper parallel structure:",
      answers: [
        { text: "She likes hiking, swimming, and to ride bicycles", correct: false, feedback: "Broken parallelism" },
        { text: "He enjoys reading, writing, and editing texts", correct: true, feedback: "Correct parallel structure" },
        { text: "They prefer running, jumping, and to play volleyball", correct: false, feedback: "Mixed verb forms" },
        { text: "I love cooking, baking, and to garden", correct: false, feedback: "Inconsistent structure" }
      ]
    },
    {
      question: "What is the plural of 'crisis'?",
      answers: [
        { text: "Crisises", correct: false, feedback: "Incorrect plural form" },
        { text: "Crises", correct: true, feedback: "Correct irregular plural" },
        { text: "Crisis", correct: false, feedback: "Singular form" },
        { text: "Crisi", correct: false, feedback: "Not a valid English word" }
      ]
    },
    {
      question: "Which is the correct idiom:",
      answers: [
        { text: "Bite your tongue", correct: true, feedback: "Correct - means to stay silent" },
        { text: "Chew your lip", correct: false, feedback: "Not a standard idiom" },
        { text: "Swallow your teeth", correct: false, feedback: "Nonsensical phrase" },
        { text: "Taste your words", correct: false, feedback: "Not an established idiom" }
      ]
    },
    {
      question: "Choose the best synonym for 'UBIQUITOUS':",
      answers: [
        { text: "Rare", correct: false, feedback: "Antonym" },
        { text: "Omnipresent", correct: true, feedback: "Correct synonym" },
        { text: "Partial", correct: false, feedback: "Unrelated meaning" },
        { text: "Temporary", correct: false, feedback: "Different concept" }
      ]
    },
    {
      question: "Which sentence contains a dangling modifier?",
      answers: [
        { text: "Running quickly, the finish line approached", correct: true, feedback: "Correct - modifier has no subject" },
        { text: "After eating lunch, the meeting resumed", correct: false, feedback: "Clear subject" },
        { text: "While reading the book, the phone rang", correct: false, feedback: "Proper construction" },
        { text: "Having finished the work, she went home", correct: false, feedback: "No dangling modifier" }
      ]
    }
  ];
  
// DOM Elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const spatialButton = document.getElementById("spatial-btn");
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
    spatialButton.style.display = "none";
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
    
    // Show "Continue to Spatial" button on last question
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = "none";
        spatialButton.style.display = "block";
    } else {
        nextButton.style.display = "block";
        nextButton.textContent = "Next";
        spatialButton.style.display = "none";
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
    questionElement.textContent = "Verbal Aptitude Results";
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
    if (percentage >= 80) return "Excellent verbal aptitude!";
    if (percentage >= 60) return "Strong verbal skills.";
    if (percentage >= 40) return "Average verbal ability.";
    return "Consider practicing more verbal reasoning exercises.";
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

spatialButton.addEventListener("click", () => {
    // Save completion status and score
    localStorage.setItem('verbalCompleted', 'true');
    localStorage.setItem('verbalScore', score);
    
    // Show results before redirecting
    showResults();
    
    // Redirect after a brief delay to let user see results
    setTimeout(() => {
        window.location.href = "spatial.html";
    }, 3000);
});

// Start the quiz
startQuiz();
