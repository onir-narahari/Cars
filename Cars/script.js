// api url for car data
const API_URL = 'https://dealership.naman.zip/cars';

// global variable for sorting
let sortOrder = 'asc'; // default to ascending

// fetch and display cars
function fetchCars() {
  fetch(API_URL)
    .then(response => response.json())
    .then(cars => {
      // sort cars by current order
      cars.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

      const carGrid = document.getElementById('car-grid');
      carGrid.innerHTML = ''; // clear old content

      // add cars to the grid
      cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';

        carCard.innerHTML = `
          <img src="${car.image}" alt="${car.make} ${car.model}">
          <h2>${car.make} ${car.model}</h2>
          <p>Year: ${car.year}</p>
          <p>Price: $${car.price.toLocaleString()}</p>
          <button onclick="viewDetails('${car.id}')">View Details</button>
        `;

        carGrid.appendChild(carCard);
      });

      showRandomFeaturedCar(cars); // show a random featured car popup
    });
}

// toggle sorting order
function toggleSortOrder() {
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  document.getElementById('sort-toggle').textContent =
    sortOrder === 'asc' ? 'Sort: Lowest to Highest' : 'Sort: Highest to Lowest';
  fetchCars(); // reload cars with new sort
}

// show random featured car
function showRandomFeaturedCar(cars) {
  const randomCar = cars[Math.floor(Math.random() * cars.length)];
  const popup = document.createElement('div');
  popup.className = 'featured-car-popup';

  popup.innerHTML = `
    <div class="popup-content">
      <button class="close-popup">&times;</button>
      <h2>Featured Car</h2>
      <img src="${randomCar.image}" alt="${randomCar.make} ${randomCar.model}">
      <p><strong>${randomCar.make} ${randomCar.model}</strong></p>
      <p>Year: ${randomCar.year}</p>
      <p>Price: $${randomCar.price.toLocaleString()}</p>
    </div>
  `;

  document.body.appendChild(popup);

  popup.addEventListener('click', event => {
    if (event.target.classList.contains('featured-car-popup') || event.target.classList.contains('close-popup')) {
      document.body.removeChild(popup);
    }
  });
}

// view car details
function viewDetails(carId) {
  window.location.href = `details.html?id=${carId}`;
}

// initialize page
document.addEventListener('DOMContentLoaded', () => {
  fetchCars();
  const toggleButton = document.getElementById('sort-toggle');
  toggleButton.textContent = 'Sort: Lowest to Highest';
  toggleButton.onclick = toggleSortOrder;
});
