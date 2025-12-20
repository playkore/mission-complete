import { SceneId } from "../types/scenes";
import { GameState } from "./useGameState";

export const setScene = (sceneId: SceneId) => {
  return (state: GameState): GameState => {
    return {
      ...state,
      currentSceneId: sceneId,
    };
  };
};
