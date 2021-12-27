var div;

/* Reset du score */

const resetBtn = document.getElementById('reset');
resetBtn.onclick = function () {
    fetch('http://localhost:3000/reset/', {
        method: 'PATCH'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getPoints')
    .then(response => response.json())
    .then(data => loadScoreEquipe(data['data']));
    
});

/* Récupération des pts lorsque l'on charge la page */

function loadScoreEquipe(data) {
    const equipe1 = document.querySelector('#scoreEquipe1');
    const equipe2 = document.querySelector('#scoreEquipe2');
    const equipe3 = document.querySelector('#scoreEquipe3');

    let equipe1Html = "";
    let equipe2Html = "";
    let equipe3Html = "";
    data.forEach(function ({Equipe1, Equipe2, Equipe3}) {
        equipe1Html += `${Equipe1}`;
        equipe2Html += `${Equipe2}`;
        equipe3Html += `${Equipe3}`;
    });
    equipe1.innerHTML = equipe1Html;
    equipe2.innerHTML = equipe2Html;
    equipe3.innerHTML = equipe3Html;
}

/* Affichage du modal */

$('#afficherQuestion').on('show.bs.modal', function(e) {
    var questionId = $(e.relatedTarget).data('question');
    var theme = $(e.relatedTarget).data('theme');
    var point = $(e.relatedTarget).data('point');
    var themeAfficher = "";
    var choix = div || document.querySelector("#choixReponse");
    var duo = div || document.querySelector("#propositionReponseDuo");
    var carre = div || document.querySelector("#propositionReponseCarre");
    var cash = div || document.querySelector("#propositionReponseCash");
    var reponse = div || document.querySelector("#reponseQuestion");
    var musique = div || document.querySelector("#musiqueQuestion");
    document.querySelector("#reponseCarre1").classList.remove("btn-danger","btn-success");
    document.querySelector("#reponseCarre2").classList.remove("btn-danger","btn-success");
    document.querySelector("#reponseCarre3").classList.remove("btn-danger","btn-success");
    document.querySelector("#reponseCarre4").classList.remove("btn-danger","btn-success");
    document.querySelector("#reponseDuo1").classList.remove("btn-danger","btn-success");
    document.querySelector("#reponseDuo2").classList.remove("btn-danger","btn-success");
    document.querySelector("#reponseCarre1").classList.add("btn-light");
    document.querySelector("#reponseCarre2").classList.add("btn-light");
    document.querySelector("#reponseCarre3").classList.add("btn-light");
    document.querySelector("#reponseCarre4").classList.add("btn-light");
    document.querySelector("#reponseDuo1").classList.add("btn-light");
    document.querySelector("#reponseDuo2").classList.add("btn-light");
    choix.style.display = "block";
    duo.style.display = "none";
    carre.style.display = "none";
    cash.style.display = "none";
    reponse.style.display = "none";
    musique.style.display = "none";
    document.querySelector("#pixelImage").style.display = "none";
    document.querySelector("#imageQuestion").style.display = "block";
    document.querySelector("#imageQuestion").src= "";

    switch (theme){
        case "CultureG":
            themeAfficher = "Culture Générale";
            break;
        case "Dessin":
            themeAfficher = "Dessin Animée";
            break;
        case "Musique":
            themeAfficher = theme;
            document.querySelector("#imageQuestion").style.display = "none";
            musique.style.display = "block";
            break;
        case "Pixel":
            themeAfficher = theme;
            choix.style.display = "none";
            cash.style.display = "block";
            document.querySelector("#imageQuestion").style.display = "none";
            document.querySelector("#btn-AfficherReponse").addEventListener("click", function() {
                let reponse = div || document.querySelector("#reponseQuestion");
                reponse.style.display = "block";
            });
            break;
        default:
            themeAfficher = theme;
    };
    const valeurHeader = document.querySelector('#numQuestion');
    let valeurHeaderHtml = '';
    valeurHeaderHtml += `${themeAfficher} - Question : ${questionId} pour ${point} pts `;
    valeurHeader.innerHTML = valeurHeaderHtml;

    fetch('http://localhost:3000/getQuestion/' + theme + '/' + point)
    .then(response => response.json())
    .then(data => loadQuestion(data['data']));
});

/* Affichage de la question dans le modal */

function loadQuestion(data){
    const intituleQuestion = document.querySelector('#questionAposer');
    const reponseQuestion = document.querySelector('#reponseQuestion');
    const pointsQuestion = document.querySelector('#pointsQuestion');
    const proposition1Question = document.querySelector('#reponseCarre1');
    const proposition2Question = document.querySelector('#reponseCarre2');
    const proposition3Question = document.querySelector('#reponseCarre3');
    const proposition4Question = document.querySelector('#reponseCarre4');
    let array = [];
    let intituleQuestionHtml = "";
    let reponseQuestionHtml = "";
    let proposition1QuestionHtml = "";
    let proposition2QuestionHtml = "";
    let proposition3QuestionHtml = "";
    let proposition4QuestionHtml = "";
    let themeQuestion = "";
    let pointsQuestionHtml = "";
    console.log(data);
    data.forEach(function ({idQuestion, question, reponse1, reponse2, reponse3, reponse4, points, theme, lien}) {
        array = [reponse1,reponse2, reponse3, reponse4];
        console.log(array);
        array = shuffleArray(array);
        intituleQuestionHtml += question;
        reponseQuestionHtml += reponse1;
        if (theme === "Musique") {
            document.querySelector("#musiqueLecteur").src = lien;
        } else {
            document.querySelector("#imageQuestion").src=lien;
        }
        if (theme === "Pixel") {
            proposition1QuestionHtml += reponse1;
            document.querySelector("#pixelImage").src=lien;
        } else {
            proposition1QuestionHtml += array[0];
            proposition2QuestionHtml += array[1];
            proposition3QuestionHtml += array[2];
            proposition4QuestionHtml += array[3];
        }
        themeQuestion = theme;
        pointsQuestionHtml += points;
    });
    intituleQuestion.innerHTML = intituleQuestionHtml;
    proposition1Question.innerHTML = proposition1QuestionHtml;
    proposition2Question.innerHTML = proposition2QuestionHtml;
    proposition3Question.innerHTML = proposition3QuestionHtml;
    proposition4Question.innerHTML = proposition4QuestionHtml;
    reponseQuestion.innerHTML = reponseQuestionHtml;
    pointsQuestion.innerHTML = pointsQuestionHtml;
    if (themeQuestion === "Pixel") {
        pixelQuestion();
    } else {
        let canvas = document.getElementById('pixelate-canvas-0');
        if (canvas) {
            canvas.style.display='none';
        }
    }
}

/* Random l'ordre des réponses à afficher */

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

/* Affichage du block réponse pour CASH */

document.querySelector("#cash").addEventListener("click", function() {
    let choix = div || document.querySelector("#choixReponse");
    let duo = div || document.querySelector("#propositionReponseDuo");
    let carre = div || document.querySelector("#propositionReponseCarre");
    let cash = div || document.querySelector("#propositionReponseCash");

    choix.style.display = "none";
    duo.style.display = "none";
    carre.style.display = "none";
    cash.style.display = "block";
    document.querySelector("#btn-AfficherReponse").addEventListener("click", function() {
        let reponse = div || document.querySelector("#reponseQuestion");
        reponse.style.display = "block";
    });
});

/* Affichage du block réponse pour DUO */

document.querySelector("#duo").addEventListener("click", function() {
    let choix = div || document.querySelector("#choixReponse");
    let duo = div || document.querySelector("#propositionReponseDuo");
    let carre = div || document.querySelector("#propositionReponseCarre");
    let cash = div || document.querySelector("#propositionReponseCash");

    choix.style.display = "none";
    duo.style.display = "block";
    carre.style.display = "none";
    cash.style.display = "none";

    let reponse1 = document.querySelector("#reponseCarre1").innerText;
    let reponse2 = document.querySelector("#reponseCarre2").innerText;
    let reponse3 = document.querySelector("#reponseCarre3").innerText;
    let reponse4 = document.querySelector("#reponseCarre4").innerText;
    let reponse = document.querySelector("#reponseQuestion").innerText;

    console.log (reponse1);
    let array = [reponse1, reponse2, reponse3, reponse4];
    const random = Math.floor(Math.random() * array.length);
    const random1 = Math.floor(Math.random() * array.length);

    const proposition1Question = document.querySelector('#reponseDuo1');
    const proposition2Question = document.querySelector('#reponseDuo2');

    if (array[random] !== array[random1]) {
        if (array[random] !== reponse && array[random1] !== reponse) {
            proposition1Question.innerHTML = array[random];
            proposition2Question.innerHTML = reponse;
        } else {
            proposition1Question.innerHTML = array[random];
            proposition2Question.innerHTML = array[random1];
        } 
    } else {
        proposition1Question.innerHTML = reponse;
        proposition2Question.innerHTML = array[random];
    };
});

/* Affichage du block CARRE pour les réponses. */

document.querySelector("#carre").addEventListener("click", function() {
    let choix = div || document.querySelector("#choixReponse");
    let duo = div || document.querySelector("#propositionReponseDuo");
    let carre = div || document.querySelector("#propositionReponseCarre");
    let cash = div || document.querySelector("#propositionReponseCash");

    choix.style.display = "none";
    duo.style.display = "none";
    carre.style.display = "block";
    cash.style.display = "none";
});

/* Pixel */

function doSetTimeout(i){
    setTimeout(pixelQuestion(i), 1000);
}

async function pixelQuestion(){
        for (let nombre = 0; nombre < 21; nombre++) {
            await new Promise( r => setTimeout(r, 1000));
            $('.pixelate').pixelate({
                'focus': 0.05 * nombre
            });
        }
}

/* Récupération des pts */

document.querySelector("#closeModal").addEventListener("click", function() {
    fetch('http://localhost:3000/getPoints')
    .then(response => response.json())
    .then(data => loadScoreEquipe(data['data']));
});



/* Enregistrement des points */

document.querySelector("#equipe1").addEventListener("click", function() {
    let equipe1 = document.querySelector("#scoreEquipe1").innerText
    let equipe2 = document.querySelector("#scoreEquipe2").innerText
    let equipe3 = document.querySelector("#scoreEquipe3").innerText
    let points = document.querySelector("#pointsQuestion").innerText
    let duo = div || document.querySelector("#propositionReponseDuo");
    let carre = div || document.querySelector("#propositionReponseCarre");
    equipe1 = Number.parseInt(equipe1);
    equipe2 = Number.parseInt(equipe2);
    equipe3 = Number.parseInt(equipe3);
    points = Number.parseInt(points);

    if (duo.style.display === 'block'){
        points = points / 4;
        equipe1 = equipe1 + points;
    } else if (carre.style.display === 'block'){
        points = points / 2;
        equipe1 = equipe1 + points;
    } else {
        equipe1 = equipe1 + points;
    }
    

    fetch('http://localhost:3000/addPoints/' + equipe1 + '/' + equipe2 + '/' + equipe3 + '/',{
        method: 'PATCH'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            /* location.reload(); */
        }
    });
});
document.querySelector("#equipe2").addEventListener("click", function() {
    let equipe1 = document.querySelector("#scoreEquipe1").innerText
    let equipe2 = document.querySelector("#scoreEquipe2").innerText
    let equipe3 = document.querySelector("#scoreEquipe3").innerText
    let points = document.querySelector("#pointsQuestion").innerText
    let duo = div || document.querySelector("#propositionReponseDuo");
    let carre = div || document.querySelector("#propositionReponseCarre");
    equipe1 = Number.parseInt(equipe1);
    equipe2 = Number.parseInt(equipe2);
    equipe3 = Number.parseInt(equipe3);
    points = Number.parseInt(points);

    if (duo.style.display === 'block'){
        points = points / 4;
        equipe2 = equipe2 + points;
    } else if (carre.style.display === 'block'){
        points = points / 2
        equipe2 = equipe2 + points;
    } else {
        equipe2 = equipe2 + points;
    }

    fetch('http://localhost:3000/addPoints/' + equipe1 + '/' + equipe2 + '/' + equipe3 + '/',{
        method: 'PATCH'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            /* location.reload(); */
        }
    });
});
document.querySelector("#equipe3").addEventListener("click", function() {
    let equipe1 = document.querySelector("#scoreEquipe1").innerText
    let equipe2 = document.querySelector("#scoreEquipe2").innerText
    let equipe3 = document.querySelector("#scoreEquipe3").innerText
    let points = document.querySelector("#pointsQuestion").innerText
    let duo = div || document.querySelector("#propositionReponseDuo");
    let carre = div || document.querySelector("#propositionReponseCarre");
    equipe1 = Number.parseInt(equipe1);
    equipe2 = Number.parseInt(equipe2);
    equipe3 = Number.parseInt(equipe3);
    points = Number.parseInt(points);

    if (duo.style.display === 'block'){
        points = points / 4;
        equipe3 = equipe3 + points;
    } else if (carre.style.display === 'block'){
        points = points / 2
        equipe3 = equipe3 + points;
    } else {
        equipe3 = equipe3 + points;
    }


    fetch('http://localhost:3000/addPoints/' + equipe1 + '/' + equipe2 + '/' + equipe3 + '/',{
        method: 'PATCH'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            /* location.reload(); */
        }
    });
});

/* Vérification de la bonne réponse */
/* Duo */
document.querySelector("#reponseDuo1").addEventListener("click", function() {
    document.querySelector("#reponseDuo1").classList.remove("btn-light");
    document.querySelector("#reponseDuo2").classList.remove("btn-light");
    if (document.querySelector("#reponseDuo1").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseDuo1").classList.add("btn-success");
        document.querySelector("#reponseDuo2").classList.add("btn-danger");
    } else {
        document.querySelector("#reponseDuo1").classList.add("btn-danger");
        document.querySelector("#reponseDuo2").classList.add("btn-success");
    }
});
document.querySelector("#reponseDuo2").addEventListener("click", function() {
    if (document.querySelector("#reponseDuo2").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseDuo1").classList.add("btn-danger");
        document.querySelector("#reponseDuo2").classList.add("btn-success");
    } else {
        document.querySelector("#reponseDuo1").classList.add("btn-success");
        document.querySelector("#reponseDuo2").classList.add("btn-danger");
    }
});
/* Carre */
document.querySelector("#reponseCarre1").addEventListener("click", function() {
    document.querySelector("#reponseCarre1").classList.remove("btn-light");
    document.querySelector("#reponseCarre2").classList.remove("btn-light");
    document.querySelector("#reponseCarre3").classList.remove("btn-light");
    document.querySelector("#reponseCarre4").classList.remove("btn-light");
    if (document.querySelector("#reponseCarre1").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-success");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else if (document.querySelector("#reponseCarre2").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-success");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else if (document.querySelector("#reponseCarre3").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-success");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-success");
    }
});
document.querySelector("#reponseCarre2").addEventListener("click", function() {
    document.querySelector("#reponseCarre1").classList.remove("btn-light");
    document.querySelector("#reponseCarre2").classList.remove("btn-light");
    document.querySelector("#reponseCarre3").classList.remove("btn-light");
    document.querySelector("#reponseCarre4").classList.remove("btn-light");
    if (document.querySelector("#reponseCarre2").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-success");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else if (document.querySelector("#reponseCarre1").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-success");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else if (document.querySelector("#reponseCarre3").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-success");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-success");
    }
});
document.querySelector("#reponseCarre3").addEventListener("click", function() {
    document.querySelector("#reponseCarre1").classList.remove("btn-light");
    document.querySelector("#reponseCarre2").classList.remove("btn-light");
    document.querySelector("#reponseCarre3").classList.remove("btn-light");
    document.querySelector("#reponseCarre4").classList.remove("btn-light");
    if (document.querySelector("#reponseCarre3").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-success");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else if (document.querySelector("#reponseCarre1").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-success");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else if (document.querySelector("#reponseCarre2").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-success");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-success");
    }
});
document.querySelector("#reponseCarre4").addEventListener("click", function() {
    document.querySelector("#reponseCarre1").classList.remove("btn-light");
    document.querySelector("#reponseCarre2").classList.remove("btn-light");
    document.querySelector("#reponseCarre3").classList.remove("btn-light");
    document.querySelector("#reponseCarre4").classList.remove("btn-light");
    if (document.querySelector("#reponseCarre4").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-success");
    } else if (document.querySelector("#reponseCarre1").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-success");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else if (document.querySelector("#reponseCarre2").innerText === document.querySelector("#reponseQuestion").innerText) {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-success");
        document.querySelector("#reponseCarre3").classList.add("btn-danger");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    } else {
        document.querySelector("#reponseCarre1").classList.add("btn-danger");
        document.querySelector("#reponseCarre2").classList.add("btn-danger");
        document.querySelector("#reponseCarre3").classList.add("btn-success");
        document.querySelector("#reponseCarre4").classList.add("btn-danger");
    }
});

