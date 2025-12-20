import type { SceneDefinition, SceneId } from "../types/scenes";
import storageChairBroken from "./chapter01/storage-chair-broken";
import storageMirror from "./chapter01/storage-mirror";
import storageOutsideCar from "./chapter01/storage-outside-car";
import storageOutsideCarInside from "./chapter01/storage-outside-car-inside";
import storageChairFixed from "./chapter01/storage-chair-fixed";
import storageExit from "./chapter01/storage-exit";
import storageShelfCarKeys from "./chapter01/storage-shelf-car-keys";
import storageMirrorAngry from "./chapter01/storage-mirror-angry";
import storageVcr from "./chapter01/storage-vcr";
import storeEntrance from "./chapter01/store-entrance";
import storeHardware from "./chapter01/store-hardware";
import storeHardwareDucttape from "./chapter01/store-hardware-ducttape";

export const scenes: SceneDefinition[] = [
  storageOutsideCar,
  storageOutsideCarInside,
  storageChairBroken,
  storageChairFixed,
  storageExit,
  storageShelfCarKeys,
  storageMirror,
  storageMirrorAngry,
  storageVcr,
  storeEntrance,
  storeHardware,
  storeHardwareDucttape,
];

export const initialSceneId: SceneId = "storage-chair-broken";
