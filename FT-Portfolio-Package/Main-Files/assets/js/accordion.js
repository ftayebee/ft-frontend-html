/* ============================================================================
   ACCORDION.JS  —  Accessible FAQ accordion.
   ----------------------------------------------------------------------------
   Markup pattern (see any FAQ section):
     <div class="accordion" data-accordion>
       <div class="accordion__item">
         <h3>
           <button class="accordion__trigger" aria-expanded="false"
                   aria-controls="faq-1" id="faq-1-btn"> … </button>
         </h3>
         <div class="accordion__panel" id="faq-1" role="region"
              aria-labelledby="faq-1-btn"><div class="accordion__body"> … </div></div>
       </div>
     </div>
   Keyboard: Enter/Space toggle (native button). Set data-accordion="single" to
   auto-close siblings (default allows multiple open).
   ========================================================================== */
(function () {
  "use strict";

  var accordions = document.querySelectorAll("[data-accordion]");
  if (!accordions.length) return;

  accordions.forEach(function (accordion) {
    var single = accordion.getAttribute("data-accordion") === "single";
    var triggers = accordion.querySelectorAll(".accordion__trigger");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var item = trigger.closest(".accordion__item");
        var expanded = trigger.getAttribute("aria-expanded") === "true";

        if (single && !expanded) {
          // Close any open siblings first.
          triggers.forEach(function (other) {
            if (other !== trigger) {
              other.setAttribute("aria-expanded", "false");
              var otherItem = other.closest(".accordion__item");
              if (otherItem) otherItem.classList.remove("is-open");
            }
          });
        }

        trigger.setAttribute("aria-expanded", String(!expanded));
        if (item) item.classList.toggle("is-open", !expanded);
      });
    });
  });
})();
