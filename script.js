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
    
    if (!track || !cards.length || !prevBtn || !nextBtn) return;

    // Temporalmente visible para calcular dimensiones
    const originalVisibility = carousel.style.visibility;
    const originalDisplay = carousel.style.display;
    carousel.style.visibility = 'visible';
    carousel.style.display = 'block';

    const cardWidth = cards.length > 0 ? cards[0].offsetWidth : 0;
    
    // Restaurar visibilidad y display
    carousel.style.visibility = originalVisibility;
    carousel.style.display = originalDisplay;

    if (cardWidth === 0) {
        log(`Saltando inicialización para carrusel oculto: ${category}`);
        return;
    }

    const trackStyle = window.getComputedStyle(track);
    const cardGap = parseInt(trackStyle.gap) || 30;
    const trackWidth = track.offsetWidth;
    
    const visibleCards = Math.max(1, Math.round(trackWidth / (cardWidth + cardGap)));
    
    log(`Inicializando carrusel ${category}: ${cards.length} tarjetas, ${visibleCards} visibles`);
    
    carouselStates[category] = {
        currentIndex: 0,
        totalCards: cards.length,
        cardWidth: cardWidth,
        cardGap: cardGap,
        visibleCards: visibleCards
    };

    // Asignar eventos a los botones
    prevBtn.onclick = () => navigateCarousel(category, 'prev');
    nextBtn.onclick = () => navigateCarousel(category, 'next');

    track.style.transform = 'translateX(0px)';
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
    if (!state) {
        log(`Error: No se encontró el estado para el carrusel ${category}`);
        return;
    }
    
    const track = document.querySelector(`[data-category="${category}"] .carousel-track`);
    const maxIndex = Math.max(0, state.totalCards - state.visibleCards);
    
    let newIndex = state.currentIndex;
    if (direction === 'prev' && state.currentIndex > 0) {
        newIndex--;
    } else if (direction === 'next' && state.currentIndex < maxIndex) {
        newIndex++;
    } else {
        return; // No hacer nada si no se puede mover
    }
    
    const translateX = -(newIndex * (state.cardWidth + state.cardGap));
    track.style.transform = `translateX(${translateX}px)`;
    state.currentIndex = newIndex;
    
    log(`Carrusel ${category} movido a índice ${state.currentIndex}`);
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

    const canScroll = state.totalCards > state.visibleCards;

    prevBtn.style.display = canScroll ? 'flex' : 'none';
    nextBtn.style.display = canScroll ? 'flex' : 'none';

    if (!canScroll) return;

    const maxIndex = Math.max(0, state.totalCards - state.visibleCards);
    
    prevBtn.disabled = state.currentIndex === 0;
    prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
    
    nextBtn.disabled = state.currentIndex >= maxIndex;
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
}

// Función para cambiar entre categorías
function switchCategory(category) {
    log('Cambiando a categoría:', category);
    currentCategory = category;

    document.querySelectorAll('.carousel-container').forEach(carousel => {
        carousel.classList.remove('active');
    });

    const targetCarousel = document.querySelector(`[data-category="${category}"]`);
    if (targetCarousel) {
        targetCarousel.classList.add('active');
        initializeSingleCarousel(targetCarousel);
    }

    updateCategoryButtons(category);
}

// Función para actualizar el estado visual de los botones de categoría
function updateCategoryButtons(activeCategory) {
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Encontrar el botón correspondiente a la categoría
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
    const formStatus = document.getElementById('formStatus');
    const form = document.getElementById('contactForm');
    
    mostrarEstado('Enviando mensaje...', 'info');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('https://formspree.io/f/xrbkqjkj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            mostrarEstado('¡Gracias por tu mensaje! Te contactaremos pronto.', 'success');
            form.reset();
        } else {
            throw new Error('Error en el envío');
        }
    })
    .catch(() => {
        mostrarEstado('Lo sentimos, hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
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

document.addEventListener('DOMContentLoaded', function() {
    log('Inicializando aplicación NEV');
    
    showSection('inicio');
    initializeCarousels();
    
    // Inicializar animaciones modernas
    initializeAnimations();
    
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('click', function() {
            const categoryText = this.querySelector('h3').textContent;
            const categoryMap = {
                'Automovil': 'automovil', 'Pickup': 'pickup', 'Furgoneta': 'furgoneta',
                'Camión': 'camion', 'Tractor': 'tractor', 'Autobus': 'autobus'
            };
            if (categoryMap[categoryText]) {
                switchCategory(categoryMap[categoryText]);
            }
        });
    });
    
    document.querySelectorAll('.discover-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
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
            // Reiniciar animaciones después del resize
            resetAnimations();
        }, 250);
    });
    
    document.querySelectorAll('.close-details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showMainContent();
        });
    });

    // Scroll a la sección hero si es necesario
    if (window.location.hash === '' || window.location.hash === '#inicio') {
        const heroSection = document.querySelector('#inicio');
        if (heroSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const top = heroSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    // Forzar descarga de Fichas Técnicas
    const downloadLinks = document.querySelectorAll('.force-download');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            const filename = this.getAttribute('download') || 'ficha-tecnica.pdf';
            
            log(`Forzando descarga de: ${url} como ${filename}`);

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
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
                    // Si falla, intentar abrir en una nueva pestaña como fallback
                    window.open(url, '_blank');
                });
        });
    });

    log('Aplicación NEV inicializada correctamente');
});
