import ItemData from "./ItemData.mjs";

export default class GearData extends ItemData {

    static defineSchema() {
        const fields = foundry.data.fields;

        const composite = super.defineSchema(arguments);

        composite.gp = new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        return composite;
    }
}

