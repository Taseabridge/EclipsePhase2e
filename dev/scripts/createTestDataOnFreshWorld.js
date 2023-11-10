await Actor.create({ name: "EGR_2.71828", type: "character" });
actor = game.actors.getName("EGR_2.71828");
await Item.create({ name: "EGR_2.71828", type: "ego" });
item = game.items.getName("EGR_2.71828");
await item.update({ "system.aptitudes": { cognition: 30, intuition: 30, reflexes: 5, savvy: 5, somatics: 5, willpower: 10 } });
await actor.createEmbeddedDocuments("Item", [game.items.getName("EGR_2.71828")]);
await actor.update({ "system.ego.egos": actor.items.filter(i => i.type === "ego").map(i => i.id) });
await actor.update({ "system.ego.currentId": actor.system.ego.egos[0] });