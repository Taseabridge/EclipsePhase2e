import ItemData from "./ItemData.mjs";

/**
 * @todo ActiveEffects, probably on ItemData
 */
export default class GearData extends ItemData {

    static defineSchema() {

        const item = super.defineSchema();

        const gear = {};

        /**
         * Gear Point value.
         */
        gear.gp = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        /**
         * Gear Complexity.
         * 
         * @todo make sure it can only be one of the rules defined ones.
         */
        gear.complexity = new foundry.data.fields.StringField({
            required: true,
            initial: ""
        });

        /**
         * @description To hide an object from others, use Infiltrate or Exotic Skill: Sleight of Hand skill. This is opposed by Perceive. Objects with the Concealable trait add a +30 modifier. If the searcher is conducting a thorough physical search, treat as a task action and apply a modifier if they take extra time ▶32. (pg. 311)
         */
        gear.concealable = new foundry.data.fields.BooleanField({
            required: true,
            initial: false
        });

        const quality = {};

        /**
         * The value of the bonus granted or malus imposed (pg. 311).
         */
        quality.quality = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });

        /**
         * Description how the quality of this item differs from normal.
         */
        quality.description = new foundry.data.fields.HTMLField();

        gear.quality = new foundry.data.fields.SchemaField(quality);


        /**
         * @description Most technology is wirelessly meshed with other devices around it (The Mesh ▶240). They contain a miniaturized computer, a wireless transceiver, and possibly laser or microwave links and/or various sensors. They can be tracked via the mesh ▶256, and are vulnerable to hacking and intrusion attempts, though protected by their firewall ▶260 and device ALI ▶250. For privacy and security, most people slave their carried and worn devices that make up their personal area network (PAN) to their mesh inserts or ecto (Slaved Devices ▶241). The Radio and Sensor Ranges table notes what range these devices operate at. (pg. 311)
         */
        const mesh = {};
        mesh.isMeshed = new foundry.data.fields.BooleanField({
            required: true,
            initial: true
        });
        mesh.radio = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });
        mesh.sensor = new foundry.data.fields.NumberField({
            required: true,
            initial: 0,
            integer: true
        });
        gear.mesh = new foundry.data.fields.SchemaField(mesh);


        item.gear = new foundry.data.fields.SchemaField(gear);

        return item;
    }
}

