document.addEventListener("DOMContentLoaded", function () {

    //pegando o id da div
    const listaDiv = document.getElementById('lista-usuarios');

    //Pega os dados do localStorage
    const cadastros = JSON.parse(localStorage.getItem('usuarios')) || [];

    //se não tiver nenhum cadastro então
    if (cadastros.length == 0) {
        listaDiv.innerHTML = "<p class='text-center'> Nenhum usuário encontrado.</p>";
        return;
    }

    //Monta a lista na tela
    cadastros.forEach((usuario, index) => {
    const card = document.createElement('div');
    card.classList.add('card', 'p-3', 'shadow-sm');

    card.innerHTML = `
      <h5 class="mb-2">${usuario.nome}</h5>
      <p><strong>Idade:</strong> ${usuario.idade}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>

      <div class="d-flex gap-2">
        <button class="btn btn-danger btn-sm" onclick="excluirUsuario(${index})">Excluir</button>
        <button class="btn btn-warning btn-sm" onclick="editarUsuario(${index})">Editar</button>

      </div>
    `;

    listaDiv.appendChild(card);
  });

});

function excluirUsuario(index) {

    const confirmacao = confirm('Tem certeza que deseja excluir este usuário?');
    if(!confirmacao) return;

    let cadastros = JSON.parse(localStorage.getItem('usuarios')) || [];
    cadastros.splice(index, 1); //remove 1 item no índice especifico
    localStorage.setItem('usuarios', JSON.stringify(cadastros));
    
    //remove visualmente o card
    const cards = document.querySelectorAll('.card');
    const cardAlvo = cards[index];

    cardAlvo.classList.add('fade-out');

    setTimeout(() => {
        cardAlvo.remove();
    }, 300);//tempo igual ao do transition
    
}

function editarUsuario(index) {
    let cadastros = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = cadastros[index];

    //Selecionando todos os cards e pega o card atual
    const cards = document.querySelectorAll('.card');
    const card = cards[index];

    // Troca o conteúdo do card por inputs
    card.innerHTML = `
    <input type="text" class="form-control mb-2" id="edit-nome-${index}" value="${usuario.nome}">
    <input type="number" class="form-control mb-2" id="edit-idade-${index}" value="${usuario.idade}">
    <input type="email" class="form-control mb-2" id="edit-email-${index}" value="${usuario.email}">

    <div class="d-flex gap-2">
      <button class="btn btn-success btn-sm" onclick="salvarEdicao(${index})">Salvar</button>
      <button class="btn btn-secondary btn-sm" onclick="location.reload()">Cancelar</button>
    </div>
    `;
    
}

function salvarEdicao(index) {
    //pegando os valores dos IDS
    const nome = document.getElementById(`edit-nome-${index}`).value.trim();
    const idade = document.getElementById(`edit-idade-${index}`).value.trim();
    const email = document.getElementById(`edit-email-${index}`).value.trim();
    
    //caso esteja vazio
    if (!nome || !idade || !email) {
        alert('Preencha todos os campos.');
        return;
    }

    const idadeNumero = Number(idade);
    if (isNaN(idadeNumero) || idadeNumero <= 0) {
        alert("Idade inválida.");
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert("E-mail inválido.");
        return;
    }

    //Atualiza os fafos no localStorage
    let cadastros = JSON.parse(localStorage.getItem('usuarios')) || [];
    cadastros[index] = { nome, idade: idadeNumero, email };
    localStorage.setItem('usuarios', JSON.stringify(cadastros));

    alert('Dados atualizados com sucesso!!');
    location.reload();
}