export class OverlayComponent {
    private overlay: HTMLDivElement;
    private container: HTMLDivElement;
    private onClose: () => void;

    public constructor(onClose: () => void) {
        this.onClose = onClose;

        // Overlay instellen
        this.overlay = document.createElement("div");
        this.overlay.style.position = "fixed";
        this.overlay.style.top = "0";
        this.overlay.style.left = "0";
        this.overlay.style.width = "100vw";
        this.overlay.style.height = "100vh";
        this.overlay.style.background = "rgba(0, 0, 0, 0.9)";
        this.overlay.style.display = "flex";
        this.overlay.style.alignItems = "center";
        this.overlay.style.justifyContent = "center";
        this.overlay.style.zIndex = "9999";

        // Event listener voor de overlay
        this.overlay.addEventListener("click", event => {
            // Controleer of de klik buiten de container was (dus niet op de inhoud)
            if (event.target === this.overlay) {
                this.closeOverlay(); // Sluit de overlay als je buiten de inhoud klikt
            }
        });

        // Container voor content
        this.container = document.createElement("div");
        this.container.style.textAlign = "center";
        this.container.style.background = "black";
        this.container.style.color = "white";
        this.container.style.fontFamily = "DungeonFont";
        this.container.style.padding = "20px";
        this.container.style.borderRadius = "10px";
        this.container.style.zIndex = "10000";

        // Sluitknop
        const closeButton: HTMLButtonElement = document.createElement("button");
        closeButton.textContent = "✖";
        closeButton.style.position = "absolute";
        closeButton.style.top = "15px";
        closeButton.style.right = "15px";
        closeButton.style.background = "red";
        closeButton.style.color = "white";
        closeButton.style.border = "none";
        closeButton.style.padding = "5px 10px";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontSize = "18px";
        closeButton.style.borderRadius = "50%";
        closeButton.addEventListener("click", event => {
            event.stopPropagation(); // Voorkomt dat de overlay sluit bij klikken op de knop
            this.closeOverlay();
        });

        this.overlay.appendChild(closeButton);
        this.overlay.appendChild(this.container);
    }

    public show(content: HTMLElement | string): void {
        if (typeof content === "string") {
            this.container.innerHTML = content;
        }
        else {
            this.container.innerHTML = "";
            this.container.appendChild(content);
        }
        document.body.appendChild(this.overlay);
    }

    private closeOverlay(): void {
        document.body.removeChild(this.overlay);
        this.onClose();
    }
}
