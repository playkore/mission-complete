import type { SceneDefinition, SceneId } from "../types/scenes";
import storageChairBroken from "./chapter01/storage-unit/storage-back";
import storageMirror from "./chapter01/storage-unit/storage-mirror";
import storageOutsideCar from "./chapter01/storage-unit/storage-outside-car";
import storageOutsideCarInside from "./chapter01/storage-unit/storage-outside-car-inside";
import storageExit from "./chapter01/storage-unit/storage-exit";
import storageShelf from "./chapter01/storage-unit/storage-shelf";
import storageVcr from "./chapter01/storage-unit/storage-vcr";
import carLookRight from "./chapter01/outside/car-look-right";
import carGloveBox from "./chapter01/outside/car-glove-box";
import cityMap from "./chapter01/outside/city-map";

export const scenes: SceneDefinition[] = [
  storageChairBroken,
  storageExit,
  storageShelf,
  storageMirror,
  storageVcr,
  storageOutsideCar,
  storageOutsideCarInside,
  carLookRight,
  carGloveBox,
  cityMap,
];

export const initialSceneId: SceneId = "storage-back";
