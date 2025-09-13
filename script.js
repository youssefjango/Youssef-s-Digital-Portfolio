// Toggle just the 'hidden' class
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const nowHidden = section.classList.toggle('hidden');

  // Optional: also toggle 'open' class on the triggering foldout for the arrow rotation
  const foldout = document.querySelector(`.foldout[data-target="${sectionId}"]`);
  if (foldout) {
    foldout.classList.toggle('open', !nowHidden);
  }
}

// Attach listeners after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.foldout').forEach(f => {
    f.addEventListener('click', () => {
      const id = f.getAttribute('data-target');
      toggleSection(id);
    });
  });
});