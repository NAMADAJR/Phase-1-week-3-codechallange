const url = "https://phase-1-week-3-codechallange-mock-backend.vercel.app/films";

fetch(url)
  .then((response) => response.json())
  .then((films) => {
    const filmList = document.querySelector("#sidebar");
    
    films.forEach((film) => {
      const li = document.createElement("li");
      li.className = "film item";
      li.textContent = film.title;

      filmList.appendChild(li);
    });
  })


function displayFilmDetails(film) {
  createPhoto(film);
}

fetch(url)
  .then((response) => response.json())
  .then((photos) => photos.forEach((photo) => createPhoto(photo)));

function createPhoto(photo) {
  const {
    id,
    title,
    runtime,
    capacity,
    showtime,
    tickets_sold,
    description,
    url,
    poster,
  } = photo;

  let wrapper = document.querySelector("#movie-wrapper");

  const divCard = document.createElement("div");
  divCard.className = "photo";

  const html = `
            <div>
            <img src=${poster} alt="${title}">
            </div>
            <div>
            <h3>Title: ${title}</h3>
            </div>
            <div>
            <h3>Time: ${showtime}</h3>
            </div>
            <div>
            <h3>Seats: ${capacity}</h3>
            </div>
            <div>
            <h3 id="tickets-left-${id}">Tickets Left: ${capacity - tickets_sold}</h3>
            </div>
            <div>
            <button type="button" id="ticket-${id}" onclick="bought(${id}, ${capacity}, ${tickets_sold})">Buy Tickets</button>
            </div>
            `;
  divCard.innerHTML = html;

  wrapper.appendChild(divCard);
}

function bought(id, capacity, tickets_sold) {
  const ticketsLeftElement = document.getElementById(`tickets-left-${id}`);
  let ticketsLeft = parseInt(ticketsLeftElement.textContent.split(': ')[1]);

  if (ticketsLeft <= 0) {
    alert("Tickets sold out");
    return;
  }

  ticketsLeft -= 1;
  ticketsLeftElement.textContent = `Tickets Left: ${ticketsLeft}`;
}




