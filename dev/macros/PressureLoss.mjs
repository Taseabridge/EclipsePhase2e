/**
 * Calculates remaining atmospheric pressure (atm).
 * @param {number} p0 - Initial pressure in atmospheres (Standard = 1.0).
 * @param {number} volume - Volume of the compartment in cubic meters.
 * @param {number} holeArea - Size of the breach in square meters.
 * @param {number} timeSeconds - Time elapsed since the breach.
 * @param {number} layoutComplexity - Flow resistance (1.0 = open hall, 0.2 = dense machinery).
 * @returns {number} - The remaining pressure in atmospheres.
 */
function calculateAtmosphericLoss(p0, volume, holeArea, timeSeconds, layoutComplexity = 1.0) {
    // Physical Constants for Air
    const gamma = 1.4;   // Heat capacity ratio
    const R = 8.314;     // Gas constant (J/mol·K)
    const T = 293.15;    // Temp in Kelvin (20°C)
    const M = 0.02897;   // Molar mass of air (kg/mol)
    const Cd = 0.65;     // Discharge coefficient

    // 1. Calculate the Sonic Velocity of air (m/s)
    const a = Math.sqrt((gamma * R * T) / M);

    // 2. Choked Flow Correction Factor
    // This accounts for the maximum rate gas can escape through an orifice into vacuum
    const chokedFactor = Math.pow(2 / (gamma + 1), (gamma + 1) / (2 * (gamma - 1)));

    // 3. The Decay Constant (Lambda)
    // units: 1/seconds
    const effectiveArea = holeArea * layoutComplexity;
    const lambda = (effectiveArea * Cd * a * chokedFactor) / volume;

    // 4. Exponential Decay
    const pt = p0 * Math.exp(-lambda * timeSeconds);

    return Math.max(0, pt);
}

// --- EXAMPLE USAGE ---

// A ship compartment (50m3) with 1 atm pressure.
// A bullet hole (0.0005 m2) opens up. 
// How much air is left after 2 minutes (120s)?
const pInitial = 1.0;
const vol = 20 * 20 * 100;
const hole = 4;
const time = 120;
const complexity = 0.7; // Moderate amount of furniture/gear

const pFinal = calculateAtmosphericLoss(pInitial, vol, hole, time, complexity);

console.log(`
    1.0 atm: Standard sea-level pressure.
    0.50 atm: "Hypoxia Alert." Equivalent to the top of Mt. Everest. Humans need oxygen masks to stay conscious.
    0.30 atm: "Critical Limit." Rapid loss of consciousness; death follows shortly without intervention.
    0.06 atm: "The Armstrong Limit." Blood and bodily fluids begin to boil at body temperature. Death is immediate.
    `);

console.log(`Initial Pressure: ${pInitial} atm`);
console.log(`Pressure after ${time}s: ${pFinal.toFixed(4)} atm`);
console.log();