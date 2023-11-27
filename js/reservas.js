async function buscarTodasReservas(event) {
    event.preventDefault();
    let response = await fetch('http://localhost:8080/reservas');
    
    if (!response.ok) {
        let errorMessage = await response.json();
        alert(errorMessage.message);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();

    var reservaResultados = document.getElementById('reservaResultados');
    reservaResultados.innerHTML = '';

    for (let reserva of data) {
        var checkIn = new Date(reserva.checkIn);
        var checkOut = new Date(reserva.checkOut);

        let hospede = await buscarHospedePorId(reserva.idHospede);

        reservaResultados.innerHTML += '<b>Reserva:</b> ' + reserva.id + '<br>' +
            'Cadastro feito em: ' + reserva.dataHora.toLocaleString() + '<br>' +
            'Status: ' + reserva.statusReserva + '<br>' + 
            'ID Hóspede: ' + reserva.idHospede + ' - ' + hospede.nome + ' ' + hospede.sobrenome + ' / CPF: ' + hospede.cpf + '<br>' + 
            'ID Acomodação: ' + reserva.idAcomodacao + '<br>' +
            'CheckIn: ' + checkIn.toLocaleDateString() + '<br>' + 
            'CheckOut: ' + checkOut.toLocaleDateString() + '<br>' +
            'Custo: R$' + reserva.custo + '<br>' +
            'Status Pagamento:' + reserva.statusPagamento + '<br><br>';
    }
}

async function buscarReservasEmEspera(event) {
    event.preventDefault();
    let response = await fetch('http://localhost:8080/reservas/em_espera');
    
    if (!response.ok) {
        let errorMessage = await response.json();
        alert(errorMessage.message);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();

    var reservaResultados = document.getElementById('reservaResultados');
    reservaResultados.innerHTML = '';

    for (let reserva of data) {
        var checkIn = new Date(reserva.checkIn);
        var checkOut = new Date(reserva.checkOut);

        let hospede = await buscarHospedePorId(reserva.idHospede);

        reservaResultados.innerHTML += '<b>Reserva:</b> ' + reserva.id + '<br>' +
            'Status: ' + reserva.statusReserva + '<br>' + 
            'ID Hóspede: ' + reserva.idHospede + ' - ' + hospede.nome + ' ' + hospede.sobrenome + ' / CPF: ' + hospede.cpf + '<br>' + 
            'ID Acomodação: ' + reserva.idAcomodacao + '<br>' +
            'CheckIn: ' + checkIn.toLocaleDateString() + '<br>' + 
            'CheckOut: ' + checkOut.toLocaleDateString() + '<br>' +
            'Custo: R$' + reserva.custo + '<br><br>';
    }
}

function iniciarEstadiaPorId(event) {
    event.preventDefault();
    var id = document.getElementById('idReserva').value;
    fetch('http://localhost:8080/reservas/'+id)
    .then(function(response) {
        return response.json();
    })
    .then(function(reserva) {
        var estadia = {
            id: reserva.id,
            checkIn: reserva.checkIn,
            checkOut: reserva.checkOut,
            custo: reserva.custo,
            numeroPernoites: reserva.numeroPernoites,
            statusPagamento: reserva.statusPagamento,
            idAcomodacao: reserva.idAcomodacao,
            idHospede: reserva.idHospede
        };
        fetch('http://localhost:8080/estadias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estadia),
        })
        .then(function(response) {
            if (!response.ok) {
                return response.json().then(function(data) {
                    throw new Error(data.message);
                });
            }
            return response.json();
        })
        .then(function(data) {
            alert('Estadia iniciada com sucesso!');
            console.log('Estadia iniciada com sucesso:', data);
        })
        .catch(function(error) {
            alert(error.message);
            console.error(error);
        });
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