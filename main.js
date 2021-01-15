(() => {
	"use strict";
	if (!('indexedDB' in window)) {
		alert("Web storage isn't supported in your browser, please consider switching to the latest version of Firefox or Chrome for this site to work.");
		return;
	}

	window.RufflePlayer = window.RufflePlayer || {};

	window.addEventListener("DOMContentLoaded", () => {

		let ruffle = window.RufflePlayer.newest();
		let player = ruffle.createPlayer();
		let container = document.getElementById("player-container");
		container.appendChild(player);

		function addGames(files) {

			const gamesContainer = document.getElementById("games-container");

			for (let file of files) {
				if (file.type === "application/x-shockwave-flash") {

					const reader = new FileReader();

					reader.addEventListener("load", () => {

						const game = document.createElement("div");
						game.classList.add("game");
						game.tabIndex = 1;
						const gameLabel = document.createElement("p");
						gameLabel.classList.add("game-label");
						game.appendChild(gameLabel);
						const gameImage = document.createElement("img");
						gameImage.classList.add("game-image");
						gameImage.alt = "Game Image";
						game.appendChild(gameImage);
						const gameDelete = document.createElement("button");
						gameDelete.classList.add("game-delete");
						game.appendChild(gameDelete);

						gameLabel.textContent = "Dad n' Me";
						gameImage.src = "https://picon.ngfiles.com/254000/flash_254456_largest_crop.png?f1607980901";
						game.data = reader.result;

						game.addEventListener("click", event => {
							if (event.target !== game.getElementsByClassName("game-delete")[0]) {
								if (game.data) {
									player.load(game.data);
								}
							}
						});
						gameDelete.addEventListener("click", event => {
							game.remove();
						});

						gamesContainer.insertBefore(game, gamesContainer.lastChild);
					});

					reader.readAsDataURL(file);
				}
			}
		}

		const gamesContainer = document.getElementById("games-container");
		gamesContainer.addEventListener("dragover", event => {
			event.stopPropagation();
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
		});
		gamesContainer.addEventListener("drop", event => {
			event.stopPropagation();
			event.preventDefault();
			const fileList = event.dataTransfer.files;
			addGames(fileList);
		});
		const addGameButton = document.getElementById("add-game-button");
		addGameButton.addEventListener("change", event => {
			addGames(addGameButton.files);
		});
	});
})();
