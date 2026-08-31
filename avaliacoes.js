const listaDepoimentos = document.getElementById("lista-depoimentos");
const estrelasAvaliacao = document.querySelectorAll("#estrelas-avaliacao button");
const comentario = document.getElementById("comentario");
const nomeCliente = document.getElementById("nome-cliente");
const enviarDepoimento = document.getElementById("enviar-depoimento");

let estrelasSelecionadas = 0;

estrelasAvaliacao.forEach(botao => {
    botao.addEventListener("click", () => {
        estrelasSelecionadas = Number(botao.dataset.estrela);

        estrelasAvaliacao.forEach(item => {
            const numero = Number(item.dataset.estrela);

            if (numero <= estrelasSelecionadas) {
                item.classList.add("ativa");
            } else {
                item.classList.remove("ativa");
            }
        });
    });
});

async function carregarAvaliacoes() {
    const { data, error } = await supabaseClient
        .from("avaliacoes")
        .select("*")
        .order("criado_em", { ascending: false });

    if (error) {
        console.error("Erro ao carregar avaliações:", error);
        return;
    }

    listaDepoimentos.innerHTML = "";

    data.forEach(avaliacao => {
        const depoimento = document.createElement("div");

        depoimento.className = "depoimento";

        const data = new Date(avaliacao.criado_em);
        const dataFormatada = data.toLocaleDateString("pt-BR");

        depoimento.innerHTML = `
            <div class="estrelas">
                ${"★".repeat(avaliacao.estrelas)}${"☆".repeat(5 - avaliacao.estrelas)}
            </div>

            <p>“${avaliacao.comentario}”</p>

            <h3>— ${avaliacao.nome}</h3>

            <div class="data-avaliacao">
                ${dataFormatada}
            </div>
        `;

        listaDepoimentos.appendChild(depoimento);
    });
}

enviarDepoimento.addEventListener("click", async () => {
    const nome = nomeCliente.value.trim();
    const texto = comentario.value.trim();

    if (!nome || !texto || estrelasSelecionadas === 0) {
        alert("Preencha seu nome, comentário e escolha uma avaliação de 1 a 5 estrelas.");
        return;
    }

    enviarDepoimento.disabled = true;
    enviarDepoimento.textContent = "Enviando...";

    const { error } = await supabaseClient
        .from("avaliacoes")
        .insert([
            {
                nome: nome,
                comentario: texto,
                estrelas: estrelasSelecionadas
            }
        ]);

    if (error) {
        console.error("Erro ao enviar avaliação:", error);
        alert("Não foi possível enviar sua avaliação. Tente novamente.");
    } else {
        alert("Obrigada pela sua avaliação! 💕");

        nomeCliente.value = "";
        comentario.value = "";
        estrelasSelecionadas = 0;

        estrelasAvaliacao.forEach(item => {
            item.classList.remove("ativa");
        });

        await carregarAvaliacoes();
    }

    enviarDepoimento.disabled = false;
    enviarDepoimento.textContent = "Enviar avaliação";
});

carregarAvaliacoes();