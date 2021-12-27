var div;
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => loadDataTable(data['data']));
    
});

function loadDataTable(data) {
    const table = document.querySelector(`table tbody`);
    let tableHtml = "";
    console.log(data);
    data.forEach(function ({idQuestion, theme, question, reponse1, reponse2, reponse3, reponse4, points}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${idQuestion}</td>`;
        tableHtml += `<td>${theme}</td>`;
        tableHtml += `<td>${question}</td>`;
        tableHtml += `<td>${reponse1}</td>`;
        tableHtml += `<td>${reponse2}</td>`;
        tableHtml += `<td>${reponse3}</td>`;
        tableHtml += `<td>${reponse4}</td>`;
        tableHtml += `<td>${points}</td>`;
        tableHtml += `<td><a href="#"><button class="delete-row btn btn-danger" data-id=${idQuestion}><i class="bi bi-trash"></i></button></a></td>`;
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;

}

document.querySelector('table tbody').addEventListener('click', function(event){
    console.log(event.target);
    if (event.target.className === "delete-row btn btn-danger") {
        console.log("passe ici");
        deleteRowById(event.target.dataset.id); 
    }
})

function deleteRowById(id){
    fetch('http://localhost:3000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}