import ItemData from "./ItemData.mjs";

/**
 * @todo ActiveEffects, probably on ItemData
 */
export default class GearData extends ItemData {

    static defineSchema() {

        const item = super.defineSchema();

        const gear = {};

        /**
         * Gear Point value.
         */
        gear.gp = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        /**
         * Gear Complexity.
         * 
         * @todo make sure it can only be one of the rules defined ones.
         */
        gear.complexity = new foundry.data.fields.StringField({
            required: true,
            initial: ""
        });

        const quality = {};

        /**
         * The value of the bonus granted or malus imposed (pg. 311).
         */
        quality.quality = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        /**
         * Description how the quality of this item differs from normal.
         */
        quality.description = new foundry.data.fields.HTMLField();

        gear.quality = new foundry.data.fields.SchemaField(quality);

        item.gear = new foundry.data.fields.SchemaField(gear);

        return item;
    }
}

