document.addEventListener('includesLoaded', () => {
  // Mobile nav toggle
  const mobileNavToggle = document.querySelector('.navmenu__mobile-toggle');
  const navmenu = document.querySelector('.navmenu');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      navmenu.classList.toggle('navmenu--mobile-active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    });
  }

  // Hide mobile nav on link click
  document.querySelectorAll('.navmenu__link').forEach(link => {
    link.addEventListener('click', () => {
      if (navmenu.classList.contains('navmenu--mobile-active')) {
        navmenu.classList.remove('navmenu--mobile-active');
        mobileNavToggle.classList.toggle('bi-list');
        mobileNavToggle.classList.toggle('bi-x');
      }
    });
  });

  // Toggle dropdowns
  document.querySelectorAll('.navmenu__toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.parentElement;
      const dropdown = parent.nextElementSibling;
      parent.parentElement.classList.toggle('active');
      dropdown.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Scrollspy and header scroll effect
  const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
  const sections = Array.from(navLinks)
    .filter(link => link.hash)
    .map(link => document.querySelector(link.hash));

  function toggleScrolled() {
    if (window.scrollY > 100) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }


  function navScrollspy() {
  const scrollPosition = window.scrollY + 200;

  navLinks.forEach(link => {
    link.classList.remove('active');

    const section = document.querySelector(link.hash);
    if (
      section &&
      scrollPosition >= section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight
    ) {
      link.classList.add('active');
    }
  });
}


  window.addEventListener('scroll', () => {
    toggleScrolled();
    navScrollspy();
  });

  window.addEventListener('load', () => {
    toggleScrolled();
    navScrollspy();
  });

  // Initialize AOS
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
  // Force AOS refresh after a short delay
  setTimeout(() => {
    AOS.refresh();
  }, 100);

  // Gallery Slider and Lightbox
  const swiperConfigElement = document.querySelector('.gallery-slider__config');
  if (swiperConfigElement) {
    const config = JSON.parse(swiperConfigElement.textContent);
    new Swiper('.gallery-slider', config);
  }

  GLightbox({
    selector: '.gallery-slider__link',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  });

  // Carousel Swiper
  new Swiper('.carousel__swiper', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    // spaceBetween: 0,
    pagination: {
      el: '.carousel__pagination',
      clickable: true,
    },
  });

  // FAQ Toggles
  setupFaqToggles();
  scrollToTop();
});
function scrollToTop(){
   // Get the button
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
                scrollToTopBtn.classList.remove('hide');
            } else {
                scrollToTopBtn.classList.add('hide');
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
}

// FAQ Toggles
function setupFaqToggles() {
  document.querySelectorAll('.faq__toggle').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq__item');
      const isActive = item.classList.contains('faq__item--active');
      document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('faq__item--active'));
      if (!isActive) {
        item.classList.add('faq__item--active');
      }
    });
  });
}