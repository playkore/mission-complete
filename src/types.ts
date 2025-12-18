export type ObjectPropertyValue = string | number | boolean;

export interface ObjectInteraction {
  verb: string;
  label: string;
  effects: SceneEffectCommand[];
  requires?: Record<string, unknown>;
  cooldownSec?: number;
}

export type SceneEffectType =
  | "enter_vehicle"
  | "maybe_hint"
  | "show_description"
  | "open_ui"
  | "give_item"
  | "set_state"
  | "set_position"
  | "set_visibility"
  | "spawn_fx"
  | "noise"
  | "maybe_alert"
  | "loot_roll"
  | "maybe_find"
  | "set_cover"
  | "reveal";

export interface EnterVehicleEffect {
  type: "enter_vehicle";
  vehicleId: string;
}

export interface MaybeHintEffect {
  type: "maybe_hint";
  topic?: string;
}

export interface ShowDescriptionEffect {
  type: "show_description";
  targetId?: string;
}

export interface OpenUiEffect {
  type: "open_ui";
  interfaceId: string;
}

export interface GiveItemEffect {
  type: "give_item";
  itemId: string;
}

export interface SetStateEffect {
  type: "set_state";
  targetId: string;
  state: string;
}

export interface SetPositionEffect {
  type: "set_position";
  position: string;
}

export interface SetVisibilityEffect {
  type: "set_visibility";
  delta: number;
}

export interface SpawnFxEffect {
  type: "spawn_fx";
  effectId: string;
}

export interface NoiseEffect {
  type: "noise";
  amount: string;
}

export interface MaybeAlertEffect {
  type: "maybe_alert";
}

export interface LootRollEffect {
  type: "loot_roll";
  tableId: string;
}

export interface MaybeFindEffect {
  type: "maybe_find";
  resultId: string;
}

export interface SetCoverEffect {
  type: "set_cover";
  value: number;
}

export interface RevealEffect {
  type: "reveal";
  targetId: string;
}

export type SceneEffectCommand =
  | EnterVehicleEffect
  | MaybeHintEffect
  | ShowDescriptionEffect
  | OpenUiEffect
  | GiveItemEffect
  | SetStateEffect
  | SetPositionEffect
  | SetVisibilityEffect
  | SpawnFxEffect
  | NoiseEffect
  | MaybeAlertEffect
  | LootRollEffect
  | MaybeFindEffect
  | SetCoverEffect
  | RevealEffect;

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
