function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const nowHidden = section.classList.toggle('hidden');

  const foldout = document.querySelector(`.foldout[data-target="${sectionId}"]`);
  if (foldout) {
    foldout.classList.toggle('open', !nowHidden);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.foldout').forEach(f => {
    f.addEventListener('click', () => {
      const id = f.getAttribute('data-target');
      toggleSection(id);
    });
  });
});