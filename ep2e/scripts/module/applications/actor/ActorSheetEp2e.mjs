export default class ActorSheetEp2e extends ActorSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["worldbuilding", "sheet", "actor"],
            template: "systems/worldbuilding/templates/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
            scrollY: [".biography", ".items", ".attributes"],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }]
        });
    }

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