const cardsContainer = document.querySelector('.produtos');
const cards = document.querySelectorAll('.card');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const navSects = document.querySelectorAll('.sect');

const cardsPerGroup = 3;
const totalGroups = Math.ceil(cards.length / cardsPerGroup);

let currentIndex = 0;

function updateNavCard() {
    navSects.forEach((sect, index) => {
        sect.classList.toggle('active', index === currentIndex);
    });
}

function scrollCards(direction) {
    const cardWidth = cards[0].offsetWidth + 20; // Largura do card + margem
    const groupWidth = cardWidth * cardsPerGroup;
    const maxIndex = totalGroups - 1;

    if (direction === 'right') {
        currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
    } else if (direction === 'left') {
        currentIndex = (currentIndex - 1) < 0 ? maxIndex : currentIndex - 1;
    }

    cardsContainer.style.transform = `translateX(-${currentIndex * groupWidth}px)`;
    updateNavCard();
}

btnRight.addEventListener('click', () => scrollCards('right'));
btnLeft.addEventListener('click', () => scrollCards('left'));

navSects.forEach((sect, index) => {
    sect.addEventListener('click', () => {
        currentIndex = index;
        const cardWidth = cards[0].offsetWidth + 20;
        const groupWidth = cardWidth * cardsPerGroup;
        cardsContainer.style.transform = `translateX(-${currentIndex * groupWidth}px)`;
        updateNavCard();
    });
});
