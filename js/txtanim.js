document.addEventListener("DOMContentLoaded", () => {
  function animateTextElements(
    selector,
    delayBetweenElements = 100,
    delayPerChar = 20
  ) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el, index) => {
      // Se for label de checkbox, só animar o texto
      let textEl =
        el.tagName.toLowerCase() === "label" && el.querySelector("input")
          ? el.cloneNode(false)
          : el;

      let textContent = textEl.textContent.trim();
      if (!textContent) return;

      textEl.textContent = "";

      textContent.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transition = `opacity 0.3s ease, transform 0.3s ease`;
        span.style.transform = "translateY(10px)";
        textEl.appendChild(span);
      });

      // Se for label com input, não bloquear o input
      if (
        !(el.tagName.toLowerCase() === "label" && el.querySelector("input"))
      ) {
        el.style.pointerEvents = "none";
      }

      setTimeout(() => {
        const chars = textEl.querySelectorAll("span");
        chars.forEach((char, charIndex) => {
          setTimeout(() => {
            char.style.opacity = "1";
            char.style.transform = "translateY(0)";
          }, charIndex * delayPerChar);
        });

        if (
          !(el.tagName.toLowerCase() === "label" && el.querySelector("input"))
        ) {
          setTimeout(() => {
            el.style.pointerEvents = "auto";
          }, chars.length * delayPerChar);
        }
      }, index * delayBetweenElements);
    });
  }

  // Aplica animação aos elementos do teu HTML
  animateTextElements(".container h1"); // título principal
  animateTextElements(".contact-section h2"); // subtítulos "Info" e "Form"
  animateTextElements(".contact-info div"); // linhas da info
  animateTextElements(".contact-form input"); // inputs
  animateTextElements(".contact-form textarea"); // textarea
  animateTextElements(".checkbox-wrapper label"); // só o texto da label
  animateTextElements(".contact-form button"); // botão
});
