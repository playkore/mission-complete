import { GameState } from "../effects/useGameState";

// Should correspond the image name <sceneId>.png in src/assets/scenes/chapter01/
export type SceneId =
  | "storage-back"
  | "storage-shelf-car-keys"
  | "storage-exit"
  | "storage-mirror"
  | "storage-vcr"
  | "storage-outside-car-inside"
  | "storage-outside-car"
  | "car-glove-box"
  | "car-look-right"
  | "city-map"
  
  // City mall location scenes
  | "city-mall-restaurant-table";

type SceneEffectCommandFunction = (state: GameState) => GameState;
export interface ObjectInteraction {
  label: string;
  effect: SceneEffectCommandFunction;
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
  imageSrc?: string;
  visible?: (state: GameState) => boolean;
}

export interface SceneDefinition {
  id: SceneId;
  name: string;
  imageSrc: string;
  description?: string;
  objects: SceneObject[];
  interactions: ObjectInteraction[];
}
