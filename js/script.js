// Alternar seções no desktop
const desktopButtons = document.querySelectorAll('#desktopPortfolioMenu button');
const portfolioSections = ['projects', 'formations', 'skills'];
const allSections = ['hero', 'carrossel', 'about', 'highlight', 'contact', 'projects', 'formations', 'skills'];

function hidePortfolioSections() {
  portfolioSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// Alternar seções no desktop
desktopButtons.forEach(button => {
  button.addEventListener('click', () => {
    hidePortfolioSections();
    const target = button.getAttribute('data-target');
    const targetSection = document.getElementById(target);
    if (targetSection) {
      targetSection.style.display = 'block';
      targetSection.scrollIntoView({ behavior: 'smooth' });
      desktopButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
    }
  });
});

const mobileButtons = document.querySelectorAll('#menuMobile button');

function hideMobileSections() {
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'none';
    }
  });
}

function showInicio() {
  ['hero', 'carrossel', 'about', 'highlight', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'block';
    }
  });
  document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
}

mobileButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-mobile');
    hideMobileSections();

    if (target === 'inicio') {
      showInicio();
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.style.display = 'block';
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Ao carregar a página, definir estado inicial baseado no tamanho da tela
window.addEventListener('load', () => {
  if (window.innerWidth > 700) {
    // Versão desktop: mostra "Projetos" e ativa o botão
    hidePortfolioSections();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.style.display = 'block';
    }
    const projectsButton = document.querySelector('[data-target="projects"]');
    if (projectsButton) {
      projectsButton.classList.add('active');
    }
  } else {
    // Versão mobile: mostra início
    hideMobileSections();
    showInicio();
  }
});
