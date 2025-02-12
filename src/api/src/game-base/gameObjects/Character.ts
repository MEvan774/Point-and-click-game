import { ActionResult } from "../actionResults/ActionResult";
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
            this.talk();
        });
    }

    /**
     * @inheritdoc
     */
    public abstract talk(choiceId?: number): ActionResult | undefined;
}
