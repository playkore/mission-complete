import { SceneId } from "./scenes";

export interface ChangeSceneEffect {
  type: "change_scene";
  sceneId: SceneId;
}

export interface FixChairEffect {
  type: "fix_chair";
}

export type SceneEffectCommand = ChangeSceneEffect | FixChairEffect;
