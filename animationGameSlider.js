const slider = document.querySelector(".favorite-games-scroll");
const track = document.querySelector(".favorite-games-row");
const logos = Array.from(track.children);

logos.forEach((logo) => {
  const clone = logo.cloneNode(true);
  track.appendChild(clone);
});

slider.addEventListener("mouseover", () => {
  track.style.animationPlayState = "paused";
});
slider.addEventListener("mouseout", () => {
  track.style.animationPlayState = "running";
});