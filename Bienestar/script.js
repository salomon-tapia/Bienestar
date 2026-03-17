// ===== MODO OSCURO =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar preferencia guardada en localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Modo Claro';
}

// Evento para cambiar tema
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Modo Claro';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙 Modo Oscuro';
        localStorage.setItem('theme', 'light');
    }
});

// ===== VALIDACIÓN DE FORMULARIO =====
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir envío real
    
    const email = emailInput.value.trim();
    
    // Validación simple de email
    if (!email || !email.includes('@') || !email.includes('.')) {
        formMessage.textContent = '❌ Por favor, ingresa un email válido.';
        formMessage.className = 'message error';
        return;
    }
    
    // Simulación de envío exitoso
    formMessage.textContent = '✅ ¡Gracias! Te hemos enviado más información.';
    formMessage.className = 'message success';
    emailInput.value = '';
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
        formMessage.textContent = '';
    }, 5000);
});