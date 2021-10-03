const urlApi = 'http://localhost:8080/filmes'; //CONSTANTE RESPONSÁVEL POR GUARDAR A URL DA API DO MY_FAVORITE_MOVIES
//
//document.getElementById(id) => Retorna a referência do elemento através do seu ID
const listarFilmes = document.getElementById('lista'); //CONSTANTE RESPONSÁVEL POR PEGAR O ELEMENTO NO INDEX.HTML COM O ID (LISTA) PARA TRABALHAR A FORMA VISUAL DO MOSTRAR FILMES
//listarFilmes é uma referência a um objeto Element, ou null se um elemento com o ID escíficado não estiver contido neste documento.
//lista é uma string representando o ID único do elemento sendo procurado no index.html
//
let edicao = false;
let idEdicao = 0

//Uma função assincrona é uma função que espera a possibilidade do AWAIT ser usado para invocar o código assincrono.
//FETCH é o método que ao ser invocado faz uma requisição HTTP e traz os dados da URL que foi especificado na constante urlApi. 
const getFilmes = async () => {
    const response = await fetch(urlApi);
    //AWAIT só pode ser usado dentro de uma função assincrona. A invocação do fetch será executada e a requisição irá acontecer, enquanto essa resposta não chega, nenhum código abaixo será executado. O await pausa a execução assincrona até que a resposta da invicação do fetch seja obtida. Quando essa invocação é obtida, ela resulta em uma promisse e o await vai atribuir para a constante response o valor resolvido da promisse. Depois disso, as linhas abaixo serão executadas.

    const data = await response.json();
    //Para obter o corpo de resposta fetch, precisamos formatar essa respota para JSON com a const data recebendo await invocando o responde.json()
    console.log(data);


    //RENDERIZANDO OS FILMES NA TELAS
    data.map((filme) => {
        listarFilmes.insertAdjacentHTML('beforeend', `
        <div class="col-4">
        <div class="card">
        <img src="${filme.urlImagem}" class="card-img-top" alt="...">
        <div class="card-body">
            <span class="card-title" style="font-size:20px">${filme.nome}</span>
        </div>
        <div class="card-body1">
            <div>
                <span>${filme.genero}</span><br>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                Assistido
            </label>
            </div>
            <div class="nota">
                <span style="font-size:2rem">${filme.nota}</span><br>
            </div>
        </div>
        </div>
    </div>
        `)
    })

}

getFilmes();