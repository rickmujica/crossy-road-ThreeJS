import * as THREE from "three";
import { Grass } from "./Grass";
import { Road } from "./Road";
import { Tree } from "./Tree";
import { Car } from "./Car";
import { Truck } from "./Truck";
import { initialRowIndex } from "../constants";
import { generateRows } from "../utilities/generateRows";

// export const metaData = [
//   {
//     type: 'car',
//     direction: false,
//     speed: 50,
//     vehicles: [
//       { initialTileIndex: 2, color: 0xff0000 },
//       { initialTileIndex: -2, color: 'blue' },
//       { initialTileIndex: -6, color: 0xff0ff0 },
//       { initialTileIndex: 5, color: 'yellow' }
//     ],
//   },
//   {
//     type: 'forest',
//     trees: [
//         {tileIndex: -3, height: 50 },
//         {tileIndex: 2, height: 30 },
//         {tileIndex: 5, height: 20 },
//     ],
// },
//   {
//     type: 'truck',
//     direction: true,
//     speed: 45,
//     vehicles: [
//       { initialTileIndex: -1, color: 0x00ff00 },
//       { initialTileIndex: -6, color: 0xa0ff },
//       { initialTileIndex: 3, color: 'purple' },
//     ],
//   },
//   {
//     type: 'forest',
//     trees: [
//         {tileIndex: -3, height: 50 },
//         {tileIndex: 2, height: 60 },
//         {tileIndex: 5, height: 50 },
//     ],
// },
// ];
// previously had harcoded metadata

export const metaData = [];
export const map = new THREE.Group();

export function initializeMap() {
  metaData.length = 0;
  map.remove(...map.children);
  for (let rowIndex = 0; rowIndex > initialRowIndex; rowIndex--) {
    const grass = Grass(rowIndex);
    map.add(grass);
  }
  addRows();
}

export function addRows() {
  const newMetaData = generateRows(20);
  const startIndex = metaData.length;
  metaData.push(...newMetaData);
  newMetaData.forEach((rowData, index) => {
    const rowIndex = startIndex + index + 1;

    if (rowData.type === 'forest') {
      const row = Grass(rowIndex);
      rowData.trees.forEach(({ tileIndex, height }) => {
        const tree = Tree(tileIndex, height);
        row.add(tree);
      });
      map.add(row);
    }
    if (rowData.type === 'car') {
      const row = Road(rowIndex);
      rowData.vehicles.forEach((vehicle) => {
        const car = Car(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = car;
        row.add(car);
      });
      map.add(row);
    }
    if (rowData.type === 'truck') {
      const row = Road(rowIndex);
      rowData.vehicles.forEach((vehicle) => {
        const truck = Truck(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = truck;
        row.add(truck);
      });
      map.add(row);
    }
  });
}
