import ItemData from "./ItemData.mjs";

export default class EgoData extends ItemData {
    static defineSchema() {

        const ego = super.defineSchema();

        /**
         * If we go full changes with templates and changes after creation this would be changed into cached data prepared on ActorEp2e.
         */
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

        /**
         * Ids of the change Items accquired by this Ego. If there can be multiple Ego on an Actor (not sure that was a good idea though), and we want to track and construct from changes the change needs to be associated to the Ego. With one Ego items.filter(i=>i.type==="change") or something like it would do. I wonder if the changes should just be ActiveEffect.
         */
        ego.changeIds = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        /**
         * If we really do the changes this would be replaced with caching on ActorEp2e with prepared data.
         */
        ego.skills = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        return ego;
    }
}