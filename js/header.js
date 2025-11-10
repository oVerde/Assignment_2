const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  if (!mobileMenu.classList.contains('active')) {
    mobileMenu.classList.add('active');
    animateTextElements(".mobile-menu nav a", 100, 30);
  } else {
    fadeOutMenu(mobileMenu, 300);
  }
  hamburger.classList.toggle('open');
});

function animateTextElements(selector, delayBetweenElements = 100, delayPerChar = 20) {
  document.querySelectorAll(selector).forEach((el, index) => {
    const text = el.textContent.trim();
    if (!text) return;
    el.textContent = "";

    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      span.style.transform = "translateY(10px)";
      el.appendChild(span);
    });

    el.style.pointerEvents = "none";

    setTimeout(() => {
      el.querySelectorAll("span").forEach((char, i) => {
        setTimeout(() => {
          char.style.opacity = "1";
          char.style.transform = "translateY(0)";
        }, i * delayPerChar);
      });
      setTimeout(() => el.style.pointerEvents = "auto", text.length * delayPerChar);
    }, index * delayBetweenElements);
  });
}

function fadeOutMenu(menu, duration = 300) {
  menu.style.transition = `opacity ${duration}ms ease`;
  menu.style.opacity = '0';
  setTimeout(() => {
    menu.classList.remove('active');
    menu.style.opacity = '';
  }, duration);
}
