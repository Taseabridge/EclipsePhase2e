import ItemData from "./ItemData.mjs";

/**
 * The Morph type.
 */
export default class MorphData extends ItemData {
    static defineSchema() {

        const composite = super.defineSchema(arguments);

        composite.mp = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        return composite;
    }
}
