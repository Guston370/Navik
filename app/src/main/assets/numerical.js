const questions = [
    {
      question: "A mobile phone originally costs ₹25,000 and is offered at a 20% discount during a sale. What is the sale price?",
      answers: [
        { text: "₹20,000", correct: true },
        { text: "₹18,000", correct: false },
        { text: "₹22,500", correct: false },
        { text: "₹23,000", correct: false }
      ]
    },
    {
      question: "If the price of a laptop increases from ₹45,000 to ₹54,000, what is the percentage increase?",
      answers: [
        { text: "15%", correct: false },
        { text: "20%", correct: true },
        { text: "25%", correct: false },
        { text: "30%", correct: false }
      ]
    },
    {
      question: "A factory produces 1,200 units of a product in 8 days. How many units will it produce in 15 days at the same rate?",
      answers: [
        { text: "2,000 units", correct: false },
        { text: "2,250 units", correct: true },
        { text: "2,400 units", correct: false },
        { text: "2,600 units", correct: false }
      ]
    },
    {
      question: "If a car's fuel efficiency is 15 km per liter, how much fuel is needed to travel 450 km?",
      answers: [
        { text: "25 liters", correct: false },
        { text: "30 liters", correct: true },
        { text: "35 liters", correct: false },
        { text: "40 liters", correct: false }
      ]
    },
    {
      question: "Solve for x: 3x + 15 = 0",
      answers: [
        { text: "-5", correct: true },
        { text: "5", correct: false },
        { text: "-3", correct: false },
        { text: "3", correct: false }
      ]
    },
    {
      question: "What is 25% of ₹1,200?",
      answers: [
        { text: "₹200", correct: false },
        { text: "₹300", correct: true },
        { text: "₹350", correct: false },
        { text: "₹400", correct: false }
      ]
    },
    {
      question: "A train travels at an average speed of 90 km/h. How long will it take to cover a distance of 450 km?",
      answers: [
        { text: "4 hours", correct: false },
        { text: "4.5 hours", correct: false },
        { text: "5 hours", correct: true },
        { text: "5.5 hours", correct: false }
      ]
    },
    {
      question: "What is the value of π (pi) rounded to two decimal places?",
      answers: [
        { text: "3.12", correct: false },
        { text: "3.14", correct: true },
        { text: "3.16", correct: false },
        { text: "3.18", correct: false }
      ]
    },
    {
      question: "If 10 workers can complete a task in 15 days, how many days will it take for 5 workers to complete the same task, assuming they work at the same rate?",
      answers: [
        { text: "15 days", correct: false },
        { text: "20 days", correct: false },
        { text: "25 days", correct: false },
        { text: "30 days", correct: true }
      ]
    },
    {
      question: "What is the sum of the interior angles of a pentagon?",
      answers: [
        { text: "540 degrees", correct: true },
        { text: "600 degrees", correct: false },
        { text: "720 degrees", correct: false },
        { text: "900 degrees", correct: false }
      ]
    },
    {
      question: "If a rectangular field has a length of 50 meters and a width of 30 meters, what is its area?",
      answers: [
        { text: "1,500 m²", correct: true },
        { text: "1,800 m²", correct: false },
        { text: "2,000 m²", correct: false },
        { text: "2,500 m²", correct: false }
      ]
    },
    {
      question: "Simplify the expression: 4(x + 5) - 3x",
      answers: [
        { text: "x + 20", correct: true },
        { text: "7x + 20", correct: false },
        { text: "x + 10", correct: false },
        { text: "x + 15", correct: false }
      ]
    },
    {
      question: "What is the probability of drawing an Ace from a standard deck of 52 playing cards?",
      answers: [
        { text: "1/13", correct: true },
        { text: "1/26", correct: false },
        { text: "1/52", correct: false },
        { text: "1/4", correct: false }
      ]
    },
    {
      question: "If the exchange rate is ₹75 per USD, how many Indian Rupees will you get for 500 USD?",
      answers: [
        { text: "₹35,000", correct: false },
        { text: "₹37,500", correct: true },
        { text: "₹40,000", correct: false },
        { text: "₹45,000", correct: false }
      ]
    },
    {
      question: "A triangle has angles measuring 50°, 60°, and ___?",
      answers: [
        { text: "60°", correct: false },
        { text: "70°", correct: true },
        { text: "80°", correct: false },
        { text: "90°", correct: false }
      ]
    }
  ];
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");
  const personalityButton = document.getElementById("personality-btn");
  const questionCounter = document.getElementById("question-counter");
  const resultElement = document.getElementById("result");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswers = {};
  
  function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      selectedAnswers = {};
      personalityButton.style.display = "none";
      nextButton.style.display = "block";
      resultElement.innerHTML = "";
      showQuestion();
  }
  
  function showQuestion() {
      resetState();
      const currentQuestion = questions[currentQuestionIndex];
      const questionNo = currentQuestionIndex + 1;
      questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;
      questionCounter.textContent = `${questionNo}/${questions.length}`;
  
      currentQuestion.answers.forEach((answer, index) => {
          const button = document.createElement("button");
          button.textContent = answer.text;
          button.classList.add("answer-btn");
          if (answer.correct) {
              button.dataset.correct = "true";
          }
          button.addEventListener("click", () => selectAnswer(answer.correct, index));
          answerButtonsElement.appendChild(button);
      });
  
      prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
      
      // Restore previous selection if exists
      if (selectedAnswers[currentQuestionIndex] !== undefined) {
          const buttons = answerButtonsElement.querySelectorAll(".answer-btn");
          const selectedIndex = selectedAnswers[currentQuestionIndex];
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
  
  function selectAnswer(isCorrect, index) {
      const buttons = answerButtonsElement.querySelectorAll(".answer-btn");
      
      // Mark selected answer
      buttons[index].classList.add("selected");
      selectedAnswers[currentQuestionIndex] = index;
      
      // Update score if first time answering
      if (isCorrect) {
          score++;
      }
      
      // Show correct/incorrect answers
      buttons.forEach(button => {
          button.disabled = true;
          if (button.dataset.correct === "true") {
              button.classList.add("correct");
          } else if (button.classList.contains("selected") && !isCorrect) {
              button.classList.add("incorrect");
          }
      });
  }
  
  function showScore() {
      resetState();
      questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
      prevButton.style.display = "none";
      nextButton.style.display = "none";
      personalityButton.style.display = "block";
      
      // Save results to localStorage
      localStorage.setItem('numericalScore', score);
      localStorage.setItem('numericalCompleted', 'true');
  }
  
  function handleNextButton() {
      if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          showQuestion();
      } else {
          showScore();
      }
  }
  
  function handlePrevButton() {
      if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          showQuestion();
      }
  }
  
  prevButton.addEventListener("click", handlePrevButton);
  nextButton.addEventListener("click", handleNextButton);
  personalityButton.addEventListener("click", () => {
      window.location.href = "personality.html";
  });
  
  startQuiz();
  
  
