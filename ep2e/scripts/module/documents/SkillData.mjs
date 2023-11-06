import ItemData from "./ItemData.mjs";

/**
 * @todo how, if at all, deal with field categories such as Pilot or Hardware. Is there any benefit in even having that? As the names are the keywords in the rules to address what skill to use we could do full qualified and short names.
 */
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
         * @description Skills are also assigned to a number of other categories, as noted on the Skill List ▶next page: Combat, Mental, Physical, Psi, Social, Technical, and Vehicle skills. Certain traits, abilities, and modifiers may only apply to skills of a specific category. (pg. 48) Note that they after defining categories use type instead. As type would be confusing after having introduced our type system with the types field we stick to categories. Might label them type at UI maybe.
         * 
         * @todo validation to match only the known rules categories.
         */
        skill.categories = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        item.skill = new foundry.data.fields.SchemaField(skill);

        return item;
    }
}