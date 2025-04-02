import { PlayerSession } from "../../game-implementation/types";
import { gameService } from "../../global";
import { GameOverRoom } from "../../game-implementation/rooms/GameOverRoom";
import { Room } from "../gameObjects/Room";
import { GameController } from "../../game-implementation/controllers/GameController";
import { TeleportActionResult } from "../actionResults/TeleportActionResult";
import { GameState } from "@shared/types";

/**
export class Timer {
    public static readonly Alias: string = "timer";
    public static readonly Instance: Timer = new Timer(); // Singleton instance of Timer

    private constructor() {}

    private intervalId: NodeJS.Timeout | null = null; // Property to store interval ID

    // Method to generate a random timeout number between 40,000 and 70,000
    private static getRandomTimeout(): number {
        return Math.floor(Math.random() * (70000 - 40000 + 1)) + 40000;
    }

    // Method to start the timer, continuously running and checking the condition
    public startTimer(): void {
        console.log("START");
        // Clear the previous interval if it exists
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }

        // Run the timer infinitely in intervals
        this.intervalId = setInterval(() => {
            console.log("stop");
            const playerSession: PlayerSession = gameService.getPlayerSession();

            if (!playerSession.walkedToBathtub || !playerSession.walkedToMirror || !playerSession.walkedToFreezer || !playerSession.playerIsHiding) {
                if (playerSession.currentRoom !== GameOverRoom.Alias) {
                    const gameState: GameState | undefined = new GameController().convertActionResultToGameState(
                        new TeleportActionResult(new GameOverRoom())
                    );
                }
            }
        }, Timer.getRandomTimeout()); // Timeout duration, now randomized
    }

    // Method to transition the player to the GameOverRoom
    private transitionToGameOverRoom(): void {
        const room: Room = new GameOverRoom();
        gameService.getPlayerSession().currentRoom = room.alias; // Set current room to GameOverRoom
        room.examine(); // Optionally examine the new room (for displaying descriptions or handling actions)

        console.log("Player has been sent to the GameOverRoom.");
    }
}
*/
