/**
 * The Eclipse Phase 2nd Edition Item class. Assuming we stick with there only being one. Delegation is still a valid option though.
 * 
 * @todo figure out how to, in a somewhat nice to maintain manner, separate the differences in behavior for the different kinds (types) of Item.
 */
export default class ItemEp2e extends Item {

    /**
     * Create a ChatMessage with the item's description (its description and maybe some state or configuration data).
     * 
     * @param {*} options 
     */
    async displayCard(options = {}) {

        let item = this;

        ChatMessage.create({ content: item.name });
    }

    /**
     * To be called int order to use the Item. Might or might not be a roll.
     * 
     * @param {*} config 
     * @param {*} options 
     */
    async use(config = {}, options = {}) {

        let item = this;
    }
}

