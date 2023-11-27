function criarReserva() {
    const idHospede = document.getElementById('idHospede').value;
    const idAcomodacao = document.getElementById('idAcomodacao').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const statusPagamento = document.querySelector('input[name="statusPagamento"]:checked').value;

    // Criar objeto JSON com os dados do hóspede
    const reservaData = {
        idHospede,
        idAcomodacao,
        checkIn,
        checkOut,
        statusPagamento
    };

    // Enviar dados via requisição HTTP (POST) para o servidor
    fetch('http://localhost:8080/reservas', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(reservaData)
    })
    .then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    })
    .then(data => {
        alert("Cadastro da reserva realizado com sucesso!");
        console.log('Cadastro de reserva realizado com sucesso:', data);
    })
    .catch(error => {
        error.json().then(errorMessage => {
            console.error(errorMessage);
            alert('Erro no cadastro: ' + errorMessage.message);
        });
    });
}

function buscarTodasAcomodacoes() {
    fetch('http://localhost:8080/acomodacoes')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var acomodacaoResultados = document.getElementById('acomodacaoResultados');
        acomodacaoResultados.innerHTML = '';
        data.forEach(function(acomodacao) {
            acomodacaoResultados.innerHTML += acomodacao.id + ' - ' + acomodacao.tipo + '<br>';
        });
    });
}

function buscarHospedesPorNome(event) {
    event.preventDefault();
    var nome = document.getElementById('nomeHospede').value;
    console.log('Nome do hóspede:', nome); 
    fetch('http://localhost:8080/hospedes/nomes/'+nome)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var hospedeResultados = document.getElementById('hospedeResultados');
        hospedeResultados.innerHTML = '';
        data.forEach(function(hospede) {
            hospedeResultados.innerHTML += hospede.id + ' - ' + hospede.nome + ' ' + hospede.sobrenome + ' / CPF: '+ hospede.cpf + '<br>';
        });
    });
}

window.onload = function() {
    buscarTodasAcomodacoes();
}
