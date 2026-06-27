/* ============================================================================
   PORTFOLIO-FILTER.JS  —  Progressive enhancement filtering.
   ----------------------------------------------------------------------------
   Markup:
     <div class="filter-bar" data-filter-bar>
       <button class="filter-btn" data-filter="all" aria-pressed="true">All</button>
       <button class="filter-btn" data-filter="web">Web</button> …
     </div>
     <div class="project-grid">
       <a class="project-card" data-category="web ui">…</a> …
     </div>
   Without JS the buttons are inert and ALL projects remain visible — nothing is
   hidden, so the page is fully usable. Also includes a demo "Load more" toggle.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Category filtering ------------------------------------------------- */
  var bar = document.querySelector("[data-filter-bar]");
  if (bar) {
    var buttons = bar.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".project-card[data-category]");

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;

      var filter = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-category") || "").split(/\s+/);
        var show = filter === "all" || cats.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ---- Load-more demonstration ------------------------------------------- */
  var loadBtn = document.querySelector("[data-load-more]");
  if (loadBtn) {
    var hiddenGroup = document.querySelector("[data-load-more-target]");
    loadBtn.addEventListener("click", function () {
      if (hiddenGroup) hiddenGroup.hidden = false;
      loadBtn.hidden = true;
    });
  }
})();
