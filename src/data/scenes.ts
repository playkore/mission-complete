import type { SceneDefinition, SceneId } from "../types/scenes";
import storageChairBroken from "./chapter01/storage-back";
import storageMirror from "./chapter01/storage-mirror";
import storageOutsideCar from "./chapter01/storage-outside-car";
import storageOutsideCarInside from "./chapter01/storage-outside-car-inside";
import storageExit from "./chapter01/storage-exit";
import storageShelf from "./chapter01/storage-shelf";
import storageVcr from "./chapter01/storage-vcr";
import storeEntrance from "./chapter01/store-entrance";
import storeHardware from "./chapter01/store-hardware";
import storeHardwareDucttape from "./chapter01/store-hardware-ducttape";

export const scenes: SceneDefinition[] = [
  storageOutsideCar,
  storageOutsideCarInside,
  storageChairBroken,
  storageExit,
  storageShelf,
  storageMirror,
  storageVcr,
  storeEntrance,
  storeHardware,
  storeHardwareDucttape,
];

export const initialSceneId: SceneId = "storage-back";
