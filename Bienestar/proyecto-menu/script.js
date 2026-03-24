document.addEventListener('DOMContentLoaded', () => {
    
    // --- Selección de Elementos ---
    const header = document.getElementById('main-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- 1. Efecto Sticky al hacer Scroll ---
    // Usamos un threshold para que no parpadee al inicio
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Toggle del Menú Móvil ---
    navToggle.addEventListener('click', () => {
        // Alternar clase para mostrar/ocultar
        navMenu.classList.toggle('show-menu');
        
        // Alternar clase para animar el icono hamburguesa
        navToggle.classList.toggle('active');

        // Accesibilidad: Actualizar estado ARIA
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // --- 3. Cerrar menú al hacer clic en un enlace ---
    // Importante para UX en móvil: el usuario hace clic y el menú se cierra
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // --- 4. Cerrar menú al hacer clic fuera (Opcional pero recomendado) ---
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});