import ItemData from "./ItemData.mjs";

/**
 * Background, Career, and Interest (pg. 38ff)
 * 
 * @todo types should be set to one of them, when, where?
 */
export default class TemplateData extends ItemData {
    static defineSchema() {

        const template = super.defineSchema(arguments);

        /**
         * Skills to add or raise (add and total [if we want to have editing the character build later it needs to be kept in the seperate sources, too]).
         */
        const skills = new foundry.data.fields.ArrayField(
            new foundry.data.fields.ObjectField({
                cname: null, // see ItemData.cname
                description: null, // especially "Know: (Choose One), Common Fields..."
                value: 0
            })
        );
        template.changes.skills = skills;

        /**
         * Aptitudes to modify.
         */
        const aptitudes = new foundry.data.fields.ObjectField({
            cognition: null,
            intuition: null,
            reflexes: null,
            savvy: null,
            somatics: null,
            willpower: null
        });
        template.changes.aptitudes = aptitudes;

        return template;
    }
}
