await Actor.create({ name: "EGR_2.71828", type: "character" });
actor = game.actors.getName("EGR_2.71828");
await Item.create({ name: "EGR_2.71828", type: "ego" });
item = game.items.getName("EGR_2.71828");
await item.update({ "system.aptitudes": { cognition: 30, intuition: 30, reflexes: 5, savvy: 5, somatics: 5, willpower: 10 } });
await actor.createEmbeddedDocuments("Item", [game.items.getName("EGR_2.71828")]);
await actor.update({ "system.ego.currentId": actor.items.find(i => i.type === "ego").id });
await Item.create({ name: "Infosec", type: "skill" });
await game.items.getName("Infosec").update({ "system.skill.aptitude": "cognition", "system.skill.categories": [...game.items.getName("Infosec").system.skill.categories, "active"] });
await actor.createEmbeddedDocuments("Item", [game.items.getName("Infosec")]);
await actor.items.find(i => i.name === "Infosec").update({ "system.skill.rank": 60 });
item = await Item.create({ name: "Infolife", type: "template" });
await item.update({ "system.changes.skills": [...item.system.changes.skills, { cname: "Infosec", description: null, value: 50 }, { cname: "Interface", description: null, value: 50 }, { cname: "Program", description: null, value: 50 }, { cname: "Research", description: null, value: 20 }, { cname: "System Administration", description: null, value: 60 }, { cname: "Computer Science", description: null, value: 30 }] });
await item.update({ "system.types": [...item.system.types, "background"] });
await actor.createEmbeddedDocuments("Item", [game.items.getName("Infolife")]);