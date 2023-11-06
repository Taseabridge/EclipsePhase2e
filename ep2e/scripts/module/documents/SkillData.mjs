import ItemData from "./ItemData.mjs";

export default class SkillData extends ItemData {
    static defineSchema() {

        const item = super.defineSchema(arguments);

        const skill = {};


        skill.aptitude = new foundry.data.fields.StringField({
            required: true,
            initial: ""
        });

        skill.rank = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        /**
         * @description Skills are also assigned to a number of other categories, as noted on the Skill List ▶next page: Combat, Mental, Physical, Psi, Social, Technical, and Vehicle skills. Certain traits, abilities, and modifiers may only apply to skills of a specific category. (pg. 48)
         */
        skill.categories = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        item.skill = new foundry.data.fields.SchemaField(skill);

        return item;
    }
}