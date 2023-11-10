export default class ActorEp2e extends Actor {

    /**
     * 
     * @todo Remove log, or if fine grained logging control has been implemented change it for the appropriate tracing or debugging solution.
     * @inheritdoc
     */
    prepareDerivedData() {
        console.log({ message: `ActorEp2e.prepareDerivedData()`, context: this, arguments: arguments });

        const actor = this;

        // put current ego into the ego property
        actor.system.ego.ego = actor.items.get(actor.system.ego.currentId);

        // put cuerrent morph into the morph property
        actor.system.morph.current = actor.items.get(actor.system.morph.currentId);

        // prepare derived data
        actor.system.initiative = Math.round((actor.system.ego.current?.system?.aptitudes.intuition + actor.system.ego.current?.system?.aptitudes.reflexes) / 5);
        actor.system.durability = actor.system.morph?.current?.system.durability ?? 0;
        actor.system.woundThreshold = Math.round((actor.system.durability ?? 0) / 5);

        // process the items
        // lots of stuf, this is arguably one of the most important places to work on, besides further vertical exploration in order to discover stuff we need.

    }
}