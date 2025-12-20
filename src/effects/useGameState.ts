import { useState } from "react";
import { initialSceneId } from "../data/scenes";
import { ObjectInteraction, SceneId } from "../types/scenes";
import { InventoryItemId } from "../types/inventory";

export type GameState = {
  currentSceneId: SceneId;
  chairFixed: boolean;
  hasDuctTape: boolean;
  inventory: InventoryItemId[];
};

const createInitialGameState = (): GameState => ({
  currentSceneId: initialSceneId,
  chairFixed: false,
  hasDuctTape: false,
  inventory: [],
});

export const useGameState = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [gameState, setGameState] = useState<GameState>(createInitialGameState);

  const executeEffect = (objectInteraction: ObjectInteraction) => {
    setGameState((oldState: GameState) => {
      return objectInteraction.effect(oldState);
    });
  };

  const resetGame = () => {
    setStatusMessage(null);
    setGameState(createInitialGameState());
  };

  return {
    executeEffect,
    gameState,
    statusMessage,
    resetGame,
  };
};
