/**
 * Simulates pressure loss across multiple connected modules.
 * @param {Array} modules - Array of objects { id: 0, volume: 100, pressure: 1.0, isLeaking: true }
 * @param {Array} connections - Array of objects { from: 0, to: 1, hatchArea: 2.0 }
 * @param {number} deltaTime - Time step for simulation (seconds)
 */
function simulateHabitatPressure(modules, connections, deltaTime = 0.1) {
    const gamma = 1.4;
    const R = 8.314;
    const T = 293.15;
    const M = 0.02897;
    const Cd = 0.65;
    const sonicVelocity = Math.sqrt((gamma * R * T) / M);
    const chokedFactor = Math.pow(2 / (gamma + 1), (gamma + 1) / (2 * (gamma - 1)));

    // 1. Calculate Leakage to Vacuum
    modules.forEach(mod => {
        if (mod.isLeaking && mod.pressure > 0) {
            // Standard orifice flow to vacuum (0 atm)
            const leakRate = (mod.holeArea * Cd * mod.pressure * sonicVelocity * chokedFactor) / mod.volume;
            mod.pressure -= leakRate * deltaTime;
        }
    });

    // 2. Calculate Internal Flow Between Modules
    connections.forEach(conn => {
        const modA = modules.find(m => m.id === conn.from);
        const modB = modules.find(m => m.id === conn.to);

        if (!modA || !modB) return;

        const pDiff = modA.pressure - modB.pressure;
        if (Math.abs(pDiff) < 0.001) return; // Equilibrium reached

        // Direction of flow
        const highP = pDiff > 0 ? modA : modB;
        const lowP = pDiff > 0 ? modB : modA;

        // Simplified flow rate based on pressure delta
        // In reality, this transitions from subsonic to choked flow, 
        // but for a game/sim, we can scale it by the pressure ratio.
        const flowRate = (conn.hatchArea * Cd * Math.abs(pDiff) * sonicVelocity) / highP.volume;

        const transferAmount = flowRate * deltaTime * highP.pressure;

        highP.pressure -= transferAmount;
        // Adjust for volume difference when moving to the new room
        lowP.pressure += transferAmount * (highP.volume / lowP.volume);
    });

    // Clamp values to zero
    modules.forEach(mod => mod.pressure = Math.max(0, mod.pressure));

    return modules;
}

// --- SETUP EXAMPLE ---
let myHabitat = [
    { id: "Bridge", volume: 50, pressure: 1.0, isLeaking: false, holeArea: 0 },
    { id: "Corridor", volume: 150, pressure: 1.0, isLeaking: false, holeArea: 0 },
    { id: "Engineering", volume: 200, pressure: 1.0, isLeaking: true, holeArea: 0.5 } // DAMAGED!
];

let corridors = [
    { from: "Bridge", to: "Corridor", hatchArea: 2.0 },     // Large open hatch
    { from: "Corridor", to: "Engineering", hatchArea: 0.8 } // Narrow maintenance duct
];

// Run simulation for 10 seconds
for (let i = 0; i < 100; i++) {
    myHabitat = simulateHabitatPressure(myHabitat, corridors, 0.1);
}

console.log(myHabitat.map(m => `${m.id}: ${m.pressure.toFixed(3)} atm`));