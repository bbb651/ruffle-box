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

						gameLabel.textContent = file.name.split(".").slice(0, -1).join(".");
						gameImage.src = "images/flash.svg";
						game.data = reader.result;

						game.addEventListener("click", event => {
							if (event.target !== gameDelete) {
								if (game.data) {
									player.load(game.data);
								}
							}
						});
						gameDelete.addEventListener("click", event => {
							game.remove();
						});

						gamesContainer.insertBefore(game, document.getElementById("add-game-input"));
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

		const addGameInput = document.getElementById("add-game-input");
		addGameInput.addEventListener("change", event => {
			addGames(addGameInput.files);
		});

		const addGameButton = document.getElementById("add-game-button");
		addGameButton.onclick = () => addGameInput.click();
	});
})();
