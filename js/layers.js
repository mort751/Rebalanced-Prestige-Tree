addLayer("s", {
    name: "Stars",
    symbol: "⭐",
    position: 0,

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },

    color: "#FFD700",

    resource: "Stars",

    baseResource: "Stars",

    baseAmount() {
        return player.points
    },

    type: "none",

    requires: new Decimal(10),

    gainMult() {
        let mult = new Decimal(1)

        if (hasUpgrade("s", 11))
            mult = mult.times(2)

        return mult
    },

    upgrades: {
        11: {
            title: "Bigger Stars",
            description: "Double your Star gain.",
            cost: new Decimal(10)
        }
    }
})

upgrades: {
    11: {
        title: "Bigger Stars",
        description: "Double your Star gain.",
        cost: new Decimal(10)
    }
}
12: {
    title: "Star Factory",
    description: "Triple your Star gain.",
    cost: new Decimal(100)
}
gainMult() {
    let mult = new Decimal(1)

    if (hasUpgrade("s", 11))
        mult = mult.times(2)

    if (hasUpgrade("s", 12))
        mult = mult.times(3)

    return mult
}
