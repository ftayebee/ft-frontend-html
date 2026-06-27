/* ============================================================================
   THEME-INIT.JS  —  Runs in <head> (NOT deferred) to prevent a flash of the
   wrong theme. Reads saved preferences and applies them before first paint.
   Kept tiny and dependency-free on purpose. (This is an external file, so the
   template still contains zero inline JavaScript.)
   ========================================================================== */
(function () {
  "use strict";
  var root = document.documentElement;

  // Tell CSS that JS is available (enables progressive reveal animations).
  root.classList.remove("no-js");
  root.classList.add("js");

  try {
    var theme = localStorage.getItem("rv-theme");
    var accent = localStorage.getItem("rv-accent");
    var radius = localStorage.getItem("rv-radius");
    var fontScale = localStorage.getItem("rv-font-scale");

    // Respect the OS color scheme on first visit; dark stays the default design.
    if (!theme && window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches) {
      theme = "light";
    }

    if (theme) root.setAttribute("data-theme", theme);
    if (accent) root.setAttribute("data-accent", accent);
    if (radius) root.setAttribute("data-radius", radius);
    if (fontScale) root.setAttribute("data-font-scale", fontScale);
  } catch (e) {
    /* localStorage may be unavailable (private mode) — fail silently. */
  }
})();
