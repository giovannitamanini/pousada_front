async function buscarTodasEstadias(event) {
    event.preventDefault();
    let response = await fetch('http://localhost:8080/estadias');

    if (!response.ok) {
        let errorMessage = await response.json();
        alert(errorMessage.message);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();

    var estadiaResultados = document.getElementById('estadiaResultados');
    estadiaResultados.innerHTML = '';

    for (let estadia of data) {
        var checkIn = new Date(estadia.checkIn);
        var checkOut = new Date(estadia.checkOut);

        let hospede = await buscarHospedePorId(estadia.idHospede);

        estadiaResultados.innerHTML += '<b>Estadia:</b> ' + estadia.id + '<br>' +
            'Status: ' + estadia.statusEstadia + '<br>' + 
            'ID Hóspede: ' + estadia.idHospede + ' - ' + hospede.nome + ' ' + hospede.sobrenome + ' / CPF: ' + hospede.cpf + '<br>' + 
            'ID Acomodação: ' + estadia.idAcomodacao + '<br>' +
            'ID Reserva: ' + estadia.idReserva + '<br>' +
            'CheckIn: ' + checkIn.toLocaleDateString() + '<br>' + 
            'CheckOut: ' + checkOut.toLocaleDateString() + '<br>' +
            'Custo: R$' + estadia.custo + '<br><br>';
    }
}

async function buscarEstadiasEmAndamento(event) {
    event.preventDefault();
    let response = await fetch('http://localhost:8080/estadias/em_andamento');
    
    if (!response.ok) {
        let errorMessage = await response.json();
        alert(errorMessage.message);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();

    var estadiaResultados = document.getElementById('estadiaResultados');
    estadiaResultados.innerHTML = '';

    for (let estadia of data) {
        var checkIn = new Date(estadia.checkIn);
        var checkOut = new Date(estadia.checkOut);

        let hospede = await buscarHospedePorId(estadia.idHospede);

        estadiaResultados.innerHTML += '<b>Estadia:</b> ' + estadia.id + '<br>' +
            'Status: ' + estadia.statusEstadia + '<br>' + 
            'ID Hóspede: ' + estadia.idHospede + ' - ' + hospede.nome + ' ' + hospede.sobrenome + ' / CPF: ' + hospede.cpf + '<br>' + 
            'ID Acomodação: ' + estadia.idAcomodacao + '<br>' +
            'ID Reserva: ' + estadia.idReserva + '<br>' +
            'CheckIn: ' + checkIn.toLocaleDateString() + '<br>' + 
            'CheckOut: ' + checkOut.toLocaleDateString() + '<br>' +
            'Custo: R$' + estadia.custo + '<br><br>';
    }
}

function finalizarEstadiaPorId(event) {
    event.preventDefault();
    var id = document.getElementById('idEstadia').value;
    fetch('http://localhost:8080/estadias/' + id, {
        method: 'PUT'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        alert("Estadia finalizada com sucesso!")
    });
}

function buscarHospedePorId(idHospede) {
    return fetch('http://localhost:8080/hospedes/' + idHospede)
    .then(function(response) {
        return response.json();
    }) 
    .then(function(data) {
        let hospede = {
            cpf: data.cpf,
            nome: data.nome,
            sobrenome: data.sobrenome
        };
        return hospede;
    });
}
