/* =========================
    CARROSSEL DA PÁGINA INICIAL
========================= */

const container = document.querySelector(".produtos-container");

if (container) {

    const produtos = Array.from(container.children);

    const primeiraSequencia = document.createElement("div");
    primeiraSequencia.classList.add("grupo-produtos");

    produtos.forEach(produto => {
        primeiraSequencia.appendChild(produto);
    });

    const segundaSequencia = primeiraSequencia.cloneNode(true);

    container.innerHTML = "";

    container.appendChild(primeiraSequencia);
    container.appendChild(segundaSequencia);

    let posicao = 0;
    let velocidade = 0.5;
    let pausado = false;

    function moverProdutos() {

        if (!pausado) {

            posicao -= velocidade;

            const largura = primeiraSequencia.offsetWidth;

            if (Math.abs(posicao) >= largura) {
                posicao += largura;
            }

            container.style.transform = `translateX(${posicao}px)`;
        }

        requestAnimationFrame(moverProdutos);
    }

    container.addEventListener("mouseenter", () => {
        pausado = true;
    });

    container.addEventListener("mouseleave", () => {
        pausado = false;
    });

    moverProdutos();
}


/* =========================
    CARRINHO
========================= */

let carrinho = JSON.parse(localStorage.getItem("carrinhoDanygurumi")) || [];


/* Criar botão do carrinho */

const botaoCarrinho = document.createElement("button");

botaoCarrinho.id = "botao-carrinho";
botaoCarrinho.innerHTML = "🛒 Carrinho <span id=\"contador-carrinho\">0</span>";

document.body.appendChild(botaoCarrinho);


/* Criar painel do carrinho */

const painelCarrinho = document.createElement("div");

painelCarrinho.id = "painel-carrinho";

painelCarrinho.innerHTML = `
    <div class="carrinho-conteudo">

        <button id="fechar-carrinho">×</button>

        <h2>Seu carrinho 🛒</h2>

        <div id="itens-carrinho"></div>

        <div class="total-carrinho">
            Total: R$ <span id="total-carrinho">0,00</span>
        </div>

        <button id="finalizar-carrinho">
            Finalizar pedido 💗
        </button>

    </div>
`;

document.body.appendChild(painelCarrinho);


/* =========================
    ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho() {

    const itensCarrinho = document.getElementById("itens-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");
    const contadorCarrinho = document.getElementById("contador-carrinho");

    itensCarrinho.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    if (carrinho.length === 0) {

        itensCarrinho.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio 💕
            </p>
        `;

    } else {

        carrinho.forEach((produto, index) => {

            const subtotal = produto.preco * produto.quantidade;

            total += subtotal;
            quantidadeTotal += produto.quantidade;

            const item = document.createElement("div");

            item.classList.add("item-carrinho");

            item.innerHTML = `
                <div>
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
                </div>

                <div class="quantidade-carrinho">

                    <button class="diminuir" data-index="${index}">
                        −
                    </button>

                    <span>${produto.quantidade}</span>

                    <button class="aumentar" data-index="${index}">
                        +
                    </button>

                    <button class="remover-item" data-index="${index}">
                        🗑️
                    </button>

                </div>
            `;

            itensCarrinho.appendChild(item);
        });
    }

    totalCarrinho.textContent = total.toFixed(2).replace(".", ",");

    contadorCarrinho.textContent = quantidadeTotal;

    localStorage.setItem(
        "carrinhoDanygurumi",
        JSON.stringify(carrinho)
    );
}


// ========================================
// ADICIONAR PRODUTOS AO CARRINHO
// ========================================


// PRODUTOS DA PÁGINA INICIAL

const botoesAdicionar =
    document.querySelectorAll(".produto button");


botoesAdicionar.forEach(botao => {

    botao.addEventListener("click", () => {

        const produto =
            botao.closest(".produto");


        if (!produto) {
            return;
        }


        const nome =
            produto.querySelector("h3").textContent.trim();


        const precoTexto =
            produto
                .querySelector(".preco")
                .textContent
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim();


        const preco =
            Number(precoTexto);


        adicionarProdutoCarrinho(
            nome,
            preco
        );


        botao.textContent =
            "Adicionado! 💗";


        setTimeout(() => {

            botao.textContent =
                "Adicionar ao carrinho";

        }, 1500);

    });

});



// ========================================
// PRODUTOS DAS PÁGINAS INDIVIDUAIS
// ========================================

const botaoProdutoIndividual =
    document.querySelector(".botao-carrinho");


if (botaoProdutoIndividual) {

    botaoProdutoIndividual.addEventListener(
        "click",
        () => {

            const nomeElemento =
                document.querySelector(
                    ".produto-informacoes h1"
                );

            const precoElemento =
                document.querySelector(
                    ".produto-preco"
                );


            if (
                !nomeElemento ||
                !precoElemento
            ) {
                return;
            }


            // ========================================
            // NOME DO PRODUTO
            // ========================================

            let nome =
                nomeElemento.textContent.trim();


            // ========================================
            // VERIFICAR VARIAÇÃO
            // ========================================

            const opcaoSelecionada =
                document.querySelector(
                    ".cor-produto.selecionada"
                );


            if (opcaoSelecionada) {

                const textoOpcao =
                    opcaoSelecionada.textContent.trim();


                // ALMOFADAS DE FLORES

                if (
                    nome === "Flor Azul" ||
                    nome === "Flor Roxa"
                ) {

                    nome =
                        "Almofada Flor " +
                        textoOpcao;

                }


                // CHAVEIROS DE FLORES

                else if (
                    nome === "Chaveiro Flor Laranja" ||
                    nome === "Chaveiro Flor Amarela"
                ) {

                    nome =
                        "Chaveiro Flor " +
                        textoOpcao;

                }


                // SAPO / SAPA

                else if (
                    nome === "Chaveiro Sapo" ||
                    nome === "Chaveiro Sapa"
                ) {

                    nome =
                        "Chaveiro " +
                        textoOpcao;

                }

            }


            // ========================================
            // PREÇO
            // ========================================

            const precoTexto =
                precoElemento.textContent
                    .replace("R$", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
                    .trim();


            const preco =
                Number(precoTexto);


            adicionarProdutoCarrinho(
                nome,
                preco
            );


            // ========================================
            // AVISO
            // ========================================

            botaoProdutoIndividual.textContent =
                "Adicionado! 💗";


            setTimeout(() => {

                botaoProdutoIndividual.textContent =
                    "🛒 Adicionar ao carrinho";

            }, 1500);

        }
    );

}


// ========================================
// FUNÇÃO ADICIONAR PRODUTO
// ========================================

function adicionarProdutoCarrinho(nome, preco) {

    const produtoExistente =
        carrinho.find(
            item => item.nome === nome
        );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            quantidade: 1

        });

    }


    atualizarCarrinho();

}

/* =========================
    ABRIR CARRINHO
========================= */

botaoCarrinho.addEventListener("click", () => {

    painelCarrinho.classList.add("aberto");

});


/* =========================
    FECHAR CARRINHO
========================= */

document.getElementById("fechar-carrinho").addEventListener(
    "click",
    () => {

        painelCarrinho.classList.remove("aberto");

    }
);


/* =========================
    ALTERAR QUANTIDADE
========================= */

document.addEventListener("click", event => {

    const index = event.target.dataset.index;

    if (index === undefined) {
        return;
    }


    if (event.target.classList.contains("aumentar")) {

        carrinho[index].quantidade++;

    }


    if (event.target.classList.contains("diminuir")) {

        carrinho[index].quantidade--;

        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        }

    }


    if (event.target.classList.contains("remover-item")) {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();

});


/* =========================
    FINALIZAR PEDIDO
========================= */

document.getElementById("finalizar-carrinho").addEventListener(
    "click",
    () => {

        if (carrinho.length === 0) {

            alert("Seu carrinho está vazio! 💕");

            return;
        }

        let mensagem = "Olá, Dany! 💕 Gostaria de fazer um pedido:\n\n";

        let total = 0;

        carrinho.forEach(produto => {

            const subtotal = produto.preco * produto.quantidade;

            total += subtotal;

            mensagem +=
                `🧶 ${produto.nome} — ${produto.quantidade}x — R$ ${subtotal
                    .toFixed(2)
                    .replace(".", ",")}\n`;
        });

        mensagem +=
            `\n💰 Total: R$ ${total.toFixed(2).replace(".", ",")}`;

        navigator.clipboard.writeText(mensagem);

        alert(
            "Seu pedido foi copiado! 💕\n\n" +
            "Agora você pode abrir o Instagram da Danygurumi " +
            "e enviar a mensagem."
        );

        window.open(
            "https://www.instagram.com/danygurumi.atelie?igsh=bzBlY2RpOGxkd2hk",
            "_blank"
        );

    }
);


/* =========================
    INICIAR
========================= */

atualizarCarrinho();

// ========================================
// GALERIA DA ALMOFADA FLOR AZUL / FLOR ROXA
// ========================================

if (document.body.classList.contains("pagina-flor-azul")) {

    const imagemFlor =
        document.getElementById("imagem-produto");

    const setaEsquerdaFlor =
        document.querySelector(".seta-esquerda");

    const setaDireitaFlor =
        document.querySelector(".seta-direita");

    const botaoAzul =
        document.querySelector('[data-cor="azul"]');

    const botaoRoxa =
        document.querySelector('[data-cor="roxa"]');


    // ========================================
    // FOTOS DA FLOR AZUL
    // ========================================

    const fotosFlorAzul = [
        "imagens/florazul.jpg",
        "imagens/florazulcostas.jpg",
        "imagens/florazullado.jpg"
    ];


    // ========================================
    // FOTOS DA FLOR ROXA
    // ========================================

    const fotosFlorRoxa = [
        "imagens/florroxa.jpg",
        "imagens/florroxacostas.jpg",
        "imagens/florroxalado.jpg"
    ];


    // ========================================
    // DESCOBRIR QUAL COR ABRIR
    // ========================================

    const parametros =
        new URLSearchParams(window.location.search);

    let versaoAtual =
        parametros.get("cor") === "roxa"
            ? "roxa"
            : "azul";


    let fotoAtual = 0;


    // ========================================
    // ATUALIZAR FOTO
    // ========================================

    function atualizarFlor() {

        if (versaoAtual === "azul") {

            imagemFlor.src =
                fotosFlorAzul[fotoAtual];

            imagemFlor.alt =
                "Almofada Flor Azul";

            botaoAzul.classList.add("selecionada");
            botaoRoxa.classList.remove("selecionada");

        } else {

            imagemFlor.src =
                fotosFlorRoxa[fotoAtual];

            imagemFlor.alt =
                "Almofada Flor Roxa";

            botaoRoxa.classList.add("selecionada");
            botaoAzul.classList.remove("selecionada");

        }

    }


    // ========================================
    // INICIAR
    // ========================================

    atualizarFlor();


    // ========================================
    // BOTÃO AZUL
    // ========================================

    botaoAzul.addEventListener("click", function () {

        versaoAtual = "azul";

        fotoAtual = 0;

        atualizarFlor();

    });


    // ========================================
    // BOTÃO ROXA
    // ========================================

    botaoRoxa.addEventListener("click", function () {

        versaoAtual = "roxa";

        fotoAtual = 0;

        atualizarFlor();

    });


    // ========================================
    // SETA DIREITA
    // ========================================

    setaDireitaFlor.addEventListener("click", function () {

        fotoAtual++;

        if (versaoAtual === "azul") {

            if (fotoAtual >= fotosFlorAzul.length) {
                fotoAtual = 0;
            }

        } else {

            if (fotoAtual >= fotosFlorRoxa.length) {
                fotoAtual = 0;
            }

        }

        atualizarFlor();

    });


    // ========================================
    // SETA ESQUERDA
    // ========================================

    setaEsquerdaFlor.addEventListener("click", function () {

        fotoAtual--;

        if (versaoAtual === "azul") {

            if (fotoAtual < 0) {
                fotoAtual = fotosFlorAzul.length - 1;
            }

        } else {

            if (fotoAtual < 0) {
                fotoAtual = fotosFlorRoxa.length - 1;
            }

        }

        atualizarFlor();

    });

}

// ========================================
// GALERIA DO BUQUÊ
// ========================================

const imagemBuque = document.getElementById("imagem-produto");
const setaEsquerdaBuque = document.querySelector(".seta-esquerda");
const setaDireitaBuque = document.querySelector(".seta-direita");

if (
    imagemBuque &&
    setaEsquerdaBuque &&
    setaDireitaBuque &&
    window.location.pathname.includes("buque.html")
) {

    const fotosBuque = [
        "imagens/buque.jpg",
        "imagens/buquecima.jpg"
    ];

    let fotoBuqueAtual = 0;


    // SETA DIREITA

    setaDireitaBuque.addEventListener("click", function () {

        fotoBuqueAtual++;

        if (fotoBuqueAtual >= fotosBuque.length) {
            fotoBuqueAtual = 0;
        }

        imagemBuque.src = fotosBuque[fotoBuqueAtual];

    });


    // SETA ESQUERDA

    setaEsquerdaBuque.addEventListener("click", function () {

        fotoBuqueAtual--;

        if (fotoBuqueAtual < 0) {
            fotoBuqueAtual = fotosBuque.length - 1;
        }

        imagemBuque.src = fotosBuque[fotoBuqueAtual];

    });

}

// ========================================
// BOTÃO VOLTAR
// ========================================

const header = document.querySelector("header");

const paginaAtual = window.location.pathname;

if (
    header &&
    !paginaAtual.endsWith("index.html") &&
    paginaAtual !== "/"
) {

    const voltar = document.createElement("div");

    voltar.className = "voltar-produto";

    voltar.innerHTML = `
        <button type="button">
            ← Voltar
        </button>
    `;

    header.insertAdjacentElement("afterend", voltar);

    const botaoVoltar = voltar.querySelector("button");

    botaoVoltar.addEventListener("click", function () {
        history.back();
    });

}

// ========================================
// GALERIA DO CHAVEIRO SAPO / SAPA
// ========================================

if (document.body.classList.contains("pagina-chaveiro-sapo")) {

    const imagemSapo = document.getElementById("imagem-sapo");

    const setaEsquerdaSapo =
        document.querySelector(".seta-esquerda-sapo");

    const setaDireitaSapo =
        document.querySelector(".seta-direita-sapo");

    const botaoSapo =
        document.querySelector('[data-cor="sapo"]');

    const botaoSapa =
        document.querySelector('[data-cor="sapa"]');


    // ========================================
    // FOTOS DO SAPO
    // ========================================

    const fotosSapo = [
        "imagens/chaveirosapo.jpg",
        "imagens/chaveirosapocasal.jpg",
        "imagens/chaveirosapolado.jpg"
    ];


    // ========================================
    // FOTOS DA SAPA
    // ========================================

    const fotosSapa = [
        "imagens/chaveirosapa.jpg",
        "imagens/chaveirosapacasal.jpg",
        "imagens/chaveirosapalado.jpg"
    ];


    // ========================================
    // DESCOBRIR QUAL VERSÃO ABRIR
    // ========================================

    const parametrosSapo =
        new URLSearchParams(window.location.search);

    let versaoAtual =
        parametrosSapo.get("cor") === "sapa"
            ? "sapa"
            : "sapo";


    let fotoAtual = 0;


    // ========================================
    // ATUALIZAR FOTO
    // ========================================

    function atualizarSapo() {

        if (versaoAtual === "sapo") {

            imagemSapo.src = fotosSapo[fotoAtual];

            botaoSapo.classList.add("selecionada");
            botaoSapa.classList.remove("selecionada");

        } else {

            imagemSapo.src = fotosSapa[fotoAtual];

            botaoSapa.classList.add("selecionada");
            botaoSapo.classList.remove("selecionada");

        }

    }


    // ========================================
    // INICIAR
    // ========================================

    atualizarSapo();


    // ========================================
    // BOTÃO SAPO
    // ========================================

    botaoSapo.addEventListener("click", function () {

        versaoAtual = "sapo";

        fotoAtual = 0;

        atualizarSapo();

    });


    // ========================================
    // BOTÃO SAPA
    // ========================================

    botaoSapa.addEventListener("click", function () {

        versaoAtual = "sapa";

        fotoAtual = 0;

        atualizarSapo();

    });


    // ========================================
    // SETA DIREITA
    // ========================================

    setaDireitaSapo.addEventListener("click", function () {

        if (versaoAtual === "sapo") {

            fotoAtual++;

            if (fotoAtual >= fotosSapo.length) {
                fotoAtual = 0;
            }

        } else {

            fotoAtual++;

            if (fotoAtual >= fotosSapa.length) {
                fotoAtual = 0;
            }

        }

        atualizarSapo();

    });


    // ========================================
    // SETA ESQUERDA
    // ========================================

    setaEsquerdaSapo.addEventListener("click", function () {

        if (versaoAtual === "sapo") {

            fotoAtual--;

            if (fotoAtual < 0) {
                fotoAtual = fotosSapo.length - 1;
            }

        } else {

            fotoAtual--;

            if (fotoAtual < 0) {
                fotoAtual = fotosSapa.length - 1;
            }

        }

        atualizarSapo();

    });

}


// ========================================
// GALERIA DO CHAVEIRO MORANGO
// ========================================

if (window.location.pathname.endsWith("chaveiromorango.html")) {

    const imagemChaveiroMorango =
        document.getElementById("imagem-produto");

    const setaEsquerdaChaveiroMorango =
        document.querySelector(".seta-esquerda");

    const setaDireitaChaveiroMorango =
        document.querySelector(".seta-direita");


    if (
        imagemChaveiroMorango &&
        setaEsquerdaChaveiroMorango &&
        setaDireitaChaveiroMorango 
    ) {

        const fotosChaveiroMorango = [
            "imagens/chaveiromorango.jpg",
            "imagens/chaveiromorangocima.jpg"
        ];

        let fotoChaveiroMorangoAtual = 0;


        // ========================================
        // SETA DIREITA
        // ========================================

        setaDireitaChaveiroMorango.addEventListener("click", function () {

            fotoChaveiroMorangoAtual++;

            if (
                fotoChaveiroMorangoAtual >=
                fotosChaveiroMorango.length
            ) {

                fotoChaveiroMorangoAtual = 0;

            }

            imagemChaveiroMorango.src =
                fotosChaveiroMorango[fotoChaveiroMorangoAtual];

        });


        // ========================================
        // SETA ESQUERDA
        // ========================================

        setaEsquerdaChaveiroMorango.addEventListener("click", function () {

            fotoChaveiroMorangoAtual--;

            if (fotoChaveiroMorangoAtual < 0) {

                fotoChaveiroMorangoAtual =
                    fotosChaveiroMorango.length - 1;

            }

            imagemChaveiroMorango.src =
                fotosChaveiroMorango[fotoChaveiroMorangoAtual];

        });

    }

}

// ========================================
// GALERIA DO CHAVEIRO FLOR LARANJA / FLOR AMARELA
// ========================================

if (document.body.classList.contains("pagina-chaveiro-flor-laranja")) {

    const imagemFlorLaranja = document.getElementById("imagem-flor-laranja");

    const setaEsquerdaFlorLaranja =
        document.querySelector(".seta-esquerda-flor-laranja");

    const setaDireitaFlorLaranja =
        document.querySelector(".seta-direita-flor-laranja");

    const botaoFlorLaranja =
        document.querySelector('[data-cor="flor-laranja"]');

    const botaoFlorAmarela =
        document.querySelector('[data-cor="flor-amarela"]');


    // ========================================
    // FOTOS DA FLOR LARANJA
    // ========================================

    const fotosFlorLaranja = [
        "imagens/chaveiroflorlaranja.jpg",
        "imagens/chaveiroflorlaranjalado.jpg",
        "imagens/chaveiroflorlaranjaduas.jpg"
    ];


    // ========================================
    // FOTOS DA FLOR AMARELA
    // ========================================

    const fotosFlorAmarela = [
        "imagens/chaveirofloramarela.jpg",
        "imagens/chaveirofloramarelalado.jpg",
        "imagens/chaveirofloramareladuas.jpg"
    ];


    // ========================================
    // DESCOBRIR QUAL COR ABRIR
    // ========================================

    const parametros = new URLSearchParams(window.location.search);

    let versaoAtual =
        parametros.get("cor") === "flor-amarela"
            ? "flor-amarela"
            : "flor-laranja";


    let fotoAtual = 0;


    // ========================================
    // ATUALIZAR FOTO
    // ========================================

    function atualizarFlorLaranja() {

        if (versaoAtual === "flor-laranja") {

            imagemFlorLaranja.src = fotosFlorLaranja[fotoAtual];

            botaoFlorLaranja.classList.add("selecionada");
            botaoFlorAmarela.classList.remove("selecionada");

        } else {

            imagemFlorLaranja.src = fotosFlorAmarela[fotoAtual];

            botaoFlorAmarela.classList.add("selecionada");
            botaoFlorLaranja.classList.remove("selecionada");

        }

    }


    // ========================================
    // INICIAR
    // ========================================

    atualizarFlorLaranja();


    // ========================================
    // BOTÃO FLOR LARANJA
    // ========================================

    botaoFlorLaranja.addEventListener("click", function () {

        versaoAtual = "flor-laranja";

        fotoAtual = 0;

        atualizarFlorLaranja();

    });


    // ========================================
    // BOTÃO FLOR AMARELA
    // ========================================

    botaoFlorAmarela.addEventListener("click", function () {

        versaoAtual = "flor-amarela";

        fotoAtual = 0;

        atualizarFlorLaranja();

    });


    // ========================================
    // SETA DIREITA
    // ========================================

    setaDireitaFlorLaranja.addEventListener("click", function () {

        fotoAtual++;

        if (versaoAtual === "flor-laranja") {

            if (fotoAtual >= fotosFlorLaranja.length) {
                fotoAtual = 0;
            }

        } else {

            if (fotoAtual >= fotosFlorAmarela.length) {
                fotoAtual = 0;
            }

        }

        atualizarFlorLaranja();

    });


    // ========================================
    // SETA ESQUERDA
    // ========================================

    setaEsquerdaFlorLaranja.addEventListener("click", function () {

        fotoAtual--;

        if (versaoAtual === "flor-laranja") {

            if (fotoAtual < 0) {
                fotoAtual = fotosFlorLaranja.length - 1;
            }

        } else {

            if (fotoAtual < 0) {
                fotoAtual = fotosFlorAmarela.length - 1;
            }

        }

        atualizarFlorLaranja();

    });

}

// ========================================
// GALERIA DO CHAVEIRO BALEIA
// ========================================

const imagemChaveiroBaleia =
    document.getElementById("imagem-produto");

const setaEsquerdaChaveiroBaleia =
    document.querySelector(".seta-esquerda");

const setaDireitaChaveiroBaleia =
    document.querySelector(".seta-direita");


if (
    imagemChaveiroBaleia &&
    setaEsquerdaChaveiroBaleia &&
    setaDireitaChaveiroBaleia &&
    window.location.pathname.includes("chaveirobaleia.html")
) {

    const fotosChaveiroBaleia = [
        "imagens/chaveirobaleia.jpg",
        "imagens/chaveirobaleialado.jpg"
    ];

    let fotoChaveiroBaleiaAtual = 0;


    // ========================================
    // SETA DIREITA
    // ========================================

    setaDireitaChaveiroBaleia.addEventListener("click", function () {

        fotoChaveiroBaleiaAtual++;

        if (
            fotoChaveiroBaleiaAtual >=
            fotosChaveiroBaleia.length
        ) {

            fotoChaveiroBaleiaAtual = 0;

        }

        imagemChaveiroBaleia.src =
            fotosChaveiroBaleia[fotoChaveiroBaleiaAtual];

    });


    // ========================================
    // SETA ESQUERDA
    // ========================================

    setaEsquerdaChaveiroBaleia.addEventListener("click", function () {

        fotoChaveiroBaleiaAtual--;

        if (fotoChaveiroBaleiaAtual < 0) {

            fotoChaveiroBaleiaAtual =
                fotosChaveiroBaleia.length - 1;

        }

        imagemChaveiroBaleia.src =
            fotosChaveiroBaleia[fotoChaveiroBaleiaAtual];

    });

}

// ========================================
// GALERIA DA ALMOFADA MORANGO
// ========================================

if (window.location.pathname.endsWith("almofadamorango.html")) {

    const imagemAlmofadaMorango =
        document.getElementById("imagem-produto");

    const setaEsquerdaAlmofadaMorango =
        document.querySelector(".seta-esquerda");

    const setaDireitaAlmofadaMorango =
        document.querySelector(".seta-direita");


    if (
        imagemAlmofadaMorango &&
        setaEsquerdaAlmofadaMorango &&
        setaDireitaAlmofadaMorango
    ) {

        const fotosAlmofadaMorango = [
            "imagens/almofadamorango.jpg",
            "imagens/almofadamorangofrente.jpg",
            "imagens/almofadamorangocima.jpg"
        ];

        let fotoAtual = 0;


        // ========================================
        // SETA DIREITA
        // ========================================

        setaDireitaAlmofadaMorango.addEventListener("click", function () {

            fotoAtual++;

            if (fotoAtual >= fotosAlmofadaMorango.length) {
                fotoAtual = 0;
            }

            imagemAlmofadaMorango.src =
                fotosAlmofadaMorango[fotoAtual];

        });


        // ========================================
        // SETA ESQUERDA
        // ========================================

        setaEsquerdaAlmofadaMorango.addEventListener("click", function () {

            fotoAtual--;

            if (fotoAtual < 0) {
                fotoAtual = fotosAlmofadaMorango.length - 1;
            }

            imagemAlmofadaMorango.src =
                fotosAlmofadaMorango[fotoAtual];

        });

    }

}

// ========================================
// GALERIA DA CESTA DE ROSAS
// ========================================

const imagemCestaRosas =
    document.getElementById("imagem-cesta-rosas");

const setaEsquerdaCesta =
    document.querySelector(".seta-esquerda-cesta");

const setaDireitaCesta =
    document.querySelector(".seta-direita-cesta");


if (
    imagemCestaRosas &&
    setaEsquerdaCesta &&
    setaDireitaCesta
) {

    const fotosCestaRosas = [

        "imagens/cestaderosas.jpg",

        "imagens/buque.jpg"

    ];


    let fotoCestaRosasAtual = 0;



    // ========================================
    // SETA DIREITA
    // ========================================

    setaDireitaCesta.addEventListener(
        "click",
        function () {

            fotoCestaRosasAtual++;


            if (
                fotoCestaRosasAtual >=
                fotosCestaRosas.length
            ) {

                fotoCestaRosasAtual = 0;

            }


            imagemCestaRosas.src =
                fotosCestaRosas[
                    fotoCestaRosasAtual
                ];

        }
    );



    // ========================================
    // SETA ESQUERDA
    // ========================================

    setaEsquerdaCesta.addEventListener(
        "click",
        function () {

            fotoCestaRosasAtual--;


            if (fotoCestaRosasAtual < 0) {

                fotoCestaRosasAtual =
                    fotosCestaRosas.length - 1;

            }


            imagemCestaRosas.src =
                fotosCestaRosas[
                    fotoCestaRosasAtual
                ];

        }
    );

}

