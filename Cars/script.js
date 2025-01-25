const api_url = 'https://dealership.naman.zip/cars'; // endpoint
let sort_order = 'asc'; // default sorting order
let featured_car_shown = false; // don't keep popping up featured car

// fetch cars from the api
function fetch_cars() {
  fetch(api_url)
    .then((response) => response.json())
    .then((cars) => {
      // filter cars by price range if filters are applied
      const min_price = document.getElementById('min-price').value; // get min price
      const max_price = document.getElementById('max-price').value; // get max price

      // check if values exist and filter cars
      const filtered_cars = cars.filter((car) => {
        // if no filter values, return all cars
        if (!min_price && !max_price) return true;
        // if min and max values exist, filter based on them
        if (min_price && car.price < Number(min_price)) return false;
        if (max_price && car.price > Number(max_price)) return false;
        return true; // include car in the filtered list
      });

      // sort the filtered cars by price, asc or desc
      filtered_cars.sort((a, b) =>
        sort_order === 'asc' ? a.price - b.price : b.price - a.price
      );

      const car_grid = document.getElementById('car-grid');
      car_grid.innerHTML = ''; // clear the grid first

      // add cars to the grid
      filtered_cars.forEach((car) => {
        const car_card = document.createElement('div');
        car_card.className = 'car-card';

        const car_image = document.createElement('img');
        car_image.src = car.image;
        car_image.alt = `${car.make} ${car.model}`;
        car_card.appendChild(car_image);

        const car_title = document.createElement('h2');
        car_title.textContent = `${car.make} ${car.model}`;
        car_card.appendChild(car_title);

        const car_year = document.createElement('p');
        car_year.textContent = `Year: ${car.year}`;
        car_card.appendChild(car_year);

        const car_price = document.createElement('p');
        car_price.textContent = `Price: $${car.price.toLocaleString()}`;
        car_card.appendChild(car_price);

        const details_button = document.createElement('button');
        details_button.textContent = 'view details';
        details_button.onclick = () => view_details(car.id);
        car_card.appendChild(details_button);

        car_grid.appendChild(car_card); // finally add card to grid
      });

      if (!featured_car_shown) {
        show_random_featured_car(filtered_cars); // popup for featured car
        featured_car_shown = true; // stop showing popup again
      }
    });
}

// toggle sort order button
function toggle_sort_order() {
  sort_order = sort_order === 'asc' ? 'desc' : 'asc';

  const toggle_button = document.getElementById('sort-toggle');
  toggle_button.textContent =
    sort_order === 'asc' ? 'SORT: LOWEST TO HIGHEST' : 'SORT: HIGHEST TO LOWEST';

  fetch_cars(); // refresh the grid
}

// apply the price filter
function apply_filter() {
  fetch_cars(); // just call fetch again with the current filter values
}

// view details function
function view_details(car_id) {
  window.location.href = `details.html?id=${car_id}`;
}

// show random featured car popup
function show_random_featured_car(cars) {
  const random_car = cars[Math.floor(Math.random() * cars.length)];

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  const popup = document.createElement('div');
  popup.className = 'featured-car-popup';

  popup.innerHTML = `
    <button class="close-popup">&times;</button>
    <h2>FEATURED CAR</h2>
    <img src="${random_car.image}" alt="${random_car.make} ${random_car.model}">
    <p><strong>${random_car.make} ${random_car.model}</strong></p>
    <p>YEAR: ${random_car.year}</p>
    <p>PRICE: $${random_car.price.toLocaleString()}</p>
  `;

  document.body.appendChild(popup);

  const close_popup = () => {
    document.body.removeChild(overlay);
    document.body.removeChild(popup);
  };

  document.querySelector('.close-popup').onclick = close_popup; // close button
  overlay.onclick = close_popup; // close when clicking outside
}

// initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  fetch_cars();

  const toggle_button = document.getElementById('sort-toggle');
  toggle_button.textContent = 'SORT: LOWEST TO HIGHEST';
  toggle_button.onclick = toggle_sort_order;

  const filter_button = document.getElementById('filter-button'); // filter button
  filter_button.onclick = apply_filter; // add filter functionality
});
