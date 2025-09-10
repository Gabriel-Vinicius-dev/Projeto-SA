document.addEventListener('DOMContentLoaded', () => {
  // Marcar como "toggleable" todos os cards que começam escondidos
  document.querySelectorAll('.section .card.hidden').forEach(card => {
    card.classList.add('toggleable');
  });

  // Preparar todos os botões "Ver mais"
  document.querySelectorAll('.showmore').forEach(button => {
    // Estado acessível
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      // Encontra a seção correspondente (o bloco imediatamente anterior ao .vermais)
      const container = button.closest('.vermais')?.previousElementSibling;
      if (!container) return;

      // 1) Tente usar os que foram marcados inicialmente como "toggleable"
      let toggleCards = container.querySelectorAll('.card.toggleable');

      // 2) Fallback: se ninguém tem toggleable (ex.: HTML mudou),
      // marque como toggleable os que estão hidden
      if (toggleCards.length === 0) {
        container.querySelectorAll('.produtos .card.hidden').forEach(card => {
          card.classList.add('toggleable');
        });
        toggleCards = container.querySelectorAll('.card.toggleable');
      }

      // 3) Fallback extra: se ainda assim não houver, considere "extras" os a partir do 5º
      if (toggleCards.length === 0) {
        container.querySelectorAll('.produtos .card:nth-child(n+5)').forEach(card => {
          card.classList.add('toggleable', 'hidden');
        });
        toggleCards = container.querySelectorAll('.card.toggleable');
      }

      const expanded = button.getAttribute('aria-expanded') === 'true';

      if (!expanded) {
        // Mostrar
        toggleCards.forEach(c => c.classList.remove('hidden'));
        button.textContent = 'Ver menos';
        button.setAttribute('aria-expanded', 'true');
      } else {
        // Esconder novamente só os "extras" (toggleable)
        toggleCards.forEach(c => c.classList.add('hidden'));
        button.textContent = 'Ver mais';
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });
});



const imgContainer = document.querySelector('.banner .img');
const images = document.querySelectorAll('.banner .img img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

function updateSlide() {
    const width = images[0].clientWidth;
    imgContainer.style.transform = `translateX(${-currentIndex * width}px)`;
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide();
});


const btnTopo = document.getElementById("btnTopo");

// Mostrar o botão quando rolar 200px
window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
};

// Voltar ao topo suavemente
btnTopo.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


const BotoesAdicionar = document.querySelectorAll(".adicionar");
const badge = document.getElementById("badge-carrinho");
const sidebarCarrinho = document.getElementById("sidebar-carrinho");
const abrirCarrinho = document.getElementById("abrir-carrinho");
const fecharCarrinho = document.getElementById("fechar-carrinho");
const listaCarrinho = document.getElementById("lista-carrinho");
const footerCarrinho = document.querySelector(".footer-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoResetar = document.getElementById("botao-resetar");

const sidebarLogin = document.getElementById("sidebar-login");
const abrirLogin = document.getElementById("abrir-login");
const fecharLogin = document.getElementById("fechar-login");

// Função para atualizar badge e total
function atualizarCarrinho() {
    const itens = listaCarrinho.querySelectorAll("li:not(#carrinho-vazio)");
    const msgVazio = document.getElementById("carrinho-vazio");
  
    badge.textContent = itens.length;
    badge.style.display = itens.length > 0 ? "inline-block" : "none";
    footerCarrinho.style.display = itens.length > 0 ? "block" : "none";
  
    // Mostra/esconde mensagem de vazio
    msgVazio.style.display = itens.length === 0 ? "flex" : "none";
  
    // Calcular total
    let total = 0;
    itens.forEach(item => {
      const precoTexto = item.querySelector("p:last-child").textContent
        .replace("R$ ", "")
        .replace(",", ".");
      total += parseFloat(precoTexto);
    });
  
    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }
  
  

// Adicionar produto
BotoesAdicionar.forEach(botao => {
  botao.addEventListener("click", () => {
    const card = botao.closest(".card");
    const nome = card.querySelector("h3").textContent;
    const preco = card.querySelector("p").textContent;
    const imagem = card.querySelector("img").src;

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${imagem}" alt="${nome}">
      <div>
        <p><strong>${nome}</strong></p>
        <p>${preco}</p>
      </div>
      <button class="remover">X</button>
    `;

    li.querySelector(".remover").addEventListener("click", () => {
      li.remove();
      atualizarCarrinho();
    });

    listaCarrinho.appendChild(li);
    atualizarCarrinho();
  });
});

// Botão resetar
botaoResetar.addEventListener("click", () => {
  listaCarrinho.innerHTML = "";
  atualizarCarrinho();
});

// Abrir/fechar carrinho
abrirCarrinho.addEventListener("click", () => sidebarCarrinho.classList.add("ativo"));
fecharCarrinho.addEventListener("click", () => sidebarCarrinho.classList.remove("ativo"));

// Abrir/fechar login
abrirLogin.addEventListener("click", () => sidebarLogin.classList.add("ativo"));
fecharLogin.addEventListener("click", () => sidebarLogin.classList.remove("ativo"));
