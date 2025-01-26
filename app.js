let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // capturando o fragmento utilizando o 'document' e selecionando o elemento tag com o querySelector e armazenando uma referência a ele na variável 'titulo' ou 'paragrafo'
    campo.innerHTML = texto; // o innerHTML traduzindo fica como 'dentro do HTML', aonde se coloca o texto que quer aparecer no titulo ou paragrafo selecionado pela variável.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
};

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; // .value é o valor que tem no input
    
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // se tentativa é no singular ou no plural, forma reduzida de digitar if/else
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //getElementById como a própria tradução diz, você ta chamando o elemento pelo id dele e não pela tag, já que no HTML existem dois button diferentes e logo após pelo removeAttribute você remove o atributo que está desabilitando ele e faz com que o botão de reiniciar o jogo fique ativo quando acerta o número.
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++
        limparCampo();
    };
};

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista =listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    };

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    };
};

function limparCampo(){
    chute = document.querySelector('input'); // referência do chute que fica no input
    chute.value = ''; // a função limparCampo estando dentro do else, faz com que a cada valor chutado sendo errado, o input seguinte, antes de digitar o próximo número, fica com o campo vazio.
};

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // assim que clicar no botão de reiniciar o jogo, o botão de novo jogo volta a ficar desabilitado novamente até o usuário acertar o novo número secreto.
};