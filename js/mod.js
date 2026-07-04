let modInfo = {
	name: "The Factory Incremental Tree",
	author: "mixmstr08",
	pointsName: "factory points",
	modFiles: ["layers.js", "tree.js", "achievements.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}
function firstGain(){ return new Decimal (110)}

function gainMult(){
	let mult = new DeDecimal (1)
	if (hasUpgrade('l', 11)) mult = mult.times(upgradeEffect('l', 11))
	if (hasMilestone('r', 0)) mult = mult.times(5)
	if (tmp.tmp.ach && tmp.tmp.achglobalBonus) mult = mult.times(tmp.tmp.ach.achglobalBonus)
	return mult
}
function gainEXP() { return new Decimal(1)}

function startPlayerBase(){
	return {
		copperOre: new Decimal(0),
		ironOre: new Decimal(0),
		coal: new Decimal(0),
		copperWire: new Decimal(0),
		ironBar: new Decimal(0),
		steel: new Decimal(0),
		gear: new Decimal(0),
		motor: new Decimal(0),
		electronicBoard: new Decimal(0),
	}
}

let ROW_LAYERS = [
	["m", "r"],
	["p", "l"],
	["rereorg"],
	["megacorp"]
]
// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Factory Clicker Incremental",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>vv1.0</h3><bv1
		- Added brand new layers.<br>
		- Fixed minor balancing issues.`
let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	return true
}

// Calculate points/sec!
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
	}
}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return (3600) // Default is 1 hour 
}