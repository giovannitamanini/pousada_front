function criarHospede() {
    // Obter os valores do formulário
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;
    const nacionalidade = document.getElementById('nacionalidade').value;
    const profissao = document.getElementById('profissao').value;

    // Criar objeto JSON com os dados do hóspede
    const hospedeData = {
        cpf,
        nome,
        sobrenome,
        dataNascimento: formatarData(dataNascimento), // Formatar data adequadamente
        email,
        endereco,
        nacionalidade,
        profissao
    };

    // Enviar dados via requisição HTTP (POST) para o servidor
    fetch('http://localhost:8080/hospedes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hospedeData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cadastro realizado com sucesso:', data);
        alert("Cadastro do hóspede realizado com sucesso!");
        // Aqui você pode adicionar lógica adicional após o cadastro ser realizado com sucesso
    })
    .catch(error => {
        console.error('Erro no cadastro:', error);
        // Tratar erros ou fornecer feedback ao usuário, se necessário
    });
}

function formatarData(data) {
    // Converter a data para o formato desejado (exemplo: YYYY-MM-DD)
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const dia = String(dataObj.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}
