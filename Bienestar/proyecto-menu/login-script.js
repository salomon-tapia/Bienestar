document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elementos del DOM ---
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');

    // --- 1. Toggle Mostrar/Ocultar Contraseña ---
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Cambiar icono
        const icon = togglePasswordBtn.querySelector('i');
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
    });

    // --- 2. Validación en Tiempo Real ---
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateField = (input, validationFn, message) => {
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                if (validationFn(input.value)) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                } else {
                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');
                }
            }
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalid')) {
                if (validationFn(input.value)) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            }
        });
    };

    validateField(emailInput, validateEmail, 'Correo inválido');
    validateField(passwordInput, (val) => val.length >= 6, 'Mínimo 6 caracteres');

    // --- 3. Submit del Formulario ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar formulario
        if (!loginForm.checkValidity()) {
            e.stopPropagation();
            loginForm.classList.add('was-validated');
            
            // Efecto shake en la tarjeta
            const card = document.querySelector('.login-card');
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
            
            return;
        }

        loginForm.classList.add('was-validated');

        // Simular proceso de login
        setLoading(true);

        try {
            // Simular llamada API (2 segundos)
            await simulateLogin({
                email: emailInput.value,
                password: passwordInput.value
            });

            // Éxito
            showNotification('¡Login exitoso! Redirigiendo...', 'success');
            
            setTimeout(() => {
                // Aquí iría la redirección real
                console.log('Redirigiendo al dashboard...');
                // window.location.href = '/dashboard';
            }, 1500);

        } catch (error) {
            // Error
            showNotification('Credenciales incorrectas. Inténtalo de nuevo.', 'error');
            passwordInput.value = '';
            passwordInput.focus();
        } finally {
            setLoading(false);
        }
    });

    // --- Función de Simulación de Login ---
    const simulateLogin = (credentials) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular validación (en producción esto va al backend)
                if (credentials.email === 'demo@ejemplo.com' && credentials.password === '123456') {
                    resolve({ success: true, user: { email: credentials.email } });
                } else {
                    // Para demo: aceptar cualquier credencial válida
                    resolve({ success: true, user: { email: credentials.email } });
                    // reject(new Error('Invalid credentials'));
                }
            }, 2000);
        });
    };

    // --- Loading State ---
    const setLoading = (isLoading) => {
        if (isLoading) {
            loginBtn.disabled = true;
            btnText.classList.add('d-none');
            btnLoader.classList.remove('d-none');
        } else {
            loginBtn.disabled = false;
            btnText.classList.remove('d-none');
            btnLoader.classList.add('d-none');
        }
    };

    // --- Notificaciones ---
    const showNotification = (message, type) => {
        // Crear alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insertar antes del formulario
        const cardBody = document.querySelector('.login-card .card-body');
        cardBody.insertBefore(alertDiv, cardBody.firstChild);

        // Auto-dismiss después de 5 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    };

    // --- Demo: Autocompletar credenciales ---
    console.log('%c Demo Credentials ', 'background: #2563eb; color: white; padding: 10px; border-radius: 5px;');
    console.log('Email: demo@ejemplo.com');
    console.log('Password: 123456');
});