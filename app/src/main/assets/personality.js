const questions = [
    {
      question: "When faced with a problem, you tend to:",
      answers: [
        { text: "Analyze it logically", type: "Analytical" },
        { text: "Follow your intuition", type: "Intuitive" },
        { text: "Seek others' opinions", type: "Social" },
        { text: "Look for creative solutions", type: "Creative" }
      ]
    },
    {
      question: "In social situations, you usually:",
      answers: [
        { text: "Enjoy being the center of attention", type: "Extroverted" },
        { text: "Prefer small group conversations", type: "Ambivert" },
        { text: "Listen more than you speak", type: "Introverted" },
        { text: "Adapt based on the situation", type: "Adaptive" }
      ]
    },
    {
      question: "Your ideal weekend would be:",
      answers: [
        { text: "Full of social activities with friends", type: "Extroverted" },
        { text: "Quiet time alone with a good book", type: "Introverted" },
        { text: "Trying something new and adventurous", type: "Adventurous" },
        { text: "A mix of relaxation and productivity", type: "Balanced" }
      ]
    },
    {
      question: "When making decisions, you mostly rely on:",
      answers: [
        { text: "Facts and data", type: "Logical" },
        { text: "Your personal values", type: "Ethical" },
        { text: "How it will affect others", type: "Empathetic" },
        { text: "Future possibilities", type: "Visionary" }
      ]
    },
    {
      question: "At work, you prefer:",
      answers: [
        { text: "Clear instructions and structure", type: "Structured" },
        { text: "Flexibility and autonomy", type: "Independent" },
        { text: "Collaborative team projects", type: "Team Player" },
        { text: "Challenging, fast-paced environments", type: "Thrill-Seeker" }
      ]
    },
    {
      question: "How do you handle stress?",
      answers: [
        { text: "Tackle problems head-on", type: "Proactive" },
        { text: "Take time to reflect and recharge", type: "Reflective" },
        { text: "Talk to friends or family", type: "Social Support" },
        { text: "Distract yourself with activities", type: "Avoidant" }
      ]
    },
    {
      question: "When learning something new, you prefer:",
      answers: [
        { text: "Step-by-step instructions", type: "Methodical" },
        { text: "Hands-on experience", type: "Practical" },
        { text: "Visual demonstrations", type: "Visual Learner" },
        { text: "Discussing concepts with others", type: "Verbal Learner" }
      ]
    },
    {
      question: "Your friends would describe you as:",
      answers: [
        { text: "The life of the party", type: "Extroverted" },
        { text: "A good listener", type: "Introverted" },
        { text: "The voice of reason", type: "Rational" },
        { text: "The creative one", type: "Creative" }
      ]
    },
    {
      question: "When working on a project, you:",
      answers: [
        { text: "Plan everything in advance", type: "Planner" },
        { text: "Jump in and figure it out as you go", type: "Improviser" },
        { text: "Collaborate with others throughout", type: "Collaborative" },
        { text: "Focus intensely until it's done", type: "Focused" }
      ]
    },
    {
      question: "Your biggest strength is:",
      answers: [
        { text: "Critical thinking", type: "Analytical" },
        { text: "Creativity", type: "Creative" },
        { text: "People skills", type: "Social" },
        { text: "Determination", type: "Persistent" }
      ]
    },
    {
      question: "In a debate, you tend to:",
      answers: [
        { text: "Stick to facts and logic", type: "Logical" },
        { text: "Consider all perspectives", type: "Open-Minded" },
        { text: "Advocate for your position strongly", type: "Assertive" },
        { text: "Look for common ground", type: "Diplomatic" }
      ]
    },
    {
      question: "Your approach to rules is:",
      answers: [
        { text: "They should always be followed", type: "Conventional" },
        { text: "They're guidelines but can be bent", type: "Flexible" },
        { text: "They should be questioned", type: "Rebellious" },
        { text: "They depend on the situation", type: "Contextual" }
      ]
    },
    {
      question: "When facing criticism, you:",
      answers: [
        { text: "Consider it objectively", type: "Objective" },
        { text: "Take it personally at first", type: "Sensitive" },
        { text: "Defend your position", type: "Defensive" },
        { text: "Ask for clarification", type: "Inquisitive" }
      ]
    },
    {
      question: "Your energy comes from:",
      answers: [
        { text: "Being around people", type: "Extroverted" },
        { text: "Time alone", type: "Introverted" },
        { text: "New experiences", type: "Adventurous" },
        { text: "Achieving goals", type: "Driven" }
      ]
    },
    {
      question: "In a team, you usually:",
      answers: [
        { text: "Take charge", type: "Leader" },
        { text: "Support others", type: "Supporter" },
        { text: "Generate ideas", type: "Idea Person" },
        { text: "Handle details", type: "Organizer" }
      ]
    }
  ];
  
// DOM Elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const abstractButton = document.getElementById("abstract-btn");
const resultElement = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const questionCounter = document.getElementById("question-counter");

// Quiz State
let currentQuestionIndex = 0;
let selectedAnswers = {};
let personalityScores = {};

// Initialize the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    selectedAnswers = {};
    initializeScores();
    updateProgressBar();
    showQuestion();
}

// Initialize personality scores
function initializeScores() {
    personalityScores = {};
    // Get all unique personality types
    const allTypes = new Set();
    questions.forEach(q => {
        q.answers.forEach(a => {
            allTypes.add(a.type);
        });
    });
    
    // Initialize all types with 0
    allTypes.forEach(type => {
        personalityScores[type] = 0;
    });
}

// Display current question
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    
    questionElement.textContent = currentQuestion.question;
    questionCounter.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    
    // Create answer buttons
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.type = answer.type;
        
        // Highlight if already selected
        if (selectedAnswers[currentQuestionIndex] === index) {
            button.classList.add("selected");
        }
        
        button.addEventListener("click", () => selectAnswer(index));
        answerButtonsElement.appendChild(button);
    });
    
    // Update navigation buttons
    prevButton.style.display = currentQuestionIndex === 0 ? "none" : "block";
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "See Results" : "Next";
    abstractButton.style.display = "none";
}

// Reset question state
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(index) {
    const buttons = answerButtonsElement.querySelectorAll('.answer-btn');
    
    // Remove previous selection
    buttons.forEach(button => button.classList.remove('selected', 'correct', 'incorrect'));
    
    // Mark selected answer
    buttons[index].classList.add('selected');
    selectedAnswers[currentQuestionIndex] = index;
    
    // Disable all buttons after selection
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Update personality scores based on selections
function updateScores() {
    initializeScores(); // Reset scores
    
    // Recalculate all scores
    Object.keys(selectedAnswers).forEach(qIndex => {
        const answerIndex = selectedAnswers[qIndex];
        const answerType = questions[qIndex].answers[answerIndex].type;
        personalityScores[answerType]++;
    });
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show final results
function showResults() {
    resetState();
    questionElement.textContent = "Your Personality Profile";
    questionCounter.style.display = "none";
    
    // Update scores before displaying results
    updateScores();
    
    // Sort personality traits by score
    const sortedTraits = Object.entries(personalityScores)
        .sort((a, b) => b[1] - a[1])
        .filter(trait => trait[1] > 0);
    
    // Create results HTML
    let resultsHTML = '<div class="traits-container">';
    resultsHTML += '<h3>Your Top Personality Traits</h3>';
    resultsHTML += '<div class="traits-grid">';
    
    // Show top 5 traits
    sortedTraits.slice(0, 5).forEach((trait, index) => {
        resultsHTML += `
            <div class="trait-card">
                <div class="trait-rank">${index + 1}</div>
                <h4>${trait[0]}</h4>
                <div class="trait-score">Selected ${trait[1]} time${trait[1] > 1 ? 's' : ''}</div>
                <p>${getTraitDescription(trait[0])}</p>
            </div>
        `;
    });
    
    resultsHTML += '</div></div>';
    resultElement.innerHTML = resultsHTML;
    
    // Hide next button and show abstract test button
    nextButton.style.display = "none";
    abstractButton.style.display = "block";
    
    // Save completion status
    localStorage.setItem('personalityCompleted', 'true');
    localStorage.setItem('personalityResults', JSON.stringify({
        scores: personalityScores,
        topTraits: sortedTraits.slice(0, 5)
    }));
}

// Get description for each trait
function getTraitDescription(trait) {
    const descriptions = {
        "Analytical": "You approach problems methodically and value logical reasoning.",
        "Intuitive": "You trust your instincts and often rely on gut feelings.",
        "Social": "You thrive in group settings and enjoy connecting with others.",
        "Creative": "You think outside the box and enjoy innovative solutions.",
        "Extroverted": "You gain energy from social interactions and being around people.",
        "Introverted": "You recharge by spending time alone and prefer deep conversations.",
        "Adventurous": "You seek new experiences and enjoy stepping out of your comfort zone.",
        "Logical": "You make decisions based on facts and objective analysis.",
        "Ethical": "Your choices are guided by strong moral principles.",
        "Empathetic": "You're highly attuned to others' emotions and perspectives.",
        "Visionary": "You focus on future possibilities and big-picture thinking.",
        "Structured": "You prefer clear organization and well-defined systems.",
        "Independent": "You value autonomy and prefer working on your own terms.",
        "Team Player": "You enjoy collaboration and work well in groups.",
        "Proactive": "You take initiative and address problems directly.",
        "Reflective": "You think deeply before acting and value introspection.",
        "Practical": "You prefer hands-on learning and concrete applications.",
        "Rational": "You're known for your clear, reasoned thinking.",
        "Planner": "You like to prepare in advance and follow plans.",
        "Open-Minded": "You consider multiple perspectives before deciding.",
        "Leader": "You naturally take charge and guide others.",
        "Supporter": "You excel at helping and encouraging team members."
    };
    
    return descriptions[trait] || "This is a significant aspect of your unique personality.";
}

// Event listeners for navigation
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateProgressBar();
        showQuestion();
    }
});

nextButton.addEventListener("click", () => {
    if (nextButton.textContent === "See Results") {
        // On last question, show results if answer is selected
        if (selectedAnswers[currentQuestionIndex] === undefined) {
            alert("Please select an answer to see your results.");
            return;
        }
        showResults();
    } else {
        // Only proceed if an answer is selected
        if (selectedAnswers[currentQuestionIndex] === undefined) {
            alert("Please select an answer before continuing.");
            return;
        }
        currentQuestionIndex++;
        updateProgressBar();
        showQuestion();
    }
});

// Continue to abstract test
abstractButton.addEventListener('click', () => {
    window.location.href = "abstract.html";
});

// Block back button navigation
history.pushState(null, null, location.href);
window.onpopstate = function() {
    history.go(1);
};

// Start the quiz
startQuiz();
