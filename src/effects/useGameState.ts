import { useEffect, useState } from "react";
import { initialSceneId, type SceneId } from "../data/scenes";
import { ObjectInteraction } from "../types/scenes";
import { InventoryItemId } from "../types/inventory";

export type GameStateLook = "neutral" | "happy" | "angry";

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
  look: "neutral",
});

const isValidLook = (value: unknown): value is GameStateLook =>
  value === "neutral" || value === "happy" || value === "angry";

const STORAGE_KEY = "mission-complete/game-state";

const loadStoredGameState = (): GameState => {
  if (typeof window === "undefined") {
    return createInitialGameState();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createInitialGameState();
    }
    const parsed = JSON.parse(raw) as Partial<GameState>;
    const defaults = createInitialGameState();
    return {
      ...defaults,
      ...parsed,
      inventory: Array.isArray(parsed?.inventory)
        ? parsed?.inventory
        : defaults.inventory,
      message:
        typeof parsed?.message === "string" || parsed?.message === null
          ? parsed?.message ?? null
          : defaults.message,
      look: isValidLook(parsed?.look) ? parsed.look : defaults.look,
    };
  } catch (error) {
    console.warn("Failed to parse saved game state", error);
    return createInitialGameState();
  }
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(loadStoredGameState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.warn("Failed to store game state", error);
    }
  }, [gameState]);

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
  };

  return {
    executeEffect,
    gameState,
    resetGame,
    resetMessage,
  };
};
