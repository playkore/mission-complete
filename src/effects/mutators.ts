import { InventoryItemId } from "../types/inventory";
import { SceneId } from "../types/scenes";
import { GameState, GameStateLook } from "./useGameState";

export const setScene = (sceneId: SceneId) => {
  return (state: GameState): GameState => {
    return {
      ...state,
      currentSceneId: sceneId,
    };
  };
};

export const addToInventory = (itemId: InventoryItemId) => {
  return (state: GameState): GameState => {
    if (state.inventory.includes(itemId)) {
      return state;
    }
    return {
      ...state,
      inventory: [...state.inventory, itemId],
    };
  };
};

export const setStateLook = (look: GameStateLook) => {
  return (state: GameState): GameState => {
    return {
      ...state,
      look,
    };
  };
};
