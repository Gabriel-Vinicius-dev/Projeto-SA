const cardsIniciaisEscondidos = document.querySelectorAll(".card.hidden");

document.getElementById("verMais").addEventListener("click", function () {
    if (this.textContent === "Ver mais") {
        cardsIniciaisEscondidos.forEach(card => card.classList.remove("hidden"));
        this.textContent = "Ver menos";
    } else {
        cardsIniciaisEscondidos.forEach(card => card.classList.add("hidden"));
        this.textContent = "Ver mais";
    }
});
