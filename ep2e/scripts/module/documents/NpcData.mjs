import ActorData from "./ActorData.mjs";

/**
 * NPC/Threats (pg. 376ff)
 */
export default class NpcData extends ActorData {
    static defineSchema() {

        const npc = super.defineSchema();

        return npc;
    }

}