import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex, initialRowIndex } from "../constants";
import { metaData as rows } from "../components/Map";

export function endsUpInValidPosition(currentPosition, moves) {

  const finalPosition = calculateFinalPosition(currentPosition, moves);
  // Check if the final position is within the bounds of the map
  if (
    finalPosition.rowIndex === initialRowIndex ||
    finalPosition.tileIndex === minTileIndex - 1 ||
    finalPosition.tileIndex === maxTileIndex + 1
  ) {
    console.log('Condition triggered: Out of bounds');
    return false;
  }

  // Check if the tile is occupied by a tree
  const finalRow = rows[finalPosition.rowIndex - 1];
  if (
    finalRow &&
    finalRow.type === 'forest' &&
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    console.log('hit a tree');
    return false;
  }
  return true;
}
