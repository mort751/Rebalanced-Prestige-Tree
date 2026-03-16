addLayer("p",{
    name: "gronk phonk", 
    symbol: "gp", 
    branches: [ ["g", "#ffffff"] ],
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), 
    resource: "gronk phonk", 
    baseResource: "rizz", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0, 
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
        layerShown() { return true },
    doReset(resettingLayer) {
        let keep = [];
        if (resettingLayer == "g") {
            keep.push("upgrades");
            keep.push("best");
        }
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep);
    },
        upgrades: {
            11: {
            title: "The first step up!",
            description: "1.3x rizz gain",
            cost: new Decimal(2),
            },
            12: {
            title: "labubu",
            description: "labubu is yum 1.4x rizz gain",
            cost: new Decimal(5),
            },
            13: {
            title: "labubu phonk",
            description: "get views like a good boy 1.1 multiplier for every gronk phonk",
            cost: new Decimal(10),
            effect() {
        return player[this.layer].points.add(1).pow(0.1)
        },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
            },
            14: {
            title: "streams",
            description: "multiply your rizz gain by 1.5",
            cost: new Decimal(15),
            },
            15: {
            title: "malware",
            description: "inject malware! for every gronk phonk you get a 1.2 multiplier to rizz gain",
            cost: new Decimal(25),
            effect() {
        return player[this.layer].points.add(1).pow(0.2)
        },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
            },
            26: {
            title: "skibidi slicers",
            description: "we are getting there! 1.5x multiplier",
            cost: new Decimal(50),
            },
            27: {
            title: "skibidi toliet",
            description: "skibidi toliet edits every gronk phonk is 1.32 multiplier to rizz gain",
            cost: new Decimal(100),
            effect() {
        return player[this.layer].points.add(1).pow(0.32)
        },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
            },
            28: {
            title: "skibidi toilet videos",
            description: "we are not getting through life with this one 1.67 multiplier to rizz gain",
            cost: new Decimal(300),
            },
            
        },
})

addLayer("g", {
    name: "mewing grind", 
    symbol: "mg", 
    position: 0, 
    row: 1, 
    startData() { return {
        unlocked: false, 
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#ff0000",
    requires: new Decimal(100), 
    resource: "mewing points", 
    baseResource: "gronk phonk", 
    baseAmount() { return player.p.points }, 
    type: "normal", 
    exponent: 0.5,
    gainMult() { return new Decimal(1) },
    gainExp() { return new Decimal(1) },
    layerShown() { return player.p.best.gte(100) || player.g.unlocked },
    hotkeys: [
        {key: "g", description: "G: Reset for mewing points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "mewing boost",
            description: "Double your rizz gain.",
            cost: new Decimal(10),
        },
    },
})
