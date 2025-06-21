const questions = [
    {
        question: "Wie heißt die Hauptstadt von Frankreich?",
        answers: ["Paris", "London", "Rom", "Berlin"],
        correct: 0
    },
    {
        question: "Welcher Planet ist der Sonne am nächsten?",
        answers: ["Merkur", "Venus", "Erde", "Mars"],
        correct: 0
    },
    {
        question: "In welchem Jahr fiel die Berliner Mauer?",
        answers: ["1987", "1988", "1989", "1990"],
        correct: 2
    },
    {
        question: "Wer malte die Mona Lisa?",
        answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correct: 0
    },
    {
        question: "Welches chemische Element hat das Symbol O?",
        answers: ["Gold", "Wasserstoff", "Sauerstoff", "Kohlenstoff"],
        correct: 2
    },
    {
        question: "Wie viele Kontinente gibt es auf der Erde?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Wer schrieb 'Faust'?",
        answers: ["Friedrich Schiller", "Johann Wolfgang von Goethe", "Thomas Mann", "Bertolt Brecht"],
        correct: 1
    },
    {
        question: "Welche Stadt wird auch Big Apple genannt?",
        answers: ["Los Angeles", "San Francisco", "New York", "Chicago"],
        correct: 2
    },
    {
        question: "Was ist die h\u00f6chste Spielkarte im Poker?",
        answers: ["Ass", "K\u00f6nig", "Dame", "Zehn"],
        correct: 0
    },
    {
        question: "Welcher ist der l\u00e4ngste Fluss der Welt?",
        answers: ["Nil", "Amazonas", "Yangtse", "Mississippi"],
        correct: 1
    },
    {
        question: "Aus wie vielen Farben besteht der Regenbogen?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Wie hei\u00dft der deutsche Bundeskanzler im Jahr 2024?",
        answers: ["Angela Merkel", "Olaf Scholz", "Gerhard Schr\u00f6der", "Helmut Kohl"],
        correct: 1
    },
    {
        question: "In welchem Land stehen die Pyramiden von Gizeh?",
        answers: ["Mexiko", "Peru", "\u00c4gypten", "Indien"],
        correct: 2
    },
    {
        question: "Welches Tier ist das gr\u00f6\u00dfte landlebende?",
        answers: ["Elefant", "Giraffe", "Nashorn", "Nilpferd"],
        correct: 0
    },
    {
        question: "Wie viele Spieler hat eine Fu\u00dfballmannschaft auf dem Feld?",
        answers: ["9", "10", "11", "12"],
        correct: 2
    }
];

const prizes = [
    "100 €",
    "200 €",
    "300 €",
    "500 €",
    "1.000 €",
    "2.000 €",
    "4.000 €",
    "8.000 €",
    "16.000 €",
    "32.000 €",
    "64.000 €",
    "125.000 €",
    "250.000 €",
    "500.000 €",
    "1.000.000 €"
];

let currentQuestion = 0;
let usedFifty = false;
let usedPhone = false;
let usedAudience = false;

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('prize').innerText = 'Gewinnstufe: ' + prizes[currentQuestion];
    document.getElementById('question').innerText = q.question;

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    q.answers.forEach((ans, index) => {
        const btn = document.createElement('button');
        btn.innerText = ans;
        btn.onclick = () => answer(index);
        answersDiv.appendChild(btn);
    });

    document.getElementById('message').innerText = '';
}

function answer(index) {
    const q = questions[currentQuestion];
    if (index === q.correct) {
        document.getElementById('message').innerText = 'Super, n\u00e4chste Frage';
        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(showQuestion, 1500);
        } else {
            document.getElementById('message').innerText = 'Herzlichen Gl\u00fcckwunsch! Sie haben 1.000.000 € gewonnen!';
            document.getElementById('answers').innerHTML = '';
        }
    } else {
        document.getElementById('message').innerText = 'Leider falsch';
        document.getElementById('answers').querySelectorAll('button').forEach(b => b.disabled = true);
    }
}

function useFifty() {
    if (usedFifty) return;
    usedFifty = true;
    document.getElementById('fifty').disabled = true;
    const q = questions[currentQuestion];
    let options = [0,1,2,3].filter(i => i !== q.correct);
    for (let i = 0; i < 2; i++) {
        const remove = options.splice(Math.floor(Math.random() * options.length), 1)[0];
        const btn = document.getElementById('answers').children[remove];
        if (btn) btn.disabled = true;
    }
}

function usePhone() {
    if (usedPhone) return;
    usedPhone = true;
    document.getElementById('phone').disabled = true;
    const q = questions[currentQuestion];
    document.getElementById('message').innerText = 'Telefonjoker: Ich glaube, die richtige Antwort ist "' + q.answers[q.correct] + '".';
}

function useAudience() {
    if (usedAudience) return;
    usedAudience = true;
    document.getElementById('audience').disabled = true;
    const q = questions[currentQuestion];
    const percCorrect = 60 + Math.floor(Math.random() * 21); // 60-80%
    const remaining = 100 - percCorrect;
    const percOthers = [0,0,0];
    for (let i = 0; i < 3; i++) {
        percOthers[i] = i === 2 ? remaining - percOthers[0] - percOthers[1] : Math.floor(Math.random() * (remaining - (2 - i)));
    }
    let msg = 'Publikum: ';
    let idx = 0;
    for (let i=0;i<4;i++) {
        if (i===q.correct) {
            msg += q.answers[i] + ' ' + percCorrect + '% ';
        } else {
            msg += q.answers[i] + ' ' + percOthers[idx++] + '% ';
        }
    }
    document.getElementById('message').innerText = msg;
}

window.onload = showQuestion;
