
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const headerMenu = document.getElementById('header__menu');
    const navLinks = document.querySelectorAll('.header__menu-link');
    
    if (!menuToggle || !headerMenu) return;

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        headerMenu.classList.toggle('active');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        headerMenu.classList.remove('active');
    };

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    
    document.querySelectorAll('.header__theme-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => setTimeout(closeMenu, 500));
    });
}

function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__menu-link');
    
    if (!sections.length || !navLinks.length) return;

    let timeout;
    const updateActiveLink = () => {
        let currentSection = null;
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                currentSection = section;
            }
        });

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const isActive = currentSection && linkHref === `#${currentSection.id}`;
            link.classList.toggle('active', isActive);
        });
    };

    window.addEventListener('scroll', () => {
        clearTimeout(timeout);
        timeout = setTimeout(updateActiveLink, 50);
    });
    
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink();
}


// Initialize text animation only after everything is ready
document.addEventListener('loadingComplete', function() {
    initMobileMenu();
    initActiveSection();
});