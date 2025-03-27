import { BathroomRoom } from "../../game-implementation/rooms/Bathroomroom";
import { GameOverRoom } from "../../game-implementation/rooms/GameOverRoom";
import { PlayerSession } from "../../game-implementation/types";
import { gameService } from "../../global";
import { ActionResult } from "../actionResults/ActionResult";
import { Room } from "../gameObjects/Room";

export class Timer {
    public static readonly Alias: string = "bathroom-door";

    public goto(): ActionResult | undefined {
        let room: Room = new BathroomRoom();

        // Update current room to BathroomRoom immediately
        gameService.getPlayerSession().currentRoom = room.alias;

        // Return the result of examining the BathroomRoom
        const result: ActionResult | undefined = room.examine();

        // Store the timeout ID so it can be cleared if needed
        const timeoutId: NodeJS.Timeout = setTimeout(() => {
            // Check if the player has walked to the bathtub before changing rooms
            const playerSession: PlayerSession = gameService.getPlayerSession();
            if (playerSession.walkedToBathtub) {
                // If the player has walked to the bathtub, clear the timeout and do nothing
                clearTimeout(timeoutId);
                return;
            }

            // Change to BedroomRoom after the timeout (if player hasn't walked to bathtub)
            room = new GameOverRoom(); // Change to BedroomRoom
            gameService.getPlayerSession().currentRoom = room.alias; // Update player session
            // Trigger a refresh or update, ensuring the new room's examine() is called
            room.examine(); // Call examine() for BedroomRoom after the timeout
        }, 2000); // 2000ms = 2 seconds

        return result; // Return the result of examining the BathroomRoom immediately
    }
}
