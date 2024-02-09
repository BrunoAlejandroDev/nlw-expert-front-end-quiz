/*criando um array de objeto
const perguntas = [
    {
        pergunta: 'Pergunta 01',
        respostas: [
            'Resposta A',
            'Resposta B',
            'Resposta C'
        ],
        correta: 2  
    },
]
alert(perguntas[0].respostas[perguntas[0].correta]);*/

const perguntas = [
    {
        pergunta: 'Qual é a forma correta de declarar uma variável em JavaScript?',
        respostas: [
            'var myVar = 5;',
            'variable myVar = 5;',
            'let myVar = 5;'
        ],
        correta: 2  
    },
    {
        pergunta: 'Qual destes métodos é usado para adicionar um elemento ao final de um array em JavaScript?',
        respostas: [
            'push()',
            'append()',
            'addToEnd()'
        ],
        correta: 0
    },
    {
        pergunta: 'Qual é a forma correta de escrever um comentário de uma linha em JavaScript?',
        respostas: [
            '// Este é um comentário de uma linha',
            '* Este é um comentário de uma linha *',
            '<!-- Este é um comentário de uma linha -->'
        ],
        correta: 0
    },
    {
        pergunta: 'Qual é a função do operador "===" em JavaScript?',
        respostas: [
            'Comparação estrita (valor e tipo)',
            'Comparação solta (apenas valor)',
            'Negação lógica'
        ],
        correta: 0
    },
    {
        pergunta: 'Qual destas opções representa um loop infinito em JavaScript?',
        respostas: [
            'while (true) { }',
            'for (i = 0; i < 5; i++) { }',
            'do { } while (false)'
        ],
        correta: 0
    },
    {
        pergunta: 'Qual é o método que retorna o número de elementos em um array em JavaScript?',
        respostas: [
            'count()',
            'length()',
            'size()'
        ],
        correta: 1
    },
    {
        pergunta: 'O que o método isNaN() verifica em JavaScript?',
        respostas: [
            'Se uma variável é do tipo NaN',
            'Se uma variável não é um número',
            'Se uma variável é um número'
        ],
        correta: 1
    },
    {
        pergunta: 'Qual é o operador de atribuição em JavaScript?',
        respostas: [
            '=',
            ':',
            '=='
        ],
        correta: 0
    },
    {
        pergunta: 'Qual método é usado para remover o último elemento de um array em JavaScript?',
        respostas: [
            'pop()',
            'removeLast()',
            'deleteLast()'
        ],
        correta: 0
    },
    {
        pergunta: 'Qual é a função do método indexOf() em JavaScript?',
        respostas: [
            'Retorna o índice do primeiro elemento correspondente a um valor especificado em um array',
            'Retorna o último índice correspondente a um valor especificado em um array',
            'Retorna a quantidade de elementos em um array'
        ],
        correta: 0
    }
];

//pegando os elementos do HTML
const quiz = document.querySelector('#quiz');
const template = document.querySelector('template');

const corretas = new Set(); // estrutura de dados que permite armazenar valores únicos de qualquer tipo, seja valores primitivos ou objetos.

const totalDePerguntas = perguntas.length;
const mostrarTotal = document.querySelector('#acertos span')
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas

for(const item of perguntas) {
    const quizItem = template.content.cloneNode(true) // serve para copiar todos os nós de um elemento, no caso, todos os filhos da tag template.

    //inserindo o título das perguntas dinamicamente
    quizItem.querySelector('h3').textContent = item.pergunta

    // inserindo as respostas na tela
    for(let resposta of item.respostas) {
        const dt = quizItem.querySelector('dl dt').cloneNode(true);

        // vou selecionar o span e inserir nele o conteúdo que está dentro do array respostas
        dt.querySelector('span').textContent = resposta;

        // serve para eu inserir no input um atributo, esse atributo será do tipo name e terá como valor "pergunta" + o índice do array respostas dentro do array perguntas
        dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))

        // acessei o input e peguei o valor individual de cada resposta dentro do array respostas
        dt.querySelector('input').value = item.respostas.indexOf(resposta);

        // criei uma função, uma arrow function, que só será executada quando o input for selecionado, por isso o uso do onchange
        dt.querySelector('input').onchange = (event) => {
            // o event.target.value vai acessar o input que foi selecionado pelo usuário. o event.target representa o input e o value representa a resposta específica selecionada. Por fim, vai comparar se o índice da resposta selecionada é igual ao valor da propriedade correta.
            const estaCorreta = event.target.value == item.correta;
            
            corretas.delete(item)
            if(estaCorreta) {
                corretas.add(item)
            }
            console.log(estaCorreta);
            
            // atualizar o contador
            mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
        }

        // inserindo as perguntas
        quizItem.querySelector('dl').appendChild(dt)
    }

    // removendo a pergunta de teste
    quizItem.querySelector('dl dt').remove()

    // insere as perguntas na div quiz e insere na tela
    quiz.appendChild(quizItem);
}