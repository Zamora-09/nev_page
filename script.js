// Sistema de logging para debug
const DEBUG = true;
function log(message, data = null) {
    if (DEBUG) {
        console.log(`[NEV Debug] ${message}`, data || '');
    }
}

// Función para manejar el botón de volver
function handleBackButton(e) {
    log('Botón volver clickeado');
    if (e) e.preventDefault();
    
    // Ocultar todas las secciones de detalles
    document.querySelectorAll('.product-details').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar todas las secciones principales
    document.querySelectorAll('section:not(.product-details)').forEach(section => {
        section.style.display = 'block';
    });
    
    // Mostrar el carrusel activo
    const activeCategory = document.querySelector('.category-btn.active');
    if (activeCategory) {
        const category = activeCategory.getAttribute('data-category');
        const activeCarousel = document.querySelector(`.carousel-container[data-category="${category}"]`);
        if (activeCarousel) {
            activeCarousel.style.display = 'block';
        }
    }
    
    // Navegar a la sección de productos
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = productosSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Actualizar la URL
    history.pushState(null, null, '#productos');
    log('URL actualizada a #productos');
}

// Datos de los vehículos
const vehicleData = {
    'aion-v': {
        name: "AION V PLUS 80 TECHNOLOGY",
        model: "Serie V",
        price: "$45,900",
        priceFinancing: "$699/mes",
        rating: 4.7,
        reviews: 95,
        badge: "NUEVO",
        images: [
            "images/Productos/AION V PLUS 80 TECHNOLOGY.png"
        ],
        description: "El AION V PLUS representa la vanguardia en SUVs eléctricos, combinando tecnología de punta con un diseño futurista y prestaciones excepcionales.",
        highlights: [
            "Autonomía de hasta 600 km",
            "Carga rápida 30-80% en 30 min",
            "0-100 km/h en 6.9 segundos",
            "Sistema de conducción autónoma L2+"
        ],
        specifications: {
            "Motor": "Eléctrico Síncrono",
            "Potencia": "230 kW (313 CV)",
            "Torque": "430 Nm",
            "Batería": "80 kWh Ion-Litio",
            "Autonomía": "600 km (NEDC)",
            "Carga Rápida": "30-80% en 30 min",
            "Tracción": "Delantera",
            "Velocidad Máxima": "170 km/h",
            "Dimensiones": "4,650 × 1,920 × 1,720 mm",
            "Peso": "2,050 kg",
            "Maletero": "600 litros"
        },
        equipment: [
            "Pantalla central 14.6\"",
            "Cuadro digital 8.8\"",
            "Climatizador tri-zona",
            "Techo panorámico",
            "Asientos eléctricos con memoria",
            "Sistema de sonido premium",
            "Cámara 360°",
            "Conducción autónoma L2+",
            "Llantas 19\"",
            "Cargador inalámbrico",
            "Apple CarPlay / Android Auto",
            "5 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'aion-ut': {
        name: "AION UT 2025",
        model: "Serie UT",
        price: "$52,900",
        priceFinancing: "$799/mes",
        rating: 4.9,
        reviews: 45,
        badge: "PREMIUM",
        images: [
            "images/Productos/AION UT 2025.png"
        ],
        description: "El AION UT 2025 redefine el segmento de los SUV eléctricos de lujo con una combinación perfecta de elegancia, tecnología y rendimiento.",
        highlights: [
            "Autonomía de hasta 700 km",
            "Carga rápida 20-80% en 25 min",
            "0-100 km/h en 4.9 segundos",
            "Sistema de conducción autónoma L3"
        ],
        specifications: {
            "Motor": "Dual Motor AWD",
            "Potencia": "400 kW (544 CV)",
            "Torque": "700 Nm",
            "Batería": "100 kWh Ion-Litio",
            "Autonomía": "700 km (NEDC)",
            "Carga Rápida": "20-80% en 25 min",
            "Tracción": "Total (AWD)",
            "Velocidad Máxima": "200 km/h",
            "Dimensiones": "4,980 × 1,960 × 1,750 mm",
            "Peso": "2,250 kg",
            "Maletero": "650 litros"
        },
        equipment: [
            "Pantalla central 15.6\" OLED",
            "Cuadro digital 12.3\"",
            "Head-up Display AR",
            "Techo panorámico inteligente",
            "Asientos premium con masaje",
            "Sistema de sonido Meridian",
            "Cámara 360° HD",
            "Conducción autónoma L3",
            "Llantas 21\" aerodinámicas",
            "Cargador bidireccional",
            "Conectividad 5G",
            "7 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'bz3x': {
        name: "2025 BZ3X 520 Pro",
        model: "Serie BZ",
        price: "$48,900",
        priceFinancing: "$729/mes",
        rating: 4.8,
        reviews: 78,
        badge: "INNOVACIÓN",
        images: [
            "images/Productos/2025 BZ3X 520 Pro.png"
        ],
        description: "El BZ3X 520 Pro representa la próxima generación de movilidad eléctrica, con tecnología de vanguardia y un diseño que rompe esquemas.",
        highlights: [
            "Autonomía de hasta 650 km",
            "Carga rápida 10-80% en 18 min",
            "0-100 km/h en 5.6 segundos",
            "Sistema de baterías de estado sólido"
        ],
        specifications: {
            "Motor": "e-TNGA Dual Motor",
            "Potencia": "320 kW (435 CV)",
            "Torque": "650 Nm",
            "Batería": "90 kWh Estado Sólido",
            "Autonomía": "650 km (WLTP)",
            "Carga Rápida": "10-80% en 18 min",
            "Tracción": "Total (e-AWD)",
            "Velocidad Máxima": "180 km/h",
            "Dimensiones": "4,750 × 1,900 × 1,660 mm",
            "Peso": "2,100 kg",
            "Maletero": "580 litros"
        },
        equipment: [
            "Sistema multimedia 14\" con IA",
            "Cuadro digital configurable",
            "Climatizador cuatro zonas",
            "Techo solar eléctrico",
            "Asientos deportivos ventilados",
            "Sistema de sonido JBL",
            "Parking automático",
            "Safety Sense 3.0",
            "Llantas 20\" bicolor",
            "Iluminación ambiental",
            "Android Auto / Apple CarPlay",
            "8 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'bmw-x5': {
        name: "BMW X5 M50i 2024",
        model: "Serie X",
        price: "$89,900",
        priceFinancing: "$1,245/mes",
        rating: 4.8,
        reviews: 127,
        badge: "NUEVO",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e",
            "https://images.unsplash.com/photo-1502877338535-766e1452684a",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b"
        ],
        description: "Experimenta la perfecta combinación de lujo y rendimiento deportivo. El BMW X5 M50i 2024 redefine lo que significa conducir un SUV premium, con tecnología de vanguardia y un diseño que impresiona desde cualquier ángulo.",
        highlights: [
            "Motor V8 TwinPower Turbo de 4.4L",
            "523 HP y 750 Nm de torque", 
            "0-100 km/h en 4.3 segundos",
            "Consumo mixto: 11.2L/100km"
        ],
        specifications: {
            "Motor": "4.4L V8 TwinPower Turbo",
            "Potencia": "523 HP @ 5,500-6,000 rpm",
            "Torque": "750 Nm @ 1,800-4,600 rpm",
            "Transmisión": "Automática 8 velocidades",
            "Tracción": "xDrive (AWD)",
            "Aceleración": "0-100 km/h en 4.3s",
            "Velocidad Máxima": "250 km/h",
            "Consumo": "11.2L/100km mixto",
            "Capacidad Tanque": "83 litros",
            "Dimensiones": "4,922 × 2,004 × 1,745 mm",
            "Peso": "2,215 kg",
            "Capacidad Maletero": "650-1,860 litros"
        },
        equipment: [
            "Paquete M Sport Plus",
            "Sistema de sonido Harman Kardon",
            "Techo panorámico Sky Lounge",
            "Asientos deportivos M con memoria",
            "Dirección deportiva M",
            "Sistema BMW Live Cockpit Professional",
            "BMW Gesture Control",
            "Cámara 360° con vista aérea",
            "Asistente de aparcamiento Plus",
            "Faros LED adaptativos con BMW Laserlight",
            "Llantas M de aleación ligera 21''",
            "Sistema de escape deportivo M"
        ],
        contactInfo: {
            location: "San José, Costa Rica",
            phone: "+506 4000-BMW1",
            email: "ventas@bmwcr.com"
        }
    },
    'bmw-ix1': {
        name: "BMW iX1 versión 2023 eDrive25L",
        model: "Serie iX",
        price: "$55,900",
        priceFinancing: "$849/mes",
        rating: 4.6,
        reviews: 62,
        badge: "EFICIENCIA",
        images: [
            "images/Productos/BMW iX1 versión 2023 eDrive25L.png"
        ],
        description: "El BMW iX1 combina la versatilidad de un SUV compacto con la eficiencia de la movilidad eléctrica, ofreciendo una experiencia de conducción única.",
        highlights: [
            "Autonomía de hasta 440 km",
            "Carga rápida 10-80% en 29 min",
            "0-100 km/h en 6.8 segundos",
            "Consumo eléctrico: 17.3 kWh/100km"
        ],
        specifications: {
            "Motor": "eDrive Electric",
            "Potencia": "170 kW (231 CV)",
            "Torque": "365 Nm",
            "Batería": "64.7 kWh Ion-Litio",
            "Autonomía": "440 km (WLTP)",
            "Carga Rápida": "10-80% en 29 min",
            "Tracción": "Delantera",
            "Velocidad Máxima": "170 km/h",
            "Dimensiones": "4,500 × 1,845 × 1,620 mm",
            "Peso": "1,955 kg",
            "Maletero": "490 litros"
        },
        equipment: [
            "BMW Live Cockpit Plus",
            "Sistema operativo BMW 8",
            "Climatizador bi-zona",
            "Portón trasero eléctrico",
            "Asientos deportivos",
            "Sistema de sonido HiFi",
            "Parking Assistant",
            "BMW Driving Assistant",
            "Llantas 18\" aerodinámicas",
            "Navegación BMW Maps",
            "Apple CarPlay / Android Auto",
            "3 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'vw-id3': {
        name: "Volkswagen ID.3 versión 2025 restyling",
        model: "Serie ID",
        price: "$42,900",
        priceFinancing: "$649/mes",
        rating: 4.7,
        reviews: 89,
        badge: "ACTUALIZADO",
        images: [
            "images/Productos/Volkswagen ID.3 versión 2025 restyling.png"
        ],
        description: "El renovado Volkswagen ID.3 2025 llega con un diseño actualizado y mejoras significativas en tecnología y calidad interior.",
        highlights: [
            "Autonomía de hasta 550 km",
            "Carga rápida 5-80% en 35 min",
            "0-100 km/h en 7.3 segundos",
            "Sistema de infoentretenimiento ID.Software 4.0"
        ],
        specifications: {
            "Motor": "APP 310 Electric",
            "Potencia": "150 kW (204 CV)",
            "Torque": "310 Nm",
            "Batería": "77 kWh Ion-Litio",
            "Autonomía": "550 km (WLTP)",
            "Carga Rápida": "5-80% en 35 min",
            "Tracción": "Trasera",
            "Velocidad Máxima": "160 km/h",
            "Dimensiones": "4,261 × 1,809 × 1,568 mm",
            "Peso": "1,812 kg",
            "Maletero": "385 litros"
        },
        equipment: [
            "Pantalla central 12\"",
            "ID.Cockpit digital",
            "Climatizador bi-zona",
            "Techo panorámico",
            "Asientos ergoActive",
            "Sistema de sonido premium",
            "Park Assist Plus",
            "Travel Assist 2.5",
            "Llantas 19\" Hamar",
            "Iluminación IQ.Light LED",
            "We Connect ID. App",
            "8 años de garantía batería"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'radar-jingang': {
        name: "Radar Jingang 2025",
        model: "Serie Jingang",
        price: "$39,900",
        priceFinancing: "$599/mes",
        rating: 4.6,
        reviews: 42,
        badge: "NUEVO",
        images: [
            "images/Productos/Radar Jingang 2025.png"
        ],
        description: "La Radar Jingang 2025 representa una nueva era en pickups eléctricas, combinando capacidad de carga con eficiencia energética.",
        highlights: [
            "Autonomía de hasta 500 km",
            "Capacidad de carga 1,200 kg",
            "Carga rápida 20-80% en 35 min",
            "Asistente de remolque inteligente"
        ],
        specifications: {
            "Motor": "Dual Motor Electric",
            "Potencia": "250 kW (340 CV)",
            "Torque": "520 Nm",
            "Batería": "85 kWh Ion-Litio",
            "Autonomía": "500 km (WLTP)",
            "Carga Rápida": "20-80% en 35 min",
            "Tracción": "4x4 Eléctrica",
            "Velocidad Máxima": "170 km/h",
            "Dimensiones": "5,350 × 1,920 × 1,870 mm",
            "Peso": "2,450 kg",
            "Capacidad Carga": "1,200 kg"
        },
        equipment: [
            "Pantalla táctil 12.3\"",
            "Sistema 4x4 inteligente",
            "Asientos calefactados",
            "Climatizador bi-zona",
            "Cámara 360°",
            "Asistente de remolque",
            "Control de descenso",
            "Navegación satelital",
            "Conectividad smartphone",
            "Llantas todoterreno 18\"",
            "Sistema de sonido premium",
            "5 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'wuling-yangguang': {
        name: "Wuling Yangguang 2024",
        model: "Serie Yangguang",
        price: "$35,900",
        priceFinancing: "$549/mes",
        rating: 4.7,
        reviews: 38,
        badge: "EFICIENCIA",
        images: [
            "images/Productos/Wuling Yangguang 2024.png"
        ],
        description: "La Wuling Yangguang 2024 es la furgoneta eléctrica perfecta para el reparto urbano, combinando espacio y eficiencia.",
        highlights: [
            "Autonomía de hasta 300 km",
            "Volumen de carga 6.5 m³",
            "Carga rápida 20-80% en 40 min",
            "Sistema de gestión de flota"
        ],
        specifications: {
            "Motor": "Electric Drive",
            "Potencia": "100 kW (136 CV)",
            "Torque": "280 Nm",
            "Batería": "50 kWh Ion-Litio",
            "Autonomía": "300 km (WLTP)",
            "Carga Rápida": "20-80% en 40 min",
            "Tracción": "Delantera",
            "Velocidad Máxima": "130 km/h",
            "Dimensiones": "5,200 × 1,850 × 1,980 mm",
            "Peso": "2,100 kg",
            "Volumen Carga": "6.5 m³"
        },
        equipment: [
            "Pantalla táctil 10\"",
            "Navegación comercial",
            "Aire acondicionado",
            "Cámara de retroceso",
            "Sensores de parking",
            "Control de crucero",
            "Bluetooth",
            "Puerto USB-C",
            "Asiento conductor ajustable",
            "Puertas laterales corredizas",
            "Telemetría de flota",
            "3 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'qingling-ev': {
        name: "Qingling EV 2024",
        model: "Serie Qingling",
        price: "$75,900",
        priceFinancing: "$1,199/mes",
        rating: 4.8,
        reviews: 25,
        badge: "POTENCIA",
        images: [
            "images/Productos/Qingling Isuzu KV100 QL1043FMHA.png"
        ],
        description: "El Qingling EV 2024 es un camión eléctrico diseñado para el transporte urbano eficiente y sostenible.",
        highlights: [
            "Autonomía de hasta 250 km",
            "Capacidad de carga 5,000 kg",
            "Carga rápida 20-80% en 45 min",
            "Sistema de telemetría avanzado"
        ],
        specifications: {
            "Motor": "Heavy Duty Electric",
            "Potencia": "180 kW (245 CV)",
            "Torque": "850 Nm",
            "Batería": "120 kWh Ion-Litio",
            "Autonomía": "250 km (WLTP)",
            "Carga Rápida": "20-80% en 45 min",
            "Tracción": "Trasera",
            "Velocidad Máxima": "90 km/h",
            "Dimensiones": "7,200 × 2,300 × 2,800 mm",
            "Peso": "4,500 kg",
            "Carga Útil": "5,000 kg"
        },
        equipment: [
            "Pantalla de 7\"",
            "Gestión de flota",
            "Aire acondicionado",
            "Cámara de retroceso",
            "Freno regenerativo",
            "Control de estabilidad",
            "Asiento neumático",
            "Tacógrafo digital",
            "GPS comercial",
            "Diagnóstico remoto",
            "Modo ECO",
            "2 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'zonson-ev': {
        name: "Zonson EV 2024",
        model: "Serie Zonson",
        price: "$95,900",
        priceFinancing: "$1,499/mes",
        rating: 4.9,
        reviews: 15,
        badge: "INNOVACIÓN",
        images: [
            "images/Productos/Zonson Smart Auto GTZ6129BEVBF4.png"
        ],
        description: "El Zonson EV 2024 es un tractor eléctrico de última generación para el transporte de larga distancia.",
        highlights: [
            "Autonomía de hasta 400 km",
            "Capacidad de arrastre 40,000 kg",
            "Carga rápida 20-80% en 60 min",
            "Sistema de conducción autónoma L2"
        ],
        specifications: {
            "Motor": "Heavy Duty Dual Electric",
            "Potencia": "450 kW (612 CV)",
            "Torque": "2,500 Nm",
            "Batería": "800 kWh Ion-Litio",
            "Autonomía": "400 km (WLTP)",
            "Carga Rápida": "20-80% en 60 min",
            "Tracción": "6x4",
            "Velocidad Máxima": "85 km/h",
            "Dimensiones": "7,500 × 2,550 × 3,800 mm",
            "Peso": "8,500 kg",
            "Arrastre": "40,000 kg"
        },
        equipment: [
            "Pantalla táctil 12\"",
            "Sistema de navegación HD",
            "Climatización nocturna",
            "Cámaras 360°",
            "Asistente de carril",
            "Control de crucero adaptativo",
            "Cabina aerodinámica",
            "Telemetría avanzada",
            "Conectividad 5G",
            "Asientos premium",
            "Sistema anti-vuelco",
            "3 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    },
    'dongfeng-ev': {
        name: "Dongfeng EV 2024",
        model: "Serie Dongfeng",
        price: "$85,900",
        priceFinancing: "$1,299/mes",
        rating: 4.7,
        reviews: 22,
        badge: "CAPACIDAD",
        images: [
            "images/Productos/Dongfeng EQ6608LT Autobús.png"
        ],
        description: "El Dongfeng EV 2024 es un autobús eléctrico diseñado para el transporte urbano sostenible y confortable.",
        highlights: [
            "Autonomía de hasta 350 km",
            "Capacidad 45 pasajeros",
            "Carga rápida 20-80% en 50 min",
            "Sistema de accesibilidad universal"
        ],
        specifications: {
            "Motor": "High Capacity Electric",
            "Potencia": "250 kW (340 CV)",
            "Torque": "1,200 Nm",
            "Batería": "350 kWh Ion-Litio",
            "Autonomía": "350 km (WLTP)",
            "Carga Rápida": "20-80% en 50 min",
            "Tracción": "Trasera",
            "Velocidad Máxima": "80 km/h",
            "Dimensiones": "12,000 × 2,550 × 3,300 mm",
            "Peso": "12,500 kg",
            "Capacidad": "45 pasajeros"
        },
        equipment: [
            "Pantalla conductor 10\"",
            "Aire acondicionado",
            "Rampa accesibilidad",
            "Cámaras seguridad",
            "WiFi pasajeros",
            "USB en asientos",
            "Iluminación LED",
            "Sistema de arrodillamiento",
            "GPS y telemetría",
            "Freno regenerativo",
            "Suspensión neumática",
            "2 años de garantía"
        ],
        contactInfo: {
            location: "Innovation District, Tech Valley 2050",
            phone: "+1 (555) NEV-ELEC",
            email: "hello@nev-electric.com"
        }
    }
};

// Opciones para el observador de intersección
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

// Función para animar un contador individual
function animateCounter(element, targetNumber, duration = 2000) {
    if (element.dataset.animating) return;
    element.dataset.animating = 'true';
    
    const startNumber = 0;
    const frames = 60;
    const increment = (targetNumber - startNumber) / frames;
    const stepDuration = duration / frames;
    let currentNumber = startNumber;
    
    const formatNumber = (num) => {
        return Math.round(num).toLocaleString('es-ES');
    };

    const animation = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            element.textContent = formatNumber(targetNumber);
            element.dataset.animating = 'false';
            clearInterval(animation);
        } else {
            element.textContent = formatNumber(Math.floor(currentNumber));
        }
    }, stepDuration);
}

// Observador de intersección para elementos animados
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animar estadísticas cuando son visibles
            if (entry.target.classList.contains('stat-item')) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement) {
                    const targetNumber = parseInt(numberElement.textContent.replace(/[^0-9]/g, ''));
                    if (!isNaN(targetNumber)) {
                        setTimeout(() => {
                            animateCounter(numberElement, targetNumber, 2000);
                        }, 300);
                    }
                }
            }
        }
    });
}, observerOptions);

// Función para inicializar el menú móvil
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = mobileMenu.querySelectorAll('.nav-links a, .nav-cta');

    // Event listener para abrir el menú
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.style.display = 'flex';
        });
    }

    // Event listener para cerrar el menú
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    }

    // Event listeners para los enlaces del menú móvil
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
    e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Ocultar todas las secciones de detalles
            document.querySelectorAll('.product-details').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Mostrar todas las secciones principales
            document.querySelectorAll('#main-content, .products, .benefits, .contact, .footer').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Navegar a la sección correspondiente
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
                
                // Actualizar la URL
                history.pushState(null, null, '#' + targetId);
            }
            
            // Cerrar el menú móvil
            mobileMenu.style.display = 'none';
        });
    });
}

// Función para manejar la navegación del navbar
function handleNavigation(e) {
    const link = e.target.closest('a');
    if (!link) return;

    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    
    // Ocultar todas las secciones de detalles
    document.querySelectorAll('.product-details').forEach(section => {
        section.style.removeProperty('display');
    });
    
    // Ocultar todos los carruseles de productos
    document.querySelectorAll('.carousel-container').forEach(carousel => {
        carousel.style.removeProperty('display');
    });
    
    // Mostrar todas las secciones principales
    const mainSections = [
        '#inicio',
        '.stats',
        '.features',
        '#productos',
        '.benefits',
        '.contact',
        '.footer'
    ];
    
    mainSections.forEach(selector => {
        const sections = document.querySelectorAll(selector);
        sections.forEach(section => {
            if (section) {
                section.style.removeProperty('display');
                // Si es la sección de productos, mostrar solo el carrusel principal
                if (section.id === 'productos') {
                    const principal = section.querySelector('.carousel-container[data-category="automovil"]');
                    if (principal) {
                        principal.style.removeProperty('display');
                        // Reinicializar solo el carrusel principal
                        const carousel = new Carousel(principal);
                    }
                }
            }
        });
    });
    
    // Navegar a la sección correspondiente
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Actualizar la URL
    history.pushState(null, null, '#' + targetId);
}

// Actualizar la función handleContactButton para usar handleRobustNavigation
function handleContactButton(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    handleRobustNavigation(targetId);
}

// Inicialización de la navegación
document.addEventListener('DOMContentLoaded', function() {
    // Configurar event listeners para todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links a, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const navbar = document.querySelector('.navbar');

            // Ocultar todas las secciones de detalles
            document.querySelectorAll('.product-details').forEach(section => {
                section.style.removeProperty('display');
            });

            // Mostrar todas las secciones principales
            document.querySelectorAll('#main-content, .products, .benefits, .contact, .footer').forEach(section => {
                section.style.removeProperty('display');
            });

            // Scroll inteligente a cualquier sección del navbar
            setTimeout(() => {
                if (targetSection && navbar) {
                    const navbarHeight = navbar.offsetHeight;
                    const sectionTop = targetSection.getBoundingClientRect().top;
                    // Si la sección NO está ya alineada con el navbar, hacemos scroll
                    if (Math.abs(sectionTop - navbarHeight) > 5) {
                        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }, 200);
        });
    });

    // Manejar la navegación inicial si hay un hash en la URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // Asegurar que todas las secciones principales estén visibles
            document.querySelectorAll('#main-content, .products, .benefits, .contact, .footer').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Ocultar cualquier sección de detalles
            document.querySelectorAll('.product-details').forEach(section => {
                section.style.removeProperty('display');
            });
            
            setTimeout(() => {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Función para inicializar el navbar
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    // Agregar event listeners a todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links a, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Ocultar todas las secciones de detalles
            document.querySelectorAll('.product-details').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Mostrar todas las secciones principales
            const mainSections = [
                '#inicio',
                '.stats',
                '.features',
                '#productos',
                '.benefits',
                '.contact',
                '.footer'
            ];
            
            mainSections.forEach(selector => {
                const section = document.querySelector(selector);
                if (section) {
                    section.style.removeProperty('display');
                }
            });
            
            // Navegar a la sección correspondiente
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar la URL
                history.pushState(null, null, '#' + targetId);
            }
            
            // Cerrar el menú móvil si está abierto
            if (mobileMenu) {
                mobileMenu.style.display = 'none';
            }
        });
    });

    // Event listeners para el menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.style.display = 'flex';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    }

    // Manejar el scroll para cambiar el estilo del navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Cambiar la apariencia del navbar al hacer scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Ocultar/mostrar el navbar al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Función para manejar la navegación inicial
function handleInitialNavigation() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        // Asegurarse de que estamos en la página principal
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.removeProperty('display');
        }
        
        // Ocultar todos los carruseles
        document.querySelectorAll('.carousel-container').forEach(carousel => {
            carousel.style.removeProperty('display');
        });
        
        // Mostrar todas las secciones principales
        document.querySelectorAll('.products, .benefits, .contact, .footer').forEach(section => {
            section.style.removeProperty('display');
            // Si es la sección de productos, mostrar solo el carrusel principal
            if (section.id === 'productos') {
                const principal = section.querySelector('.carousel-container[data-category="automovil"]');
                if (principal) {
                    principal.style.removeProperty('display');
                    // Reinicializar solo el carrusel principal
                    const carousel = new Carousel(principal);
                }
            }
        });
        
        // Ocultar cualquier detalle de producto
        document.querySelectorAll('.product-details').forEach(section => {
            section.style.removeProperty('display');
        });

        // Navegar a la sección correspondiente
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            setTimeout(() => {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

// Única inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    log('DOM cargado - Iniciando inicialización');
    
    // Inicializar navegación
    initializeNavbar();
    initializeSmoothScroll();
    handleInitialNavigation();
    initializeMobileMenu();

    // Configurar event listeners para la navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Si el enlace es el de inicio
            if (targetId === 'inicio') {
                // Ocultar todas las secciones de detalles
                document.querySelectorAll('.product-details').forEach(section => {
                    section.style.removeProperty('display');
                });
                
                // Mostrar todas las secciones principales
                document.querySelectorAll('#main-content, .products, .benefits, .contact, .footer').forEach(section => {
                    section.style.removeProperty('display');
                });
                
                // Scroll solo si no estamos ya en la parte superior
                setTimeout(() => {
                    const heroSection = document.getElementById('inicio');
                    const navbar = document.querySelector('.navbar');
                    if (heroSection && navbar) {
                        const navbarHeight = navbar.offsetHeight;
                        const heroTop = heroSection.getBoundingClientRect().top;
                        // Si la sección hero NO está ya alineada con el navbar, hacemos scroll
                        if (Math.abs(heroTop - navbarHeight) > 5) {
                            const targetPosition = heroSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 200);
            } else {
                // ... existing code ...
            }
        });
    });

    // Configurar event listener para el botón de contacto
    const contactButton = document.querySelector('.nav-cta');
    if (contactButton) {
        contactButton.addEventListener('click', handleContactButton);
    }

    // Configurar event listeners para los botones de volver
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', handleBackButton);
    });

    // Configurar event listeners para los botones "Descúbrelo"
    document.querySelectorAll('.discover-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Ocultar todas las secciones principales
            document.querySelectorAll('section:not(.product-details)').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Ocultar todas las secciones de detalles excepto la actual
            document.querySelectorAll('.product-details').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Mostrar la sección de detalles correspondiente
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.style.removeProperty('display');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Inicializar carruseles
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        initializeCarousel(carousel);
    });

    // Inicializar animaciones
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        sectionObserver.observe(element);
    });

    // Animación de aparición para las tarjetas de beneficios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.classList.remove('benefit-fade-in'); // Asegura que no tengan la clase al inicio
    });
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('benefit-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    benefitCards.forEach(card => {
        cardObserver.observe(card);
    });
});

// Función para inicializar el scroll suave
function initializeSmoothScroll() {
    // Configurar event listeners para todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links a, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Ocultar todas las secciones de detalles
            document.querySelectorAll('.product-details').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Mostrar todas las secciones principales
            document.querySelectorAll('#main-content, .products, .benefits, .contact, .footer').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Navegar a la sección correspondiente
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar la URL
                history.pushState(null, null, '#' + targetId);
            }
        });
    });
}

// Animación de contadores en estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.textContent;
        // Extraer el número y el sufijo
        const numericTarget = parseInt(target.match(/\d+/)[0]);
        const suffix = target.replace(/\d+/, '');
        let current = 0;
        
        const duration = 2500; // 2.5 segundos para una animación más suave
        const steps = 100; // Más pasos para una animación más fluida
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
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-50px'
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

// Variables globales
let currentSlide = 0;
let isAnimating = false;
let carouselInterval;

// Efectos interactivos para la sección hero
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const heroImage = document.querySelector('.hero-image-wrapper img');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    // Efecto de parallax en el scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });

    // Efecto de movimiento suave al mover el mouse
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = hero.getBoundingClientRect();
        
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        
        if (heroVisual) {
            heroVisual.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
        
        if (heroImage) {
            heroImage.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
        }
        
        if (heroContent) {
            heroContent.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
        }

        // Mover elementos flotantes
        floatingElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 1;
            const moveX = (x - 0.5) * 30 * speed;
            const moveY = (y - 0.5) * 30 * speed;
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Resetear posición al salir del mouse
    hero.addEventListener('mouseleave', () => {
        if (heroVisual) {
            heroVisual.style.transform = 'translate(0, 0)';
        }
        if (heroImage) {
            heroImage.style.transform = 'rotateY(0) rotateX(0)';
        }
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
        floatingElements.forEach(element => {
            element.style.transform = 'translate(0, 0)';
        });
    });

    // Efecto de hover mejorado para el texto destacado
    const heroHighlight = document.querySelector('.hero-highlight');
    if (heroHighlight) {
        heroHighlight.addEventListener('mouseenter', () => {
            heroHighlight.style.color = '#00ffff';
        });
        
        heroHighlight.addEventListener('mouseleave', () => {
            heroHighlight.style.color = '#00ffff';
        });
    }

    // Animación de entrada mejorada
    const animateHero = () => {
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                heroVisual.style.transition = 'all 1s ease';
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateX(0)';
            }, 300);
        }
    };

    // Ejecutar animación inicial
    animateHero();
});

// Efecto de pantalla de carga
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Función para precargar imágenes
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
    });
}

// Clase para manejar el carrusel
class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.cards = Array.from(this.track.children);
        this.nextButton = container.querySelector('.carousel-button.next');
        this.prevButton = container.querySelector('.carousel-button.prev');
        this.currentIndex = 0;
        
        this.init();
    }

    init() {
        this.updateCardsToShow();
        this.setupEventListeners();
        this.updateCarousel();
        window.addEventListener('resize', () => {
            this.updateCardsToShow();
            this.updateCarousel();
        });
    }

    updateCardsToShow() {
        this.cardsToShow = window.innerWidth >= 992 ? 3 : window.innerWidth >= 576 ? 2 : 1;
    }

    updateCarousel() {
        const containerWidth = this.container.clientWidth;
        const gap = 30;
        const cardWidth = (containerWidth - (gap * (this.cardsToShow - 1))) / this.cardsToShow;
        const slideAmount = cardWidth + gap;
        
        if (this.track) {
            this.track.style.transform = `translateX(-${this.currentIndex * slideAmount}px)`;
        }
        
        this.updateButtonStates();
    }

    updateButtonStates() {
        if (this.prevButton) {
            this.prevButton.style.opacity = this.currentIndex === 0 ? "0.5" : "1";
            this.prevButton.style.cursor = this.currentIndex === 0 ? "default" : "pointer";
        }
        if (this.nextButton) {
            this.nextButton.style.opacity = this.currentIndex >= this.cards.length - this.cardsToShow ? "0.5" : "1";
            this.nextButton.style.cursor = this.currentIndex >= this.cards.length - this.cardsToShow ? "default" : "pointer";
        }
    }

    setupEventListeners() {
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                if (this.currentIndex < this.cards.length - this.cardsToShow) {
                    this.currentIndex += this.cardsToShow;
                    if (this.currentIndex > this.cards.length - this.cardsToShow) {
                        this.currentIndex = this.cards.length - this.cardsToShow;
                    }
                    this.updateCarousel();
                }
            });
        }
        
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                if (this.currentIndex > 0) {
                    this.currentIndex -= this.cardsToShow;
                    if (this.currentIndex < 0) {
                        this.currentIndex = 0;
                    }
                    this.updateCarousel();
                }
            });
        }
    }
}

// Clase Navigation mejorada
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.closeMenu = document.querySelector('.close-menu');
        this.links = document.querySelectorAll('.nav-links a');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleScroll();
    }

    setupEventListeners() {
        // Menú móvil
        this.menuToggle?.addEventListener('click', () => this.toggleMobileMenu(true));
        this.closeMenu?.addEventListener('click', () => this.toggleMobileMenu(false));

        // Navegación suave
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Ocultar todas las secciones de detalles
                document.querySelectorAll('.product-details').forEach(section => {
                    section.style.removeProperty('display');
                });
                
                // Ocultar todos los carruseles
                document.querySelectorAll('.carousel-container').forEach(carousel => {
                    carousel.style.removeProperty('display');
                });
                
                // Mostrar todas las secciones principales
                const mainSections = [
                    '#inicio',
                    '.stats',
                    '.features',
                    '#productos',
                    '.benefits',
                    '.contact',
                    '.footer'
                ];
                
                mainSections.forEach(selector => {
                    const sections = document.querySelectorAll(selector);
                    sections.forEach(section => {
                        if (section) {
                            section.style.removeProperty('display');
                            // Si es la sección de productos, mostrar solo el carrusel principal
                            if (section.id === 'productos') {
                                const principal = section.querySelector('.carousel-container[data-category="automovil"]');
                                if (principal) {
                                    principal.style.removeProperty('display');
                                    // Reinicializar solo el carrusel principal
                                    const carousel = new Carousel(principal);
                                }
                            }
                        }
                    });
                });
                
                this.scrollToSection(targetId);
                this.toggleMobileMenu(false);
            });
        });

        // Scroll handling
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            const scrollingDown = currentScroll > lastScroll;

            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
                this.navbar.classList.toggle('nav-hidden', scrollingDown);
            } else {
                this.navbar.classList.remove('scrolled', 'nav-hidden');
            }

            lastScroll = currentScroll;
        });
    }

    toggleMobileMenu(show) {
        if (!this.mobileMenu) return;
        
        this.mobileMenu.style.transform = show ? 'translateX(0)' : 'translateX(100%)';
        document.body.style.overflow = show ? 'hidden' : '';
    }

    scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        const navHeight = this.navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Clase ProductDetails mejorada
class ProductDetails {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleInitialHash();
    }

    setupEventListeners() {
        document.querySelectorAll('.discover-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.target.closest('.product-slide').dataset.productId;
                this.showProductDetails(productId);
            });
        });

        document.querySelectorAll('.back-button').forEach(btn => {
            btn.addEventListener('click', () => this.handleBackButton());
        });
    }

    showProductDetails(productId) {
        log('Mostrando detalles del producto:', productId);
        
        // Ocultar todas las secciones de detalles primero
        document.querySelectorAll('.product-details').forEach(section => {
            section.style.removeProperty('display');
        });
        
        // Ocultar el contenido principal y la sección de productos
        document.getElementById('main-content').style.removeProperty('display');
        document.querySelector('.products').style.removeProperty('display');
        document.querySelector('.benefits').style.removeProperty('display');
        document.querySelector('.contact').style.removeProperty('display');
        document.querySelector('.footer').style.removeProperty('display');
        
        // Mostrar la sección de detalles específica
        const detailsSection = document.getElementById(`${productId}-details`);
        if (detailsSection) {
            detailsSection.style.removeProperty('display');
            animarAparicion(detailsSection, 'fade-in');
            // Scroll al inicio de la página
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Actualizar la URL
        history.pushState(null, null, `#${productId}`);
        log('URL actualizada a', `#${productId}`);
    }

    handleBackButton() {
        // Ocultar detalles
        document.querySelectorAll('.product-details').forEach(section => {
            section.style.removeProperty('display');
        });

        // Mostrar carrusel por defecto
        const defaultCarousel = document.querySelector('.carousel-container[data-category="automovil"]');
        if (defaultCarousel) {
            defaultCarousel.style.removeProperty('display');
            new Carousel(defaultCarousel);
        }

        // Limpiar hash de la URL
        history.pushState('', document.title, window.location.pathname);
    }

    handleInitialHash() {
        const hash = window.location.hash;
        if (hash && hash.includes('-details')) {
            const productId = hash.replace('#', '').replace('-details', '');
            this.showProductDetails(productId);
        }
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar navegación
    const navigation = new Navigation();

    // Inicializar solo el carrusel principal
    const principalCarousel = document.querySelector('.carousel-container[data-category="automovil"]');
    if (principalCarousel) {
        const carousel = new Carousel(principalCarousel);
    }

    // Función para mostrar el carrusel de una categoría
    function showCarousel(category) {
        // Normalizar la categoría (quitar acentos y convertir a minúsculas)
        category = category.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        
        // Ocultar todos los carruseles
        document.querySelectorAll('.carousel-container').forEach(container => {
            container.style.removeProperty('display');
        });

        // Mostrar el carrusel seleccionado
        const targetCarousel = document.querySelector(`.carousel-container[data-category="${category}"]`);
        if (targetCarousel) {
            targetCarousel.style.removeProperty('display');
            targetCarousel.classList.add('feature-transition');
            
            // Inicializar el carrusel solo cuando se muestra
            const carousel = new Carousel(targetCarousel);

            // Quitar la clase de transición después de la animación
            setTimeout(() => {
                targetCarousel.classList.remove('feature-transition');
            }, 500);
        }
    }

    // Manejar clics en los features
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('click', () => {
            // Remover active de todos los features
            document.querySelectorAll('.feature-item').forEach(fi => {
                fi.classList.remove('active');
            });
            
            // Añadir active al seleccionado
            item.classList.add('active');
            
            // Obtener la categoría y mostrar el carrusel correspondiente
            const category = item.querySelector('h3').textContent;
            showCarousel(category);
        });
    });

    // Mostrar el primer carrusel por defecto
    const firstCarousel = document.querySelector('.carousel-container');
    if (firstCarousel) {
        firstCarousel.style.removeProperty('display');
    }
});

// Función para mostrar una sección de información específica
function showVehicleInfo(vehicleId) {
    // Ocultar todas las secciones primero
    hideAllInfoSections();
    
    // Ocultar el contenido principal
    document.querySelectorAll('section:not(.vehicle-info)').forEach(section => {
        section.style.removeProperty('display');
    });
    
    // Mostrar la sección específica
    const infoSection = document.getElementById(vehicleId);
    if (infoSection) {
        infoSection.style.removeProperty('display');
        // Forzar un reflow para que la animación funcione
        infoSection.offsetHeight;
        infoSection.classList.add('active');
        
        // Hacer scroll hacia la sección
        infoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Función para ocultar todas las secciones de información
function hideAllInfoSections() {
    document.querySelectorAll('.vehicle-info').forEach(section => {
        section.style.removeProperty('display');
        section.classList.remove('active');
    });
}

// Función para volver a la página principal
function backToMain() {
    hideAllInfoSections();
    
    // Mostrar todas las secciones principales
    document.querySelectorAll('section:not(.vehicle-info)').forEach(section => {
        section.style.removeProperty('display');
    });
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para gestionar la visibilidad de las secciones principales
function toggleMainContent(show = true) {
    const mainContent = document.getElementById('main-content');
    const sections = ['inicio', 'tecnologia', 'empresa', 'productos', 'contacto'];
    
    if (show) {
        mainContent.style.removeProperty('display');
        // Si hay un hash en la URL, navegar a esa sección
        const hash = window.location.hash.replace('#', '');
        if (hash && sections.includes(hash)) {
            const targetSection = document.getElementById(hash);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    } else {
        mainContent.style.removeProperty('display');
    }
}

// Función para volver a la lista de productos
function backToProducts() {
    // Ocultar todas las páginas de detalles
    document.querySelectorAll('.product-details').forEach(section => {
        section.style.removeProperty('display');
    });

    // Mostrar todas las secciones principales
    document.querySelectorAll('#main-content, .products, .benefits, .contact, .footer').forEach(section => {
        section.style.removeProperty('display');
    });

    // Navegar a la sección de productos
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = productosSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Actualizar la URL
    history.pushState(null, null, '#productos');
}

document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.style.display = 'flex';
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    }

    // Manejo de detalles de productos
    const detailsSections = document.querySelectorAll('.product-details');
    const productsSection = document.querySelector('.products');

    // Ocultar todas las secciones de detalles inicialmente
    detailsSections.forEach(section => {
        section.style.removeProperty('display');
    });

    // Manejar clics en botones "Descúbrelo"
    document.querySelectorAll('.discover-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            
            // Ocultar todas las secciones de productos
            document.querySelectorAll('.carousel-container').forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Ocultar todas las secciones de detalles
            detailsSections.forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Mostrar la sección de detalles correspondiente
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.style.removeProperty('display');
                // Scroll suave hacia la sección
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Manejar botones "Volver"
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', () => {
            // Ocultar todas las secciones de detalles
            detailsSections.forEach(section => {
                section.style.removeProperty('display');
            });
            
            // Mostrar sección de productos
            productsSection.style.removeProperty('display');
            // Scroll suave hacia la sección de productos
            productsSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Manejo de categorías de vehículos
    const categories = ['automovil', 'pickup', 'furgoneta', 'camion', 'tractor', 'autobus'];
    const categoryContainers = document.querySelectorAll('.product-category');

    // Función para mostrar una categoría específica
    function showCategory(category) {
        categoryContainers.forEach(container => {
            if (container.dataset.category === category) {
                container.style.removeProperty('display');
                initializeProductNavigation(container);
            } else {
                container.style.removeProperty('display');
            }
        });
    }

    // Inicializar navegación de productos
    function initializeProductNavigation(container) {
        const prevButton = container.querySelector('.nav-button.prev');
        const nextButton = container.querySelector('.nav-button.next');
        const scrollAmount = 350 + 32; // Ancho de la tarjeta + gap

        function updateButtonVisibility() {
            const maxScroll = container.scrollWidth - container.clientWidth;
            prevButton.style.removeProperty('display');
            nextButton.style.removeProperty('display');
        }

        prevButton.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollAmount * 3,
                behavior: 'smooth'
            });
            setTimeout(updateButtonVisibility, 400);
        });

        nextButton.addEventListener('click', () => {
            container.scrollBy({
                left: scrollAmount * 3,
                behavior: 'smooth'
            });
            setTimeout(updateButtonVisibility, 400);
        });

        container.addEventListener('scroll', updateButtonVisibility);
        window.addEventListener('resize', updateButtonVisibility);

        // Inicializar visibilidad de botones
        updateButtonVisibility();
    }

    // Inicializar con la categoría de automóviles
    showCategory('automovil');

    // Event listeners para los botones de categoría
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            showCategory(categories[index]);
        });
    });
});

// Carrusel de productos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los carruseles
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const cards = Array.from(track.children);
        const nextButton = container.querySelector('.carousel-button.next');
        const prevButton = container.querySelector('.carousel-button.prev');
        
        let currentIndex = 0;
        const cardsToShow = window.innerWidth >= 992 ? 3 : window.innerWidth >= 576 ? 2 : 1;

        // Actualizar carrusel
        function updateCarousel() {
            const containerWidth = container.clientWidth;
            const gap = 30;
            const cardWidth = (containerWidth - (gap * (cardsToShow - 1))) / cardsToShow;
            const slideAmount = cardWidth + gap;
            
            track.style.transform = `translateX(-${currentIndex * slideAmount}px)`;
            
            // Actualizar estado de los botones
            if (prevButton) {
                prevButton.style.removeProperty('opacity');
                prevButton.style.removeProperty('cursor');
            }
            if (nextButton) {
                nextButton.style.removeProperty('opacity');
                nextButton.style.removeProperty('cursor');
            }
        }

        // Evento click botón siguiente
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentIndex < cards.length - cardsToShow) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        // Evento click botón anterior
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }

        // Configuración inicial
        updateCarousel();

        // Actualizar en cambio de tamaño de ventana
        window.addEventListener('resize', () => {
            const newCardsToShow = window.innerWidth >= 992 ? 3 : window.innerWidth >= 576 ? 2 : 1;
            if (newCardsToShow !== cardsToShow) {
                currentIndex = 0;
            }
            updateCarousel();
        });
    });

    // Función para mostrar el carrusel de una categoría
    function showCarousel(category) {
        // Normalizar la categoría (quitar acentos y convertir a minúsculas)
        category = category.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        
        // Ocultar todos los carruseles
        document.querySelectorAll('.carousel-container').forEach(container => {
            container.style.removeProperty('display');
        });

        // Mostrar el carrusel seleccionado
        const targetCarousel = document.querySelector(`.carousel-container[data-category="${category}"]`);
        if (targetCarousel) {
            targetCarousel.style.removeProperty('display');
            targetCarousel.classList.add('feature-transition');
            
            // Inicializar el carrusel solo cuando se muestra
            const carousel = new Carousel(targetCarousel);

            // Quitar la clase de transición después de la animación
            setTimeout(() => {
                targetCarousel.classList.remove('feature-transition');
            }, 500);
        }
    }

    // Manejar clics en los features
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('click', () => {
            // Remover active de todos los features
            document.querySelectorAll('.feature-item').forEach(fi => {
                fi.classList.remove('active');
            });
            
            // Añadir active al seleccionado
            item.classList.add('active');
            
            // Obtener la categoría y mostrar el carrusel correspondiente
            const category = item.querySelector('h3').textContent;
            showCarousel(category);
        });
    });

    // Mostrar el primer carrusel por defecto
    const firstCarousel = document.querySelector('.carousel-container');
    if (firstCarousel) {
        firstCarousel.style.removeProperty('display');
    }
});

// Funciones actualizadas para manejo de productos
function showProductDetails(productId) {
    log('Mostrando detalles del producto:', productId);
    
    // Ocultar todas las secciones principales
    document.querySelectorAll('section:not(.product-details)').forEach(section => {
        section.style.display = 'none';
    });
    
    // Ocultar todos los carruseles
    document.querySelectorAll('.carousel-container').forEach(carousel => {
        carousel.style.display = 'none';
    });
    
    // Ocultar todas las secciones de detalles
    document.querySelectorAll('.product-details').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar la sección de detalles correspondiente
    const targetSection = document.getElementById(`${productId}-details`);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Actualizar la URL
        history.pushState(null, null, `#${productId}-details`);
        log('URL actualizada a:', `#${productId}-details`);
    }
}

// Inicialización de event listeners para la navegación de productos
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para botones "Descúbrelo"
    document.querySelectorAll('.discover-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('href').substring(1).replace('-details', '');
            showProductDetails(productId);
        });
    });

    // Event listeners para botones de volver
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', handleBackButton);
    });
});

function handleSubmit(event) {
    event.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    const form = document.getElementById('contactForm');
    
    // Mostrar estado de carga
    mostrarEstado('Enviando mensaje...', 'info');

    // Preparar los datos del formulario
    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        mensaje: formData.get('mensaje')
    };

    // Enviar el formulario usando fetch
    // Pasos para Formspree:
    // 1- Registrate en el sitio
    // 2- Crea un nuevo formulario y digita en la dirección de correo el que vas a utilizar
    // 3- Copia el ID del formulario y pegalo en fetch (´https://formspree.io/f/......)
    fetch('https://formspree.io/f/xrbkqjkj', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
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
    .catch(error => {
        console.error('Error:', error);
        mostrarEstado('Lo sentimos, hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    });

    return false;
}

function mostrarEstado(mensaje, tipo) {
    const formStatus = document.getElementById('formStatus');
    
    // Remover clases anteriores
    formStatus.classList.remove('error', 'success', 'info');
    
    // Agregar nueva clase según el tipo
    formStatus.classList.add(tipo);
    
    // Mostrar el mensaje
    formStatus.textContent = mensaje;
    formStatus.style.display = 'block';
    
    // Ocultar el mensaje después de 5 segundos si no es un mensaje de error
    if (tipo !== 'error') {
        setTimeout(() => {
            formStatus.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.style.animation = 'slideIn 0.3s ease-out';
            }, 300);
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Efecto de parallax en el scroll
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        });
    }

    // Efecto de movimiento con el mouse
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroVisual = document.querySelector('.hero-visual');
        const heroImage = document.querySelector('.hero-image');
        const heroContent = document.querySelector('.hero-content');
        const floatingElements = document.querySelectorAll('.floating-element');

        if (heroVisual && heroImage && heroContent) {
            heroSection.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = heroSection.getBoundingClientRect();
                const x = (clientX - left) / width - 0.5;
                const y = (clientY - top) / height - 0.5;

                // Movimiento suave de los elementos
                heroVisual.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
                heroImage.style.transform = `translate(${x * 30}px, ${y * 30}px) rotateY(${x * 10}deg)`;
                heroContent.style.transform = `translate(${x * -10}px, ${y * -10}px)`;

                // Movimiento de elementos flotantes
                floatingElements.forEach(element => {
                    const speed = element.getAttribute('data-speed') || 1;
                    element.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
                });
            });

            // Reset de posiciones cuando el mouse sale
            heroSection.addEventListener('mouseleave', () => {
                heroVisual.style.transform = 'translate(0, 0)';
                heroImage.style.transform = 'translate(0, 0) rotateY(0)';
                heroContent.style.transform = 'translate(0, 0)';
                floatingElements.forEach(element => {
                    element.style.transform = 'translate(0, 0)';
                });
            });
        }
    }

    // Efecto hover mejorado para el texto destacado
    const heroHighlight = document.querySelector('.hero-highlight');
    if (heroHighlight) {
        heroHighlight.addEventListener('mouseenter', () => {
            heroHighlight.style.color = '#00ffff';
        });
        heroHighlight.addEventListener('mouseleave', () => {
            heroHighlight.style.color = '#00ffff';
        });
    }

    // Animación de entrada mejorada
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.hero-content > *, .hero-visual');
        if (elements.length > 0) {
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translate(0, 0)';
                }, index * 200);
            });
        }
    };

    // Ejecutar animación de entrada
    animateOnScroll();
});

// ... existing code ...

document.addEventListener('DOMContentLoaded', function() {
    // Configuración general
    const whatsappNumber = '521234567890'; // Cambia por tu número real
    const phoneNumber = '+521234567890';   // Cambia por tu número real
    const emailAddress = 'ejemplo@correo.com'; // Cambia por tu correo real

    // Ficha Técnica individual
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pdf = btn.getAttribute('data-pdf');
            if (pdf) window.open(pdf, '_blank');
        });
    });

    // WhatsApp general
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        });
    });

    // Llamar general
    document.querySelectorAll('.call-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            window.open(`tel:${phoneNumber}`);
        });
    });

    // Email general
    document.querySelectorAll('.email-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`,'_blank');
        });
    });
});

// ... existing code ...

// Utilidad para animar la aparición de una sección
function animarAparicion(elemento, claseAnimacion = 'fade-in') {
    if (!elemento) return;
    elemento.classList.remove(claseAnimacion); // Reinicia si ya la tiene
    // Forzar reflow para reiniciar la animación
    void elemento.offsetWidth;
    elemento.classList.add(claseAnimacion);
    // Elimina la clase después de la animación para permitir reanimar
    elemento.addEventListener('animationend', function handler() {
        elemento.classList.remove(claseAnimacion);
        elemento.removeEventListener('animationend', handler);
    });
}

// Función para mostrar secciones principales con animación
function mostrarSeccionConAnimacion(selector) {
    const seccion = document.querySelector(selector);
    if (seccion) {
        seccion.style.removeProperty('display');
        animarAparicion(seccion, 'fade-in');
    }
}