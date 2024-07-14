# Phase 1 week 2 Code challange (Flatdango-Flatiron Movie Theater)

## By Namada Junior

## Project Description
The project is a web application called "Flatdango-Flatiron Movie Theater". It is a movie theater website where users can browse and purchase tickets for movies. The website is built using HTML, CSS, and JavaScript.

The website has the following features:

-A landing page with a header and a container for displaying movie posters.

-A sidebar on the left side of the container that displays movie details such as title, runtime, showtime, and tickets sold.

-Each movie poster has a button to purchase tickets.

-The website uses a JSON file called "db.json" to store movie data, including the movie title, runtime, showtime, tickets sold, description, and poster image.

-The website allows users to purchase tickets for movies by clicking the "Buy Ticket" button.

-The website also includes a description of each movie.

## Properties of the website

### HTML
This is the structure of the HTML file which is the foundation of the page.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flatdango-Flatiron Movie Theater</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div id="header">
      <h1>Flatdango-Flatiron Movie Theater</h1>
    </div>

    <div class="container">
      <ul id="sidebar"></ul>
      <div id="movie-wrapper"></div>
    </div>

    <script src="./script.js"></script>
  </body>
</html>

```
### CSS
This is the styling that was used to make the website more appealing to the user.
```css
@import url("https://fonts.googleapis.com/css2?family=Bilbo+Swash+Caps&family=Ga+Maamli&family=Jacquarda+Bastarda+9+Charted&family=Margarine&family=Playball&family=Playwrite+IS&display=swap");

body {
  background-color: rgb(133, 55, 0);
  text-align: center;
  font-family: "Margarine", sans-serif;
  font-weight: 400;
  font-style: normal;
}

#header {
  background-color: black;
  color: beige;
}

#movie-wrapper{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.photo{
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 20px;
  background-color: black;
  color: beige;
}

.photo img{
  width: 500px;
  height: 500px;
}

.container {
  display: flex;
  justify-content: space-between;
}

#sidebar {
  background-color: black;
  color: beige;
  width: 1500px;
  height: 350px;
}
```
### Javascript
The JavaScript code provided consists of fetch requests to a local server at http://localhost:3000/films to retrieve film data. The code creates a list of film titles in the sidebar and displays film details when a title is clicked. Additionally, it generates photos for each film on the webpage, showing poster images, titles, runtimes, showtimes, and tickets sold in a grid layout. The bought function updates the number of tickets sold for a film upon clicking the "Buy Ticket" button by sending a PATCH request to the server. This function then updates the tickets left on the webpage. The createPhoto function generates a photo for a film, while displayFilmDetails is triggered when a film title is clicked to display the film's details.
```js
const url = "http://localhost:3000/films";

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
  .catch((error) => console.error("Error fetching films:", error));

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
  const ticketsLeft = capacity - tickets_sold;

  if (ticketsLeft <= 0) {
    alert("Tickets sold out");
    return;
  } else {
    const updatedTicketsSold = tickets_sold + 1;

    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tickets_sold: updatedTicketsSold,
      }),
    })
      .then((response) => response.json())
      .then((film) => {
        document.getElementById(`tickets-left-${id}`).
        textContent = `Tickets Left: ${capacity - film.tickets_sold}`;
        console.log("Ticket bought successfully");
      })
  }
}
```




## System Requirements

- Node 18+
- A browser capable of running JavaScript (Chrome, Firefox, Safari, or Edge)
- Operating System (Windows 10+, MacOS, Linux, etc.)
- A text editor capable of running JavaScript (Visual Studio Code, Vim, Nano, Emacs, Atom, Sublime Text, etc.)
- RAM >= 4GB
- Disk space >= 1GB

## Technology used

Used Visual Studio Code editor to write the HTML, CSS and Javascript used to create the website.

HTML - HTML was used to create the structure and foundation of the landing page.

CSS - used css to style the website to look appealing to the user.

Javascript - Used Javascript to create functions and conditions that manipulate items on the webpage.

## Development

Want to contribute? Excellent, To enhance or contribute on the existing project, follow these steps:

- Fork the repo
- Create a new branch (git checkout -b enhance-feature)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (git commit -m 'enhanced feature')
- Push to the branch (git push origin enhance-feature)
- Create a Pull Request

## License

MIT License

Copyright (c) [2024] [Namada Junior]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.