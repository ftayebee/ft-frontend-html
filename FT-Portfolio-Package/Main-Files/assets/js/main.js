/* ============================================================================
   MAIN.JS  —  Small shared behaviours that run on every page.
   ----------------------------------------------------------------------------
   Handles: preloader hide, scroll-progress bar, back-to-top button, dynamic
   footer year. Each feature checks that its element exists before running, so
   this file is safe on pages that omit any of them. No global variables.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Preloader ---------------------------------------------------------- */
  var preloader = document.querySelector(".preloader");
  if (preloader) {
    var hide = function () { preloader.classList.add("is-done"); };
    window.addEventListener("load", function () { setTimeout(hide, 250); });
    setTimeout(hide, 2500); // hard fallback so it can never get stuck
  }

  /* ---- Scroll progress bar + Back to top ---------------------------------- */
  var progress = document.querySelector(".scroll-progress");
  var backToTop = document.querySelector(".back-to-top");

  if (progress || backToTop) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var ratio = docHeight > 0 ? scrollTop / docHeight : 0;

        if (progress) progress.style.transform = "scaleX(" + ratio + ")";
        if (backToTop) backToTop.classList.toggle("is-visible", scrollTop > 600);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Newsletter demo ----------------------------------------------------
     DEMO ONLY — does not send anything. Connect a backend / email service to
     make it work (see documentation). Shows a friendly confirmation instead. */
  document.querySelectorAll("[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      if (input && !input.checkValidity()) { input.reportValidity(); return; }
      form.innerHTML = '<p class="text-sm text-accent">Thanks! (Demo — connect a backend to receive sign-ups.)</p>';
    });
  });

  /* ---- Dynamic copyright year --------------------------------------------- */
  var yearEls = document.querySelectorAll("[data-year]");
  if (yearEls.length) {
    var year = String(new Date().getFullYear());
    yearEls.forEach(function (el) { el.textContent = year; });
  }
})();
