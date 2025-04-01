import { PlayerSession } from "../../game-implementation/types";
import { gameService } from "../../global";
import { GameOverRoom } from "../../game-implementation/rooms/GameOverRoom";
import { Room } from "../gameObjects/Room";

export class Timer {
    public static readonly Alias: string = "timer";

    private intervalId: NodeJS.Timeout | null = null; // Property to store interval ID

    // Constructor initializes the timer with a randomized timeout duration
    public constructor(private timeoutDuration: number = Timer.getRandomTimeout()) {
        this.startTimer(); // Start the timer immediately when Timer is created
    }

    // Method to generate a random timeout between 40,000 and 70,000
    private static getRandomTimeout(): number {
        return Math.floor(Math.random() * (70000 - 40000 + 1)) + 40000;
    }

    // Method to start the timer, continuously running and checking the condition
    private startTimer(): void {
        // Clear the previous interval if it exists
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }

        // Run the timer infinitely in intervals
        this.intervalId = setInterval(() => {
            const playerSession: PlayerSession = gameService.getPlayerSession();

            if (!playerSession.walkedToBathtub || !playerSession.walkedToMirror || !playerSession.walkedToFreezer || !playerSession.playerIsHiding) {
                this.transitionToGameOverRoom();
            }
        }, this.timeoutDuration); // Timeout duration, now randomized
    }

    // Method to transition the player to the GameOverRoom
    private transitionToGameOverRoom(): void {
        const room: Room = new GameOverRoom();
        gameService.getPlayerSession().currentRoom = room.alias; // Set current room to GameOverRoom
        room.examine(); // Optionally examine the new room (for displaying descriptions or handling actions)

        console.log("Player has been sent to the GameOverRoom.");
    }

    // Method to restart the timer
    public restartTimer(): void {
        this.timeoutDuration = Timer.getRandomTimeout();
        this.startTimer();
    }
}
