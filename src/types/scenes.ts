import { SceneEffectCommand } from "./effects";

// Should correspond the image name <sceneId>.png in src/assets/scenes/chapter01/
export type SceneId =
  | "storage-chair-broken"
  | "storage-chair-fixed"
  | "storage-exit"
  | "storage-mirror-angry"
  | "storage-mirror"
  | "storage-outside-car-inside"
  | "storage-outside-car"
  | "storage-vcr"
  | "store-entrance"
  | "store-hardware-ducttape"
  | "store-hardware";

export interface ObjectInteraction {
  label: string;
  effect: SceneEffectCommand;
}

export interface BoundingBox {
  /**
   * Normalized coordinate from the left edge (0-1).
   */
  x: number;
  /**
   * Normalized coordinate from the top edge (0-1).
   */
  y: number;
  width: number;
  height: number;
}

export interface SceneObject {
  id: string;
  name: string;
  description: string;
  boundingBox: BoundingBox;
  interactions: ObjectInteraction[];
}

export interface SceneDefinition {
  id: SceneId;
  name: string;
  imageSrc: string;
  description?: string;
  objects: SceneObject[];
  ambientSound?: string;
}
