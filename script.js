document.addEventListener('DOMContentLoaded', () => {
    const redLight = document.querySelector('.red-light');
    const greenLight = document.querySelector('.green-light');
    const cars = document.querySelectorAll('.car');

    let lightGreen = true;

    // Function to toggle traffic light
    function toggleTrafficLight() {
        lightGreen = !lightGreen;

        if (lightGreen) {
            redLight.classList.remove('active');
            greenLight.classList.add('active');

            // Resume car movement
            cars.forEach(car => car.style.animationPlayState = 'running');
        } else {
            redLight.classList.add('active');
            greenLight.classList.remove('active');

            // Pause car movement
            cars.forEach(car => car.style.animationPlayState = 'paused');
        }

        // Toggle light after random interval (2-5 seconds)
        setTimeout(toggleTrafficLight, Math.random() * (5000 - 2000) + 2000);
    }

    // Initialize light toggling
    toggleTrafficLight();
});
