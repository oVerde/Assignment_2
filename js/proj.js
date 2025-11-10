const links = document.querySelectorAll(".lista a");
const previewBox = document.getElementById("previewBox");
const previewImg = previewBox.querySelector("img");

let mouseX = 0,
  mouseY = 0;
let boxX = 0,
  boxY = 0;
const speed = 0.05;
let isHovering = false;
let fadeTimeout;
let firstHover = true;

links.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    isHovering = true;

    if (firstHover) {
      boxX = e.pageX;
      boxY = e.pageY - previewBox.offsetHeight;
      previewBox.style.left = boxX + "px";
      previewBox.style.top = boxY + "px";
      firstHover = false;
    }

    previewBox.style.opacity = "0";

    clearTimeout(fadeTimeout);

    fadeTimeout = setTimeout(() => {
      if (!isHovering) return;
      previewImg.src = link.getAttribute("data-preview");

      if (firstHover) {
        boxX = e.pageX;
        boxY = e.pageY - previewBox.offsetHeight;
        previewBox.style.left = boxX + "px";
        previewBox.style.top = boxY + "px";
      }

      previewBox.style.opacity = "1";
    }, 100);
  });

  link.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  link.addEventListener("mouseleave", () => {
    isHovering = false;
    previewBox.style.opacity = "0";
    clearTimeout(fadeTimeout);
  });
});

function animate() {
  boxX += (mouseX - boxX) * speed;
  boxY += (mouseY - previewBox.offsetHeight - boxY) * speed;

  previewBox.style.left = boxX + "px";
  previewBox.style.top = boxY + "px";

  requestAnimationFrame(animate);
}

animate();

const titulo = document.querySelector(".lista h1");
setTimeout(() => {
  titulo.classList.add("visible");
}, 200);

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".lista a");

  links.forEach((link, index) => {
    const textSpan = link.querySelector("span:first-child");
    const text = textSpan.textContent;
    textSpan.textContent = "";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      textSpan.appendChild(span);
    });

    link.style.pointerEvents = "none";

    setTimeout(() => {
      link.classList.add("visible");

      const chars = textSpan.querySelectorAll("span");
      const totalDelay = chars.length * 10;
      setTimeout(() => {
        link.style.pointerEvents = "auto";
      }, totalDelay);
    }, index * 200);

    const chars = textSpan.querySelectorAll("span");
    chars.forEach((char, charIndex) => {
      char.style.transitionDelay = `${charIndex * 10}ms`;
    });
  });

  const titulo = document.querySelector(".lista h1");
  setTimeout(() => {
    titulo.classList.add("visible");
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".lista a");
  const previewBox = document.getElementById("previewBox");
  const previewImg = previewBox.querySelector("img");

  let mouseX = 0,
    mouseY = 0;
  let boxX = 0,
    boxY = 0;
  const speed = 0.05;
  let isHovering = false;
  let fadeTimeout;
  let firstHover = true;

  links.forEach((link) => {
    link.addEventListener("mouseenter", (e) => {
      isHovering = true;

      if (firstHover) {
        boxX = e.pageX;
        boxY = e.pageY - previewBox.offsetHeight;
        previewBox.style.left = boxX + "px";
        previewBox.style.top = boxY + "px";
        firstHover = false;
      }

      previewBox.style.opacity = "0";
      clearTimeout(fadeTimeout);

      fadeTimeout = setTimeout(() => {
        if (!isHovering) return;
        previewImg.src = link.getAttribute("data-preview");
        previewBox.style.opacity = "1";
      }, 100);
    });

    link.addEventListener("mousemove", (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    link.addEventListener("mouseleave", () => {
      isHovering = false;
      previewBox.style.opacity = "0";
      clearTimeout(fadeTimeout);
    });
  });

  function animate() {
    boxX += (mouseX - boxX) * speed;
    boxY += (mouseY - previewBox.offsetHeight - boxY) * speed;
    previewBox.style.left = boxX + "px";
    previewBox.style.top = boxY + "px";
    requestAnimationFrame(animate);
  }
  animate();

  links.forEach((link, index) => {
    const textSpan = link.querySelector("span:first-child");
    const text = textSpan.textContent;
    textSpan.textContent = "";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      textSpan.appendChild(span);
    });

    link.style.pointerEvents = "none";

    setTimeout(() => {
      link.classList.add("visible");
      const chars = textSpan.querySelectorAll("span");
      const totalDelay = chars.length * 10;
      setTimeout(() => {
        link.style.pointerEvents = "auto";
      }, totalDelay);
    }, index * 200);

    const chars = textSpan.querySelectorAll("span");
    chars.forEach((char, charIndex) => {
      char.style.transitionDelay = `${charIndex * 10}ms`;
    });
  });

  const titulo = document.querySelector(".lista h1");
  setTimeout(() => {
    titulo.classList.add("visible");
  }, 200);
});

links.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    isHovering = true;

    const src = link.getAttribute("data-preview");

    previewImg.style.opacity = 0;
    previewImg.style.transform = "scale(1.2)";
    previewImg.style.filter = "blur(10px)";

    clearTimeout(fadeTimeout);

    fadeTimeout = setTimeout(() => {
      if (!isHovering) return;

      previewImg.src = src;

      previewImg.onload = () => {
        previewImg.style.opacity = 1;
        previewImg.style.transform = "scale(1)";
        previewImg.style.filter = "blur(0)";
      };

      boxX = e.pageX;
      boxY = e.pageY - previewBox.offsetHeight;
      previewBox.style.left = boxX + "px";
      previewBox.style.top = boxY + "px";
    }, 100);
  });

  link.addEventListener("mouseleave", () => {
    isHovering = false;
    previewImg.style.opacity = 0;
    previewImg.style.transform = "scale(1.2)";
    previewImg.style.filter = "blur(10px)";
    clearTimeout(fadeTimeout);
  });
});