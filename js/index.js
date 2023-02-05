import { Router } from "./router.js";

const router = new Router();
router.add("/", "../pages/login.html");
router.add("/cadastro", "../pages/cadastro.html");
router.add("/consumidor", "../pages/consumidor.html");
router.add("/uc", "../pages/uc.html");
router.add(404, "../pages/404.html");
router.handle();

window.onpopstate = () => router.handle();
window.route = () => router.route();

// const newUser = {
//   status: true,
//   nome_Consumidor: "Maicon Carlos Souza",
//   doc_Consumidor: "12345678252",
//   telefone1: "48998907638",
//   telefone2: "48998984738",
// };

// function postUser(newUser) {
//   fetch(url, {
//     method: "POST",
//     body: JSON.stringify(newUser),
//     headers: {
//       "Content-type": "aplicattion/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => (alertApi.textContent = data))
//     .catch((error) => console.error(error));
// }

// postUser(newUser);

if (window.location.pathname == "/consumidor") {

  getConsumidor()
}
if (window.location.pathname == "/uc") {

  getUcs()
}

function PreencheTabelaConsumidor(consumidor) {
  let linhaTabelaConsumidor = document.createElement("tr");
  let tdStatus = document.createElement("td");
  let tdNome = document.createElement("td");
  let tdDocumento = document.createElement("td");
  let tdEmail = document.createElement("td");
  let tdCadastro = document.createElement("td");
  let tdTelefone = document.createElement("td");
  let documentoAjustado;
  let telefoneAjustado;
  let cadastroAjustado;
  const parte1 = consumidor.telefone1.slice(0, 2);
  const parte2 = consumidor.telefone1.slice(2, 3);
  const parte3 = consumidor.telefone1.slice(3, 7);
  const parte4 = consumidor.telefone1.slice(7, 11);
  const parte5 = consumidor.data_cadastro.slice(0, 4);
  const parte6 = consumidor.data_cadastro.slice(5, 7);
  const parte7 = consumidor.data_cadastro.slice(8, 10);

  cadastroAjustado = `${parte7}/${parte6}/${parte5}`;
  telefoneAjustado = `(${parte1}) ${parte2} ${parte3}-${parte4}`;
  tdNome.innerHTML = consumidor.nome_Consumidor;
  tdEmail.innerHTML = consumidor.email;
  tdCadastro.innerHTML = cadastroAjustado;
  tdTelefone.innerHTML = telefoneAjustado;

  if (consumidor.doc_consumidor.length == 14) {
    const parte1 = consumidor.doc_consumidor.slice(0, 2);
    const parte2 = consumidor.doc_consumidor.slice(2, 5);
    const parte3 = consumidor.doc_consumidor.slice(5, 8);
    const parte4 = consumidor.doc_consumidor.slice(8, 12);
    const parte5 = consumidor.doc_consumidor.slice(12, 14);
    documentoAjustado = `${parte1}.${parte2}.${parte3}/${parte4}-${parte5}`;
  } else if (consumidor.doc_consumidor.length == 11) {
    const parte1 = consumidor.doc_consumidor.slice(0, 3);
    const parte2 = consumidor.doc_consumidor.slice(3, 6);
    const parte3 = consumidor.doc_consumidor.slice(6, 9);
    const parte4 = consumidor.doc_consumidor.slice(9, 11);
    documentoAjustado = `${parte1}.${parte2}.${parte3}-${parte4}`;
  }

  if (consumidor.status == true) tdStatus.innerHTML = "Ativo";
  if (consumidor.status == false) tdStatus.innerHTML = "Inativo";
  // Aparece true ou false
  // tdStatus.innerHTML = consumidor.status;
  tdDocumento.innerHTML = documentoAjustado;

  linhaTabelaConsumidor.appendChild(tdStatus);
  linhaTabelaConsumidor.appendChild(tdNome);
  linhaTabelaConsumidor.appendChild(tdDocumento);
  linhaTabelaConsumidor.appendChild(tdEmail);
  linhaTabelaConsumidor.appendChild(tdCadastro);
  linhaTabelaConsumidor.appendChild(tdTelefone);

  return linhaTabelaConsumidor;
}

function getConsumidor() {
  let request = fetch("https://localhost:7230/Consumidor");
  request.then(function (response) {
    response.json().then(function (data) {
      let tabelaConsumidor = document.querySelector(".tabelaConsumidor");
      data.forEach((element) => {
        let linhaTabelaConsumidor = PreencheTabelaConsumidor(element);
        tabelaConsumidor.appendChild(linhaTabelaConsumidor);
      });
    });
  });
}

function PreencheTabelaUC(uc) {
  let linhaTabelaUC = document.createElement("tr");

  let tdNUC = document.createElement("td");
  let tdStatus = document.createElement("td");
  let tdNMedidor = document.createElement("td");
  let tdNCasa = document.createElement("td");
  let tdCEP = document.createElement("td");
  let tdLogradouro = document.createElement("td");
  let tdBairro = document.createElement("td");
  let tdComplemento = document.createElement("td");

  if (uc.status == true) tdStatus.innerHTML = "Ativa";
  if (uc.status == false)
    // Aparece true ou false
    // tdStatus.innerHTML = uc.status;
    tdStatus.innerHTML = "Inativa";
  tdNUC.innerHTML = uc.cod_uc;
  tdNMedidor.innerHTML = uc.num_medidor;
  tdNCasa.innerHTML = uc.num_casa;
  let cepAjustado;
  const parte1 = uc.cep.slice(0, 5);
  const parte2 = uc.cep.slice(5, 8);
  cepAjustado = `${parte1}-${parte2}`;
  tdCEP.innerHTML = cepAjustado;
  tdLogradouro.innerHTML = uc.logradouro;
  tdBairro.innerHTML = uc.bairro;
  tdComplemento.innerHTML = uc.complemento;

  linhaTabelaUC.appendChild(tdNUC);
  linhaTabelaUC.appendChild(tdStatus);
  linhaTabelaUC.appendChild(tdNMedidor);
  linhaTabelaUC.appendChild(tdNCasa);
  linhaTabelaUC.appendChild(tdCEP);
  linhaTabelaUC.appendChild(tdLogradouro);
  linhaTabelaUC.appendChild(tdBairro);
  linhaTabelaUC.appendChild(tdComplemento);

  return linhaTabelaUC;
}
function getUcs() {
  let request = fetch("https://localhost:7230/UnidadeConsumidora/Consumidor/1");
  request.then(function (response) {
    response.json().then(function (data) {
      let tabelaUC = document.querySelector(".tabelaUC");
      data.forEach((element) => {
        let linhaTabelaUC = PreencheTabelaUC(element);
        tabelaUC.appendChild(linhaTabelaUC);
      });
    });
  });
}
