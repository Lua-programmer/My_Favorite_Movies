const urlApi = "http://localhost:8080/filmes"; //CONSTANTE RESPONSÁVEL POR GUARDAR A URL DA API DO MY_FAVORITE_MOVIES
//
//document.getElementById(id) => Retorna a referência do elemento através do seu ID
const lista = document.getElementById("lista"); //CONSTANTE RESPONSÁVEL POR PEGAR O ELEMENTO NO INDEX.HTML COM O ID (LISTA) PARA TRABALHAR A FORMA VISUAL DO MOSTRAR FILMES
//lista é uma referência a um objeto Element, ou null se um elemento com o ID escíficado não estiver contido neste documento.
//lista é uma string representando o ID único do elemento sendo procurado no index.html
//
let editavel = false;
let idEditavel = 0;

//---------------------------------------------------[GET]--------------------------------------------------------------------------//

//Uma função assincrona é uma função que espera a possibilidade do AWAIT ser usado para invocar o código assincrono.
//FETCH é o método que ao ser invocado faz uma requisição HTTP e traz os dados da URL que foi especificado na constante urlApi.
const getFilmes = async () => {
  const response = await fetch(urlApi);
  //AWAIT só pode ser usado dentro de uma função assincrona. A invocação do fetch será executada e a requisição irá acontecer, enquanto essa resposta não chega, nenhum código abaixo será executado. O await pausa a execução assincrona até que a resposta da invicação do fetch seja obtida. Quando essa invocação é obtida, ela resulta em uma promisse e o await vai atribuir para a constante response o valor resolvido da promisse. Depois disso, as linhas abaixo serão executadas.

  const data = await response.json();
  //Para obter o corpo de resposta fetch, precisamos formatar essa respota para JSON com a const data recebendo await invocando o responde.json()
  console.log(data);

  //RENDERIZANDO OS FILMES NA TELAS
  //O método map() invonca a função de callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
  data.map((filme) => {
    lista.insertAdjacentHTML(
      "beforeend",
      `
    <div class="col-4" style="margin-bottom: 50px">
        <div class="card">
        <img src="${filme.imagem}" class="card-img-top" alt="...">
        <div class="card-body">
            <span class="card-title" style="font-size:20px">${filme.nome}</span>
        </div>
        <br>
        <div class="card-body1">
            <div>
                <span>Genêro: ${filme.genero}</span><br>
                <span>Status: </span>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                Assistido
            </label>
            </div>
                <div class="nota">
                    <span style="font-size:2rem">${filme.nota}</span><br>
                </div>
            </div>
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button class="js-btn" type="button" class="btn btn-outline-primary" onclick="putFilme(${filme.id})">Editar</button>
                <button class="js-btn" type="button" class="btn btn-outline-primary" onclick="delFilme(${filme.id})">Excluir</button>
            </div>
        </div>
    </div>
        `
    );
  });
};

getFilmes();

//---------------------------------------------------[POST E PUT]--------------------------------------------------------------------------//

const submitForm = async (evento) => {
  evento.preventDefault(); //PARA CANCELAR O EVENTO(evento), SEM PARA A PROPAGAÇÃO DO MESMO

  //BUSCANDO OS VAORES DOS INPUTS ATRAVÉS DO ID (document.getElementById)
  let nome = document.getElementById("nome");
  let imagem = document.getElementById("imagem");
  let genero = document.getElementById("genero");
  let nota = document.getElementById("nota");

  //ADICIONANDO VALORES AOS INPUTS (.value)
  const filme = {
    nome: nome.value,
    imagem: imagem.value,
    genero: genero.value,
    nota: nota.value,
  };

  //VALIDAÇÃO
  if (!editavel) {
    const request = new Request(`${urlApi}/add`, {
      method: "POST",
      body: JSON.stringify(filme), //TRANSFORMANDO O FILME NO FORMATO JSON
      headers: new Headers({
        "Content-Type": "application/json",
      }), //TIPO DO CONTEUDO application/json
    });

    //função fetch() dispara os métodos HTTP
    const response = await fetch(request);
    const resultado = await response.json();

    if (resultado) {
      getFilmes(window.alert("Filme adicionado com sucesso!"));
    }
  } else {
    const request = new Request(`${urlApi}/${idEditavel}`, {
      method: "PUT",
      body: JSON.stringify(filme),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const response = await fetch(request);
    const resultado = await response.json();

    //VALIDAÇÃO - HAVENDO RETORNO DA API OS FILMES SERÃO RENDERIZADOS NOVAMENTE
    if (resultado) {
      editavel = false;
      getFilmes();
    }
  }

  nome.value = "";
  imagem.value = "";
  genero.value = "";
  nota.value = "";

  lista.innerHTML = "";
};

const getFilmesById = async (id) => {
  const response = await fetch(`${urlApi}/${id}`);
  return filme = response.json();
};

const putFilme = async (id) => {
  editavel = true;
  idEditavel = id;

  const filme = await getFilmesById(id);

  let nomeNovo = document.getElementById("nome");
  let imagemNovo = document.getElementById("imagem");
  let generoNovo = document.getElementById("genero");
  let notaNovo = document.getElementById("nota");

  nomeNovo.value = filme.nome;
  imagemNovo.value = filme.imagem;
  generoNovo.value = filme.genero;
  notaNovo.value = filme.nota;
};

//---------------------------------------------------[DELETE]--------------------------------------------------------------------------//

const delFilme = async (id) => {
  const request = new Request(`${urlApi}/${id}`, {
    method: "DELETE",
  });

  const response = await fetch(request);
  const data = await response.json();

  console.log(data.message);

  lista.innerHTML = "";
  getFilmes();
};

//--------------------------------MODO DARK---------------------------//

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const inputDarkMode = document.getElementById("input-dark-mode");

  inputDarkMode.addEventListener("change", () => {
    if (inputDarkMode.checked) {
      body.setAttribute("dark", "true");
    } else {
      body.removeAttribute("dark");
    }
  });
});

//Adiocionando o local storage
document.addEventListener("DOMContentLoaded", () => {
  const darkModeStorage = localStorage.getItem("dark-mode");
  const body = document.querySelector("body");
  const inputDarkMode = document.getElementById("input-dark-mode");

  if (darkModeStorage) {
    body.setAttribute("dark", "true");
  }

  inputDarkMode.addEventListener("change", () => {
    if (inputDarkMode.checked) {
      body.setAttribute("dark", "true");
      localStorage.setItem("dark-mode", true);
    } else {
      body.removeAttribute("dark");
      localStorage.removeItem("dark-mode");
    }
  });
});
