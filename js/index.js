document.addEventListener("DOMContentLoaded", function () {

    //pegando o ID do cadatro
    const form = document.getElementById("form-cadastro");

    form.addEventListener("submit", function (e) {

        e.preventDefault(); //impede o carregamento da página;

        //Pegando os ID do forms 
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value.trim();
        const email = document.getElementById("email").value;


        // Verifica se algum campo tá vazio
        if (!nome || !idade || !email) {
            alert("Por favor, preencha todos os campos antes de enviar.");
            return;
        }

        //validação do nome 
        if (nome.length < 3) {
            alert('Por favor, digite seu nome com pelo menos 3 letras');
            return;
        }

        //validação da idade
        const idadeNumero = Number(idade);
        if (isNaN(idadeNumero) || idadeNumero <= 0) {
            alert('Por favor, digite uma idade válida (número maior que 0)');
            return;
        }

        //validação do e-mail (bem básico)
        if (!email.includes('@') || !email.includes('.')) {
            alert('Por favor, digite um e-mail válido.');
            return;
        }

        //Criando objeto do usuário
        const novoUsuario = {
            nome: nome,
            idade: idadeNumero,
            email: email
        };

        //Pegando cadastros anteriores (se existirem)
        let cadastros = JSON.parse(localStorage.getItem("usuarios")) || [];
    
        //adicionando novo Usuário
        cadastros.push(novoUsuario);

        //Salvando no localStorage
        localStorage.setItem("usuarios", JSON.stringify(cadastros ));

        alert('Cadastro feito com sucesso!');
        window.location.href = 'lista.html';

    });

});