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
