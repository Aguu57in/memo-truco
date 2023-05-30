const cartaEl = document.querySelectorAll('.carta');
const ngButton = document.querySelector('.newGame');

let cartaGirada = false;
let bloqTablero = false;
let primeraCarta, segundaCarta;

(function mezclar() {
  cartaEl.forEach(carta => {
    let randomPos = Math.floor(Math.random() * 16);
    carta.style.order = randomPos;
  });
})();

cartaEl.forEach(carta => carta.addEventListener('click', cliquearCarta));


ngButton.addEventListener('click', ()=>{
  location.reload();
})

function cliquearCarta() {
  if (bloqTablero) return;
  if (this === primeraCarta) return;
  this.classList.add('flip');

  if (!cartaGirada) {
    cartaGirada = true;
    primeraCarta = this;
    return;
  }
  segundaCarta = this;
  verificarMatch();
}

function verificarMatch() {
  let match = primeraCarta.dataset.idcarta === segundaCarta.dataset.idcarta;
  match ? mostrarCartas() : voltearCartas();
}

function mostrarCartas() {
  primeraCarta.removeEventListener('click', cliquearCarta);
  segundaCarta.removeEventListener('click', cliquearCarta);
  reestablecer();
}

function voltearCartas() {
  bloqTablero = true;
  setTimeout(() => {
    primeraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');
    reestablecer();
  }, 800);
}

function reestablecer() {
  [cartaGirada, bloqTablero] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}

