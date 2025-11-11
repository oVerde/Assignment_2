document.addEventListener("DOMContentLoaded", () => {
  function animateTextElements(
    selector,
    delayBetweenElements = 100,
    delayPerChar = 20
  ) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el, index) => {
      const textContent = el.textContent.trim();
      if (!textContent) return;
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.whiteSpace = "pre";
      el.textContent = "";
      el.appendChild(wrapper);

      textContent.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transition = `opacity 0.3s ease, transform 0.3s ease`;
        span.style.transform = "translateY(10px)";
        wrapper.appendChild(span);
      });

      el.style.pointerEvents = "none";

      setTimeout(() => {
        const chars = wrapper.querySelectorAll("span");
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

  function animateImages(selector, delayBetweenElements = 150) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      if (el.complete) {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * delayBetweenElements);
      } else {
        el.addEventListener("load", () => {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, index * delayBetweenElements);
        });
      }
    });
  }

  animateTextElements(".sec1 h1");
  animateImages(".sec1 img");
  animateImages(".sec3 img");
});
