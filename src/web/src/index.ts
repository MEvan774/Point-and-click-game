import { RootComponent } from "./components/RootComponent";
import { NotFoundComponent } from "./components/NotFoundComponent";
import { CanvasComponent } from "./components/CanvasComponent";

// Expose the web components to the browser
window.customElements.define("game-root", RootComponent);
window.customElements.define("game-notfound", NotFoundComponent);
window.customElements.define("game-canvas", CanvasComponent);

const ambianceSound: HTMLAudioElement = new Audio("public/audio/ambiancesound.wav");
ambianceSound.volume = 0.1; // 10% volume
ambianceSound.loop = true; // Laat het geluid herhalen, net zoals in je HTML

document.addEventListener("click", () => {
    if (ambianceSound.paused) {
        ambianceSound.play().catch((error: unknown) => {
            if (error instanceof Error) {
                console.error("Audio kon niet worden afgespeeld:", error.message);
            }
            else {
                console.error("Onbekende fout bij het afspelen van audio.");
            }
        });
    }
});
