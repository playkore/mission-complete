import { useEffect, useState } from "react";
import { ObjectInteraction } from "../types/scenes";
import { InventoryItemId } from "../types/inventory";

export type GameStateLook = "neutral" | "happy" | "angry";

export type GameState = {
  currentSceneId: string;
  chairFixed: boolean;
  hasDuctTape: boolean;
  inventory: InventoryItemId[];
  message: string | null;
  look: GameStateLook;
};

type UseGameStateOptions = {
  initialSceneId: string;
  storageKey: string;
};

const createInitialGameState = (initialSceneId: string): GameState => ({
  currentSceneId: initialSceneId,
  chairFixed: false,
  hasDuctTape: false,
  inventory: [],
  message: null,
  look: "neutral",
});

const isValidLook = (value: unknown): value is GameStateLook =>
  value === "neutral" || value === "happy" || value === "angry";

const loadStoredGameState = ({
  initialSceneId,
  storageKey,
}: UseGameStateOptions): GameState => {
  if (typeof window === "undefined") {
    return createInitialGameState(initialSceneId);
  }
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return createInitialGameState(initialSceneId);
    }
    const parsed = JSON.parse(raw) as Partial<GameState>;
    const defaults = createInitialGameState(initialSceneId);
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
    return createInitialGameState(initialSceneId);
  }
};

export const useGameState = ({
  initialSceneId,
  storageKey,
}: UseGameStateOptions) => {
  const [gameState, setGameState] = useState<GameState>(() =>
    loadStoredGameState({ initialSceneId, storageKey })
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(gameState));
    } catch (error) {
      console.warn("Failed to store game state", error);
    }
  }, [gameState, storageKey]);

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
    setGameState(createInitialGameState(initialSceneId));
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
