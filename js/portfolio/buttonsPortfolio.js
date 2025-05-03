
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".portfolio-card");
    const textBlocks = document.querySelectorAll(".portfolio--subtitle");
    const cardsSections = {
      projetos: document.getElementById("cards-projetos"),
      codelab: document.getElementById("cards-codelab"),
      certificados: document.getElementById("cards-certificados"),
      skills: document.getElementById("cards-skills"),
    };
  
    let active = "projetos"; // padrão ativo
  
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
  
    // Inicializa com projetos ativos
    toggleContent(active);
  
    buttons.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const target = btn.dataset.target;
        if (target !== active) toggleContent(target);
      });
    });
  });
