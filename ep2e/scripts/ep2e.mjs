import ActorSheetEp2e from "./module/applications/actor/ActorSheetEp2e.mjs";
import ActorEp2e from "./module/documents/ActorEp2e.mjs";
import CharacterData from "./module/documents/CharacterData.mjs";
import EgoData from "./module/documents/EgoData.mjs";
import GearData from "./module/documents/GearData.mjs";
import ItemEp2e from "./module/documents/ItemEp2e.mjs";
import MorphData from "./module/documents/MorphData.mjs";
import SkillData from "./module/documents/SkillData.mjs";
import WareData from "./module/documents/WareData.mjs";

var start_time = performance.now();
const SYSTEM_NAME = "ep2e";
console.log(`${SYSTEM_NAME} loading`);

class TRUtils {

    /**
    * 
    * @returns {boolean} true if debugging is enabled, false otherwise.
    */
    static isDebugEnabled() {
        return (game.settings.get(SYSTEM_NAME, "logLevel") >= 3);
    }

    static registerSettings() {
        game.settings.register(SYSTEM_NAME, 'isEnabled', {
            name: "Enable Tablerules",
            hint: "Enables Tablerules Module changes. If we ever implement this disabling this setting will make all other Tablerules settings be ignored and return the stuff that has settings configured return to what it is without the Module. This has no effect as of now, and might just get removed instead of being implemented in the future.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "whispersIncludeGM", {
            name: "Whispers, add GM",
            hint: "adds the GM to all whispered chat messages",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "modifyDefaultVolumes", {
            name: "Modify Default Volumes",
            hint: "modified the core default volumes, if enabled the Module checks the current settings and adjusts them to the configured below values if they are at assumed core default values.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "globalPlaylistVolume", {
            name: "globalPlaylistVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "globalAmbientVolume", {
            name: "globalAmbientVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "globalInterfaceVolume", {
            name: "globalInterfaceVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "modifyChatBubbles", {
            name: "modify the default for Chat Bubbles",
            hint: "modifies the default for Chat Bubbles. Users can still overwrite this changed default.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "chatBubbles", {
            name: "chatBubbles default overwrite",
            hint: "if Modify Chat Bubbles is enabled, overwrite the default setting for displaying chat Bubbles",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "chatBubblesPan", {
            name: "chatBubbles Pan default overwrite",
            hint: "if Modify Chat Bubbles is enabled, overwrite the default setting for displaying chat Bubbles",
            scope: "world",
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, "logLevel", {
            name: "Log Level",
            hint: "The Module's own log level. By default FVTT and the module don't log debug and info. Set to error for normal operation and debug for development.",
            scope: 'world',
            config: true,
            default: "error",
            type: Number,
            choices: {
                0: "error",
                1: "warning",
                2: "info",
                3: "debug"
            },
            requiresReload: true
        });

        game.settings.register(SYSTEM_NAME, 'logOwn', {
            name: "Use own logging function.",
            hint: "Enable to log using own logging method. Disable for play and enable for development if debugging (with Log Level set to debug above).",
            scope: 'world',
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });
    }
}

class Tablerules {

    static config = {
        loglevel: 0,
        logOwn: false
    }

    static log(level, message) {
        let levelstring;

        switch (level) {
            case 0:
                levelstring = "ERROR";
                break;
            case 1:
                levelstring = "WARNING";
                break;
            case 2:
                levelstring = "INFO";
                break;
            case 3:
                levelstring = "DEBUG";
                break;
            default:
                console.error("No logging level set.");
                console.error(message);
        }

        if (typeof message === "object") {
            console.log(message);
        } else {
            console.log({ message: "Tablerules | " + levelstring + ":" + message, obj: typeof message === "object" ? message : null });
        }
    }

    static debug(message) {
        if (Tablerules.config.loglevel < 3)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(3, message);
        } else {
            console.debug(message);
        }
    }

    static error(message) {
        if (Tablerules.config.logOwn) {
            Tablerules.log(0, message);
        } else {
            console.error(message);
        }
    }

    static warn(message) {
        if (Tablerules.config.loglevel < 1)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(1, message);
        } else {
            console.warn(message);
        }
    }

    static info(message) {
        if (Tablerules.config.loglevel < 2)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(2, message);
        } else {
            console.info(message);
        }
    }
}


Hooks.once("init", () => {

    TRUtils.registerSettings();

    CONFIG.Actor.documentClass = ActorEp2e;
    CONFIG.Actor.dataModels.character = CharacterData

    CONFIG.Item.documentClass = ItemEp2e;
    CONFIG.Item.dataModels.gear = GearData;
    CONFIG.Item.dataModels.morph = MorphData;
    CONFIG.Item.dataModels.ego = EgoData;
    CONFIG.Item.dataModels.skill = SkillData;
    CONFIG.Item.dataModels.ware = WareData;

    Actors.registerSheet(SYSTEM_NAME, ActorSheetEp2e, {
        types: ["character"],
        makeDefault: true,
        label: "ep2e Character Sheet"
    });
});

Hooks.on("preCreateChatMessage", (messageDoc, rawMessageData, context, userId) => {

    if (!game.settings.get(SYSTEM_NAME, "whispersIncludeGM") || !game.settings.get(SYSTEM_NAME, "isEnabled")) {
        return;
    }

    const gmWhisperIds = ChatMessage.getWhisperRecipients("gm").map(i => i.id) // get all gm ids in the world
    let whisperArray = duplicate(messageDoc.whisper) // Copy our array out
    if (whisperArray.length === 0) return // Not a whisper if there's no whisper ids


    for (let gmId of gmWhisperIds) {// Push each gm id into the array of whisper ids
        if (gmId === game.user.id) continue // You never include yourself in the whisper so this would erronously add yourself causing the "we changed the array! trigger later on"
        if (!whisperArray.includes(gmId)) {
            whisperArray.push(gmId)
        }
    }

    if (whisperArray.length !== messageDoc.whisper.length) { //only modify if needed
        let userListString = ""
        for (let userId of messageDoc.whisper) {
            userListString = userListString + game.users.get(userId).name + ", "
        }
        userListString = userListString.slice(0, -2)

        messageDoc.updateSource({
            content: `${messageDoc.content}`,//<br>Original Whisper Recipients: ${userListString}`,
            whisper: whisperArray
        })
    }
});

Hooks.on("ready", function () {
    Tablerules.config.loglevel = game.settings.get(SYSTEM_NAME, "logLevel");
    Tablerules.config.logOwn = game.settings.get(SYSTEM_NAME, "logOwn");

    if (game.settings.get(SYSTEM_NAME, "modifyDefaultVolumes")) {
        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalPlaylistVolume").value.default === game.settings.get("core", "globalPlaylistVolume")) {
            game.settings.set("core", "globalPlaylistVolume", game.user.flags?.world?.globalPlaylistVolume ?? game.settings.get(SYSTEM_NAME, "globalPlaylistVolume"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalAmbientVolume").value.default === game.settings.get("core", "globalAmbientVolume")) {
            game.settings.set("core", "globalAmbientVolume", game.user.flags?.world?.globalAmbientVolume ?? game.settings.get(SYSTEM_NAME, "globalAmbientVolume"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalInterfaceVolume").value.default === game.settings.get("core", "globalInterfaceVolume")) {
            game.settings.set("core", "globalInterfaceVolume", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(SYSTEM_NAME, "globalInterfaceVolume"));
        }

        ui.sidebar.tabs.playlists.render();
    }

    if (game.settings.get(SYSTEM_NAME, "modifyChatBubbles")) {
        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.chatBubbles").value.default === game.settings.get("core", "chatBubbles")) {
            game.settings.set("core", "chatBubbles", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(SYSTEM_NAME, "chatBubbles"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.chatBubblesPan").value.default === game.settings.get("core", "chatBubblesPan")) {
            game.settings.set("core", "chatBubblesPan", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(SYSTEM_NAME, "chatBubblesPan"));
        }
    }
});



console.log(`${SYSTEM_NAME} loaded`);
console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);
