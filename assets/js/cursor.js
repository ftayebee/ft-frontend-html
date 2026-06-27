/* ============================================================================
   CURSOR.JS  —  Optional premium custom cursor (dot + ring follower).
   ----------------------------------------------------------------------------
   • Smooth rAF-eased movement, enlarges over links/buttons, shows a "View"
     label over project cards, has a pressed state, and hides when the pointer
     leaves the window.
   • DISABLED automatically on touch devices and when prefers-reduced-motion.
   • The native cursor is the fallback; pointer-events:none means it never
     blocks interaction.

   TURN IT OFF COMPLETELY:
     Set ENABLE_CURSOR to false below, OR remove the .cursor-dot/.cursor-ring
     markup, OR toggle it from the customizer panel. The site works either way.
   ========================================================================== */
(function () {
  "use strict";

  var ENABLE_CURSOR = true; // ← buyer switch: set to false to disable globally

  var dot = document.querySelector(".cursor-dot");
  var ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  var isTouch = window.matchMedia && window.matchMedia("(hover: none)").matches;
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Respect a saved customizer preference, if present.
  var stored = null;
  try { stored = localStorage.getItem("rv-cursor"); } catch (e) {}
  if (stored === "off") ENABLE_CURSOR = false;

  if (!ENABLE_CURSOR || isTouch || reduceMotion) {
    document.body.classList.remove("has-custom-cursor");
    return;
  }

  document.body.classList.add("has-custom-cursor");

  var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  var ringX = mouseX, ringY = mouseY;
  var EASE = 0.18;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX; mouseY = e.clientY;
    // Dot tracks the pointer 1:1 for precision.
    dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
  });

  function render() {
    ringX += (mouseX - ringX) * EASE;
    ringY += (mouseY - ringY) * EASE;
    ring.style.transform = "translate(" + ringX + "px," + ringY + "px) translate(-50%,-50%)";
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Hide when leaving / entering the viewport.
  document.addEventListener("mouseleave", function () {
    dot.style.opacity = "0"; ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", function () {
    dot.style.opacity = ""; ring.style.opacity = "";
  });

  // Pressed state.
  document.addEventListener("mousedown", function () { ring.classList.add("is-down"); });
  document.addEventListener("mouseup", function () { ring.classList.remove("is-down"); });

  // Hover/View states via event delegation (works for dynamically shown cards).
  document.addEventListener("mouseover", function (e) {
    var viewTarget = e.target.closest("[data-cursor='view']");
    var hoverTarget = e.target.closest("a, button, [data-cursor='hover'], input, textarea, select");
    if (viewTarget) {
      ring.classList.add("is-view");
    } else if (hoverTarget) {
      ring.classList.add("is-hover");
    }
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest("[data-cursor='view']")) ring.classList.remove("is-view");
    if (e.target.closest("a, button, [data-cursor='hover'], input, textarea, select")) {
      ring.classList.remove("is-hover");
    }
  });
})();
