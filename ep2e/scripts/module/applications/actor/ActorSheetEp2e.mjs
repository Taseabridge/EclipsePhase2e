export default class ActorSheetEp2e extends ActorSheet {

    /** @override */
    get template() {
        return "systems/ep2e/templates/actor-sheet.html";
    }

    /* -------------------------------------------- */
    /*  Context Preparation                         */
    /* -------------------------------------------- */

    /** @override */
    async getData(options) {

        // The Actor's data
        const source = this.actor.toObject();


    }
}