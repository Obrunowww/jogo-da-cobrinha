const jogo = document.getElementById("Jogo");
const ctx = jogo.getContext("2d");
const score = document.querySelector("[data-score]");
const botãoDeReset = document.querySelector('[data-resetar]');
const alturaDoJogo = jogo.height;
const larguraDoJogo = jogo.width;
const Jogobackground = "black"
const corDaCobra = "rgba(6, 172, 6, 0.856)";
const corDaComida = "red";
const tamanhoDoObjeto = 5;
const larguraTelaDoJogo = window.getComputedStyle(jogo).width
const alturaTelaDoJogo = window.getComputedStyle(jogo).height
const velocidadeJogo = 75;
const telaDeFimDeJogo = document.querySelector("[data-fimDeJogo]");
const recomeçar = document.querySelector("[data-recomeçar]");
const mostrarScore = document.querySelector("[data-score2]")


let ligar = false;
let velocidadeDoX = tamanhoDoObjeto;
let velocidadeDoY = 0;
let maçaX;
let maçaY;
let contagemDoScore = 0;
let cobra = [
    { x: tamanhoDoObjeto, y: 0 },
    { x: 0, y: 0 }
]
recomeçar.addEventListener("click", recomeçarOJogo);
botãoDeReset.addEventListener("click", resetarOJogo);



function começarOJogo() {
    window.addEventListener("keydown", mudarADireção);
    ligar = true;
    score.textContent = contagemDoScore;
    criarComida();
    desenharComida();
    próximoTick();
};
function próximoTick() {
    if (ligar) {
        setTimeout(() => {
            limparAtela();
            desenharComida();
            moverACobra();
            desenharACobra();
            verificarFimDeJogo();
            próximoTick();
        }, 100)
    } else {
        mostrarFimDoJogo();
    }
};

function limparAtela() {
    ctx.fillStyle = Jogobackground
    ctx.fillRect(0, 0, larguraDoJogo, alturaDoJogo);
};
function criarComida() {
    function aleatorizarComida(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / tamanhoDoObjeto) * tamanhoDoObjeto;
        return randNum;
    }
    maçaX = aleatorizarComida(0, larguraDoJogo - tamanhoDoObjeto);
    maçaY = aleatorizarComida(0, alturaDoJogo - tamanhoDoObjeto);

};
function desenharComida() {
    ctx.fillStyle = corDaComida;
    ctx.fillRect(maçaX, maçaY, tamanhoDoObjeto, tamanhoDoObjeto);
};
function moverACobra() {
    const cabeça = {
        x: cobra[0].x + velocidadeDoX,
        y: cobra[0].y + velocidadeDoY
    };

    cobra.unshift(cabeça);
    if (cobra[0].x == maçaX && cobra[0].y == maçaY) {
        contagemDoScore = contagemDoScore + 1;
        score.textContent = contagemDoScore;
        criarComida();

    } else {
        cobra.pop();
    }
};
function desenharACobra() {
    ctx.fillStyle = corDaCobra;
    cobra.forEach(parteDaCobra => {
        ctx.fillRect(parteDaCobra.x, parteDaCobra.y, tamanhoDoObjeto, tamanhoDoObjeto);
    })
};
function mudarADireção(event) {
    if (!ligar) {
        return;
    }
    const botãoPressionado = event.keyCode;
    const esquerda = 37;
    const cima = 38;
    const direita = 39;
    const baixo = 40;

    const indoParaCima = (velocidadeDoY == -tamanhoDoObjeto)
    const indoParaBaixo = (velocidadeDoY == tamanhoDoObjeto)
    const indoParaEsquerda = (velocidadeDoX == -tamanhoDoObjeto)
    const indoParaDireita = (velocidadeDoX == tamanhoDoObjeto)

    switch (true) {
        case (botãoPressionado == esquerda && !indoParaDireita):
            velocidadeDoX = -tamanhoDoObjeto
            velocidadeDoY = 0
            break
        case (botãoPressionado == cima && !indoParaBaixo):
            velocidadeDoX = 0;
            velocidadeDoY = -tamanhoDoObjeto
            break
        case (botãoPressionado == direita && !indoParaEsquerda):
            velocidadeDoX = tamanhoDoObjeto
            velocidadeDoY = 0
            break
        case (botãoPressionado == baixo && !indoParaCima):
            velocidadeDoX = 0
            velocidadeDoY = tamanhoDoObjeto
            break
    }
};
function verificarFimDeJogo() {
    switch (true) {
        case (cobra[0].x < 0):
            ligar = false
            break
        case (cobra[0].x >= larguraDoJogo):
            ligar = false
            break
        case (cobra[0].y < 0):
            ligar = false
            break
        case (cobra[0].y >= alturaDoJogo):
            ligar = false
            break
    }
    for (let i = 1; i < cobra.length; i = i + 1) {
        if (cobra[i].x == cobra[0].x && cobra[i].y == cobra[0].y) {
            ligar = false
        }
    };

};
function mostrarFimDoJogo() {
    ctx.font = "30px MV Boli";
    ctx.fillStyle = "rgb(197, 26, 3)";
    ctx.shadowColor = "white";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.textAlign = "center"
    ctx.fillText('Acabou o Jogo!', larguraDoJogo / 2, alturaDoJogo / 2)
    ligar = false;
    telaDeFimDeJogo.classList.add("recomeçar")
    mostrarScore.innerHTML = contagemDoScore
};
function resetarOJogo() {
    contagemDoScore = 0;
    velocidadeDoX = tamanhoDoObjeto;
    velocidadeDoY = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    

    cobra = [{ x: tamanhoDoObjeto, y: 0 },
    { x: 0, y: 0 }]
    começarOJogo()
};
function recomeçarOJogo(){
    contagemDoScore = 0;
    velocidadeDoX = tamanhoDoObjeto;
    velocidadeDoY = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    cobra = [{ x: tamanhoDoObjeto, y: 0 },
    { x: 0, y: 0 }]
    telaDeFimDeJogo.classList.remove("recomeçar")
    começarOJogo()

}

começarOJogo();