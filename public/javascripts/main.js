/*
* main.js is an ambiguous name for this file, should be migrated to its own splash-page.js or have more features to be main.js.
*/

document.addEventListener("DOMContentLoaded", () => {
  const donut = document.getElementById("donut-top");
  const wrapper = document.getElementById("splash-wrapper");

  let startY = 0;
  let isDragging = false;

  const rotationMaxPx = 600;

  const startDrag = (y) => {
    isDragging = true;
    startY = y;
    donut.style.transition = "none";
    wrapper.style.transition = "none";
  };

  const moveDrag = (y) => {
    if (!isDragging) return;

    const deltaY = startY - y;
    if (deltaY < 0) return;

    const vh = window.innerHeight;
    const rProgress = Math.min(deltaY / rotationMaxPx, 1);
    const rotation = rProgress * 180;
    
    donut.style.transform = `rotate(${-rotation}deg)`;

    let lift = 0;
    if (deltaY > rotationMaxPx) {
      const liftDelta = deltaY - rotationMaxPx;
      lift = Math.min((liftDelta / 400) * 100, 100);
    }

    wrapper.style.transform = `translateY(${-lift}vh)`;

    if (deltaY > rotationMaxPx + 200) {
      unlock();
    }
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;

    if (!document.body.classList.contains("unlocked")) {
      const snap = "transform 1s cubic-bezier(0.22, 1, 0.36, 1)";
      donut.style.transition = snap;
      wrapper.style.transition = snap;

      donut.style.transform = `rotate(0deg)`;
      wrapper.style.transform = `translateY(0vh)`;
    }
  };

  const unlock = () => {
    if (document.body.classList.contains("unlocked")) return;
    document.body.classList.add("unlocked");

    wrapper.style.transition = "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)";
    donut.style.transition = "transform 0.6s ease-out, opacity 0.6s";

    wrapper.style.transform = `translateY(-100vh)`;
    donut.style.transform = `rotate(-180deg)`;
    donut.style.opacity = "0";
    isDragging = false;
  };

  wrapper.addEventListener("mousedown", (e) => startDrag(e.clientY));
  window.addEventListener("mousemove", (e) => moveDrag(e.clientY));
  window.addEventListener("mouseup", endDrag);
  wrapper.addEventListener(
    "touchstart",
    (e) => startDrag(e.touches[0].clientY),
    { passive: false },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      moveDrag(e.touches[0].clientY);
      e.preventDefault();
    },
    { passive: false },
  );
  window.addEventListener("touchend", endDrag);
});
