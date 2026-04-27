/**
 * Simulates a complex habitat network with loops and multiple connections.
 */
function updateHabitatNetwork(modules, connections, deltaTime = 0.1) {
    const gamma = 1.4;
    const R = 8.314;
    const T = 293.15;
    const M = 0.02897;
    const Cd = 0.65;
    const sonicVelocity = Math.sqrt((gamma * R * T) / M);
    const chokedFactor = Math.pow(2 / (gamma + 1), (gamma + 1) / (2 * (gamma - 1)));

    // Create a map to track the change in pressure (dP) for each module this frame
    const pressureChanges = new Map(modules.map(m => [m.id, 0]));

    // 1. Calculate External Leaks (into vacuum)
    modules.forEach(mod => {
        if (mod.holeArea > 0 && mod.pressure > 0) {
            const leakRate = (mod.holeArea * Cd * mod.pressure * sonicVelocity * chokedFactor) / mod.volume;
            pressureChanges.set(mod.id, pressureChanges.get(mod.id) - (leakRate * deltaTime));
        }
    });

    // 2. Calculate Internal Flows (between modules)
    connections.forEach(conn => {
        const modA = modules.find(m => m.id === conn.from);
        const modB = modules.find(m => m.id === conn.to);

        if (!modA || !modB) return;

        const pDiff = modA.pressure - modB.pressure;
        if (Math.abs(pDiff) < 0.0001) return;

        // Flow goes from High to Low
        const highP = pDiff > 0 ? modA : modB;
        const lowP = pDiff > 0 ? modB : modA;

        // Calculate flow rate based on the high-pressure side's density
        const flowRate = (conn.hatchArea * Cd * Math.abs(pDiff) * sonicVelocity) / highP.volume;
        const deltaP = flowRate * deltaTime * highP.pressure;

        // Apply changes: High side loses pressure, Low side gains it (scaled by volume ratio)
        pressureChanges.set(highP.id, pressureChanges.get(highP.id) - deltaP);
        pressureChanges.set(lowP.id, pressureChanges.get(lowP.id) + (deltaP * (highP.volume / lowP.volume)));
    });

    // 3. Apply all calculated changes at once
    modules.forEach(mod => {
        mod.pressure += pressureChanges.get(mod.id);
        if (mod.pressure < 0) mod.pressure = 0;
    });

    return modules;
}

// --- COMPLEX LAYOUT EXAMPLE ---
// A "Ring" Habitat: A -> B -> C -> A
let modules = [
    { id: "A", volume: 100, pressure: 1.0, holeArea: 0.1 }, // Leak here!
    { id: "B", volume: 100, pressure: 1.0, holeArea: 0 },
    { id: "C", volume: 100, pressure: 1.0, holeArea: 0 }
];

let connections = [
    { from: "A", to: "B", hatchArea: 1.0 },
    { from: "B", to: "C", hatchArea: 1.0 },
    { from: "C", to: "A", hatchArea: 1.0 } // The loop closes
];

// Run simulation for 10 seconds
for (let i = 0; i < 100; i++) {
    modules = updateHabitatNetwork(modules, connections, 0.1);
}

console.log(modules);