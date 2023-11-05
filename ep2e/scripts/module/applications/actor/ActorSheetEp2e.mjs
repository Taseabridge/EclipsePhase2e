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
        console.log({ message: 'getData', source: source });

    }

    activateListeners(html) {
        // Editable Only Listeners
        if (this.isEditable) {
            const inputs = html.find("input");

            // Owned Item management
            html.find(".item-delete").click(this._onItemDelete.bind(this));


        }

    }

    /**
      * Handle deleting an existing Owned Item for the Actor.
      * @param {Event} event  The originating click event.
      * @returns {Promise<ItemEP2e|AdvancementManager>|undefined}  The deleted item if something was deleted or the
      *                                                          advancement manager if advancements need removing.
      * @private
      */
    async _onItemDelete(event) {
        event.preventDefault();
        const li = event.currentTarget.closest(".item");
        const item = this.actor.items.get(li.dataset.itemId);
        if (!item) return;


        return item.deleteDialog();
    }

    /* -------------------------------------------- */





}