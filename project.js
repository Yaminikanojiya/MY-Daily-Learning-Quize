var tasks = [];
var  quizData = {
  "HTML": [
    { q: "What does HTML stand for?", o: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text", "None"], a: 0 },
    { q: "HTML tags are surrounded by?", o: ["()", "[]", "<>", "{}"], a: 2 },
    { q: "Which tag is used for a line break?", o: ["<br>", "<hr>", "<line>", "<lb>"], a: 0 }
  ],
  "JavaScript": [
    { q: "Which keyword declares a variable?", o: ["var", "int", "define", "function"], a: 0 },
    { q: "What does '===' mean?", o: ["Compare", "Equal", "Strict equal", "Same data type"], a: 2 },
    { q: "Which loop exists in JS?", o: ["for", "while", "do-while", "All"], a: 3 }
  ],
  "C": [
    { q: "C is which type of language?", o: ["High-level", "Assembly", "Low-level", "Object-oriented"], a: 0 },
    { q: "Which header file is needed for printf()?", o: ["stdio.h", "conio.h", "math.h", "stdlib.h"], a: 0 },
    { q: "Which symbol ends a statement in C?", o: [".", ",", ";", ":"], a: 2 }
  ],
  "Java": [
    { q: "Java is a _____ language.", o: ["compiled", "interpreted", "both", "none"], a: 2 },
    { q: "Which keyword is used to create a class?", o: ["class", "object", "struct", "interface"], a: 0 },
    { q: "Which method is entry point?", o: ["start()", "init()", "main()", "launch()"], a: 2 }
  ],
  "Python": [
    { q: "Python is a ______ language.", o: ["Low-level", "High-level", "Mid-level", "Assembly"], a: 1 },
    { q: "Which symbol is used for comments?", o: ["//", "#", "/*", "--"], a: 1 },
    { q: "How to declare a function?", o: ["function", "void", "def", "fun"], a: 2 }
  ]
};

let scores = {};

var quizTimer; // for setInterval
var timeLeft = 30;

function addTask() {
  let topic = document.getElementById("taskInput").value;
  if (topic !== "") {
    tasks.push(topic);
    scores[topic] = "Not attempted";
    showTasks();
    document.getElementById("taskInput").value = "";
  }
}
function showTasks() {
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    let topic = tasks[i];
    html += "<p>" + topic +
      " | Score: " + scores[topic] +
      " <button onclick='startQuiz(" + i + ")'>Take Quiz</button></p>";
  }
  document.getElementById("taskList").innerHTML = html;
}

// Pick 2 random questions
function getRandomQuestions(questions) {
  let shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}


function startQuiz(index) {
  var topic = tasks[index];
  var allQuestions = quizData[topic];

  if (!allQuestions) {
    alert("No quiz available for " + topic);
    return;
  }

  var questions = getRandomQuestions(allQuestions);

  var quizHTML = "<h3>Quiz on " + topic + "</h3>";
  for (let i = 0; i < questions.length; i++) {
    let q = questions[i];
    quizHTML += "<p>" + q.q + "<br>";
    for (let j = 0; j < q.o.length; j++) {
      quizHTML += "<input type='radio' name='q" + i + "' value='" + j + "'>" + q.o[j] + "<br>";
    }
    quizHTML += "</p>";
  }

  quizHTML += "<p id='timer'>⏱ Time Left: 30s</p>";
  quizHTML += "<button onclick='submitQuiz(`" + topic + "`, " + JSON.stringify(questions) + ")'>Submit Quiz</button>";
  quizHTML += "<button onclick='cancelQuiz()'>Cancel</button>";

  document.getElementById("quizSection").innerHTML = quizHTML;
  document.getElementById("quizSection").style.display = "block";

  timeLeft = 30;
  startTimer(topic, questions);
}

// Start countdown timer
function startTimer(topic, questions) {
  quizTimer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "⏱ Time Left: " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(quizTimer);
      alert("⏰ Time's up!");
      submitQuiz(topic, questions);
    }
  }, 1000);
}

// Submit quiz and calculate score
function submitQuiz(topic, questions) {
  clearInterval(quizTimer);

  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    let options = document.getElementsByName("q" + i);
    for (let j = 0; j < options.length; j++) {
      if (options[j].checked && parseInt(options[j].value) === questions[i].a) {
        score++;
      }
    }
  }

  scores[topic] = score + "/" + questions.length;
  alert("🎉 You scored: " + score + " out of " + questions.length);
  document.getElementById("quizSection").style.display = "none";
  showTasks();
}

// Cancel quiz manually
function cancelQuiz() {
  clearInterval(quizTimer);
  document.getElementById("quizSection").style.display = "none";
}