/* ============================================================================
   THEME-SWITCHER.JS  —  Light/dark toggle + optional customizer panel.
   ----------------------------------------------------------------------------
   Preferences persist in localStorage (keys: rv-theme, rv-accent, rv-radius,
   rv-font-scale, rv-cursor). The initial paint is handled by theme-init.js in
   <head> to avoid a flash. Everything here is OPTIONAL — remove the markup and
   the site still works with the default dark theme.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var save = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  /* ---- Light / dark toggle ------------------------------------------------ */
  var themeBtns = document.querySelectorAll("[data-theme-toggle]");
  var applyTheme = function (theme) {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    save("rv-theme", theme);
    themeBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", String(theme === "light"));
    });
  };
  themeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isLight = root.getAttribute("data-theme") === "light";
      applyTheme(isLight ? "dark" : "light");
    });
  });

  /* ---- Customizer panel --------------------------------------------------- */
  var panel = document.getElementById("customizer");
  var openBtn = document.querySelector("[data-customizer-open]");
  var closeBtn = document.querySelector("[data-customizer-close]");

  if (panel && openBtn) {
    var openPanel = function () { panel.classList.add("is-open"); openBtn.setAttribute("aria-expanded", "true"); };
    var closePanel = function () { panel.classList.remove("is-open"); openBtn.setAttribute("aria-expanded", "false"); };
    openBtn.addEventListener("click", openPanel);
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel();
    });
  }

  /* ---- Accent swatches ---------------------------------------------------- */
  var swatches = document.querySelectorAll("[data-accent-value]");
  swatches.forEach(function (sw) {
    sw.addEventListener("click", function () {
      var val = sw.getAttribute("data-accent-value");
      if (val === "lime") root.removeAttribute("data-accent"); // lime is the :root default
      else root.setAttribute("data-accent", val);
      save("rv-accent", val);
      swatches.forEach(function (s) { s.setAttribute("aria-pressed", String(s === sw)); });
    });
  });

  /* ---- Segmented controls (radius, font-scale) ---------------------------- */
  var segs = document.querySelectorAll("[data-seg]");
  segs.forEach(function (seg) {
    var attr = seg.getAttribute("data-seg");       // e.g. "data-radius"
    var key = seg.getAttribute("data-seg-key");     // e.g. "rv-radius"
    var defaultVal = seg.getAttribute("data-seg-default");
    seg.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.getAttribute("data-seg-value");
        if (val === defaultVal) root.removeAttribute(attr);
        else root.setAttribute(attr, val);
        if (key) save(key, val);
        seg.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
      });
    });
  });

  /* ---- Effect toggles (animations, cursor) -------------------------------- */
  var animToggle = document.querySelector("[data-toggle-animations]");
  if (animToggle) {
    animToggle.addEventListener("change", function () {
      root.classList.toggle("no-anim", !animToggle.checked);
    });
  }

  var cursorToggle = document.querySelector("[data-toggle-cursor]");
  if (cursorToggle) {
    // Reflect saved state.
    try {
      if (localStorage.getItem("rv-cursor") === "off") cursorToggle.checked = false;
    } catch (e) {}
    cursorToggle.addEventListener("change", function () {
      if (cursorToggle.checked) {
        save("rv-cursor", "on");
        document.body.classList.add("has-custom-cursor");
      } else {
        save("rv-cursor", "off");
        document.body.classList.remove("has-custom-cursor");
      }
    });
  }

  /* ---- Reset -------------------------------------------------------------- */
  var resetBtn = document.querySelector("[data-customizer-reset]");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      ["rv-theme", "rv-accent", "rv-radius", "rv-font-scale", "rv-cursor"].forEach(function (k) {
        try { localStorage.removeItem(k); } catch (e) {}
      });
      root.removeAttribute("data-theme");
      root.removeAttribute("data-accent");
      root.removeAttribute("data-radius");
      root.removeAttribute("data-font-scale");
      window.location.reload();
    });
  }
})();
