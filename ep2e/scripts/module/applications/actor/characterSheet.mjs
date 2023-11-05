MyActorSheet extends ActorSheet {

    activateListers(html) {
        html.on("click", ".myButtonClass", { actor: this.actor }, this.myRollFunction);
    }
  
    async myRollFunction(event) {
        const dataset = event.currentTarget.dataset; // if your html element has something like "data-foo=bar" then it will be available as dataset.foo
        const thisActor = event.data.actor // because of the way the event handling happens you stop being able to use this to refer to the sheet class, so you pass it in that object above {actor: this.actor}
        const content = "<p>You must choose either Option 1, or Option 2</p>", // You need to figure out your dialog display here, including a possible renderTemplate
        const dialogReturn = await Dialog.wait({
            title: "Test Dialog",
            content,
            buttons: {
                one: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Option One",
                    callback: (html) => { return {} } // find and return any values and add them to that inner {}
                },
                two: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Option Two",
                    callback: (html) => { return {} } // in case you need alternative roll modes, like dnd5e's advantage
                }
            },
            default: "two",
            render: html => console.log("Register interactivity in the rendered dialog"),
            close: html => console.log("This always is logged no matter which option is chosen")
        });
        const myRoll = new Roll() // assemble a roll using that dialogReturn
        myRoll.toMessage()
    }
}