const help_data = "Welcome to Factory Clicker!";


// ==========================================

// ⛏️ LAYER 1: MINING (m) - WEEK 1 EARLY

// ==========================================

addLayer("m", {

name: "Mining",

symbol: "M",

position: 0,

row: 0,

startData() { return {

unlocked: true,

points: new Decimal(0),

}},

color: "#A0522D",

resource: "Mining Scrap", 

type: "normal",

requires: new Decimal(10),

exponent: 1.5,

baseAmount() { return player.points },

baseResource: "Factory Points",

gainMult() { return new Decimal(1) },

gainExp() { return new Decimal(1) },

update(diff) {

let copperGen = getBuyableAmount("m", 11).times(1).times(diff);

let ironGen = getBuyableAmount("m", 12).times(0.5).times(diff);

let coalGen = getBuyableAmount("m", 12).times(0.3).times(diff);


if (hasMilestone('m', 0)) {

copperGen = copperGen.times(2);

ironGen = ironGen.times(2);

coalGen = coalGen.times(2);

}


player.copperOre = (player.copperOre || new Decimal(0)).add(copperGen);

player.ironOre = (player.ironOre || new Decimal(0)).add(ironGen);

player.coal = (player.coal || new Decimal(0)).add(coalGen);

},


clickables: {

11: {

title: "Manual Pickaxe Strike",

display: "Click to manually gather raw Ores.",

canClick() { return true },

onClick() {

let clickPower = hasUpgrade('m', 11) ? 5 : 1;

player.copperOre = (player.copperOre || new Decimal(0)).add(clickPower);

player.ironOre = (player.ironOre || new Decimal(0)).add(Decimal.floor(clickPower / 2));

player.coal = (player.coal || new Decimal(0)).add(Decimal.floor(clickPower / 3));

}

}

},


buyables: {

11: {

cost(x) { return new Decimal(10).pow(x.add(1)) },

title: "Basic Miner",

display() { return `Automates Copper.\nAmount: ${format(getBuyableAmount(this.layer, this.id))}\nCost: ${format(this.cost())} Scrap` },

canAfford() { return player[this.layer].points.gte(this.cost()) },

buy() {

player[this.layer].points = player[this.layer].points.sub(this.cost())

setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

},

},

12: {

cost(x) { return new Decimal(50).pow(x.add(1)) },

title: "Heavy Drill",

display() { return `Automates Iron/Coal.\nAmount: ${format(getBuyableAmount(this.layer, this.id))}\nCost: ${format(this.cost())} Scrap` },

canAfford() { return player[this.layer].points.gte(this.cost()) },

buy() {

player[this.layer].points = player[this.layer].points.sub(this.cost())

setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

},

}

},


upgrades: {

11: {

title: "Hardened Carbon Steel Tips",

description: "Increases manual pickaxe efficacy by +400%.",

cost: new Decimal(50),

}

},


milestones: {

0: {

requirementDescription: "10 Mining Scrap",

effectDescription: "Auto-Mine: Doubles base production of all basic miners.",

done() { return player.m.points.gte(10) }

}

},

tabFormat: [

"main-display",

"prestige-button",

"blank",

"clickables",

"blank",

["display-text", function() { return `Stored Copper Ore: ${format(player.copperOre || 0)} | Iron Ore: ${format(player.ironOre || 0)} | Coal: ${format(player.coal || 0)}` }],

"blank",

"buyables", "upgrades", "milestones"

]

});


// ==========================================

// 🔥 LAYER 2: REFINING (r) - WEEK 1 LATE

// ==========================================

addLayer("r", {

name: "Refining",

symbol: "R",

position: 1,

row: 0,

startData() { return {

unlocked: false,

points: new Decimal(0),

}},

color: "#FF4500",

resource: "Refining Matter",

type: "normal",

requires: new Decimal(500),

exponent: 1.6,

baseAmount() { return player.m.points },

baseResource: "Mining Scrap",

gainMult() { return new Decimal(1) },

gainExp() { return new Decimal(1) },


update(diff) {

let smelters = getBuyableAmount("r", 11);

if (smelters.gt(0)) {

let speed = smelters.times(diff);

if ((player.copperOre || new Decimal(0)).gte(speed.times(2))) {

player.copperOre = player.copperOre.sub(speed.times(2));

player.copperWire = (player.copperWire || new Decimal(0)).add(speed);

}

if ((player.ironOre || new Decimal(0)).gte(speed.times(2)) && (player.coal || new Decimal(0)).gte(speed)) {

player.ironOre = player.ironOre.sub(speed.times(2));

player.coal = player.coal.sub(speed);

player.ironBar = (player.ironBar || new Decimal(0)).add(speed);

}

}

},


buyables: {

11: {

cost(x) { return new Decimal(5).times(x.add(1)) },

title: "Basic Smelter",

display() { return `Automates Ore conversion.\nAmount: ${format(getBuyableAmount(this.layer, this.id))}\nCost: ${format(this.cost())} Refining Matter` },

canAfford() { return player[this.layer].points.gte(this.cost()) },

buy() {

player[this.layer].points = player[this.layer].points.sub(this.cost())

setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

},

}

},


milestones: {

0: {

requirementDescription: "5 Refining Matter",

effectDescription: "Batch Smelt: Unlocks optimization channels.",

done() { return player.r.points.gte(5) }

}

},


tabFormat: ["main-display", "prestige-button", "blank", "upgrades"]

})