import * as THREE from "three";
import { metaData as rows } from "./components/Map";
import { minTileIndex, maxTileIndex, tileSize } from "./constants";

const clock = new THREE.Clock();

export function animateVehicle() {
  const delta = clock.getDelta();

  // Animate cars and trucks
  rows.forEach((rowData) => {
    if (rowData.type === "car" || rowData.type === "truck") {
      const beginnningOfRow = (minTileIndex - 2) * tileSize;
      const endOfRow = (maxTileIndex + 2) * tileSize;

      rowData.vehicles.forEach(({ ref }) => {
        if (!ref) throw new Error("Vehicle reference is missing");

        if (rowData.direction) {
          ref.position.x =
            ref.position.x > endOfRow
              ? beginnningOfRow
              : ref.position.x + rowData.speed * delta;
        } else {
          ref.position.x =
            ref.position.x < beginnningOfRow
              ? endOfRow
              : ref.position.x - rowData.speed * delta;
        }
      });
    }
  });
}
