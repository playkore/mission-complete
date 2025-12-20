import { useState } from "react";
import { SceneEffectCommand } from "../types/effects";
import { initialSceneId } from "../data/scenes";
import { SceneId } from "../types/scenes";

type GameState = {
  chairFixed: boolean;
  hasDuctTape: boolean;
};

const createInitialGameState = (): GameState => ({
  chairFixed: false,
  hasDuctTape: false,
});

export const useGameState = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [currentSceneId, setCurrentSceneId] = useState<SceneId>(initialSceneId);

  const [gameState, setGameState] = useState<GameState>(createInitialGameState);

  const executeEffect = (command: SceneEffectCommand) => {
    switch (command.type) {
      case "change_scene": {
        if (command.sceneId === "storage") {
          if (gameState.chairFixed) {
            setCurrentSceneId("storage-chair-fixed");
          } else {
            setCurrentSceneId("storage-chair-broken");
          }
          return;
        }
        setCurrentSceneId(command.sceneId as SceneId);
        break;
      }
      case "fix_chair": {
        if (!gameState.hasDuctTape) {
          setStatusMessage("I need something to fix this chair with.");
          return;
        }

        setGameState((prevState) => ({
          ...prevState,
          chairFixed: true,
        }));
        break;
      }
      default: {
        break;
      }
    }
  };
  const resetGame = () => {
    setStatusMessage(null);
    setGameState(createInitialGameState());
    setCurrentSceneId(initialSceneId);
  };

  return {
    executeEffect,
    currentSceneId,
    setCurrentSceneId,
    statusMessage,
    resetGame,
  };
};
