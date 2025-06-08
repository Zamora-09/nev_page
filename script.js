// Navegación con anclas suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Manejo de clicks en los features
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('click', function(e) {
        e.preventDefault();
        const productIndex = this.getAttribute('data-product-index');
        const categories = ['automovil', 'pickup', 'furgoneta', 'camion', 'tractor', 'autobus'];
        const selectedCategory = categories[productIndex];
        
        // Ocultar todos los carruseles
        document.querySelectorAll('.carousel-container').forEach(carousel => {
            carousel.style.display = 'none';
        });
        
        // Mostrar el carrusel correspondiente
        const targetCarousel = document.querySelector(`.carousel-container[data-category="${selectedCategory}"]`);
        if (targetCarousel) {
            targetCarousel.style.display = 'block';
        }
        
        // Hacer scroll a la sección de productos
        const productosSection = document.querySelector('#productos');
        if (productosSection) {
            productosSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Efectos avanzados de la barra de navegación
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Cambiar estilo de la barra de navegación basado en la posición del scroll
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // Ocultar/mostrar barra de navegación al hacer scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Observer de intersección mejorado para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Animaciones escalonadas
        }
    });
}, observerOptions);

// Observar todos los elementos animados
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Validación mejorada del formulario
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    // Validación simple
    if (!name || !email) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    // Simular envío del formulario
    showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
    this.reset();
});

// Sistema de notificaciones
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, var(--forest-green), var(--mint-green))' : 'linear-gradient(135deg, #ff6b6b, #ee5a24)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Interacciones mejoradas con las tarjetas de productos
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-25px) scale(1.03)';
        this.style.boxShadow = '0 30px 80px rgba(0,0,0,0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 15px 50px rgba(0,0,0,0.1)';
    });
});

// Animación de contadores en estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.textContent;
        // Extraer el número y el sufijo
        const numericTarget = parseInt(target.match(/\d+/)[0]);
        const suffix = target.replace(/\d+/, '');
        let current = 0;
        
        const duration = 2000; // 2 segundos
        const steps = 60;
        const increment = numericTarget / steps;
        const stepDuration = duration / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                counter.textContent = numericTarget + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, stepDuration);
    });
}

// Activar animación de contadores cuando la sección de estadísticas es visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Efectos hover mejorados para las características
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.boxShadow = '0 15px 40px rgba(74, 144, 226, 0.3)';
    });
    
    feature.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.boxShadow = 'none';
    });
});

// Animación suave para el contenido del hero
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    setTimeout(() => {
        heroContent.classList.add('visible');
    }, 300);
    
    setTimeout(() => {
        heroVisual.classList.add('visible');
    }, 600);
});

// Animaciones sutiles para los enlaces de navegación
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Efectos hover mejorados para botones
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efecto de pantalla de carga
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Carrusel de productos mejorado
document.addEventListener('DOMContentLoaded', () => {
    const productCategories = ['automovil', 'pickup', 'furgoneta', 'camion', 'tractor', 'autobus'];
    const carousels = document.querySelectorAll('.carousel-container');

    // Función para inicializar un carrusel
    function initializeCarousel(carousel) {
        const slides = carousel.querySelectorAll('.product-slide');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        // Generar puntos dinámicamente
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dotsContainer.appendChild(dot);
        });

        const dots = carousel.querySelectorAll('.dot');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        let currentSlide = 0;
        let autoRotateInterval;

        function showSlide(n) {
            slides.forEach(slide => {
                slide.style.display = 'none';
                slide.classList.remove('active');
            });
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].style.display = 'block';
            setTimeout(() => {
                slides[currentSlide].classList.add('active');
            }, 10);
            dots[currentSlide].classList.add('active');
        }

        function startAutoRotate() {
            stopAutoRotate();
            autoRotateInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        function stopAutoRotate() {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
            }
        }

        // Event listeners para los botones
        prevButton?.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(currentSlide - 1);
            stopAutoRotate();
        });

        nextButton?.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(currentSlide + 1);
            stopAutoRotate();
        });

        // Event listeners para los dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopAutoRotate();
            });
        });

        // Pausar rotación al hover
        carousel.addEventListener('mouseenter', stopAutoRotate);
        carousel.addEventListener('mouseleave', startAutoRotate);

        // Inicializar el carrusel
        showSlide(0);
        startAutoRotate();
    }

    // Inicializar todos los carruseles
    carousels.forEach(carousel => {
        initializeCarousel(carousel);
    });

    // Función para mostrar el carrusel de una categoría específica
    function showCategory(category) {
        carousels.forEach(carousel => {
            const isTargetCarousel = carousel.dataset.category === category;
            carousel.style.display = isTargetCarousel ? 'block' : 'none';
            
            // Reiniciar el carrusel cuando se muestra
            if (isTargetCarousel) {
                const slides = carousel.querySelectorAll('.product-slide');
                const dots = carousel.querySelectorAll('.dot');
                slides.forEach((slide, index) => {
                    if (index === 0) {
                        slide.style.display = 'block';
                        slide.classList.add('active');
                    } else {
                        slide.style.display = 'none';
                        slide.classList.remove('active');
                    }
                });
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === 0);
                });
            }
        });
    }

    // Event listeners para los botones de características
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.addEventListener('click', (e) => {
            e.preventDefault();
            const category = productCategories[index];
            showCategory(category);
            document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mostrar el primer carrusel por defecto
    showCategory('automovil');
}); 