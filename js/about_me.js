document.addEventListener("DOMContentLoaded", () => {
  function setupFragmentSwitch(section) {
    const lennyVideo = section.querySelector(".lenny-video");
    const paparazziVideos = section.querySelectorAll(".paparazzi-video");
    const revealText = section.querySelector(".reveal-text");
    const shakeText = section.querySelector(".shake-text");
    const closeText = section.querySelector(".close-text");

    let paparazziIndex = 0;
    let isHidden = false;
    lennyVideo.classList.add("active");

    // Função para aplicar blur quando o popup estiver aberto
    function updateBlur() {
      if (!isHidden) {
        lennyVideo.classList.add("blur");
      } else {
        lennyVideo.classList.remove("blur");
      }
    }

    // Fechar a caixa de texto
    closeText.addEventListener("click", () => {
      shakeText.classList.add("hidden");
      isHidden = true;
      updateBlur();
    });

    // Revelar a caixa de texto
    revealText.addEventListener("click", (e) => {
      e.preventDefault();
      shakeText.classList.remove("hidden");
      isHidden = false;
      updateBlur();
    });

    // Shake-to-hide detection
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

  // Inicializar todas as secções
  const sections = document.querySelectorAll(".fragment-switch");
  sections.forEach((section) => setupFragmentSwitch(section));
});
