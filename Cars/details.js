const apiUrl = "https://dealership.naman.zip/car/";

// get the car id from the url
function getCarIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// fetch car details and display them
async function fetchCarDetails() {
  const carId = getCarIdFromUrl();
  if (!carId) {
    document.getElementById("car-details").innerHTML = `<p>Car ID not found. Go back and try again.</p>`;
    return;
  }

  // get the car data from api
  const response = await fetch(`${apiUrl}${carId}`);
  const car = await response.json();

  // show car details on the page
  document.getElementById("car-details").innerHTML = `
    <h2>${car.make} ${car.model}</h2>
    <p><strong>Year:</strong> ${car.year}</p>
    <p><strong>Price:</strong> $${car.price}</p>
    <p><strong>Mileage:</strong> ${car.mileage}</p>
    <p><strong>Condition:</strong> ${car.condition}</p>
    <p><strong>Fuel Type:</strong> ${car.fuel_type}</p>
    <p><strong>Transmission:</strong> ${car.transmission}</p>
    <p><strong>Color:</strong> ${car.color}</p>
    <p><strong>VIN:</strong> ${car.vin}</p>
    <p>${car.description}</p>
  `;
}

// load car details when the page loads
fetchCarDetails();
