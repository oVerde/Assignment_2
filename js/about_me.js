document.addEventListener("DOMContentLoaded", () => {
  function setupFragmentSwitch(section) {
    const bvideo = section.querySelector(".bvideo");
    const revealText = section.querySelector(".reveal-text");
    const shakeText = section.querySelector(".shake-text");
    const closeText = section.querySelector(".close-text");

    let isHidden = true; // começa escondido
    shakeText.classList.add("hidden"); // texto escondido por default
    bvideo.classList.remove("blur"); // sem blur inicialmente

    function updateBlur() {
      if (!isHidden) {
        // texto visível -> aplicar blur
        bvideo.classList.add("blur");
      } else {
        // texto escondido -> remover blur
        bvideo.classList.remove("blur");
      }
    }

    // Fechar o texto
    closeText.addEventListener("click", () => {
      shakeText.classList.add("hidden");
      isHidden = true;
      updateBlur();
    });

    // Reabrir o texto
    revealText.addEventListener("click", (e) => {
      e.preventDefault();
      shakeText.classList.remove("hidden");
      isHidden = false;
      updateBlur();
    });

    // Fechar o texto ao "sacudir" com o mouse
    let lastTime = 0;
    let lastX = 0;
    let lastY = 0;
    let shakeCount = 0;

    shakeText.addEventListener("mousemove", (e) => {
      const now = Date.now();
      const dx = Math.abs(e.clientX - lastX);
      const dy = Math.abs(e.clientY - lastY);
      const speed = dx + dy;

      if (speed > 40) {
        if (now - lastTime < 100) {
          shakeCount++;
        } else {
          shakeCount = 0;
        }

        if (shakeCount > 5 && !isHidden) {
          shakeText.classList.add("hidden");
          isHidden = true;
          updateBlur();
        }

        lastTime = now;
      }

      lastX = e.clientX;
      lastY = e.clientY;
    });
  }

  const sections = document.querySelectorAll(".fragment-switch");
  sections.forEach((section) => setupFragmentSwitch(section));
});
