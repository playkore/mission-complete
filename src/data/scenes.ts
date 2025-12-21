import type { SceneDefinition, SceneId } from "../types/scenes";
import storageChairBroken from "./chapter01/storage-back";
import storageMirror from "./chapter01/storage-mirror";
import storageOutsideCar from "./chapter01/storage-outside-car";
import storageOutsideCarInside from "./chapter01/storage-outside-car-inside";
import storageExit from "./chapter01/storage-exit";
import storageShelf from "./chapter01/storage-shelf";
import storageVcr from "./chapter01/storage-vcr";
import carLookRight from "./chapter01/car-look-right";
import carGloveBox from "./chapter01/car-glove-box";

import cityMap from "./chapter01/city-map";

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
