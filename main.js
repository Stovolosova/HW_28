const characterList = document.getElementById('character-list');
const planetList = document.getElementById('planet-list');
const vehicleList = document.getElementById('vehicle-list');
const entitiesList = document.getElementById('entities-list');

const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');

let dataView = [];
let curentCharacterPage = 1;
let curentPlanetPage = 1;
let curentVehiclePage = 1;
let curentPage = 0;
let totalPages = 5;

const URLS = {
   films: "https://swapi.dev/api/films/",
   people: "https://swapi.dev/api/people/",
   planets: "https://swapi.dev/api/planets/",
   species: "https://swapi.dev/api/species/",
   starships: "https://swapi.dev/api/starships/",
   vehicles: "https://swapi.dev/api/vehicles/"
}

previousButton.style.display = 'none';
nextButton.style.display = 'none';

characterList.addEventListener('click', loadCharacters);
planetList.addEventListener('click', loadPlanets);
vehicleList.addEventListener('click', loadVehicles);

nextButton.addEventListener('click', previousPage);
previousButton.addEventListener('click', nextPage);

function loadCharacters() {
  const xhrPeople = new XMLHttpRequest();
  xhrPeople.open('GET', `${URLS.people}?page=${curentCharacterPage}`);
  xhrPeople.send();

  xhrPeople.addEventListener('load', (e) => {
    const peopleData = JSON.parse(e.target.response);
    console.log(peopleData);

    entitiesList.innerHTML = '';

    peopleData.results.forEach(character => {
      const listItem = createListItem(character.name);
      entitiesList.appendChild(listItem);
    });

   previousButton.style.display = 'block';
   nextButton.style.display = 'block';

   updateSectionTitle('Characters');

   const viewButtons = document.querySelectorAll('#view-button');
   viewButtons.forEach(button => {
   // button.addEventListener('click', showEntityDetails);
   });
  });
}

function loadPlanets() {
  const xhrPlanets = new XMLHttpRequest();
  xhrPlanets.open('GET', `${URLS.planets}?page=${curentPlanetPage}`);
  xhrPlanets.send();

  xhrPlanets.addEventListener('load', (e) => {
    const planetData = JSON.parse(e.target.response);
    console.log(planetData);

    entitiesList.innerHTML = '';

   planetData.results.forEach(planet => {
     const listItem = createListItem(planet.name);
     entitiesList.appendChild(listItem);
    });

   updateSectionTitle('Planets');
  });
}

function loadVehicles() {
  const xhrVehicles = new XMLHttpRequest();
  xhrVehicles.open('GET', `${URLS.vehicles}?page=${curentVehiclePage}`);
  xhrVehicles.send();

  xhrVehicles.addEventListener('load', (e) => {
    const vehicleData = JSON.parse(e.target.response);
    console.log(vehicleData);

    entitiesList.innerHTML = '';

    vehicleData.results.forEach(vehicle => {
     const listItem = createListItem(vehicle.name);
     entitiesList.appendChild(listItem);
    });

    updateSectionTitle('Vehicle');
  });
}
function nextPage() {
  if (curentCharacterPage < totalPages) {
    curentCharacterPage++;
    loadCharacters();
  }
}

function previousPage() {
  if (curentCharacterPage > 1) {
    curentCharacterPage--;
    loadCharacters();
  }
}

function createListItem(name) {
  const listItem = document.createElement('li');
  listItem.className = 'list-group-item';
  listItem.innerHTML = `
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col">
            <div class="card shadow-sm">
              <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">${name}</text></svg>
              <div class="card-body">
              <p class="card-text">${name}</p>
               <div class="d-flex justify-content-between align-items-center">
                <button type="button" id="view-button" class="btn btn-sm btn-outline-secondary" data-view='${JSON.stringify(name)}'>View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

listItem

   return listItem;
}

function updateSectionTitle(title) {
  document.getElementById('section-title').textContent = title;
}

function loadDetails (name) {
  const entityname = JSON.parse(e.target.dataset.view);
   const card = e.target.closest('.card');

   card.innerHTML = `<p>Details about ${entityname}</p>
   <p class="card-text">${birth_year}</p>
   <p class="card-text">${gender}</p>
   <p class="card-text">${eheight}</p>
   <p class="card-text">${hair_color}</p>`
}