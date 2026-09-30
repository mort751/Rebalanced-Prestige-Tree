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
        if (hasAchievement("a", 14)) mult = mult.times(1.2);
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
    color: "#415a9e",
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
    effectDescription() { return "which are boosting point generation by " + format(tmp[this.layer].effect) + "x" },
    upgrades: {
    }
})

addLayer("g", {
    name: "generator", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        power: new Decimal(0),
    }},
    color: "#409c6e",
    requires: new Decimal(200), // Can be a function that takes requirement increases into account
    resource: "generators", // Name of prestige currency
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
        {key: "g", description: "G: Reset for generators", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return player.p.unlocked },
    powerGen() {
        let rate = player[this.layer].points
        return rate
    },
    effectDescription() { return "which are generating " + format(tmp[this.layer].powerGen) + " generator power/sec" },
    update(diff) {
        player[this.layer].power = player[this.layer].power.add(tmp[this.layer].powerGen.mul(diff))
    },
    effect() {
        let eff = player[this.layer].power.add(1).pow(1/3)
        return eff
    },
    tabFormat: [
        "main-display",
		"prestige-button",
		"blank",
        ['display-text', function() { return "You have " + format(player.g.power) + " generator power, which is boosting point generation by " + format(tmp.g.effect) + "x"}],
		"milestones", 
        "blank", 
        "blank", 
        "upgrades"
    ],
    upgrades: {
    }
})

addLayer("a", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    componentStyles: {
    "achievement"() { return {'visibility': 'visi'} },
    },
    tabFormat: [
        "blank", 
        "blank", 
        "blank", 
        "blank", 
        "achievements"
    ],
    achievements: {
        11: {
            name: "All that progress is gone!",
            done() { return player.p.unlocked },
            tooltip: "Perform a Prestige reset.",
        },
        12: {
            name: "Point Hog",
            done() { return player.points.gte(25) },
            tooltip: "Reach 25 points.",
        },
        13: {
            name: "Prestige to the Max!",
            done() { return player.p.upgrades.length>=3 },
            tooltip: "Buy 3 Prestige upgrades.",
        },
        14: {
            name: "Prestige Squared",
            done() { return player.p.points.gte(25) },
            tooltip: "Reach 25 Prestige points.<br>Reward: Gain 20% more Prestige points.",
        },
        15: {
            name: "New Rows Await",
            done() { return player.b.unlocked || player.g.unlocked },
            tooltip: "Reach 25 Prestige points.<br>Reward: Gain 20% more Prestige points.",
        },
    }
})