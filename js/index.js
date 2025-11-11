const btn = document.querySelector(".btn");
const hoverBall = document.querySelector(".hover-ball");
const overlay = document.querySelector(".page-overlay");
const btnLink = document.querySelector(".btn-wrapper a");

const rectInitial = btn.getBoundingClientRect();
const defaultX = rectInitial.width / 2;
const defaultY = rectInitial.height / 2;

let targetX = defaultX, targetY = defaultY, targetDiameter = 0;
let currentX = defaultX, currentY = defaultY, currentDiameter = 0;

btn.addEventListener("mousemove", e => {
  const rect = btn.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;
  const distRight = rect.width - targetX;
  const distLeft = targetX;
  const distTop = targetY;
  const distBottom = rect.height - targetY;
  const maxDist = Math.max(distRight, distLeft, distTop, distBottom);
  targetDiameter = maxDist * 2;
  hoverBall.style.display = "block";
});

btn.addEventListener("mouseleave", () => {
  targetX = defaultX;
  targetY = defaultY;
  targetDiameter = 0;
});

function animateButton() {
  const ease = 0.07;
  currentX += (targetX - currentX) * ease;
  currentY += (targetY - currentY) * ease;
  currentDiameter += (targetDiameter - currentDiameter) * ease;

  hoverBall.style.left = `${currentX}px`;
  hoverBall.style.top = `${currentY}px`;
  hoverBall.style.width = `${currentDiameter}px`;
  hoverBall.style.height = `${currentDiameter}px`;

  const x = currentX - defaultX;
  const y = currentY - defaultY;
  const factor = 0.6;
  const maxMove = 60;

  const moveX = Math.min(Math.max(x * factor, -maxMove), maxMove);
  const moveY = Math.min(Math.max(y * factor, -maxMove), maxMove);

  const distance = Math.sqrt(x*x + y*y);
  const maxDistance = 100;
  let scale = 0.8 + (distance / maxDistance) * 0.2;
  scale = Math.min(scale, 1);

  btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;

  requestAnimationFrame(animateButton);
}
animateButton();

btnLink.addEventListener("click", e => {
  e.preventDefault();
  const href = btnLink.getAttribute("href");
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  overlay.style.pointerEvents = "auto";
  overlay.style.opacity = "1";
  overlay.style.transformOrigin = `${mouseX}px ${mouseY}px`;
  overlay.style.transform = "scale(0)";
  overlay.offsetHeight;
  overlay.style.transform = "scale(20)";

  setTimeout(() => {
    window.location.href = href;
  }, 600);
});