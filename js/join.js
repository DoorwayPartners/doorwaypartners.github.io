/* Doorway Partners join application.
   Progressive enhancement: when fetch is available, POST to FormSubmit's
   AJAX endpoint so the applicant stays on this page. Browsers without JS
   (or a failed request) submit the form normally and land on /contact/thanks/. */
(function () {
  var form = document.getElementById('rep-application');
  if (!form) return;

  var btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    if (form.getAttribute('data-native') === '1') return;

    var honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) {
      e.preventDefault();
      form.innerHTML = '<div class="form-status form-status-ok" role="status">Application received. We will be in touch by email or phone.</div>';
      return;
    }

    if (typeof fetch !== 'function' || typeof FormData !== 'function') return;

    e.preventDefault();
    var original = btn ? btn.textContent : '';
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }

    fetch('https://formsubmit.co/ajax/office@doorwaypartners.com', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('submit failed');
      return res.json().catch(function () { return {}; });
    }).then(function () {
      form.innerHTML = '<div class="form-status form-status-ok" role="status">Application received. We will reply by email or phone to set up a conversation.</div>';
    }).catch(function () {
      form.setAttribute('data-native', '1');
      if (btn) {
        btn.disabled = false;
        btn.textContent = original || 'Send application';
      }
      form.submit();
    });
  });
})();
