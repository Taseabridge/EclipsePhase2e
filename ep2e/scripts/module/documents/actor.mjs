// @ts-check

/**
 * 
 * 
 */
// @ts-ignore
export default class ActorEp2e extends Actor {

    constructor(options = {}) {
        super(options);

        //this.morphSleeved = null;
    }

    /**
     * 
     * @returns {object} the armor.
     */
    get armor() {
        return { e: 0, k: 0, items: [] };
    }

    /**
     * 
     * @returns {object} Ego.
     */
    get ego() {
        return this.ego;
    }

    /**
     * 
     * @returns {Array} Array of Morph, empty Array if not having any.
     */
    get morphs() {
        return this.morphs;
    }

    /**
     * 
     * @returns {Array} Array of Movements, empty Array if there are none.
     */
    get movement() {
        return this.movement;
    }

    /**
     * 
     * @param {object} morph Morph to be sleeved.
     */
    set morphSleeved(morph) {
        //   this.morphSleeved = morph;
    }
}