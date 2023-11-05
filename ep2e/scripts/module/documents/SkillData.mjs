import ItemData from "./ItemData.mjs";

export default class SkillData extends ItemData {
    static defineSchema() {

        const skill = super.defineSchema(arguments);

        skill.aptitude = new foundry.data.fields.StringField({
            required: true,
            initial: ""
        });

        skill.rank = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        skill.types = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        return skill;
    }
}