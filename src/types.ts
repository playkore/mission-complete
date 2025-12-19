import { SceneEffectCommand } from "./effects/types";

export type ObjectPropertyValue = string | number | boolean;

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
  type: string;
  name: string;
  boundingBox: BoundingBox;
  properties: Record<string, ObjectPropertyValue>;
  interactions: ObjectInteraction[];
}

export interface SceneDefinition {
  id: string;
  name: string;
  imageSrc: string;
  description?: string;
  objects: SceneObject[];
  ambientSound?: string;
}
