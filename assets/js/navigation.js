/* ============================================================================
   NAVIGATION.JS  —  Header scroll state + accessible mobile drawer.
   ----------------------------------------------------------------------------
   • Adds .is-scrolled to the header so it compacts + frosts after scrolling.
   • Toggles the full-screen mobile drawer with proper ARIA, focus management,
     Escape-to-close and background scroll lock.
   Safe to include on every page; does nothing if the markup is absent.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Sticky / compact header ------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var setState = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", setState, { passive: true });
    setState();
  }

  /* ---- Mobile drawer ------------------------------------------------------ */
  var toggle = document.querySelector("[data-nav-toggle]");
  var drawer = document.getElementById("mobile-drawer");
  if (!toggle || !drawer) return;

  var closeBtn = drawer.querySelector("[data-nav-close]");
  var lastFocused = null;

  var openDrawer = function () {
    lastFocused = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    // Move focus into the drawer for keyboard users.
    var firstLink = drawer.querySelector("a, button");
    if (firstLink) firstLink.focus();
  };

  var closeDrawer = function () {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  toggle.addEventListener("click", function () {
    if (drawer.classList.contains("is-open")) closeDrawer();
    else openDrawer();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  // Close when a navigation link is chosen.
  drawer.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeDrawer);
  });

  // Escape closes; simple focus trap keeps Tab inside the drawer.
  document.addEventListener("keydown", function (e) {
    if (!drawer.classList.contains("is-open")) return;

    if (e.key === "Escape") { closeDrawer(); return; }

    if (e.key === "Tab") {
      var focusable = drawer.querySelectorAll(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  // Reset drawer if the viewport grows back to desktop.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992 && drawer.classList.contains("is-open")) closeDrawer();
  });
})();
