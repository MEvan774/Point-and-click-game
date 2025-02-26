import { GameObject } from "./GameObject";

/**
 * @author Milan
 */
export abstract class Item extends GameObject {
    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     * @param validActions Valid actions for the item
     */
    protected constructor(alias: string) {
        super(alias, ["examine", "go to"]);
    }
}
