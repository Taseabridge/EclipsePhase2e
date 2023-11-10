/**
 * It might be possible, and if so reasonable, to have a hierarchy of these instead in order to compose from them without keeping the parts distinct, and with no need to repeat parts.
 * 
 */
export default class ItemData extends foundry.abstract.DataModel {

    static defineSchema() {

        const item = {}; // no lambda for better documentation

        /**
         * For display and stuff, Macros at most. Use id or uuid for everything where there is not a damn good (to be documented) reason to do otherwise.
         */
        item.name = new foundry.data.fields.StringField();

        /**
         * Canonical name. The name can be changed for flavor. The cname is the unique eternal rules key. We use a cname for human readability and for stability (we could have used the uuid for the item in its system compendium, but this is easier to read and at least as robust). Note that there can and often will be multiple items with the same cname in the game, that being all the items of a rules item's type, such as all the Informorphs or all the Agents or all the TacNets. This should be well suited for GM Macros, like roll item X on the Actor for which they selected the Token.
         * 
         * @todo do we want to use qualified names that document the kind of an item or just the name? Is there a unique (or at least clear enough choice to pick one if not) path to each (as long es we only have inheritence and no composition in the data model that automatically gives the unique path)?
         */
        item.cname = new foundry.data.fields.StringField();

        /**
         * This is meant to become the rich description with the HTML Editor included like in dnd5e items enabling all kinds of unforseen uses, too, as it is unstructured, though sanitized data with which we can get creative as users. Must therefore never be used for technical control.
         */
        item.description = new foundry.data.fields.HTMLField();

        /**
         * Notes primarily meant to be used by the GM for documentation, such as why an item with changes was granted and such.
         */
        item.notes = new foundry.data.fields.HTMLField();

        /**
         * Seemingly we are building our own (not enforced) type system. So everything needs to be typed in order to have the logic be different for the differend kinds (types) of things, concepts, ...
         * 
         * @todo There should be verification based on a list of values acceptable (known). The validation methods from the API might be able to help with this. Where does the list go, no matter if we have to write the validation ourselves or not?
         */
        item.types = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        /**
         * If use is a check, what skill to use.
         */
        item.skill = new foundry.data.fields.StringField({
            default: null
        });

        /**
         * If use is a check, what aptitude to fall back to if no skill specified.
         */
        item.aptitude = new foundry.data.fields.StringField({
            default: null
        });


        /**
         * to put the Item into any Graph
         */
        const vertexData = {};

        /**
         * In Edges (the IDs)
         * 
         * @todo id or uuid?
         */
        vertexData.in = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        /**
         * Out Edges (the IDs)
         * 
         * @todo id or uuid?
         */
        vertexData.out = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        item.vertexData = new foundry.data.fields.SchemaField(vertexData);

        return item;
    }
}

