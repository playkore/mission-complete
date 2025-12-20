import { useState } from "react";
import { initialSceneId } from "../data/scenes";
import { ObjectInteraction, SceneId } from "../types/scenes";
import { InventoryItemId } from "../types/inventory";

export type GameStateLook = 'neutral' | 'happy' | 'angry';

export type GameState = {
  currentSceneId: SceneId;
  chairFixed: boolean;
  hasDuctTape: boolean;
  inventory: InventoryItemId[];
  message: string | null;
  look: GameStateLook;
};

const createInitialGameState = (): GameState => ({
  currentSceneId: initialSceneId,
  chairFixed: false,
  hasDuctTape: false,
  inventory: [],
  message: null,
  look: 'neutral',
});

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);

  const executeEffect = (objectInteraction: ObjectInteraction) => {
    setGameState((oldState: GameState) => {
      const nextState = objectInteraction.effect({
        ...oldState,
        message: null,
      });

      return {
        ...nextState,
        message: nextState.message ?? null,
      };
    });
  };

  const resetGame = () => {
    setGameState(createInitialGameState());
  };

  const resetMessage = () => {
    setGameState((oldState) => ({
      ...oldState,
      message: null,
    }));
  }

  return {
    executeEffect,
    gameState,
    resetGame,
    resetMessage
  };
};
