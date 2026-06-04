// Site settings
var sitename = "Bens Unblocked Games";
var subtext = "v1.2";

// Title update
document.title = `${document.title} | ${sitename}`;

let gamesData = [];

/* Render games */
function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = "";

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const img = document.createElement("img");

    // LOCAL images only (no external server)
    img.src = game.image;
    img.alt = game.name;

    img.onclick = () => {
      window.location.href = `play.html?gameurl=${encodeURIComponent(game.path)}`;
    };

    const title = document.createElement("p");
    title.textContent = game.name;

    gameDiv.appendChild(img);
    gameDiv.appendChild(title);
    gamesContainer.appendChild(gameDiv);
  });
}

/* Search */
function handleSearch() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = gamesData.filter((g) =>
    g.name.toLowerCase().includes(value)
  );

  displayFilteredGames(filtered);
}

/* Load games.json (SAFE VERSION) */
fetch("./config/games.json")
  .then((res) => res.json())
  .then((data) => {
    console.log("Loaded games.json:", data);

    if (!Array.isArray(data)) {
      throw new Error("games.json is NOT an array");
    }

    gamesData = data;
    displayFilteredGames(data);
  })
  .catch((err) => {
    console.error("Error loading games.json:", err);
  });

/* Events */
document
  .getElementById("searchInput")
  .addEventListener("input", handleSearch);

document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;
