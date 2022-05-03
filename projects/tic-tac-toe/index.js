import { Bot1, Bot2 } from "./Bot.mjs";
import Game from "./game.mjs";

function main() {
	const game = new Game(Bot1, Bot2);
	game.start();
}

window.addEventListener(
	"load",
	function () {
		const lastBoardLineEl = document.getElementById("last-line");
		lastBoardLineEl.addEventListener("animationend", main, {
			once: true,
		});
	},
	{
		once: true,
	}
);
