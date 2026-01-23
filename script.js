const menuToggles = document.querySelectorAll('.menu-toggle');
const menuItems = document.querySelectorAll('.has-submenu');

menuToggles.forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    const parentItem = toggle.closest('.has-submenu');
    const submenu = parentItem.querySelector('ul');
    
    // Закрываем все остальные меню
    menuItems.forEach((item) => {
      if (item !== parentItem) {
        const otherSubmenu = item.querySelector('ul');
        if (otherSubmenu) {
          otherSubmenu.style.display = 'none';
        }
      }
    });

        if (submenu) {
      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
      } else {
        submenu.style.display = 'block';
      }
    }
  });
});


document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) {
    menuItems.forEach((item) => {
      const submenu = item.querySelector('ul');
      if (submenu) {
        submenu.style.display = 'none';
      }
    });
  }
});

const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % dots.length;
  updateCarousel();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
  
    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
      // scroll down
      header.classList.add('hide');
      console.log('down');
    }

    else if (scrollPosition() < lastScroll && containHide() ) {
      // scroll up
      header.classList.remove('hide');
      console.log('up');
    }

    lastScroll = scrollPosition();
})
