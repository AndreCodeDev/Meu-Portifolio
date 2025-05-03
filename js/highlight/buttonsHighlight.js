
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".highlight-card");
    const textBlocks = document.querySelectorAll(".highlights--subtitle");
    const cardsSections = {
      conquistas: document.getElementById("cards-conquistas"),
      formacoes: document.getElementById("cards-formacoes"),
    };

    let active = "conquistas"; // padrão ativo

    function toggleContent(target) {
      // Atualiza classes dos botões
      buttons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.target === target);
      });

      // Atualiza texto
      textBlocks.forEach(text => {
        text.classList.toggle("hidden", text.dataset.text !== target);
      });

      // Atualiza cards
      Object.keys(cardsSections).forEach(key => {
        cardsSections[key].classList.toggle("hidden", key !== target);
      });

      active = target;
    }

    // Inicializa com conquistas ativos
    toggleContent(active);

    buttons.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const target = btn.dataset.target;
        if (target !== active) toggleContent(target);
      });
    });
  });
