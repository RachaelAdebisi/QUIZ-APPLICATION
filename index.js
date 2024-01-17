const container = document.querySelector('.container')
const questionContainer = document.querySelector('.questions')
const answers = document.querySelector('.answers')
const results = document.querySelector('.game-ended')
const timerView = document.querySelector('.timer')
const nextBtn = document.querySelector('.next')
const checkAnsBtn = document.querySelector('.check-answer')
const isCorrect = document.querySelector('.is-correct')

let currentQuestion = 0
let selectedOption = ''
let score = 0
let totalScore = 0
let timer = 120

const questions = [
    {
        question: 'Javascript is an _______ language?',
        options: [
            { value: 'object-based', correct: 1 },
            { value: 'Markup', correct: 2 },
            { value: 'object-oriented', correct: 3 },
            { value: 'procedural', correct: 4 }
        ],
    },
    {
        question: 'Which of the following keyword is used to define a variable in javascript?',
        options: [
            { value: 'both let and var', correct: 3 },
            { value: 'let', correct: 2 },
            { value: 'var', correct: 1 },
            { value: 'none', correct: 4 }
        ],
    },

    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        options: [
            { value: 'getElementsbysymbols', correct: 1 },
            { value: 'getElementsbyname', correct: 2 },
            { value: 'getElementbyid()', correct: 3 },
            { value: 'getElementbyhover', correct: 4 }
        ],
    },

    {
        question: 'Upon encountering empty statements, what does the Javascript interpreter do??',
        options: [
            { value: 'Throws an arror', correct: 2 },
            { value: 'Ignore the statements', correct: 3 },
            { value: 'Gives a warning', correct: 1 },
            { value: 'None', correct: 4 }
        ],
    },

    {
        question: 'How can a datatype be declared to be a constant type?',
        options: [
            { value: 'constant', correct: 4 },
            { value: 'var', correct: 2 },
            { value: 'let', correct: 1 },
            { value: 'const', correct: 3 }
        ],
    },

    {
        question: 'When the switch statement matches the expression with the given labels, how is the comparison done?',
        options: [
            { value: 'Both the value of the expression and its datatype is compared', correct: 3 },
            { value: 'Only the datatype of the expression is compared', correct: 2 },
            { value: 'Only the value of the expression is compared', correct: 1 },
            { value: 'None', correct: 4 }
        ],
    },

    {
        question: 'What keyword is used to check whether a given property is valid or not?',
        options: [
            { value: 'in', correct: 3 },
            { value: 'is in', correct: 2 },
            { value: 'exists', correct: 1 },
            { value: 'lies', correct: 4 }
        ],
    },

    {
        question: 'What is the use of the <nonscript> tag in Javascript?',
        options: [
            { value: 'Clears all cookies and cache', correct: 1 },
            { value: 'none', correct: 2 },
            { value: 'The content is displayed by non-Javascript browsers only', correct: 3 },
            { value: 'accepts cookies', correct: 4 }
        ],
    },

    {
        question: 'What does the Javascript "debugger" statement do?',
        options: [
            { value: 'It wil debug all the error in the program at runtime', correct: 4 },
            { value: 'It will debug error in the current statement if any', correct: 2 },
            { value: 'none', correct: 1 },
            { value: 'It acts as a breakpoint in a program', correct: 3 }
        ],
    },

    {
        question: 'What will beb the output of the followiwng code snippet? var a = true + true + true * 3;',
        options: [
            { value: '5', correct: 3 },
            { value: '0', correct: 2 },
            { value: '3', correct: 1 },
            { value: 'Error', correct: 4 }
        ],
    },

    {
        question: 'What will be the output of the following code snippet? print(typeof(NaN));',
        options: [
            { value: 'Object', correct: 2 },
            { value: 'Number', correct: 3 },
            { value: 'String', correct: 1 },
            { value: 'None', correct: 4 }
        ],
    },

    {
        question: 'What does the toLocateString() method do in JS?',
        options: [
            { value: 'Returns a localised object representation', correct: 1 },
            { value: 'Returns a parsed string', correct: 2 },
            { value: 'returns a localised dstring representation of an object', correct: 3 },
            { value: 'None', correct: 4 }
        ],
    },

    {
        question: 'The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage is called?',
        options: [
            { value: 'Object serialization', correct: 3 },
            { value: 'Object encapsulation', correct: 2 },
            { value: 'Object inheritance', correct: 1 },
            { value: 'None', correct: 4 }
        ],
    },
]

const questionsMap = questions.map((item, index) => {
    return `
    <div class="question">
        <div>
            <p>${index + 1}. ${item.question}</p>
        </div>
        <div class="options">
            ${item.options.map((item) => {
                return `
                <div class="option-item">
                    <input type="radio" name='options' id=${item.correct} class="option-item" oninput="choose(event)"> 
                    <label for="${item.correct}">${item.value}</label>
                </div>
                `
            }).sort(() => 0.5 - Math.random()).join('')}
        </div>
    </div>
    `
})

const answersMap = questions.map((item, index) => {
    return `
    <div class="question">
        <div>
            <p>${index + 1}. ${item.question}</p>
        </div>
        <div class="options">
            ${item.options.map(v => `<div class='option-item__review' style="${v.correct === 3 ? 'background: green;' : 'background: tomato;'}">${v.value}</div>`).join(' ')}
        </div>
    </div>
    `
})

questionContainer.innerHTML = questionsMap[currentQuestion]

function choose(e) {
    checkAnsBtn.disabled = false
    if (e.target.id === '3') {
        score = 1
        isCorrect.textContent = 'Answer is correct'
    } else {
        score = 0
        isCorrect.textContent = 'Answer is not correct'
    }
}

function next() {
    currentQuestion += 1
    questionContainer.innerHTML = questionsMap[currentQuestion]
    totalScore += score;
    isCorrect.classList.add('hide')
    nextBtn.disabled = true
    checkAnsBtn.disabled = true

    if (currentQuestion > questions.length - 1) {
        displayResult()
        clearInterval(timeLeft)
    }
}

function checkAnswer() {
    isCorrect.classList.remove('hide')
    nextBtn.disabled = false
    document.querySelector('.options').style.pointerEvents = 'none'
}

function displayResult() {
    container.classList.add('hide')
    results.classList.remove('hide')

    results.innerHTML = `
        <div class="score">
            <p>You got ${totalScore}/${questions.length}</p>
            <p>Review correct answers: </p>
            <div>
                ${answersMap}
            </div>
        </div>
    `
    timerView.innerHTML = ''
}

const timeLeft = setInterval(() => {
    timer--
    timerView.innerHTML = timer + 's'
    if (timer === 0) {
        clearInterval(timeLeft)
        displayResult()
        timerView.innerHTML = ''
    }
}, 1000)
