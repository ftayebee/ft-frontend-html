/* ============================================================================
   ANIMATIONS.JS  —  Scroll-triggered reveals via IntersectionObserver.
   ----------------------------------------------------------------------------
   Adds .is-visible to any element carrying a reveal class once it scrolls into
   view (also drives .stagger-group, .text-reveal, .image-reveal and skill bars).
   • Respects prefers-reduced-motion (reveals everything immediately).
   • If IntersectionObserver is unavailable, everything is shown at once.
   • Content is NEVER permanently hidden — the CSS .no-js fallback covers the
     case where this script does not run at all.
   ========================================================================== */
(function () {
  "use strict";

  var SELECTOR = ".reveal, .reveal-up, .reveal-left, .reveal-right, " +
                 ".reveal-scale, .stagger-group, .text-reveal, .image-reveal, [data-skills]";

  // Skill bars: read the editable data-skill="NN" value and expose it to CSS as
  // --val. The CSS animates width to var(--val) once the section is visible.
  document.querySelectorAll(".skill__fill[data-skill]").forEach(function (fill) {
    fill.style.setProperty("--val", fill.getAttribute("data-skill") + "%");
  });

  var items = document.querySelectorAll(SELECTOR);
  if (!items.length) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealAll = function () {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add("is-visible");

      // Stagger children by setting a custom property index.
      if (el.classList.contains("stagger-group")) {
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.style.setProperty("--i", i);
        });
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  items.forEach(function (el) { observer.observe(el); });
})();
