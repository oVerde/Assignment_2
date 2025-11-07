const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  if (!mobileMenu.classList.contains('active')) {
    // Abrir menu → fade-in
    mobileMenu.classList.add('active');
    animateTextElements(".mobile-menu nav a", 100, 30);
  } else {
    // Fechar menu → fade-out
    fadeOutMenu(mobileMenu, 300); // 300ms de duração
  }
  hamburger.classList.toggle('open'); // anima hamburger → X
});

// Função para animar texto (fade-in)
function animateTextElements(selector, delayBetweenElements = 100, delayPerChar = 20) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el, index) => {
    let textContent = el.textContent.trim();
    if (!textContent) return;

    el.textContent = "";

    textContent.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.transition = `opacity 0.3s ease, transform 0.3s ease`;
      span.style.transform = "translateY(10px)";
      el.appendChild(span);
    });

    el.style.pointerEvents = "none";

    setTimeout(() => {
      const chars = el.querySelectorAll("span");
      chars.forEach((char, charIndex) => {
        setTimeout(() => {
          char.style.opacity = "1";
          char.style.transform = "translateY(0)";
        }, charIndex * delayPerChar);
      });

      setTimeout(() => {
        el.style.pointerEvents = "auto";
      }, chars.length * delayPerChar);
    }, index * delayBetweenElements);
  });
}

// Função fade-out do menu
function fadeOutMenu(menu, duration = 300) {
  menu.style.transition = `opacity ${duration}ms ease`;
  menu.style.opacity = '0';
  
  // Depois do fade, remover active
  setTimeout(() => {
    menu.classList.remove('active');
    menu.style.opacity = ''; // reset para próxima abertura
  }, duration);
}
