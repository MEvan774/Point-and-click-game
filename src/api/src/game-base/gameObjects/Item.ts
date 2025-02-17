import { GameObject } from "./GameObject";

/**
 * @author Milan
 */
export abstract class Item extends GameObject {
    /**
     * Create a new instance of this item
     *
     * @param alias Alias of this item
     */
    // public itemName: string;
    // public itemDescription: string;
    protected constructor(alias: string) {
        super(alias);
    }

    // protected OnPickupItem() <void> {

    // }
}
