const mobileButtons = document.querySelectorAll('#menuMobile button');
const mobileSections = ['hero', 'carrossel', 'about', 'highlight', 'contact', 'projects', 'formations', 'technologies'];

function handleMobileView() {
  // Esconde todas as seções no mobile
  mobileSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  
  // Mostra apenas o início
  showInicio();
}

function showInicio() {
  ['hero', 'carrossel', 'about', 'highlight', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
  document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
}

// Função para restaurar a visibilidade no desktop
function handleDesktopView() {
  mobileSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
}

// Eventos dos botões mobile
mobileButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (window.innerWidth <= 700) { // Só executa no mobile
      const target = button.getAttribute('data-mobile');
      mobileSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });

      if (target === 'inicio') {
        showInicio();
      } else {
        const el = document.getElementById(target);
        if (el) {
          el.style.display = 'block';
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
});

// Verificação inicial e no redimensionamento
function checkViewport() {
  if (window.innerWidth <= 700) {
    handleMobileView();
  } else {
    handleDesktopView();
  }
}

window.addEventListener('load', checkViewport);
window.addEventListener('resize', checkViewport);