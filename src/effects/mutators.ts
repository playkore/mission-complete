import { InventoryItemId } from "../types/inventory";
import { GameState, GameStateLook } from "./useGameState";

export const setScene = (sceneId: string) => {
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

export const setMessage = (message: string) => {
  return (state: GameState): GameState => {
    return {
      ...state,
      message,
    };
  };
};
