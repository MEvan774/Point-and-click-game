import { ActionResult, ActionResult } from "../actionResults/ActionResult";
import { Talk } from "../actions/TalkAction";
import { GameObject } from "./GameObject";

/**
 * Base class used to represent a character
 *
 * @remarks Implements the Talk action by default
 */
export abstract class Character extends GameObject implements Talk {
    /**
     * Create a new instance of this character
     *
     * @param alias Alias of this character
     */
    protected constructor(alias: string) {
        super(alias);
        this.onClickTalk();
    }

    /**
     * Start talk when clicked on character
     */
    private onClickTalk() {
        const character: HTMLElement | null = document.getElementById(this.alias);

        if (!character) return;
        character.addEventListener("click", () => {
            this.talk(0);
        })
    }

    /**
     * @param choiceId The ID of the choice made (Optional)
     * @returns Result of the action
     * 
     * @inheritdoc
     */
    public abstract talk(choiceId?: number): ActionResult | undefined;
}

export class NPC extends Character {
    constructor(alias: string) {
        super(alias);
    }

    public talk(choiceId?: number): ActionResult | undefined {
        if (choiceId === 0) {
            console.log("test.");
            return undefined;
        }
        else {
            console.log("test2");
            return undefined;
        }
    }
}
