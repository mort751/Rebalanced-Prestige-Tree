addLayer("w", {
    name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Droplets", // Name of prestige currency
    baseResource: "energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("w", 11)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for droplets", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades:{
        11:{
            title:"raindrops",
            description:"x2 droplet gain",
            cost: new Decimal(10),
        },
        12:{
            title:"water bucket",
            description:"x2 point gain",
            cost: new Decimal(15),
            unlocked(){return hasUpgrade(this.layer, 11)}
        },
        13:{
            title:"hose",
            description:"raindrops boost raindrop gain",
            cost: new Decimal(25),
            effect(){
            return player[this.layer].points.times(Math.log10(player[this.layer].points))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to 
        unlocked(){return hasUpgrade(this.layer, 12)}
    },
        14:{
            title:"small lake",
            description:"x2 droplet gain",
            cost:new Decimal(50),
            effect(){ return player[this.layer].points.times(2)},
            unlocked(){return hasUpgrade(this.layer, 13)}
        },
        15:{
            title:"big lake",
            description:"UNFINISHED",
            unlocked(){return hasUpgrade(this.layer, 14)}
        }
    },
    layerShown(){return true}
})
addLayer("f", {
    name: "Fire", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "sparks", // Name of prestige currency
    baseResource: "energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for sparks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades:{
        21:{
            title:"UNFINISHED",
            unlocked(){return hasUpgrade("w", 15)}
        }
    },
    layerShown(){return hasUpgrade("w",15)}
})

