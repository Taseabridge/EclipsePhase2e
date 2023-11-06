import ItemData from "./ItemData.mjs";

/**
 * 
 */
export default class SkillData extends ItemData {
    static defineSchema() {

        const item = super.defineSchema();

        const skill = {};


        /**
         * The aptitude this skill is associated with.
         */
        skill.aptitude = new foundry.data.fields.StringField({
            required: true,
            initial: ""
        });

        /**
         * As we have Fray and Perceive, lets put in the multipier right from the start. For the time being lets put it on integer and assume there will never be more cases most likely, and if there are not with non-integer multipliers. If that should change I'd hope just changing the constraint should work except for bad UI representations.
         */
        skill.aptitudeMultiplier = new foundry.data.fields.NumberField({
            required: true,
            initial: 1,
            integer: true
        });

        /**
         * @todo review if this is how, if at all, deal with field categories such as Pilot or Hardware. Is there any benefit in even having that? As the names are the keywords in the rules to address what skill to use we could do full qualified and short names. We probably want to be able to put the into sections by this criterion, so we need it. Not sure if this is the way though.
         */
        skill.fieldCategory = new foundry.data.fields.StringField({
            required: true,
            initial: ""
        });

        /**
         * Rank as purchased/ leveled without any modifiers.
         */
        skill.rank = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        /**
         * @description You may opt to specialize in a given skill. Specializations represent a focus in one particular aspect of that skill. For example, Beam Weapons is a specialization of Guns skill. Specializations are written in parentheses after the skill name — e.g., Guns (Beam Weapons). Each skill lists a number of possible specializations, but players and GMs can generate their own. Field skills may also have specializations. Specializations provide a +10 bonus when using that skill in a situation appropriate to the specialization. (pg. 48)
         */
        skill.specializations = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

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