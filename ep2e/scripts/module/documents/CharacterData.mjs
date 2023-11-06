import ActorData from "./ActorData.mjs";

export default class CharacterData extends ActorData {
    static defineSchema() {

        const character = super.defineSchema();

        return character;
    }

}