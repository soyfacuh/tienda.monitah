// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sitio de Tienda Monitah cargado correctamente');
    
    // Inicializar todas las funcionalidades
    initScrollAnimation();
    initCategoryInteraction();
    initTestimonialSlider();
    initContactForm();
    initBackToTop();
  });
  
  // Animación al hacer scroll
  function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    // Opciones para el Intersection Observer
    const options = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px"
    };
    
    // Crear el observer
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // Animar elementos dentro de la sección
          const animateItems = entry.target.querySelectorAll('.animate-item');
          animateItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animated');
            }, index * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observar todas las secciones
    sections.forEach(section => {
      observer.observe(section);
      
      // Añadir clase para preparar animaciones
      const items = section.querySelectorAll('.category, .product-card, .value-item, .contact-item');
      items.forEach(item => {
        item.classList.add('animate-item');
      });
    });
    
    // Añadir estilos CSS para las animaciones
    const style = document.createElement('style');
    style.textContent = `
      .animate-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
      .animate-item.animated {
        opacity: 1;
        transform: translateY(0);
      }
      section {
        transition: opacity 0.5s ease;
      }
      section.animated {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Hacer que las categorías sean interactivas
  function initCategoryInteraction() {
    const categories = document.querySelectorAll('.category');
    
    categories.forEach(category => {
      category.addEventListener('click', () => {
        const title = category.querySelector('h3').textContent;
        console.log(`Categoría seleccionada: ${title}`);
      });
      
      // Añadir efecto hover con shadows
      category.addEventListener('mouseenter', () => {
        animateCategory(category, true);
      });
      
      category.addEventListener('mouseleave', () => {
        animateCategory(category, false);
      });
      
      // Hacer que los botones "Ver más" sean interactivos
      const button = category.querySelector('.view-more');
      
    });
    
    // Función para animar la categoría en hover
    function animateCategory(category, isEnter) {
      if (isEnter) {
        category.style.transform = 'translateY(-8px)';
        category.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
        
        const icon = category.querySelector('.category-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
        }
      } else {
        category.style.transform = '';
        category.style.boxShadow = '';
        
        const icon = category.querySelector('.category-icon');
        if (icon) {
          icon.style.transform = '';
        }
      }
    }
    
    // Añadir estilos adicionales para la animación del botón
    const style = document.createElement('style');
    style.textContent = `
      .view-more.clicked {
        transform: scale(0.95);
        background-color: var(--color-highlight);
        color: white;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Slider de testimonios
  function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    let currentIndex = 0;
    let interval;
    
    // Función para mostrar un slide específico
    function showSlide(index) {
      // Remover clase activa de todos los slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remover clase activa de todos los dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Añadir clase activa al slide y dot correspondiente
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Actualizar el índice actual
      currentIndex = index;
    }
    
    // Event listeners para los botones prev y next
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = slides.length - 1;
        }
        showSlide(newIndex);
        resetInterval();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
          newIndex = 0;
        }
        showSlide(newIndex);
        resetInterval();
      });
    }
    
    // Event listeners para los dots
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showSlide(index);
        resetInterval();
      });
    });
    
    // Función para iniciar el intervalo automático
    function startInterval() {
      interval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
          newIndex = 0;
        }
        showSlide(newIndex);
      }, 5000); // Cambiar slide cada 5 segundos
    }
    
    // Función para resetear el intervalo
    function resetInterval() {
      clearInterval(interval);
      startInterval();
    }
    
    // Iniciar el slider
    showSlide(0);
    startInterval();
  }
  
  // Formulario de contacto
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        console.log(`Formulario enviado por: ${name}, Email: ${email}`);
        console.log(`Mensaje: ${message}`);
        
        // Simular envío exitoso
        formMessage.textContent = '¡Gracias por tu mensaje! Te responderemos a la brevedad.';
        formMessage.className = 'form-message success';
        
        // Limpiar formulario después de enviar
        form.reset();
        
        // Ocultar mensaje después de un tiempo
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      });
    }
  }
  
  // Botón "Volver arriba"
  function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
      // Mostrar u ocultar el botón según la posición del scroll
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
      
      // Función para volver al inicio al hacer clic
      backToTopButton.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
  // Función para efectos de navegación smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // 70px de offset para la barra de navegación
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animación para los enlaces de contacto
  const contactLinks = document.querySelectorAll('.contact-link');
  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-5px)';
      link.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      
      const icon = link.querySelector('.contact-icon i');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
      link.style.boxShadow = '';
      
      const icon = link.querySelector('.contact-icon i');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
  
  // Función para hacer el menú sticky
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    
    if (window.scrollY > 200) {
      nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    } else {
      nav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    }
  });
  
  // Animación para los product cards
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });