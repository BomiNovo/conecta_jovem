const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector(".menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  document.addEventListener("click", (evento) => {
    if (!menu.contains(evento.target) && !botaoMenu.contains(evento.target)) {
      menu.classList.remove("aberto");

      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("aberto");

      botaoMenu.setAttribute("aria-expanded", "false");
    });
  });
}

const galeria = document.querySelector(".galeria");

if (galeria) {
  const itens = Array.from(document.querySelectorAll(".item-galeria"));
  const botoesFiltro = document.querySelectorAll(".filtro");
  const contador = document.querySelector(".contador");
  const modal = document.querySelector(".modal");

  const imagemModal = document.querySelector(".imagem-modal");
  const tituloModal = document.querySelector(".titulo-modal");
  const categoriaModal = document.querySelector(".categoria-modal");

  const descricaoModal = document.querySelector(".descricao-modal");
  const posicaoModal = document.querySelector(".posicao-modal");
  const fecharModal = document.querySelector(".fechar-modal");

  const anterior = document.querySelector(".anterior");
  const proxima = document.querySelector(".proxima");

  let filtroAtual = "Todas";
  let fotosVisiveis = itens;

  let indiceAtual = 0;

  function aplicarFiltro(categoria) {
    filtroAtual = categoria;

    fotosVisiveis = itens.filter(
      (item) => categoria === "Todas" || item.dataset.categoria === categoria,
    );

    itens.forEach((item) => {
      item.hidden = !fotosVisiveis.includes(item);
    });

    galeria.classList.toggle("filtrada", categoria !== "Todas");

    contador.textContent = `${fotosVisiveis.length} de 9 imagens exibidas`;

    botoesFiltro.forEach((botao) => {
      botao.classList.toggle("ativo", botao.dataset.filtro === categoria);
    });
  }

  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => aplicarFiltro(botao.dataset.filtro));
  });

  function atualizarModal() {
    const item = fotosVisiveis[indiceAtual];

    imagemModal.src = item.querySelector("img").src;
    imagemModal.alt = item.querySelector("img").alt;
    tituloModal.textContent = item.dataset.titulo;

    descricaoModal.textContent = item.dataset.descricao;
    posicaoModal.textContent = `${indiceAtual + 1} de ${fotosVisiveis.length}`;
  }

  function abrirModal(item) {
    origemFoco = item;

    indiceAtual = fotosVisiveis.indexOf(item);

    if (indiceAtual < 0) indiceAtual = 0;
    atualizarModal();
    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
    fecharModal.focus();
  }

  function fechar() {
    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
    if (origemFoco) origemFoco.focus();
  }
  
  function mudarImagem(direcao) {
    indiceAtual =
      (indiceAtual + direcao + fotosVisiveis.length) % fotosVisiveis.length;
    atualizarModal();
  }

  itens.forEach((item) => {
    item.addEventListener("click", () => abrirModal(item));
    item.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirModal(item);
      }
    });
  });

  fecharModal.addEventListener("click", fechar);
  anterior.addEventListener("click", () => mudarImagem(-1));
  proxima.addEventListener("click", () => mudarImagem(1));

  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) fechar();
  });

  document.addEventListener("keydown", (evento) => {
    if (!modal.classList.contains("aberto")) return;
    if (evento.key === "Escape") fechar();
    if (evento.key === "ArrowLeft") mudarImagem(-1);
    if (evento.key === "ArrowRight") mudarImagem(1);
  });
}
