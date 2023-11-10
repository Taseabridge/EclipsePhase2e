/**
 * Eclipse Phase 2nd Edition base ActorData to be extended for specific types of Actor if needed.
 */
export default class ActorData extends foundry.abstract.DataModel {
    static defineSchema() {

        const actor = {};

        /**
        * For display and stuff, Macros at most. Use id or uuid for everything where there is not a damn good (to be documented) reason to do otherwise.
        */
        actor.name = new foundry.data.fields.StringField();

        /**
         * This is meant to become the rich description with the HTML Editor included like in dnd5e items enabling all kinds of unforseen uses, too, as it is unstructured, though sanitized data with which we can get creative as users. Must therefore never be used for technical control.
         */
        actor.description = new foundry.data.fields.HTMLField();

        /**
         * Seemingly we are building our own (not enforced) type system. So everything needs to be typed in order to have the logic be different for the differend kinds (types) of things, concepts, ...
         * 
         * @todo There should be verification based on a list of values acceptable (known). The validation methods from the API might be able to help with this. Where does the list go, no matter if we have to write the validation ourselves or not?
         */
        actor.types = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        const ego = {};
        /**
         * The Ego currently controlling the Actor. Normally the one Ego like for a player character most of the time. Occassionally used for replacing that Ego, like when puppeteering.
         * 
         * ego.current will be the reference to the Item type ego with that id on this Actor's items EmbeddedCollection.
         */
        ego.currentId = new foundry.data.fields.StringField();
        actor.ego = new foundry.data.fields.SchemaField(ego);

        const morph = {};
        morph.morphs = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );
        morph.currentId = new foundry.data.fields.StringField({
        });
        actor.morph = new foundry.data.fields.SchemaField(morph);


        return actor;
    }
}