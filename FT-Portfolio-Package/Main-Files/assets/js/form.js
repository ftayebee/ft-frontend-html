/* ============================================================================
   FORM.JS  —  Front-end-only contact form validation + UI states demo.
   ----------------------------------------------------------------------------
   ⚠️  DEMONSTRATION ONLY. This does NOT send anything anywhere. To make the
   form actually deliver messages you must connect a backend / form service
   (e.g. Formspree, Netlify Forms, or your own endpoint) — see documentation
   "How to connect the contact form". The submit handler below shows the
   success UI without contacting a server.
   ========================================================================== */
(function () {
  "use strict";

  var form = document.querySelector("[data-demo-form]");
  if (!form) return;

  var successBox = form.querySelector("[data-form-success]");
  var errorBox = form.querySelector("[data-form-error]");

  var setFieldError = function (field, hasError) {
    var wrapper = field.closest(".form-field");
    if (wrapper) wrapper.classList.toggle("is-invalid", hasError);
    field.classList.toggle("is-invalid", hasError);
    field.setAttribute("aria-invalid", String(hasError));
  };

  var validateField = function (field) {
    var valid = field.checkValidity();
    setFieldError(field, !valid);
    return valid;
  };

  // Live-validate on blur for a friendlier experience.
  form.querySelectorAll("input, textarea, select").forEach(function (field) {
    field.addEventListener("blur", function () {
      if (field.value || field.required) validateField(field);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // never actually submit in the demo
    var fields = form.querySelectorAll("input, textarea, select");
    var allValid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) allValid = false;
    });

    if (errorBox) errorBox.hidden = allValid;
    if (successBox) successBox.hidden = !allValid;

    if (allValid) {
      form.reset();
      fields.forEach(function (f) {
        f.classList.remove("is-invalid");
        var w = f.closest(".form-field");
        if (w) w.classList.remove("is-invalid");
      });
      if (successBox) successBox.focus();
    } else {
      var firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
    }
  });
})();
