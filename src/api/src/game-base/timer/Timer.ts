import { PlayerSession } from "../../game-implementation/types";
import { gameService } from "../../global";
import { GameOverRoom } from "../../game-implementation/rooms/GameOverRoom";
import { Room } from "../gameObjects/Room";

export class Timer {
    public static readonly Alias: string = "timer";

    // Constructor initializes the timer
    public constructor(private timeoutDuration: number = 2000) {
        this.startTimer(); // Start the timer immediately when Timer is created
    }

    // Method to start the timer, continuously running and checking the condition
    private startTimer(): void {
        // Run the timer infinitely in intervals
        setInterval(() => {
            const playerSession: PlayerSession = gameService.getPlayerSession();

            if (!playerSession.walkedToBathtub || !playerSession.walkedToMirror) {
                this.transitionToGameOverRoom();
            }
        }, this.timeoutDuration); // Timeout duration, e.g., every 2 seconds
    }

    // Method to transition the player to the GameOverRoom
    private transitionToGameOverRoom(): void {
        const room: Room = new GameOverRoom();
        gameService.getPlayerSession().currentRoom = room.alias; // Set current room to GameOverRoom
        room.examine(); // Optionally examine the new room (for displaying descriptions or handling actions)

        console.log("Player has been sent to the GameOverRoom.");
    }
}
