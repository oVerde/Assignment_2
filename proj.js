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

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    location.reload();
  }
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

  const pageOverlay = document.createElement("div");
  pageOverlay.id = "pageOverlay";
  Object.assign(pageOverlay.style, {
    position: "fixed",
    inset: "0",
    backgroundColor: "#090909",
    zIndex: "999999",
    pointerEvents: "none",
    opacity: "0",
    clipPath: "circle(0% at 50% 50%)",
    willChange: "clip-path, opacity",
  });
  document.body.appendChild(pageOverlay);

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distTopLeft = Math.hypot(mouseX, mouseY);
      const distTopRight = Math.hypot(window.innerWidth - mouseX, mouseY);
      const distBottomLeft = Math.hypot(mouseX, window.innerHeight - mouseY);
      const distBottomRight = Math.hypot(
        window.innerWidth - mouseX,
        window.innerHeight - mouseY
      );
      const maxRadius = Math.max(
        distTopLeft,
        distTopRight,
        distBottomLeft,
        distBottomRight
      );

      pageOverlay.style.pointerEvents = "auto";
      pageOverlay.style.clipPath = `circle(0px at ${mouseX}px ${mouseY}px)`;
      pageOverlay.style.opacity = "1";

      gsap.to(pageOverlay, {
        clipPath: `circle(${maxRadius}px at ${mouseX}px ${mouseY}px)`,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          window.location.href = href;
        },
      });
    });
  });

  window.addEventListener("pageshow", () => {
    gsap.set(pageOverlay, {
      opacity: 0,
      pointerEvents: "none",
      clipPath: "circle(0% at 50% 50%)",
    });
  });
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

const projectLinks = document.querySelectorAll(".lista a");

const infoBox = document.createElement("div");
infoBox.classList.add("project-info");
document.body.appendChild(infoBox);

projectLinks.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    const summary = link.getAttribute("data-summary");
    const year = link.getAttribute("data-year");
    const collaborators = link.getAttribute("data-collaborators");

    infoBox.innerHTML = `
      <div class="summary">${summary}</div>
      <div class="year">${year}</div>
      <div class="collaborators">${collaborators}</div>
    `;

    const rect = link.getBoundingClientRect();
    infoBox.style.top = rect.bottom + window.scrollY + 8 + "px";
    infoBox.style.left = rect.left + window.scrollX + "px";

    infoBox.classList.add("show");
  });

  link.addEventListener("mouseleave", () => {
    infoBox.classList.remove("show");
  });
});
