var div;



function afficher(select){
    document.getElementById("cultureG").style.display ="none";
    document.getElementById("pixel").style.display ="none";
    document.getElementById("musique").style.display ="none";
    document.getElementById("dessin").style.display ="none";
    document.getElementById("sport").style.display ="none";
    document.getElementById("voyage").style.display ="none";
    i = select.selectedIndex;
    valeurIndex = select.options[i].value
    console.log(valeurIndex);
    switch (valeurIndex){
        case "cultureG":
            var cultureG = div || document.getElementById("cultureG");
            cultureG.style.display = "block";
            fetch('http://localhost:3000/getCultureG')
            .then(response => response.json())
            .then(data => loadDataTable(data['data'],"cultureG"));
            break;
        case "pixel":
            var pixel = div || document.getElementById("pixel");
            pixel.style.display = "block";
            fetch('http://localhost:3000/getPixel')
            .then(response => response.json())
            .then(data => loadDataTable(data['data'],"pixel"));
            break;
        case "musique":
            var musique = div || document.getElementById("musique");
            musique.style.display = "block";
            fetch('http://localhost:3000/getMusique')
            .then(response => response.json())
            .then(data => loadDataTable(data['data'],"musique"));
            break;
        case "dessin":
            var dessin = div || document.getElementById("dessin");
            dessin.style.display = "block";
            fetch('http://localhost:3000/getDessin')
            .then(response => response.json())
            .then(data => loadDataTable(data['data'],"dessin"));
            break;
        case "sport":
            var sport = div || document.getElementById("sport");
            sport.style.display = "block";
            fetch('http://localhost:3000/getSport')
            .then(response => response.json())
            .then(data => loadDataTable(data['data'],"sport"));
            break;
        case "voyage":
            var voyage = div || document.getElementById("voyage");
            voyage.style.display = "block";
            fetch('http://localhost:3000/getVoyage')
            .then(response => response.json())
            .then(data => loadDataTable(data['data'],"voyage"));
            break;
    }
}


function loadDataTable(data, theme) {
    const table = document.querySelector(`table.${theme} tbody`);
    let tableHtml = "";
    console.log(data);
    data.forEach(function ({idQuestion, question, reponse1, reponse2, reponse3, reponse4, points, theme}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${idQuestion}</td>`;
        tableHtml += `<td>${question}</td>`;
        tableHtml += `<td>${reponse1}</td>`;
        tableHtml += `<td>${reponse2}</td>`;
        tableHtml += `<td>${reponse3}</td>`;
        tableHtml += `<td>${reponse4}</td>`;
        tableHtml += `<td>${points}</td>`;
        tableHtml += `<td><a href="#"><button class="delete-row btn btn-danger" data-id=${idQuestion}><i class="bi bi-trash"></i></button></a></td>`;
        tableHtml += `<td><a href="#"><button class="edit-row btn btn-secondary" data-id=${idQuestion}><i class="bi bi-pencil-square"></i></button></a></td>`;
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;

}

const addBtn = document.getElementById('insertQuestion');

addBtn.onclick = function () {
    const themeInput = document.getElementById('questionTheme').value;
    const questionInput = document.getElementById('questionAjouter').value;
    const reponseInput = document.getElementById('questionReponse').value;
    const propositionInput = document.getElementById('questionProposition').value;
    const proposition2Input = document.getElementById('questionProposition2').value;
    const proposition3Input = document.getElementById('questionProposition3').value;
    const pointInput = document.getElementById('questionPoint').value;
    const lienInput = document.getElementById('questionLien').value;
 

    fetch('http://localhost:3000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ theme : themeInput, question : questionInput, reponse : reponseInput, proposition : propositionInput, proposition2 : proposition2Input, proposition3 : proposition3Input, point : pointInput, lien : lienInput})
    })
    .then(response => response.json());
}

function afficherTypeQuestion(select){
    i = select.selectedIndex;
    valeurIndex = select.options[i].value
    console.log(valeurIndex);
    document.getElementById("questionLien").setAttribute('value', '');
    if (valeurIndex === 'Pixel'){
        var proposition1 = div || document.getElementById("proposition1");
        proposition1.style.display = "none";
        var proposition2 = div || document.getElementById("proposition2");
        proposition2.style.display = "none";
        var proposition3 = div || document.getElementById("proposition3");
        proposition3.style.display = "none";
    } else if (valeurIndex === "Musique") {
        document.getElementById("questionLien").setAttribute('value', '../music/NOMDELAMUSIQUE.mp3');
    } else {
        var proposition1 = div || document.getElementById("proposition1");
        proposition1.style.display = "block";
        var proposition2 = div || document.getElementById("proposition2");
        proposition2.style.display = "block";
        var proposition3 = div || document.getElementById("proposition3");
        proposition3.style.display = "block";
    }
}
