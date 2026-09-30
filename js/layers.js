addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#31aeb0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
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
        {key: "p", description: "P: Reset for prestige points", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
    upgrades: {
    11: {
        title: "Begin",
        description: "Start generating points.",
        cost: new Decimal(1),
    },
    12: {
        title: "The Prestige Effect",
        description: "Prestige points boost points.",
        cost: new Decimal(1),
        effect() { 
            let eff = player.p.points.add(1).sqrt()
            return eff 
        },
        effectDisplay() { return format(this.effect()) + "x" },
        unlocked() { return hasUpgrade(this.layer, 11) }
    },
    13: {
        title: "Self Synergy",
        description: "Points boost their own production.",
        cost: new Decimal(5),
        effect() { 
            let eff = player.points.plus(1).log10().plus(1);
            return eff 
        },
        effectDisplay() { return format(this.effect()) + "x" },
        unlocked() { return hasUpgrade(this.layer, 12) }
    },
    }
})

addLayer("b", {
    name: "booster", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#6e64c4",
    requires: new Decimal(200), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 5,
    exponent: 1.25, // Prestige currency exponent
    branches: ["p"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return player.p.unlocked },
    effect() { return Decimal.pow(2, player.b.points) },
    effectDescription() { return "which are boosting point gain by " + tmp[this.layer].effect },
    upgrades: {
    }
})