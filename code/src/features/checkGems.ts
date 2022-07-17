import {IGear} from "../interfaces";

// ignore slots without enchant & OH which are no shields
// 1neck, 3shirt, 12;13trinkets, 17relic/libram, 18tabard
const ignoreSlots = [1, 3, 12, 13, 17, 18,];
const ringSlots = [10, 11];

// grau 55
// green 60
// blau 70
// epic 100

// https://de.classic.warcraftlogs.com/reports/NV98X24RykgfDT7x#boss=-2&difficulty=0&wipes=2&source=10
// bsp: 32354
const checkGems = (gears: IGear[]) => {
    console.log(' i bin hier um zu lengen');
    // if a slot does not have a gem, i need to do an additional query

};

export default checkGems;
