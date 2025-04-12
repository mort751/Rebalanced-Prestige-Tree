addLayer("w", {
    name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#1200FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Droplets", // Name of prestige currency
    baseResource: "energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("w", 11)) mult = mult.times(2)
        if(hasUpgrade("w", 13)) mult = mult.times(player["w"].points).pow(0.1) 
        if(hasUpgrade("w", 15)) mult = mult.times(upgradeEffect("w", 15))      
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
            title:"puddle",
            description:"x2 droplet gain",
            cost: new Decimal(5),
        },
        12:{
            title:"water bucket",
            description:"x2 point gain",
            cost: new Decimal(10),
            unlocked(){return hasUpgrade(this.layer, 11)}
        },
        13:{
            title:"water tank",
            description:"droplets boost droplets gain",
            cost: new Decimal(25),
            effect(){
            switch(player["w"].points) {
                case 0:
                  player["w"].points = player["w"].add(1)
                  break;
                case 1:  
                default:
                  return player["w"].points.times(player["w"].points).pow(0.1)
              } 
            },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to 
        unlocked(){return hasUpgrade(this.layer, 12)}
    },
        14:{
            title:"small lake",
            description:"x2 droplet gain",
            cost:new Decimal(75),
            effect(){ return player[this.layer].points.times(2)
            },
            unlocked(){return hasUpgrade(this.layer, 13)}
        },
        15:{
            title:"hydro core",
            description:"droplets boost droplet gain (again)",
            cost:new Decimal(200),
            effect(){return player.points.times(player[this.layer].points).div(2).pow(0.01)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){return hasUpgrade(this.layer, 14)}
        }
    },
    buyables: {
        16: {
            title:"water pump",
            cost(x) { return new Decimal(1000).mul(x) },
            display() { return format(upgradeEffect(this.layer, this.id))+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){return player.points.times(x).div(2).pow(0.02)},
            effectDisplay() { return format(this.effect)+"x" },
            unlocked(){return hasUpgrade(this.layer, 15)}
        },
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
    color: "#4B0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "sparks", // Name of prestige currency
    baseResource: "energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
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
            title:"lighter",
            description:"1.5x point gain",
            cost: new Decimal(10),
            unlocked(){return hasUpgrade("w", 15)}
        }
    },
    layerShown(){return hasUpgrade("w",15)}
})

