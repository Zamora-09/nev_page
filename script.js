// Función de logging para debugging
function log(message, data = null) {
    console.log(`[NEV] ${message}`, data || '');
}

// Variables globales para el estado de los carruseles
let currentCategory = 'automovil';
let carouselStates = {};

// Función para animar contadores
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Función para observar elementos y activar animaciones
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animar contadores de stats
                if (element.classList.contains('stat-item')) {
                    const numberElement = element.querySelector('.stat-number');
                    if (numberElement && !element.dataset.animated) {
                        const target = parseInt(numberElement.textContent);
                        element.dataset.animated = 'true';
                        
                        // Pequeño delay para que la animación de entrada termine
                        setTimeout(() => {
                            animateCounter(numberElement, target, 1500);
                        }, 300);
                    }
                }
                
                // Activar animaciones de features
                if (element.classList.contains('feature-item') && !element.dataset.animated) {
                    element.dataset.animated = 'true';
                    element.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);

    // Observar elementos de stats
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });

    // Observar elementos de features
    document.querySelectorAll('.feature-item').forEach(item => {
        observer.observe(item);
    });
}

// Función para inicializar animaciones al cargar la página
function initializeAnimations() {
    log('Inicializando animaciones');
    
    // Pausar animaciones CSS inicialmente
    document.querySelectorAll('.feature-item').forEach(item => {
        item.style.animationPlayState = 'paused';
    });
    
    // Observar elementos para activar animaciones
    observeElements();
    
    // Animar elementos que ya están visibles
    setTimeout(() => {
        const visibleStats = document.querySelectorAll('.stat-item');
        visibleStats.forEach((stat, index) => {
            const numberElement = stat.querySelector('.stat-number');
            if (numberElement && !stat.dataset.animated) {
                const target = parseInt(numberElement.textContent);
                stat.dataset.animated = 'true';
                
                setTimeout(() => {
                    animateCounter(numberElement, target, 1500);
                }, index * 200);
            }
        });
    }, 500);
}

// Función para reiniciar animaciones
function resetAnimations() {
    document.querySelectorAll('.stat-item, .feature-item').forEach(item => {
        delete item.dataset.animated;
        if (item.classList.contains('feature-item')) {
            item.style.animationPlayState = 'running';
        }
    });
}

// Función para inicializar un solo carrusel (cuando es visible)
function initializeSingleCarousel(carousel) {
    const category = carousel.getAttribute('data-category');
    if (!category) return;

    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.product-card');
    const prevBtn = carousel.querySelector('.carousel-button.prev');
    const nextBtn = carousel.querySelector('.carousel-button.next');
    const wrapper = carousel.querySelector('.carousel-wrapper');
    
    if (!track || !cards.length || !prevBtn || !nextBtn || !wrapper) return;

    // Temporalmente visible para calcular dimensiones
    const originalVisibility = carousel.style.visibility;
    const originalDisplay = carousel.style.display;
    carousel.style.visibility = 'visible';
    carousel.style.display = 'block';

    const cardWidth = cards.length > 0 ? cards[0].offsetWidth : 0;
    const cardGap = 30;
    const wrapperWidth = wrapper.offsetWidth;
    const totalCards = cards.length;
    
    // Restaurar visibilidad y display
    carousel.style.visibility = originalVisibility;
    carousel.style.display = originalDisplay;

    if (cardWidth === 0) {
        log(`Saltando inicialización para carrusel oculto: ${category}`);
        return;
    }
    
    carouselStates[category] = {
        currentIndex: 0,
        totalCards: cards.length,
        cardWidth: cardWidth,
        cardGap: cardGap
    };

    // Asignar eventos a los botones
    prevBtn.onclick = () => navigateCarousel(category, 'prev');
    nextBtn.onclick = () => navigateCarousel(category, 'next');

    // Detectar si estamos en móvil
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // En móvil: centrar la primera tarjeta
        const centerOffset = (wrapperWidth - cardWidth) / 2;
        track.style.transform = `translateX(${centerOffset}px)`;
    } else {
        // En escritorio: alinear a la izquierda
        track.style.transform = `translateX(0px)`;
    }

    updateCarouselButtons(category);
}

// Función para inicializar los carruseles que estén visibles
function initializeCarousels() {
    log('Inicializando carruseles visibles');
    const activeCarousel = document.querySelector('.carousel-container.active');
    if (activeCarousel) {
        initializeSingleCarousel(activeCarousel);
    }
}

// Función para navegar en el carrusel
function navigateCarousel(category, direction) {
    const state = carouselStates[category];
    if (!state) return;

    const carousel = document.querySelector(`[data-category="${category}"]`);
    const track = carousel.querySelector('.carousel-track');
    const wrapper = carousel.querySelector('.carousel-wrapper');
    const cards = carousel.querySelectorAll('.product-card');

    if (!track || !cards.length || !wrapper) return;

    const cardWidth = state.cardWidth;
    const cardGap = state.cardGap;
    const wrapperWidth = wrapper.offsetWidth;
    const totalCards = state.totalCards;

    // Detectar si estamos en móvil
    const isMobile = window.innerWidth <= 768;
    
    let newIndex = state.currentIndex;
    
    if (direction === 'prev') {
        if (isMobile) {
            // En móvil: navegación circular
            newIndex = newIndex > 0 ? newIndex - 1 : totalCards - 1;
        } else {
            // En escritorio: límite en la primera tarjeta
            if (state.currentIndex > 0) {
        newIndex--;
            } else {
                return; // No permitir ir más allá de la primera
            }
        }
    } else if (direction === 'next') {
        if (isMobile) {
            // En móvil: navegación circular
            newIndex = newIndex < totalCards - 1 ? newIndex + 1 : 0;
        } else {
            // En escritorio: calcular el límite máximo
            const maxVisibleCards = Math.floor(wrapperWidth / (cardWidth + cardGap));
            const maxIndex = Math.max(0, totalCards - maxVisibleCards);
            
            if (state.currentIndex < maxIndex) {
        newIndex++;
    } else {
                return; // No permitir ir más allá del límite
            }
        }
    }

    // Calcular el desplazamiento
    const centerOffset = (wrapperWidth - cardWidth) / 2;
    const translateX = -(newIndex * (cardWidth + cardGap) - centerOffset);
    
    track.style.transform = `translateX(${translateX}px)`;
    state.currentIndex = newIndex;
    
    updateCarouselButtons(category);
}

// Función para actualizar el estado de los botones del carrusel
function updateCarouselButtons(category) {
    const state = carouselStates[category];
    if (!state) return;
    
    const carousel = document.querySelector(`[data-category="${category}"]`);
    const prevBtn = carousel.querySelector('.carousel-button.prev');
    const nextBtn = carousel.querySelector('.carousel-button.next');
    
    if (!prevBtn || !nextBtn) return;

    // Detectar si estamos en móvil
    const isMobile = window.innerWidth <= 768;

    // Ocultar botones en escritorio si hay 3 o menos tarjetas
    if (!isMobile && state.totalCards <= 3) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }
    // Ocultar botones si solo hay una tarjeta (en móvil o escritorio)
    if (state.totalCards <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }

    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';

    if (isMobile) {
        // En móvil: botones siempre activos (carrusel circular)
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    } else {
        // En escritorio: deshabilitar botones en los extremos
        const wrapper = carousel.querySelector('.carousel-wrapper');
        const wrapperWidth = wrapper ? wrapper.offsetWidth : 0;
        const maxVisibleCards = Math.floor(wrapperWidth / (state.cardWidth + state.cardGap));
        const maxIndex = Math.max(0, state.totalCards - maxVisibleCards);
    
    prevBtn.disabled = state.currentIndex === 0;
    prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
    
    nextBtn.disabled = state.currentIndex >= maxIndex;
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
}

// Función para cambiar entre categorías
function switchCategory(category) {
    log('Cambiando a categoría:', category);
    currentCategory = category;

    // Ocultar todos los carruseles
    const allCarousels = document.querySelectorAll('.carousel-container');
    log('Carruseles encontrados:', allCarousels.length);
    
    allCarousels.forEach(carousel => {
        carousel.classList.remove('active');
        log('Carrusel ocultado:', carousel.getAttribute('data-category'));
    });

    // Mostrar el carrusel de la categoría seleccionada
    const targetCarousel = document.querySelector(`[data-category="${category}"]`);
    if (targetCarousel) {
        targetCarousel.classList.add('active');
        log('Carrusel activado:', category);
        initializeSingleCarousel(targetCarousel);
    } else {
        log('ERROR: No se encontró el carrusel para la categoría:', category);
    }

    // Actualizar el estado visual de los botones de categoría
    updateCategoryButtons(category);
}

// Función para actualizar el estado visual de los botones de categoría
function updateCategoryButtons(activeCategory) {
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Mapeo de categorías
    const categoryMap = {
        'automovil': 'Automovil',
        'pickup': 'Pickup',
        'furgoneta': 'Furgoneta',
        'camion': 'Camión',
        'tractor': 'Tractor',
        'autobus': 'Autobus'
    };
    
    const targetText = categoryMap[activeCategory];
    if (targetText) {
        const targetItem = Array.from(featureItems).find(item => 
            item.querySelector('h3').textContent === targetText
        );
        if (targetItem) {
            targetItem.classList.add('active');
        }
    }
}

// Función unificada para manejar la visibilidad de secciones
function showSection(sectionId) {
    log('Mostrando sección:', sectionId);
    
    // Ocultar TODAS las secciones primero
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Ocultar todos los detalles de productos
    const allProductDetails = document.querySelectorAll('.product-details');
    allProductDetails.forEach(detail => {
        detail.classList.remove('active'); // Usar clase en lugar de estilo inline
    });
    
    // Mostrar solo la sección solicitada
    if (sectionId === 'main' || sectionId === 'home' || sectionId === 'inicio') {
        // Mostrar todas las secciones principales
        const mainSections = document.querySelectorAll('#inicio, .stats, .features, #productos, #beneficios, #contacto');
        log('Secciones principales encontradas:', mainSections.length);
        mainSections.forEach(section => {
            if (section) {
                section.style.display = 'block';
                log('Mostrando sección:', section.id || section.className);
            }
        });
        
        // Mostrar el footer
        const footer = document.querySelector('footer.footer');
        if (footer) {
            footer.style.display = 'block';
            log('Footer mostrado');
        }
        
        // Scroll a la sección hero
        const heroSection = document.querySelector('#inicio');
        const navbar = document.querySelector('.navbar');
        if (heroSection && navbar) {
            setTimeout(() => {
                const navbarHeight = navbar.offsetHeight;
                const top = heroSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }, 100);
        } else {
            log('Error: No se encontró la sección hero');
        }
        history.pushState(null, null, '#inicio');
        
    } else if (sectionId === 'productos') {
        // Mostrar todas las secciones principales
        const mainSections = document.querySelectorAll('#inicio, .stats, .features, #productos, #beneficios, #contacto');
        mainSections.forEach(section => {
            if (section) section.style.display = 'block';
        });
        
        const footer = document.querySelector('footer.footer');
        if (footer) footer.style.display = 'block';
        
        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
            setTimeout(() => {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        history.pushState(null, null, '#productos');
        
    } else if (sectionId === 'beneficios') {
        const mainSections = document.querySelectorAll('#inicio, .stats, .features, #productos, #beneficios, #contacto');
        mainSections.forEach(section => {
            if (section) section.style.display = 'block';
        });
        
        const footer = document.querySelector('footer.footer');
        if (footer) footer.style.display = 'block';
        
        const beneficiosSection = document.querySelector('#beneficios');
        if (beneficiosSection) {
            setTimeout(() => {
                beneficiosSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        history.pushState(null, null, '#beneficios');
        
    } else if (sectionId === 'contacto') {
        const mainSections = document.querySelectorAll('#inicio, .stats, .features, #productos, #beneficios, #contacto');
        mainSections.forEach(section => {
            if (section) section.style.display = 'block';
        });
        
        const footer = document.querySelector('footer.footer');
        if (footer) footer.style.display = 'block';
        
        const contactoSection = document.querySelector('#contacto');
        if (contactoSection) {
            setTimeout(() => {
                contactoSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        history.pushState(null, null, '#contacto');
        
    } else if (sectionId.startsWith('#')) {
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            log('Sección de detalles mostrada:', sectionId);
            
            const mainSections = document.querySelectorAll('#inicio, .stats, .features, #productos, #beneficios, #contacto');
            mainSections.forEach(section => {
                if (section) section.style.display = 'none';
            });
            
            const footer = document.querySelector('footer.footer');
            if (footer) footer.style.display = 'block';
            
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            history.pushState(null, null, sectionId);
        } else {
            log('Error: No se encontró la sección de detalles:', sectionId);
        }
    }
}

function showMainContent() {
    log('Volviendo a la vista principal');
    showSection('main');
}

function showProductDetails(productId) {
    log('Mostrando detalles del producto:', productId);
    const detailSectionId = productId.startsWith('#') ? productId : '#' + productId;
    showSection(detailSectionId);
    
    initializeProductGallery(productId.replace('#', ''));
}

function initializeProductGallery(detailSectionId) {
    const detailSection = document.getElementById(detailSectionId);
    if (!detailSection) return;

    const prevButton = detailSection.querySelector('.prev-image');
    const nextButton = detailSection.querySelector('.next-image');
    const dotsContainer = detailSection.querySelector('.image-dots');
    const imageContainer = detailSection.querySelector('.thumbnail-gallery');
    
    const imageCount = imageContainer ? 1 + imageContainer.children.length : 1;
    const hasMultipleImages = imageCount > 1;

    if (prevButton) prevButton.style.display = hasMultipleImages ? 'block' : 'none';
    if (nextButton) nextButton.style.display = hasMultipleImages ? 'block' : 'none';
    if (dotsContainer) dotsContainer.style.display = hasMultipleImages ? 'flex' : 'none';
}

function handleBackButton(e) {
    if (e) e.preventDefault();
    showMainContent();
}

function handleContactButton(e) {
    e.preventDefault();
    showSection('contacto');
}

function handleNavigation(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    
    switch(targetId) {
        case 'inicio':
        case 'productos':
        case 'beneficios':
        case 'contacto':
            showSection(targetId);
            break;
        default:
            if (targetId.includes('-details')) {
                showProductDetails(targetId);
            }
    }
}

function handleSubmit(event) {
    event.preventDefault();
    console.log('Formulario enviado - Iniciando proceso...');
    
    const formStatus = document.getElementById('formStatus');
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    
    if (!form) {
        console.error('Error: No se encontró el formulario con ID "contactForm"');
        return false;
    }
    
    // Cambiar estado del botón a "enviando"
    submitButton.disabled = true;
    buttonText.textContent = 'Enviando...';
    
    mostrarEstado('Enviando mensaje...', 'info');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Datos del formulario:', data);
    
    // Verificar que todos los campos requeridos estén llenos
    const requiredFields = ['nombre', 'email', 'telefono', 'mensaje'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        console.error('Campos faltantes:', missingFields);
        mostrarEstado('Por favor, completa todos los campos requeridos.', 'error');
        // Restaurar estado del botón
        submitButton.disabled = false;
        buttonText.textContent = 'Enviar Mensaje';
        return false;
    }
    
    // Enviar a Formspree
    console.log('Enviando datos a Formspree...');
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        console.log('Respuesta de Formspree:', response.status, response.statusText);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error HTTP: ${response.status}`);
        }
    })
    .then(result => {
        console.log('Resultado de Formspree:', result);
        if (result.ok) {
            mostrarEstado('¡Gracias por tu mensaje! Te contactaremos pronto.', 'success');
            console.log('Limpiando formulario...');
            form.reset();
            console.log('Formulario limpiado exitosamente');
        } else {
            throw new Error('Error en el envío del formulario');
        }
    })
    .catch((error) => {
        console.error('Error completo:', error);
        mostrarEstado('Lo sentimos, hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    })
    .finally(() => {
        // Restaurar estado del botón
        submitButton.disabled = false;
        buttonText.textContent = 'Enviar Mensaje';
    });

    return false;
}

function mostrarEstado(mensaje, tipo) {
    const formStatus = document.getElementById('formStatus');
    formStatus.className = `form-status ${tipo}`;
    formStatus.textContent = mensaje;
    formStatus.style.display = 'block';
    
    if (tipo !== 'error') {
            setTimeout(() => {
                formStatus.style.display = 'none';
        }, 5000);
    }
}

function hideAllProductDetails() {
    const detailsSections = document.querySelectorAll('.product-details');
    detailsSections.forEach(section => {
        section.classList.remove('active');
    });
}

function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const closeButton = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.page-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu-links a, .mobile-menu-cta');

    const toggleMenu = (isActive) => {
        const action = isActive ? 'add' : 'remove';
        menuButton.classList[action]('active');
        mobileMenu.classList[action]('active');
        overlay.classList[action]('active');
        document.body.classList[action]('mobile-menu-active');
    };

    if (menuButton && mobileMenu && overlay) {
        menuButton.addEventListener('click', () => toggleMenu(true));
        closeButton.addEventListener('click', () => toggleMenu(false));
        overlay.addEventListener('click', () => toggleMenu(false));

        menuLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }
}

// Scroll suave al inicio de la página
const heroSection = document.querySelector('#inicio');
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar ? navbar.offsetHeight : 0;
const targetPosition = heroSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
window.scrollTo({ top: targetPosition, behavior: 'smooth' });

function setupBenefitsAccordion() {
  const isMobile = window.innerWidth <= 768;
  const cards = document.querySelectorAll('.benefit-card');
  const headings = document.querySelectorAll('.benefit-card h3');

  // Limpia todos los icon-toggle y clases
  document.querySelectorAll('.icon-toggle').forEach(icon => icon.remove());
  cards.forEach(card => card.classList.remove('active'));

  if (isMobile) {
    headings.forEach(h3 => {
      // Agrega el icon-toggle solo si no existe
      if (!h3.querySelector('.icon-toggle')) {
        const icon = document.createElement('span');
        icon.className = 'icon-toggle';
        icon.textContent = '+';
        h3.appendChild(icon);
      }
      h3.onclick = function () {
        const card = this.parentElement;
        const isActive = card.classList.contains('active');
        // Cerrar todos
        cards.forEach(c => {
          c.classList.remove('active');
          const icon = c.querySelector('.icon-toggle');
          if (icon) icon.textContent = '+';
        });
        // Si no estaba activo, abrirlo; si ya estaba activo, dejarlo cerrado
        if (!isActive) {
          card.classList.add('active');
          const icon = card.querySelector('.icon-toggle');
          if (icon) icon.textContent = '–';
        }
      };
    });
  } else {
    // En escritorio: todos abiertos, sin íconos
    cards.forEach(card => card.classList.add('active'));
  }
}

window.addEventListener('DOMContentLoaded', setupBenefitsAccordion);
window.addEventListener('resize', setupBenefitsAccordion);

// Función para validar campo de teléfono
function setupPhoneValidation() {
    const phoneInput = document.getElementById('telefono');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remover cualquier carácter que no sea número
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limitar a 15 caracteres
            if (this.value.length > 15) {
                this.value = this.value.slice(0, 15);
            }
        });
        
        // Prevenir pegar texto que no sea numérico
        phoneInput.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numericOnly = pastedText.replace(/[^0-9]/g, '');
            const currentValue = this.value;
            const newValue = currentValue + numericOnly;
            
            if (newValue.length <= 15) {
                this.value = newValue;
            } else {
                this.value = newValue.slice(0, 15);
            }
        });
    }
}

// Configuración dinámica de Formspree
const FORMSPREE_ID = "mvgqgkjg"; // <-- Tu Form ID real

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.action = `https://formspree.io/f/${FORMSPREE_ID}`;
    }
    log('Inicializando aplicación NEV');
    
    showSection('inicio');
    
    initializeAnimations();
    initializeCarousels();
    setupMobileMenu();
    setupBenefitsAccordion(); // Agregar validación de teléfono

    // Event listeners para categorías con debugging
    const featureItems = document.querySelectorAll('.feature-item');
    log('Feature items encontrados:', featureItems.length);
    
    featureItems.forEach((item, index) => {
        log(`Configurando feature item ${index}:`, item.querySelector('h3')?.textContent);
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            log('Clic en feature item:', this.querySelector('h3')?.textContent);
            
            const categoryText = this.querySelector('h3').textContent.trim();
            const categoryMap = {
                'Automovil': 'automovil',
                'Pickup': 'pickup',
                'Furgoneta': 'furgoneta',
                'Camión': 'camion',
                'Tractor': 'tractor',
                'Autobus': 'autobus'
            };
            const category = categoryMap[categoryText];
            log('Categoría mapeada:', category);
            if (category) {
                switchCategory(category);
            }
        });
    });
    
    // Event listeners para botones "Descúbrelo" con debugging
    const discoverButtons = document.querySelectorAll('.discover-btn');
    log('Botones discover encontrados:', discoverButtons.length);
    
    discoverButtons.forEach((button, index) => {
        log(`Configurando botón discover ${index}:`, button.getAttribute('href'));
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            log('Clic en botón discover:', this.getAttribute('href'));
            
            const productId = this.getAttribute('href');
            if (productId) {
                showProductDetails(productId);
            }
        });
    });

    document.querySelectorAll('.nav-links a, .hero-buttons a, .nav-cta').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            log('Ventana redimensionada, reinicializando carruseles');
            initializeCarousels();
            resetAnimations();
        }, 250);
    });
    
    document.querySelectorAll('.close-details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showMainContent();
        });
    });

    if (window.location.hash === '' || window.location.hash === '#inicio') {
        const heroSection = document.querySelector('#inicio');
        if (heroSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const top = heroSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    const downloadLinks = document.querySelectorAll('.force-download');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            const filename = this.getAttribute('download') || 'ficha-tecnica.pdf';
            log(`Forzando descarga de: ${url} como ${filename}`);
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok.');
                    return response.blob();
                })
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = blobUrl;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(blobUrl);
                    a.remove();
                    log(`Descarga de ${filename} iniciada.`);
                })
                .catch(err => {
                    log('Error durante la descarga forzada:', err);
                    window.open(url, '_blank');
                });
        });
    });

    log('Aplicación NEV inicializada correctamente');
});

// WHATSAPP MODAL FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    const whatsappModal = document.getElementById('whatsappModal');
    const modalCloseBtn = document.querySelector('.whatsapp-modal-close');
    
    // Función para abrir el modal
    function openWhatsAppModal() {
        whatsappModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el modal
    function closeWhatsAppModal() {
        whatsappModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Cerrar modal con el botón X
    modalCloseBtn.addEventListener('click', closeWhatsAppModal);
    
    // Cerrar modal haciendo clic fuera del contenido
    whatsappModal.addEventListener('click', function(e) {
        if (e.target === whatsappModal) {
            closeWhatsAppModal();
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && whatsappModal.classList.contains('show')) {
            closeWhatsAppModal();
        }
    });
    
    // Agregar efecto de click a las opciones del modal
    const whatsappOptions = document.querySelectorAll('.whatsapp-option');
    whatsappOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Cerrar el modal después de un breve delay para que se vea el efecto
            setTimeout(() => {
                closeWhatsAppModal();
            }, 100);
        });
    });
    
    // Hacer la función disponible globalmente para el botón de AION UT
    window.openWhatsAppModal = openWhatsAppModal;
});