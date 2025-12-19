export interface ChangeSceneEffect {
  type: "change_scene";
  sceneId: string;
}

export interface FixChairEffect {
  type: "fix_chair";
}

export type SceneEffectCommand = ChangeSceneEffect | FixChairEffect;
