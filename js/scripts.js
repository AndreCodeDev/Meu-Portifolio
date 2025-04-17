document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuração do Menu Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const headerMenu = document.getElementById('header__menu');
    
    if (menuToggle && headerMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            headerMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar nos links (com delay para o tema)
        document.querySelectorAll('.header__menu-link').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                headerMenu.classList.remove('active');
            });
        });

        // Configuração especial para o botão de tema
        document.querySelectorAll('.header__theme-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Delay de 500ms para a animação do tema
                setTimeout(() => {
                    menuToggle.classList.remove('active');
                    headerMenu.classList.remove('active');
                }, 500);
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!headerMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                headerMenu.classList.remove('active');
            }
        });

        // Fechar menu ao rolar
        window.addEventListener('scroll', function() {
            if (headerMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                headerMenu.classList.remove('active');
            }
        });
    }

    // 2. Controle de Tema com Animações
    const themeToggles = document.querySelectorAll('.header__theme-toggle');

    if (themeToggles.length) {
        // Função para aplicar o tema
        const applyTheme = (isLight) => {
            const html = document.documentElement;
            
            if (isLight) {
                html.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
            
            // Atualiza todos os toggles (incluindo classe active para animações)
            themeToggles.forEach(toggle => {
                toggle.classList.toggle('active', isLight);
                const tooltip = toggle.querySelector('.header__theme-tooltip, .header__theme-label');
                if (tooltip) {
                    tooltip.textContent = isLight ? 'Tema Escuro' : 'Tema Claro';
                }
            });
        };

        // Adiciona eventos aos toggles
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation(); // Mantemos para evitar fechar antes da animação
                const isLight = !document.documentElement.hasAttribute('data-theme');
                applyTheme(isLight);
            });
        });

        // Aplica tema salvo
        const savedTheme = localStorage.getItem('theme');
        applyTheme(savedTheme === 'light');
    }

    // 3. Destaque de Seção Ativa (Opcional)
    const setupActiveSection = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.header__menu-link');
        
        if (!sections.length || !navLinks.length) return;

        const updateActiveLink = () => {
            let currentSection = null;
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    currentSection = section;
                }
            });

            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                const isActive = currentSection && 
                                (linkHref === `#${currentSection.id}` || 
                                (currentSection.id === 'home' && ['index.html', '/'].includes(linkHref)));
                
                link.classList.toggle('active', isActive);
            });
        };

        window.addEventListener('scroll', updateActiveLink);
        window.addEventListener('resize', updateActiveLink);
        updateActiveLink(); // Ativa inicialmente
    };

    setupActiveSection();
});