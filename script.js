class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choiceIndex) {
        return this.answer === choiceIndex;
    }
}


// =========================
// QUESTIONS
// =========================

const questions = [

    new Question(
        "Parmi les réponses suivantes, quelle règle est la n°1 ?",
        [
            "Une arme doit toujours être considérée comme chargée.",
            "Ne jamais pointer ou laisser pointer le canon d’une arme vers un tiers ou quelque chose.",
            "Garder l’index hors de la détente tant que les organes de visée ne sont pas sur l’objectif.",
            "Être sûr de son objectif avant de tirer : A.I.T. (Analyser – Identifier – Traiter)"
        ],
        0
    ),

    new Question(
        "La légitime défense est prévue par quel article du Code pénal ?",
        [
            "Article 122-5",
            "Article 125",
            "Article 225",
            "Aucun de ces articles"
        ],
        0
    )

];

// =========================
// QUIZ
// =========================

class Quiz {

    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    guess(answerIndex) {

        if (this.getCurrentQuestion().isCorrectAnswer(answerIndex)) {
            this.score++;
        }

        this.currentQuestionIndex++;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}


// =========================
// AFFICHAGE
// =========================

const display = {

    elementShown(id, text) {

        const element = document.getElementById(id);

        if (element) {
            element.innerHTML = text;
        }
    },


    endQuiz() {

        const endQuizHTML = `
            <h1>Quiz terminé !</h1>

            <h3>
                Votre score est de :
                ${quiz.score} / ${quiz.questions.length}
            </h3>
        `;

        this.elementShown("question", endQuizHTML);
    },


    question() {

        this.elementShown(
            "question",
            quiz.getCurrentQuestion().text
        );
    },


    choices() {

        const choices = quiz.getCurrentQuestion().choices;

        for (let i = 0; i < choices.length; i++) {

            // Affiche la réponse
            this.elementShown(
                "choice" + i,
                choices[i]
            );


            // Récupère le bouton
            const button = document.getElementById(
                "guess" + i
            );


            // Vérifie que le bouton existe
            if (button) {

                // Supprime un éventuel ancien clic
                button.onclick = null;


                // Ajoute le clic
                button.onclick = function() {

                    quiz.guess(i);

                    quizApp();
                };
            }
        }
    },


    progress() {

        const currentQuestionNumber =
            quiz.currentQuestionIndex + 1;

        this.elementShown(
            "progress",
            "Question " +
            currentQuestionNumber +
            " sur " +
            quiz.questions.length
        );
    }
};


// =========================
// LOGIQUE DU QUIZ
// =========================

function quizApp() {

    if (quiz.hasEnded()) {

        display.endQuiz();

    } else {

        display.question();
        display.choices();
        display.progress();
    }
}


// =========================
// LANCEMENT
// =========================

const quiz = new Quiz(questions);

quizApp();