addLayer("ach", {

    name: "Achievements",

    symbol: "🏆",

    position: 0,

    startData() { return {

    unlocked: true,

    points: new Decimal("0"),

    }},

    color: "#FFD700",

    resource: "Achievements Earned",

    type: "none",


    globalBonus() {

    let count = player.ach.achievements.length;

    return new Decimal("1").add(new Decimal("0.02").times(count));

    },


    achievements: {

    // --- ROW 1: THE MANUAL ERA (Week 1 Early) ---

    11: {

    name: "Blistering Palms",

    done() { return player.points.gte(new Decimal("1")) },

    tooltip: "Click to generate your very first Factory Point. (+2% production speed globally)",

    },

    12: {

    name: "Dirt Under The Nails",

    done() { return player.copperOre.add(player.ironOre).gte(new Decimal("10")) },

    tooltip: "Manually extract a total of 10 raw ores.",

    },

    13: {

    name: "Digging Deeper",

    done() { return getBuyableAmount("m", 11).gte(new Decimal("1")) },

    tooltip: "Construct your first Basic Miner to begin automation.",

    },

    14: {

    name: "Coal Miner's Daughter",

    done() { return player.coal.gte(new Decimal("25")) },

    tooltip: "Amass a small stockpile of 25 Coal chunks.",

    },

    15: {

    name: "Heavy Machinery",

    done() { return getBuyableAmount("m", 12).gte(new Decimal("5")) },

    tooltip: "Own 5 Heavy Drills simultaneously.",

    },


    // --- ROW 2: INDUSTRIAL REFINERY (Week 1 Mid) ---

    21: {

    name: "Playing With Fire",

    done() { return player.r.unlocked },

    tooltip: "Unlock the Refining Layer.",

    },

    22: {

    name: "Wire Weaver",

    done() { return player.copperWire.gte(new Decimal("50")) },

    tooltip: "Spin 50 units of Copper Wire.",

    },

    23: {

    name: "Heavy Metal",

    done() { return player.ironBar.gte(new Decimal("50")) },

    tooltip: "Smelt 50 solid Iron Bars.",

    },

    24: {

    name: "Blast Furnace Blast",

    done() { return getBuyableAmount("r", 11).gte(new Decimal("5")) },

    tooltip: "Own 5 Basic Smelters to streamline raw conversions.",

    },

    25: {

    name: "Purification Protocols",

    done() { return player.r.points.gte(new Decimal("10")) },

    tooltip: "Accumulate 10 total Refining Matter tokens.",

    },


    // --- ROW 3: COMPONENT ENGINEERING (Week 2 Early) ---

    31: {

    name: "The First Blueprint",

    done() { return player.p.unlocked },

    tooltip: "Unlock the Parts Layer.",

    },

    32: {

    name: "Spurred to Action",

    done() { return player.gear.gte(new Decimal("20")) },

    tooltip: "Craft 20 mechanical Gears.",

    },

    33: {

    name: "Silicon Valley",

    done() { return player.electronicBoard.gte(new Decimal("20")) },

    tooltip: "Solder together 20 Electronic Boards.",

    },

    34: {

    name: "Assembly Lineup",

    done() { return getBuyableAmount("p", 11).gte(new Decimal("10")) },

    tooltip: "Own 10 Basic Assemblers working in lockstep.",

    },

    35: {

    name: "Component Kingpin",

    done() { return player.p.points.gte(new Decimal("50")) },

    tooltip: "Acquire 50 Component Blueprints.",

    },


    // --- ROW 4: FACTORY EXPANSION (Week 2 Mid) ---

    41: {

    name: "Urban Development",

    done() { return player.points.gte(new Decimal("1000")) },

    tooltip: "Reach 1,000 baseline Factory Points.",

    },

    42: {

    name: "Smokestack Horizon",

    done() { return player.m.points.gte(new Decimal("500")) && player.r.points.gte(new Decimal("500")) },

    tooltip: "Possess 500 Mining Scrap and 500 Refining Matter simultaneously.",

    },

    43: {

    name: "Perfect Synchronicity",

    done() { return player.gear.gte(new Decimal("100")) && player.electronicBoard.gte(new Decimal("100")) },

    tooltip: "Stockpile 100 Gears and 100 Electronic Boards at the same time.",

    },

    44: {

    name: "Maxed Efficiency",

    done() { return hasMilestone('m', 0) && hasMilestone('r', 0) },

    tooltip: "Unlock both the Mining and Refining basic tier milestones.",

    },

    45: {

    name: "Mass Production",

    done() { return player.points.gte(new Decimal("10000")) },

    tooltip: "Reach 10,000 baseline Factory Points.",

    },


    // --- ROW 5: LOGISTICS & DISTRIBUTION (Week 3 Early) ---

    51: {

    name: "Supply Chain Management",

    done() { return player.l.unlocked },

    tooltip: "Unlock the Logistics Layer to map physical sorting grids.",

    },

    52: {

    name: "Supersonic Delivery",

    done() { return hasUpgrade('l', 11) },

    tooltip: "Purchase the High-Speed Conveyor Belts upgrade.",

    },

    53: {

    name: "Power Grid Saturation",

    done() { return player.l.points.gte(new Decimal("25")) },

    tooltip: "Generate 25 Logistics Power tokens.",

    },

    54: {

    name: "Overflowing Warehouses",

    done() { return player.copperOre.gte(new Decimal("10000")) && player.ironOre.gte(new Decimal("10000")) },

    tooltip: "Hoard 10,000 Copper Ore and 10,000 Iron Ore simultaneously.",

    },

    55: {

    name: "Uninterrupted Workflow",

    done() { return hasMilestone('l', 0) },

    tooltip: "Unlock the Smart Routing milestone for persistent simulation paths.",

    },


    // --- ROW 6: CORPORATE REORGANIZATION (Week 3 Mid) ---

    61: {

    name: "The Pivot",

    done() { return player.reorg.unlocked },

    tooltip: "Unlock the Reorganization prestige layer.",

    },

    62: {

    name: "Boardroom Shakeup",

    done() { return player.reorg.points.gte(new Decimal("1")) },

    tooltip: "Perform your first Reorganization structural wipe.",

    },

    63: {

    name: "Persistent Infrastructure",

    done() { return hasMilestone('reorg', 0) },

    tooltip: "Earn your first Reorganization milestone.",

    },

    64: {

    name: "Capital Accumulator",

    done() { return player.reorg.points.gte(new Decimal("50")) },

    tooltip: "Amass 50 total Corporate Reorganization Tokens.",

    },

    65: {

    name: "Efficient Downsizing",

    done() { return player.points.gte(new Decimal("1000000")) },

    tooltip: "Reach 1,000,000 baseline Factory Points before resetting.",

    },


    // --- ROW 7: THE INCUBATION PERIOD (Week 3 Late) ---

    71: {

    name: "Fully Automatic",

    done() { return getBuyableAmount("m", 11).gte(new Decimal("50")) && getBuyableAmount("r", 11).gte(new Decimal("50")) },

    tooltip: "Possess 50 Miners and 50 Smelters at once.",

    },

    72: {

    name: "Hyper-threaded Crafter",

    done() { return getBuyableAmount("p", 11).gte(new Decimal("40")) },

    tooltip: "Construct 40 parallel Basic Assembler processing blocks.",

    },

    73: {

    name: "Grid Lockdown",

    done() { return player.l.points.gte(new Decimal("500")) },

    tooltip: "Scale your internal engine infrastructure to 500 Logistics Power.",

    },

    74: {

    name: "Trillionaire Club",

    done() { return player.points.gte(new Decimal("1e12")) },

    tooltip: "Exceed 1,000,000,000,000 (1 Trillion) Factory Points.",

    },

    75: {

    name: "Institutional Authority",

    done() { return player.reorg.points.gte(new Decimal("1000")) },

    tooltip: "Possess 1,000 permanent Corporate Reorganization Tokens.",

    },


    // --- ROW 8: MEGACORPORATE MERGER (Week 4 Early) ---

    81: {

    name: "The Monopoly Begins",

    done() { return player.megacorp.unlocked },

    tooltip: "Unlock the final Ultra-Prestige Megacorp layer.",

    },

    82: {

    name: "IPOs and Dividends",

    done() { return player.megacorp.points.gte(new Decimal("1")) },

    tooltip: "Secure your first Corporate Share via macro reset.",

    },

    83: {

    name: "Global Hostile Takeover",

    done() { return hasUpgrade('megacorp', 11) },

    tooltip: "Purchase Global Supply Domination to step into automated infinity.",

    },

    84: {

    name: "Market Valuation Explodes",

    done() { return player.megacorp.points.gte(new Decimal("100")) },

    tooltip: "Own 100 Corporate Shares.",

    },

    85: {

    name: "Quadrillionaire Conglomerate",

    done() { return player.points.gte(new Decimal("1e15")) },

    tooltip: "Surpass 1 Quadrillion total Factory Points.",

    },


    // --- ROW 9: UNIVERSAL DOMINATION (Week 4 Endgame) ---

    91: {

    name: "Interstellar Shipping",

    done() { return player.l.points.gte(new Decimal("1e6")) },

    tooltip: "Expand your distribution network to 1,000,000 Logistics Power.",

    },

    92: {

    name: "Automation Singularity",

    done() { return player.points.gte(new Decimal("1e30")) },

    tooltip: "Reach 1 Nonillion (1e30) Factory Points.",

    },

    93: {

    name: "The Multi-Planetary Chain",

    done() { return player.megacorp.points.gte(new Decimal("10000")) },

    tooltip: "Amass a sprawling portfolio of 10,000 Corporate Shares.",

    },

    94: {

    name: "End of the Road",

    done() { return player.points.gte(new Decimal("1e50")) },

    tooltip: "Push production pipelines to 1e50 Factory Points.",

    },

    95: {

    name: "Universal Overlord",

    done() { return player.points.gte(new Decimal("1e100")) },

    tooltip: "Hit 1 Googol (1e100) Factory Points. You have optimized the cosmos.",

    },

    },

    tabFormat: [

    ["display-text", function() { return `Total Global Production Speed Bonus: <b>x${format(tmp.ach.globalBonus)}</b> (Based on +2% per achievement)` }],

    "blank",

    "achievements"

    ]

    });