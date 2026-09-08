import flightInventory from "../../../flights[fw]-.txt?raw";
import helicopterInventory from "../../../helicopters[rw]-.txt?raw";

export type AircraftKind = "flight" | "helicopter";

export type InventoryAircraft = {
  id: string;
  kind: AircraftKind;
  model: string;
  capacity: string;
  seats: number | null;
};

function parseCapacity(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : null;
}

function parseInventory(source: string, kind: AircraftKind) {
  return source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .map((line) => line.includes("|") ? line.split("|").map((cell) => cell.trim()).filter(Boolean) : line.split("\t").map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 3 && /^(FW|RW)$/i.test(cells[0]))
    .map(([type, model, capacity], index) => ({
      id: `${kind}-${index}-${model}`,
      kind,
      model,
      capacity,
      seats: parseCapacity(capacity),
    }));
}

export const aircraftInventory: InventoryAircraft[] = [
  ...parseInventory(flightInventory, "flight"),
  ...parseInventory(helicopterInventory, "helicopter"),
];