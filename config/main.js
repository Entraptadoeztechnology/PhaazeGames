// Site settings
var sitename = "Bens Unblocked Games";
var subtext = "v1.2";

// DO NOT import custom.js (it was breaking your site)

// Optional server URL (only used if you still host images externally)
var serverUrl1 = "https://parcoil-assets.onrender.com";

document.title = `${document.title} | ${sitename}`;

let gamesData = [];

// Render games
function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = "";

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");

    // LOCAL FILE FIX: use local images instead of external server
    gameImage.src = game.image;
    gameImage.alt = game.name;

    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.path}`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

// Search
function handleSearchInput() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = gamesData.filter((g) =>
    g.name.toLowerCase().includes(value)
  );

  displayFilteredGames(filtered);
}

// Load JSON
fetch("./config/games.json")
  .then((res) => res.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data);
  })
  .catch((err) => console.error("Error loading games.json:", err));

// Events
document.getElementById("searchInput").addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;
