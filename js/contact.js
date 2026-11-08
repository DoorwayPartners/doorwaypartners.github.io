/* Doorway Partners contact form.
   Submissions POST to FormSubmit, which delivers them to office@doorwaypartners.com.
   This script only presets the reason from ?reason= and sets the email subject. */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var reasonSel = form.querySelector('#reason');
  var params = new URLSearchParams(window.location.search);
  var preset = params.get('reason');
  if (preset === 'homeowner') preset = 'visit';
  if (preset && reasonSel && reasonSel.querySelector('option[value="' + preset + '"]')) reasonSel.value = preset;

  var labels = {
    visit: 'Question about a visit or order',
    join: 'Join the team',
    provider: 'Provider or partner inquiry',
    other: 'Something else'
  };
  form.addEventListener('submit', function () {
    var subj = document.getElementById('form-subject');
    if (!subj || !reasonSel) return;
    var reason = labels[reasonSel.value] || 'Website inquiry';
    subj.value = 'Website: ' + reason;
  });
})();
