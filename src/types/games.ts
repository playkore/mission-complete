import type { SceneDefinition } from "./scenes";

export type GameDefinition = {
  id: string;
  name: string;
  scenes: SceneDefinition[];
  initialSceneId: string;
};
