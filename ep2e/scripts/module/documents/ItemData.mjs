/**
 * It might be possible, and if so reasonable, to have a hierarchy of these instead in order to compose from them without keeping the parts distinct, and with no need to repeat parts.
 * 
 */
export default class ItemData extends foundry.abstract.DataModel {

    static defineSchema() {
        return {
            name: new foundry.data.fields.StringField(),
            description: new foundry.data.fields.HTMLField() // this for example would go if we'd have a hierarchy
        }
    }
}

