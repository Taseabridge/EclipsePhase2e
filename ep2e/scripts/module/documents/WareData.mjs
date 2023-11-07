import GearData from "./GearData.mjs";

export default class WareData extends GearData {
    static defineSchema() {

        const gear = super.defineSchema();

        const ware = {};

        /**
         * @description Ware is a catch-all category for augmentations of different kinds: • Bioware (B) includes genetic modifications, nanosurgical tissue alterations, and implantation of bio-engineered organs. It is only available for biomorphs (including pods and uplifts). Because of its organic nature, bioware is hard to detect in scans; genetic testing or other bio-sampling is required. Use Medicine: Biotech to diagnose, implant, or repair. • Cyberware (C) is synthetic devices either implanted within a biological body or “grown” within using nanobots. It is only available for biomorphs (including pods and uplifts). Cyberware is detectable with x-ray and radar scans. It can also be hacked like other electronics. Use Medicine: Biotech to implant, Hardware: Electronics to repair the ware itself. • Hardware (H) includes add-ons to synthetic shells. It is only available for synthmorphs, bots, and vehicles. It can be hacked. Use Hardware: Robotics or an appropriate field for vehicles to install, diagnose, and repair. Many non-ware gear items can be mounted on or incorporated into a shell’s frame as hardware (GM discretion). • Meshware (M) refers to plug-in apps that enhance infomorphs. These may also be installed with cyberbrains. They are vulnerable to mesh combat. Use Program to install, diagnose, or repair. • Nanoware (N) refers to internal nanobot systems active within a body or shell. Nanoware includes an implanted hive that maintains and refreshes the nanobots. It is available for morphs of all types. Nanoware hives are detectable like cyberware, but the bots are only detectable with nanodetectors or detailed biological sampling. Nanoware can be hacked like other electronics. Use Medicine: Biotech or Hardware: Robotics to implant/repair.
         */
        ware.kinds = new foundry.data.fields.ArrayField(
            new foundry.data.fields.StringField({
            })
        );

        gear.ware = new foundry.data.fields.SchemaField(ware);

        return gear;
    }
}