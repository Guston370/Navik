const questions = [
    {
      question: "1. Which symbol completes the sequence: △, □, ○, △, □, ○, ____ ?",
      answers: [
        { text: "△", correct: true, feedback: "Correct - completes the repeating triplet pattern" },
        { text: "□", correct: false, feedback: "Would break the established sequence" },
        { text: "☆", correct: false, feedback: "Not part of the original symbol set" },
        { text: "○", correct: false, feedback: "Would appear prematurely in the cycle" }
      ]
    },
    {
      question: "2. Complete the analogy: 2 : 4 :: 3 : ____ ?",
      answers: [
        { text: "6", correct: false, feedback: "Linear progression (n×2)" },
        { text: "9", correct: true, feedback: "Correct - squared relationship (n²)" },
        { text: "12", correct: false, feedback: "Multiplicative but incorrect operation" },
        { text: "5", correct: false, feedback: "Simple addition doesn't fit" }
      ]
    },
    {
      question: "3. Which sequence follows the same pattern as: A, C, E, G?",
      answers: [
        { text: "1, 2, 3, 4", correct: false, feedback: "No skip pattern" },
        { text: "B, D, F, H", correct: true, feedback: "Correct - alternating letters" },
        { text: "M, O, M, O", correct: false, feedback: "Repetition rather than progression" },
        { text: "Z, X, V, T", correct: false, feedback: "Reverse alphabetical order" }
      ]
    },
    {
      question: "4. Identify the odd one out: 3, 5, 7, 9, 11, 13",
      answers: [
        { text: "3", correct: false, feedback: "Valid prime number" },
        { text: "9", correct: true, feedback: "Correct - only non-prime in the sequence" },
        { text: "11", correct: false, feedback: "Fits the prime pattern" },
        { text: "13", correct: false, feedback: "Maintains the sequence" }
      ]
    },
    {
      question: "5. What comes next: 1, 1, 2, 3, 5, 8, ____ ?",
      answers: [
        { text: "11", correct: false, feedback: "Adds last two numbers incorrectly" },
        { text: "13", correct: true, feedback: "Correct Fibonacci sequence" },
        { text: "16", correct: false, feedback: "Over-adds the sequence" },
        { text: "10", correct: false, feedback: "Miscounts the progression" }
      ]
    },
    {
      question: "6. Which group follows the same rule as: X, XX, XXX, XXXX?",
      answers: [
        { text: "A, B, C, D", correct: false, feedback: "No cumulative pattern" },
        { text: "1, 11, 111, 1111", correct: true, feedback: "Correct - incremental repetition" },
        { text: "☆, ★, ☆, ★", correct: false, feedback: "Alternation not accumulation" },
        { text: "▲, ▲▲, ▲▲▲", correct: false, feedback: "Similar but not matching symbol type" }
      ]
    },
    {
      question: "7. Complete the pattern: 12, 21, 34, 43, 56, ____ ?",
      answers: [
        { text: "65", correct: true, feedback: "Correct - digit reversal +13 pattern" },
        { text: "57", correct: false, feedback: "Ignores the reversal aspect" },
        { text: "67", correct: false, feedback: "Breaks the established rule" },
        { text: "78", correct: false, feedback: "Wrong incremental value" }
      ]
    },
    {
      question: "8. Which number replaces the question mark: 4 (96) 8; 5 (125) 5; 7 (?) 3",
      answers: [
        { text: "147", correct: false, feedback: "Incorrect operation" },
        { text: "343", correct: false, feedback: "Right operation, wrong elements" },
        { text: "189", correct: false, feedback: "Partial pattern recognition" },
        { text: "105", correct: true, feedback: "Correct - a×b×(a+b)" }
      ]
    },
    {
      question: "9. Identify the missing element: A1, D4, ____, J10, M13",
      answers: [
        { text: "F6", correct: false, feedback: "Letter correct but number wrong" },
        { text: "G7", correct: true, feedback: "Correct - alphabetical position match" },
        { text: "H8", correct: false, feedback: "Number correct but letter wrong" },
        { text: "I9", correct: false, feedback: "Reversed relationship" }
      ]
    },
    {
      question: "10. Which pattern is different: 121, 144, 169, 196, 225, 260",
      answers: [
        { text: "121", correct: false, feedback: "Perfect square (11²)" },
        { text: "169", correct: false, feedback: "Valid square number (13²)" },
        { text: "225", correct: false, feedback: "Fits the sequence (15²)" },
        { text: "260", correct: true, feedback: "Correct - not a perfect square" }
      ]
    },
    {
      question: "11. What is the rule: 3→27, 4→64, 5→125?",
      answers: [
        { text: "n×9", correct: false, feedback: "Doesn't fit all cases" },
        { text: "n³", correct: true, feedback: "Correct cubic relationship" },
        { text: "n²+2n", correct: false, feedback: "Coincidence for first term only" },
        { text: "n! (factorial)", correct: false, feedback: "Incorrect operation" }
      ]
    },
    {
      question: "12. Complete: If A=1, B=2, then CAT = 24, DOG = ____ ?",
      answers: [
        { text: "26", correct: true, feedback: "Correct sum of letter positions" },
        { text: "34", correct: false, feedback: "Multiplies instead of adds" },
        { text: "15", correct: false, feedback: "Only sums vowels" },
        { text: "43", correct: false, feedback: "Reversed letter values" }
      ]
    },
    {
      question: "13. Which sequence doesn't belong: 2-4-8, 3-9-27, 4-16-32, 5-25-125?",
      answers: [
        { text: "2-4-8", correct: false, feedback: "Valid n, n², n³ pattern" },
        { text: "3-9-27", correct: false, feedback: "Follows the rule perfectly" },
        { text: "4-16-32", correct: true, feedback: "Correct - breaks the n³ pattern" },
        { text: "5-25-125", correct: false, feedback: "Consistent with the rule" }
      ]
    },
    {
      question: "14. Solve the analogy: 9 : 81 :: 13 : ____ ?",
      answers: [
        { text: "121", correct: false, feedback: "Square of 11" },
        { text: "169", correct: true, feedback: "Correct - 13 squared" },
        { text: "196", correct: false, feedback: "Square of 14" },
        { text: "225", correct: false, feedback: "Square of 15" }
      ]
    },
    {
      question: "15. What's the next pair: (1,3), (2,6), (3,9), ____ ?",
      answers: [
        { text: "(4,12)", correct: true, feedback: "Correct - (n, 3n) pattern" },
        { text: "(5,15)", correct: false, feedback: "Skips a step in sequence" },
        { text: "(4,8)", correct: false, feedback: "Wrong multiplier" },
        { text: "(3,12)", correct: false, feedback: "Repeats first number" }
      ]
    }
  ];
  
  // DOM elements and quiz logic would follow here
  
// DOM Elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const perceptualButton = document.getElementById("perceptual-btn");
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
    perceptualButton.style.display = "none";
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
    
    // Show "Continue to Perceptual" button on last question instead of "Submit"
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = "none";
        perceptualButton.style.display = "block";
    } else {
        nextButton.style.display = "block";
        nextButton.textContent = "Next";
        perceptualButton.style.display = "none";
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
    const buttons = answerButtonsElement.querySelectorAll(".answer-btn");
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
    questionElement.textContent = "Abstract Reasoning Results";
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
    if (percentage >= 80) return "Excellent abstract reasoning skills!";
    if (percentage >= 60) return "Good understanding of abstract patterns.";
    if (percentage >= 40) return "Average abstract reasoning ability.";
    return "Consider practicing more abstract reasoning exercises.";
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

perceptualButton.addEventListener("click", () => {
    // Save completion status and score
    localStorage.setItem('abstractCompleted', 'true');
    localStorage.setItem('abstractScore', score);
    
    // Show results before redirecting
    showResults();
    
    // Redirect after a brief delay to let user see results
    setTimeout(() => {
        window.location.href = "perceptual.html";
    }, 3000);
});

// Verify personality test was completed first
if (!localStorage.getItem('personalityCompleted')) {
    window.location.href = "personality.html";
} else {
    // Start the quiz
    startQuiz();
}
