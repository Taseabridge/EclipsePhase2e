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

        const context = super.getData(options);

        /*
        context.actor = this.actor;
        context.source = this.actor.toObject().system;
        context.items = Array.from(this.actor.items);
        context.itemContext = {};

        context.expandedData = {};
        for (const id of this._expanded) {
            const item = this.actor.items.get(id);
            if (item) context.expandedData[id] = await item.getChatData({ secrets: this.actor.isOwner });
        }
        */

        // do ep2e stuff



        return context;
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
        //console.log({ message: `ActorSheetEp2e._onItemDelete`, event: event });
        const li = event.currentTarget.closest(".item");
        const item = this.actor.items.get(li.dataset.itemId);
        if (!item) return;

        return item.deleteDialog();
    }

    /* -------------------------------------------- */





}