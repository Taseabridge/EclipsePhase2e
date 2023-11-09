await Actor.create({ name: "EGR_2.71828", type: "character" });
await Item.create({ name: "EGR_2.71828", type: "ego" });
await game.actors.getName("EGR_2.71828").createEmbeddedDocuments("Item", [game.items.getName("EGR_2.71828")]);
await game.actors.getName("EGR_2.71828").update({ "system.ego.egos": game.actors.getName("EGR_2.71828").items.filter(i => i.type === "ego").map(i => i.id) });
await game.actors.getName("EGR_2.71828").update({ "system.ego.currentId": game.actors.getName("EGR_2.71828").system.ego.egos[0] });