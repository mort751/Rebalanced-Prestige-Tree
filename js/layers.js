// ==========================================
// LAYER 1: MINING (m)


// ==========================================
addLayer("m", {
    name: "Mining",
    symbol: "M",
    position: 0,
    row: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
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

        // Core automated resource generation loop


        let copperGen = getBuyableAmount("m", 11).times(1).times(diff);
        let ironGen = getBuyableAmount("m", 12).times(0.5).times(diff);

        let coalGen = getBuyableAmount("m", 13).times(0.3).times(diff);



        if (hasMilestone("m", 0)) {
            copperGen = copperGen.times(2);
            ironGen = ironGen.times(2);
            coalGen = coalGen.times(2);
        }

        player.copperOre = (player.copperOre || new Decimal(0)).add(copperGen);
        player.ironOre = (player.ironOre || new Decimal(0)).add(ironGen);
        player.coal = (player.coal || new Decimal(0)).add(coalGen);
    },

    buyables: {
        11: {
            cost(x) { return new Decimal(5).times(x.add(1)) },

            title: "Automated Copper Miner",
            display() { return "Generates 1 Copper Ore/sec.\nAmount: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "\nCost: " + format(this.cost()) + " Scrap" },


            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        },

        12: {
            cost(x) { return new Decimal(15).times(x.add(1).pow(1.2)) },
            title: "Automated Iron Miner",
            display() { return "Generates 0.5 Iron Ore/sec.\nAmount: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "\nCost: " + format(this.cost()) + " Scrap" },


            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        },

        13: {
            cost(x) { return new Decimal(30).times(x.add(1).pow(1.5)) },
            title: "Automated Coal Excavator",
            display() { return "Generates 0.3 Coal/sec.\nAmount: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "\nCost: " + format(this.cost()) + " Scrap" },


            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        }
    },

    milestones: {
        0: {
            requirementDescription: "5 Mining Scrap",
            effectDescription: "Overclock Miners: Doubles raw ore mining efficiency.",
            done() { return player.m.points.gte(5) }
        }
    },

    tabFormat: ["main-display", "prestige-button", "blank", "milestones", "blank", "buyables"]
});

// ==========================================
// LAYER 2: REFINING (f)
// ==========================================
addLayer("f", {
    name: "Refining",
    symbol: "F",


    position: 1,
    row: 0,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

    color: "#708090",
    resource: "Refined Matte",
    type: "normal",
    requires: new Decimal(50),
    exponent: 1.4,


    baseAmount() { return player.m.points },
    baseResource: "Mining Scrap",
    gainMult() { return new Decimal(1) },
    gainExp() { return new Decimal(1) },

    update(diff) {

        if (!player.f.unlocked) return;

        let speed = getBuyableAmount("f", 11).times(diff);

        // Copper wire production: consumes copper ore


        if ((player.copperOre || new Decimal(0)).gte(speed.times(2))) {
            player.copperOre = player.copperOre.sub(speed.times(2));
            player.copperWire = (player.copperWire || new Decimal(0)).add(speed);
        }


        // Iron bar production: consumes iron ore and coal


        if ((player.ironOre || new Decimal(0)).gte(speed.times(2)) && (player.coal || new Decimal(0)).gte(speed)) {
            player.ironOre = player.ironOre.sub(speed.times(2));
            player.coal = player.coal.sub(speed);
            player.ironBar = (player.ironBar || new Decimal(0)).add(speed);
        }
    },

    buyables: {
        11: {
            cost(x) { return new Decimal(5).times(x.add(1)) },
            title: "Basic Smelter",

            display() { return "Processes ores into wires and bars.\nAmount: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "\nCost: " + format(this.cost()) + " Matte" },


            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        }
    },

    tabFormat: ["main-display", "prestige-button", "blank", "buyables"]
});

// ==========================================
// LAYER 3: PARTS (p)
// ==========================================
addLayer("p", {
    name: "Parts",
    symbol: "P",
    position: 0,
    row: 1,


    startData() { return { unlocked: false, points: new Decimal(0) } },

    color: "#B8860B",
    resource: "Machine Components",
    type: "normal",
    requires: new Decimal(100),
    exponent: 1.3,
    baseAmount() { return player.f.points },
    baseResource: "Refined Matte",


    gainMult() { return new Decimal(1) },
    gainExp() { return new Decimal(1) },

    row: 1,
    layerShown() { return player.f.unlocked }
});

// ==========================================
// LAYER 4: FACTORY (i)
// ==========================================
addLayer("i", {
    name: "Factory",
    symbol: "I",
    position: 1,
    row: 1,


    startData() { return { unlocked: false, points: new Decimal(0) } },

    color: "#4682B4",
    resource: "Factory Infrastructure",
    type: "normal",
    requires: new Decimal(200),
    exponent: 1.3,
    baseAmount() { return player.p.points },
    baseResource: "Machine Components",


    gainMult() { return new Decimal(1) },
    gainExp() { return new Decimal(1) },

    layerShown() { return player.p.unlocked }
});

// ==========================================
// LAYER 5: REORGANIZATION (rereorg)
// ==========================================
addLayer("rereorg", {
    name: "Reorganization",
    symbol: "RE",
    position: 0,
    row: 2,


    startData() { return { unlocked: false, points: new Decimal(0) } },

    color: "#8B000D",
    resource: "Corporate Prestige",


    type: "normal",
    requires: new Decimal(500),

    exponent: 1.2,
    baseAmount() { return player.i.points },
    baseResource: "Factory Infrastructure",


    gainMult() { return new Decimal(1) },
    gainExp() { return new Decimal(1) },

    layerShown() { return player.i.unlocked }
});

// ==========================================
