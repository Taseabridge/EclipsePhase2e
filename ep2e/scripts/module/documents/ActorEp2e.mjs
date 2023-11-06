export default class ActorEp2e extends Actor {

    /**
     * 
     * @todo Remove log, or if fine grained logging control has been implemented change it for the appropriate tracing or debugging solution.
     * @inheritdoc
     */
    prepareDerivedData() {
        console.log({ message: `ActorEp2e.prepareDerivedData()`, context: this, arguments: arguments });

        // prepare derived data
        // process the items
        // lots of stuf, this is arguably one of the most important places to work on, besides further vertical exploration in order to discover stuff we need.
    }
}