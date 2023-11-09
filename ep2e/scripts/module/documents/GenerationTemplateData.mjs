import ItemData from "./ItemData.mjs";

/**
 * Background, Career, and Interest (pg. 38ff)
 * 
 * @todo types should be set to one of them, when, where?
 */
export default class GenerationTemplateData extends ItemData {
    static defineSchema() {

        const template = super.defineSchema(arguments);

        const data = new foundry.data.fields.ArrayField(
            new foundry.data.fields.ObjectField({
                cname: null, // see ItemData.cname
                description: null, // especially "Know: (Choose One), Common Fields..."
                value: 0
            })
        );

        template.changes = data;

        return template;
    }
}
