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
    async displayCard() { // maybe we want to do it as in dnd5e and be able to chain options, though then where do we merge how, options = {}

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

