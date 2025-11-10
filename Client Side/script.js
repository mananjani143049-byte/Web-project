// script.js - shared site scripts

// Utility to set current year
(function setYear(){
  const y = new Date().getFullYear();
  document.querySelectorAll('#year').forEach(el => el.textContent = y);
})();

// Nav toggle for small screens
(function navToggle(){
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
  });
})();

// Booking modal & helpers
(function bookingModal(){
  const modal = document.getElementById('bookingModal');
  const bookingForm = document.getElementById('bookingForm');
  const bookingPackageInput = document.getElementById('bookingPackage');
  const closeBtns = document.querySelectorAll('.modal-close');

  if(!modal) return;

  function openModal(pkgName){
    modal.setAttribute('aria-hidden','false');
    if(bookingPackageInput) bookingPackageInput.value = pkgName || '';
    // focus first input
    setTimeout(()=> {
      const first = modal.querySelector('input[name="name"], input, textarea');
      if(first) first.focus();
    },100);
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
  }

  // Expose global helper for pages that want to open modal
  window.openBookingModal = openModal;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.book-now') || e.target.closest('#bookBtn');
    if(btn){
      const pkg = btn.dataset.package || '';
      openModal(pkg);
    }
  });

  closeBtns.forEach(b => b.addEventListener('click', closeModal));

  // close on backdrop click
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });

  // Esc to close
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Optional: handle booking form submission locally (demo)
  if(bookingForm){
    bookingForm.addEventListener('submit', (e) => {
      // let the form submit to server-side script in production;
      // For demo preventDefault and show a confirmation:
      // Comment next two lines if you have server-side booking.php
      e.preventDefault();
      const data = new FormData(bookingForm);
      alert('Booking received for ' + (data.get('package') || 'package') + '. (Demo only)');
      closeModal();
      bookingForm.reset();
    });
  }
})();

// Attach book-now buttons to open modal if present on page
(function attachBookButtons(){
  document.querySelectorAll('.book-now').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkg = btn.dataset.package || '';
      window.openBookingModal(pkg);
    });
  });
})();
