'use strict';

const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=numero]");
const operadores = document.querySelectorAll("[id*=operador]");

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
               
        if (operador == '+') {            
            atualizarDisplay(numeroAnterior + numeroAtual);
        }
        else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual);
        }
        else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual);
        }
        else if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero=false;
    }
    else {
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));


const ativarResultado = () => {
    calcular();
    operador = undefined;
}
document.getElementById('resultado').addEventListener('click', ativarResultado);

const limparDisplay = () => display.textContent= '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0,-1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const decimalNumero = () => {
    if (!existeDecimal()){
        if (existeValor()) {
            atualizarDisplay(',');
        }
        else {
            atualizarDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', decimalNumero);

const mapaTeclado = {
    '0'         : 'numero0',
    '1'         : 'numero1',
    '2'         : 'numero2',
    '3'         : 'numero3',
    '4'         : 'numero4',
    '5'         : 'numero5',
    '6'         : 'numero6',
    '7'         : 'numero7',
    '8'         : 'numero8',
    '9'         : 'numero9',
    '-'         : 'operadorSubtracao',
    '+'         : 'operadorAdicao',
    '*'         : 'operadorMultiplicacao',
    '/'         : 'operadorDivisao',
    '='         : 'resultado',
    Backspace   : 'backspace',
    Enter       : 'resultado',
    Escape      : 'limparDisplay',
    'c'         : 'limparCalculo',
    ','         : 'decimal',
    '.'         : 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);