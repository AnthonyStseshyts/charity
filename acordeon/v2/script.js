const acordeon = document.querySelector('.acordeon');

acordeon.addEventListener('click', e => {
  if (!e.target.classList.contains('tab')) return;

  const parts = acordeon.querySelectorAll('.part');

  for (const part of parts) {
    part.classList.remove('active');
  }

  const part = e.target.closest('.part');
  part.classList.add('active');
});
