// Robotics Kahoot Quiz App - Main Engine

const TOPIC_NAMES = {
  'B': 'Basics, History and Laws',
  'T': 'Robot Types, Anatomy and DOF',
  'S': 'Sensors',
  'A': 'Actuators and Motors',
  'E': 'Electronics and Microcontrollers',
  'P': 'Communication Protocols',
  'C': 'Control Systems and PID',
  'K': 'Kinematics and Dynamics',
  'N': 'Mobile Robots, Navigation & SLAM',
  'V': 'Computer Vision, AI & ML',
  'R': 'ROS and Programming',
  'D': 'Drones and UAVs',
  'M': 'Mechanisms, Power & Materials',
  'F': 'Famous Robots & Competitions'
};

// State
let selectedTopics = new Set(Object.keys(TOPIC_NAMES));
let questionLimit = 20;
let timerDuration = 20; // seconds (0 = untimed)

let activeQuestions = [];
let currentIndex = 0;
let currentQuestion = null;
let score = 0;
let streak = 0;
let maxStreak = 0;
let correctCount = 0;
let missedQuestions = [];

let timerInterval = null;
let timeLeft = 0;
let questionStartTime = 0;
let answered = false;

// DOM Elements
const lobbyScreen = document.getElementById('lobby-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const topicsContainer = document.getElementById('topics-container');
const selectedCountLabel = document.getElementById('selected-count-label');

const qProgress = document.getElementById('q-progress');
const qTopicBadge = document.getElementById('q-topic-badge');
const scoreVal = document.getElementById('score-val');
const streakPill = document.getElementById('streak-pill');
const questionText = document.getElementById('question-text');

const btnA = document.getElementById('btn-opt-A');
const btnB = document.getElementById('btn-opt-B');
const btnC = document.getElementById('btn-opt-C');
const btnD = document.getElementById('btn-opt-D');

const textA = document.getElementById('text-opt-A');
const textB = document.getElementById('text-opt-B');
const textC = document.getElementById('text-opt-C');
const textD = document.getElementById('text-opt-D');

const revealBox = document.getElementById('reveal-box');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackPoints = document.getElementById('feedback-points');
const explanationBox = document.getElementById('explanation-box');
const explanationText = document.getElementById('explanation-text');

const timerWrap = document.getElementById('timer-wrap');
const timerDisplay = document.getElementById('timer-display');
const timerBar = document.getElementById('timer-bar');

// Initialize Topic Chips
function initTopics() {
  topicsContainer.innerHTML = '';
  
  // Count questions per topic
  const counts = {};
  QUIZ_DATA.forEach(q => {
    counts[q.topicCode] = (counts[q.topicCode] || 0) + 1;
  });

  Object.keys(TOPIC_NAMES).forEach(code => {
    const chip = document.createElement('div');
    chip.className = `topic-chip ${selectedTopics.has(code) ? 'selected' : ''}`;
    chip.dataset.code = code;
    chip.onclick = () => toggleTopic(code);

    chip.innerHTML = `
      <div class="topic-chip-left">
        <span class="topic-letter">${code}</span>
        <span class="topic-name">${TOPIC_NAMES[code]}</span>
      </div>
      <span class="topic-badge">${counts[code] || 0}</span>
    `;
    topicsContainer.appendChild(chip);
  });

  updateSelectedCount();
}

function toggleTopic(code) {
  if (selectedTopics.has(code)) {
    if (selectedTopics.size > 1) {
      selectedTopics.delete(code);
    }
  } else {
    selectedTopics.add(code);
  }
  updateTopicUI();
}

function selectAllTopics(all) {
  if (all) {
    selectedTopics = new Set(Object.keys(TOPIC_NAMES));
  } else {
    // Keep at least one
    selectedTopics = new Set(['B']);
  }
  updateTopicUI();
}

function updateTopicUI() {
  document.querySelectorAll('.topic-chip').forEach(chip => {
    const code = chip.dataset.code;
    if (selectedTopics.has(code)) {
      chip.classList.add('selected');
    } else {
      chip.classList.remove('selected');
    }
  });
  updateSelectedCount();
}

function updateSelectedCount() {
  const filtered = QUIZ_DATA.filter(q => selectedTopics.has(q.topicCode));
  selectedCountLabel.textContent = `${filtered.length} questions available`;
}

// Settings handlers
function setCount(val) {
  questionLimit = val;
  document.querySelectorAll('#count-selector .pill-option').forEach(el => {
    el.classList.toggle('active', el.dataset.val === String(val));
  });
}

function setTimerSec(val) {
  timerDuration = Number(val);
  document.querySelectorAll('#timer-selector .pill-option').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.val) === timerDuration);
  });
}

function toggleMute() {
  const isMuted = sound.toggleMute();
  const btn = document.getElementById('mute-btn');
  btn.textContent = isMuted ? '🔇' : '🔊';
}

function switchView(viewName) {
  lobbyScreen.classList.remove('active');
  quizScreen.classList.remove('active');
  resultsScreen.classList.remove('active');

  if (viewName === 'lobby') lobbyScreen.classList.add('active');
  if (viewName === 'quiz') quizScreen.classList.add('active');
  if (viewName === 'results') resultsScreen.classList.add('active');
}

function goHome() {
  clearInterval(timerInterval);
  switchView('lobby');
}

// Start Quiz
function startQuiz() {
  sound.buttonClick();
  const pool = QUIZ_DATA.filter(q => selectedTopics.has(q.topicCode));
  if (pool.length === 0) {
    alert('Please select at least one topic!');
    return;
  }

  // Shuffle pool
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const total = questionLimit === 'all' ? shuffled.length : Math.min(Number(questionLimit), shuffled.length);
  activeQuestions = shuffled.slice(0, total);

  currentIndex = 0;
  score = 0;
  streak = 0;
  maxStreak = 0;
  correctCount = 0;
  missedQuestions = [];

  switchView('quiz');
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  clearInterval(timerInterval);

  currentQuestion = activeQuestions[currentIndex];
  qProgress.textContent = `${currentIndex + 1} / ${activeQuestions.length}`;
  qTopicBadge.textContent = `${currentQuestion.id} • ${currentQuestion.topicName}`;
  scoreVal.textContent = score.toLocaleString();
  streakPill.textContent = `🔥 Streak: ${streak}`;

  questionText.textContent = currentQuestion.question;
  textA.textContent = currentQuestion.options.A;
  textB.textContent = currentQuestion.options.B;
  textC.textContent = currentQuestion.options.C;
  textD.textContent = currentQuestion.options.D;

  // Reset answer buttons
  [btnA, btnB, btnC, btnD].forEach(btn => {
    btn.classList.remove('is-correct', 'is-user-wrong', 'dimmed');
    btn.disabled = false;
  });

  revealBox.classList.remove('active');

  // Setup Timer
  if (timerDuration > 0) {
    timerWrap.style.display = 'flex';
    timeLeft = timerDuration;
    timerDisplay.textContent = timeLeft;
    timerBar.classList.remove('hurry');
    updateTimerCircle(1);

    questionStartTime = Date.now();
    const totalCirc = 2 * Math.PI * 30; // 188.4

    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      const frac = Math.max(0, timeLeft / timerDuration);
      updateTimerCircle(frac);

      if (timeLeft <= 5 && timeLeft > 0) {
        timerBar.classList.add('hurry');
        sound.hurryTick();
      } else if (timeLeft > 0) {
        sound.tick();
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeout();
      }
    }, 1000);
  } else {
    timerWrap.style.display = 'none';
  }
}

function updateTimerCircle(fraction) {
  const circumference = 188.4;
  const offset = circumference * (1 - fraction);
  timerBar.style.strokeDashoffset = offset;
}

function handleAnswer(selectedOpt) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const isCorrect = selectedOpt === currentQuestion.answer;
  const timeTaken = timerDuration > 0 ? (timerDuration - timeLeft) : 2;

  // Lock buttons
  [btnA, btnB, btnC, btnD].forEach(btn => btn.disabled = true);

  // Kahoot points calculation
  let points = 0;
  if (isCorrect) {
    streak++;
    if (streak > maxStreak) maxStreak = streak;
    correctCount++;

    const speedBonusRatio = timerDuration > 0 ? (timeLeft / timerDuration) : 0.8;
    points = Math.round(500 + 500 * speedBonusRatio + (streak > 1 ? streak * 50 : 0));
    score += points;

    sound.correct();
    if (streak >= 3) sound.streakBonus();

    feedbackStatus.className = 'feedback-status correct';
    feedbackStatus.innerHTML = `<span>✓ CORRECT!</span>`;
    feedbackPoints.textContent = `+${points} pts`;
  } else {
    streak = 0;
    missedQuestions.push({
      q: currentQuestion,
      userChoice: selectedOpt
    });

    sound.wrong();
    feedbackStatus.className = 'feedback-status wrong';
    feedbackStatus.innerHTML = `<span>✗ INCORRECT</span>`;
    feedbackPoints.textContent = `+0 pts`;
  }

  // Highlight choices
  highlightAnswers(currentQuestion.answer, selectedOpt);

  // Show explanation
  showExplanation();

  scoreVal.textContent = score.toLocaleString();
  streakPill.textContent = `🔥 Streak: ${streak}`;
}

function handleTimeout() {
  if (answered) return;
  answered = true;
  streak = 0;

  missedQuestions.push({
    q: currentQuestion,
    userChoice: 'None (Time out)'
  });

  sound.timeOut();
  [btnA, btnB, btnC, btnD].forEach(btn => btn.disabled = true);

  feedbackStatus.className = 'feedback-status timeout';
  feedbackStatus.innerHTML = `<span>⏰ TIME'S UP!</span>`;
  feedbackPoints.textContent = `+0 pts`;

  highlightAnswers(currentQuestion.answer, null);
  showExplanation();
}

function highlightAnswers(correctAns, userAns) {
  const map = { 'A': btnA, 'B': btnB, 'C': btnC, 'D': btnD };

  // Highlight correct answer
  if (map[correctAns]) {
    map[correctAns].classList.add('is-correct');
  }

  // Highlight user mistake
  if (userAns && userAns !== correctAns && map[userAns]) {
    map[userAns].classList.add('is-user-wrong');
  }

  // Dim remaining
  ['A', 'B', 'C', 'D'].forEach(letter => {
    if (letter !== correctAns && letter !== userAns) {
      if (map[letter]) map[letter].classList.add('dimmed');
    }
  });
}

function showExplanation() {
  if (currentQuestion.explanation && currentQuestion.explanation.trim()) {
    explanationBox.style.display = 'block';
    explanationText.textContent = currentQuestion.explanation;
  } else {
    explanationBox.style.display = 'none';
  }
  revealBox.classList.add('active');
}

function nextQuestion() {
  sound.buttonClick();
  currentIndex++;
  if (currentIndex < activeQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// Results Screen
function showResults() {
  clearInterval(timerInterval);
  sound.gameFinish();
  switchView('results');

  const total = activeQuestions.length;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  document.getElementById('final-score').textContent = score.toLocaleString();
  document.getElementById('final-accuracy').textContent = `${accuracy}%`;
  document.getElementById('final-correct').textContent = `${correctCount} / ${total}`;
  document.getElementById('final-streak').textContent = maxStreak;

  const retryBtn = document.getElementById('btn-retry-missed');
  const missedWrapper = document.getElementById('missed-wrapper');
  const missedList = document.getElementById('missed-list');
  const missedCountEl = document.getElementById('missed-count');

  if (missedQuestions.length > 0) {
    retryBtn.style.display = 'inline-flex';
    missedWrapper.style.display = 'block';
    missedCountEl.textContent = missedQuestions.length;

    missedList.innerHTML = '';
    missedQuestions.forEach(item => {
      const q = item.q;
      const card = document.createElement('div');
      card.className = 'missed-card';
      card.innerHTML = `
        <div class="missed-card-header">
          <span class="missed-tag">${q.id}</span>
          <span class="missed-q-text">${q.question}</span>
        </div>
        <div class="missed-answers-row">
          <div>Your Answer: <span class="user-ans-highlight">${item.userChoice} - ${q.options[item.userChoice] || 'Timed out'}</span></div>
          <div>Correct Answer: <span class="correct-ans-highlight">${q.answer} - ${q.options[q.answer]}</span></div>
          ${q.explanation ? `<div style="color:rgba(255,255,255,0.7);font-size:0.82rem;margin-top:4px;">💡 ${q.explanation}</div>` : ''}
        </div>
      `;
      missedList.appendChild(card);
    });
  } else {
    retryBtn.style.display = 'none';
    missedWrapper.style.display = 'none';
  }
}

function restartQuiz() {
  startQuiz();
}

function retryMissed() {
  if (missedQuestions.length === 0) return;
  sound.buttonClick();
  activeQuestions = missedQuestions.map(m => m.q).sort(() => Math.random() - 0.5);
  currentIndex = 0;
  score = 0;
  streak = 0;
  maxStreak = 0;
  correctCount = 0;
  missedQuestions = [];

  switchView('quiz');
  loadQuestion();
}

// Keyboard shortcuts (1, 2, 3, 4, A, B, C, D, Space / Enter)
window.addEventListener('keydown', (e) => {
  if (quizScreen.classList.contains('active')) {
    if (!answered) {
      if (e.key === '1' || e.key.toLowerCase() === 'a') handleAnswer('A');
      else if (e.key === '2' || e.key.toLowerCase() === 'b') handleAnswer('B');
      else if (e.key === '3' || e.key.toLowerCase() === 'c') handleAnswer('C');
      else if (e.key === '4' || e.key.toLowerCase() === 'd') handleAnswer('D');
    } else {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextQuestion();
      }
    }
  }
});

// Init on boot
initTopics();
