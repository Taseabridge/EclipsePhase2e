import ItemData from "./ItemData.mjs";

export default class EgoData extends ItemData {
    static defineSchema() {

        const ego = super.defineSchema(arguments);

        ego.aptitudes = new foundry.data.fields.SchemaField({
            cognition: new foundry.data.fields.NumberField({
                required: true,
                initial: 0,
                integer: true
            }),
            intuition: new foundry.data.fields.NumberField({
                required: true,
                initial: 0,
                integer: true
            }),
            reflexes: new foundry.data.fields.NumberField({
                required: true,
                initial: 0,
                integer: true
            }),
            savvy: new foundry.data.fields.NumberField({
                required: true,
                initial: 0,
                integer: true
            }),
            somatics: new foundry.data.fields.NumberField({
                required: true,
                initial: 0,
                integer: true
            }),
            willpower: new foundry.data.fields.NumberField({
                required: true,
                initial: 0,
                integer: true
            })
        });

        return ego;
    }
}