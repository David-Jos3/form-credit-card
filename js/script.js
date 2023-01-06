const campoHolder = document.querySelector(".campo-holder");
const campoNumber = document.querySelector(".campo-number");
const campoDate = document.querySelector(".campo-exp-date");
const segundoCampoDate = document.querySelector(".campo-exp-date2");
const campoCvc = document.querySelector(".campo-cvc");
const btn = document.querySelector(".btn");
const btnContinue = document.querySelector(".btn-continue");
const span = document.querySelectorAll(".span-required");

function pegarNomeCartao() {
  const nomeCard = document.querySelector(".nome-card");
  const dadosCampoHolder = campoHolder.value;
  return (nomeCard.innerHTML = dadosCampoHolder);
}

function pegarNumerosCartao() {
  const numeroCard = document.querySelector(".numero-card");
  const dadosCampoNumber = campoNumber.value;
  return (numeroCard.innerHTML = dadosCampoNumber);
}

function pegarMesAno() {
  const dataCard = document.querySelector(".data-card");
  const mesDataCard = Number(campoDate.value);
  const anoDataCard = Number(segundoCampoDate.value);
  return (dataCard.innerHTML = `${mesDataCard}/${anoDataCard}`);
}

function pegarCvc() {
  const cvc = document.querySelector(".cvc");
  const valueCvc = Number(campoCvc.value);
  return (cvc.innerHTML = valueCvc);
}

function removeCampoCartao() {
  const label = document.querySelectorAll("label");
  label[0].style.display = "none";
  label[1].style.display = "none";
  label[2].style.display = "none";
  label[3].style.display = "none";
  btn.style.display = "none";
  campoHolder.style.display = "none";
  campoDate.style.display = "none";
  campoCvc.style.display = "none";
  campoNumber.style.display = "none";
  segundoCampoDate.style.display = "none";
}

function addDetalhesCartao() {
  const detalheCartao = document.querySelector(".area-checked");
  detalheCartao.style.display = "flex";
  btnContinue.style.display = "block";
}

btnContinue.addEventListener("click", () => {});

campoHolder.addEventListener("keyup", pegarNomeCartao);

campoHolder.addEventListener("keypress", (e) => {
  let keycode = e.keycode ? e.keycode : e.which;
  if (keycode > 47 && keycode < 58) {
    e.preventDefault();
  }
});

campoNumber.addEventListener("keyup", (e) => {
  let numeroCartao = e.target.value.replace(/\D/g, "");
  numeroCartao = numeroCartao.replace(/(\d{4})(\d)/, "$1 $2");
  numeroCartao = numeroCartao.replace(/(\d{4})(\d)/, "$1 $2");
  numeroCartao = numeroCartao.replace(/(\d{4})(\d)/, "$1 $2");
  numeroCartao = numeroCartao.replace(/(\d{4})\d+?$/, "$1");
  e.target.value = numeroCartao;

  pegarNumerosCartao();
});

campoCvc.addEventListener("keyup", pegarCvc);

campoDate.addEventListener("keyup", pegarMesAno);
segundoCampoDate.addEventListener("keyup", pegarMesAno);

btn.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    !campoHolder.value ||
    !campoNumber.value ||
    !campoDate.value ||
    !segundoCampoDate.value ||
    !campoCvc.value ||
    isNaN(campoDate.value) == true ||
    isNaN(segundoCampoDate.value) == true ||
    isNaN(campoCvc.value)
  ) {
    if (campoHolder.value === "") {
      campoHolder.classList.add("errorInput");
      span[0].style.display = "block";
    } else {
      campoHolder.classList.remove("errorInput");
      span[0].style.display = "none";
    }

    if (campoNumber.value === "" || campoNumber.value.length < 19) {
      campoNumber.classList.add("errorInput");
      span[1].style.display = "block";
    } else {
      campoNumber.classList.remove("errorInput");
      span[1].style.display = "none";
    }

    if (
      campoDate.value == "" ||
      campoDate.value > 12 ||
      isNaN(campoDate.value) == true ||
      segundoCampoDate.value == "" ||
      isNaN(segundoCampoDate.value) == true
    ) {
      campoDate.classList.add("errorInput");
      segundoCampoDate.classList.add("errorInput");
      span[2].style.display = "block";
    } else {
      campoDate.classList.remove("errorInput");
      segundoCampoDate.classList.remove("errorInput");
      span[2].style.display = "none";
    }

    if (
      campoCvc.value === "" ||
      campoCvc.value.length < 3 ||
      isNaN(campoCvc.value) == true
    ) {
      campoCvc.classList.add("errorInput");
      span[3].style.display = "block";
    } else {
      campoCvc.classList.remove("errorInput");
      span[3].style.display = "none";
    }
  } else {
    campoHolder.classList.remove("errorInput");
    span[0].style.display = "none";

    campoNumber.classList.remove("errorInput");
    span[1].style.display = "none";

    campoDate.classList.remove("errorInput");
    segundoCampoDate.classList.remove("errorInput");
    span[2].style.display = "none";

    segundoCampoDate.classList.remove("errorInput");
    span[2].style.display = "none";

    campoCvc.classList.remove("errorInput");
    span[3].style.display = "none";

    pegarCvc();
    removeCampoCartao();
    addDetalhesCartao();
    pegarMesAno();
    pegarNumerosCartao();
    pegarNomeCartao();
  }
});
