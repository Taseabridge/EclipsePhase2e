import ItemData from "./ItemData.mjs";

/**
 * The Morph type.
 */
export default class MorphData extends ItemData {
    static defineSchema() {

        const morph = super.defineSchema(arguments);

        morph.mp = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        morph.durability = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        /**
         * pg. 230
         */
        morph.movement = new foundry.data.fields.ArrayField(
            new foundry.data.fields.ObjectField({
                name: null,
                cname: null, // see ItemData.cname
                description: null,
                value: { base: null, full: null }
            })
        );

        return morph;
    }
}
