const botaoEncomenda = document.getElementById("enviar-encomenda");

botaoEncomenda.addEventListener("click", async () => {

    const nome = document.getElementById("nome-encomenda").value.trim();
    const tipo = document.getElementById("tipo-encomenda").value.trim();
    const cores = document.getElementById("cores-encomenda").value.trim();
    const tamanho = document.getElementById("tamanho-encomenda").value.trim();
    const detalhes = document.getElementById("detalhes-encomenda").value.trim();

    if (!nome || !tipo) {
        alert("Preencha pelo menos seu nome e o que você gostaria de encomendar. 💕");
        return;
    }

    const mensagem = `Olá, Dany! 💕
    
Gostaria de fazer uma encomenda.

👤 Nome: ${nome}

🧶 Peça desejada: ${tipo}

🎨 Cores: ${cores || "Não informado"}

📏 Tamanho/quantidade: ${tamanho || "Não informado"}

💭 Detalhes:
${detalhes || "Não informado"}

Gostaria de saber o valor e o prazo para produção. 🥰`;

    try {

        await navigator.clipboard.writeText(mensagem);

        alert(
            "Sua mensagem foi copiada! 💕\n\n" +
            "Agora você será direcionado para o Instagram da Danygurumi. " +
            "É só abrir a conversa e colar a mensagem."
        );

        window.open(
    "https://www.instagram.com/danygurumi.atelie?igsh=bzBlY2RpOGxkd2hk",
    "_blank"
);

    } catch (erro) {

        console.error("Erro ao copiar mensagem:", erro);

        alert(
            "Não foi possível copiar automaticamente. " +
            "Você pode copiar as informações manualmente e enviar pelo Instagram. 💕"
        );

    }

});