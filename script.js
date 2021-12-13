const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question: 'Which of the following zodiac sign is represented by twins?',
		choice1: 'Virgo',
		choice2: 'Gemini',
		choice3: 'Pisces',
        answer: 2,

	
	},
	{
		question: 'What planet rules communication?',
		choice1: 'Mercury',
		choice2: 'Earth',
		choice3: 'Pluto',
		answer: 1,
	},
	{
		question: 'Which zodiac sign is ruled by Venus?',
		choice1: 'Scorpio',
		choice2: 'Libra',
		choice3: 'Aquarius',
		answer: 2,
	},
	{
		question: 'How many signs are there in the zodiac?',
		choice1: '6',
		choice2: '24',
		choice3: '12',
		answer: 3,
	},
	{
		question: 'What is the first astrological sign in the zodiac?',
		choice1: 'Capricorn',
		choice2: 'Sagittarius',
		choice3: 'Aries',
		answer: 3,
	},
	{
		question: 'Which sign is the sister sign to Leo?',
		choice1: 'Aquarius',
		choice2: 'Leo',
		choice3: 'Taurus',
		answer: 1,
	}
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 6;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('/end.html');
	}

	questionCounter++;
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionsIndex];
	question.innerText = currentQuestion.question;

	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionsIndex, 1);

	acceptingAnswers = true;
};

choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let classToApply =
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		if (classToApply === 'correct') {
			incrementScore(SCORE_POINTS);
		}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
};

startGame();
