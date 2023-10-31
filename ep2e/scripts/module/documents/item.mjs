export default class ItemEp2e extends Item {

    constructor(options = {}) {
        super(options);
    }
}


export class WeaponData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            description: new fields.HTMLField(),
            skill: new fields.SchemaField(new fields.StringField())
        };
    }
}

/**
 * It might be possible, and if so reasonable, to have a hierarchy of these instead in order to compose from them without keeping the parts distinct, and with no need to repeat parts.
 * 
 */
export class GearData extends foundry.abstract.DataModel {

    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            description: new fields.HTMLField() // this for example would go if we'd have a hierarchy
        }
    }
}