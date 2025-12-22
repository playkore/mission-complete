import { useEffect, useMemo, useRef, useState } from "react";
import SceneView from "./components/SceneView";
import SceneEditor from "./components/SceneEditor";
import { games, type GameId } from "./data/games";
import { useGameState } from "./effects/useGameState";
import type { GameDefinition } from "./types/games";
import type {
  ObjectInteraction,
  SceneDefinition,
  SceneObject,
} from "./types/scenes";
import "./App.css";

const GAME_SELECTION_STORAGE_KEY = "mission-complete/selected-game";

const loadSelectedGameId = (): GameId | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const stored = window.localStorage.getItem(GAME_SELECTION_STORAGE_KEY);
    if (!stored) {
      return null;
    }
    return games.some((game) => game.id === stored) ? (stored as GameId) : null;
  } catch (error) {
    console.warn("Failed to read selected game", error);
    return null;
  }
};

const GameSelection = ({
  onSelectGame,
}: {
  onSelectGame: (gameId: GameId) => void;
}) => {
  return (
    <div className="appStack">
      <main className="appShell">
        <section className="panel gameSelectPanel">
          <header className="gameSelectHeader">
            <p className="eyebrow">Select a game</p>
            <h1>Pick your mission</h1>
            <p className="gameSelectSubhead">
              Choose a story to jump into. Progress saves per game.
            </p>
          </header>
          <div className="gameSelectGrid">
            {games.map((game) => (
              <button
                key={game.id}
                type="button"
                className="gameCard"
                onClick={() => onSelectGame(game.id)}
              >
                <span className="gameCardTitle">{game.name}</span>
                <span className="gameCardMeta">
                  {game.scenes.length > 0
                    ? `${game.scenes.length} scenes ready`
                    : "No scenes yet"}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

type GameSessionProps = {
  game: GameDefinition;
  onExitToSelector: () => void;
};

const GameSession = ({ game, onExitToSelector }: GameSessionProps) => {
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSceneEditorOpen, setIsSceneEditorOpen] = useState(false);
  const { executeEffect, gameState, resetGame, resetMessage } = useGameState({
    initialSceneId: game.initialSceneId,
    storageKey: `${game.id}/game-state`,
  });
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);

  const sceneMap = useMemo(() => {
    return new Map<string, SceneDefinition>(
      game.scenes.map((scene) => [scene.id, scene])
    );
  }, [game.scenes]);

  const currentScene = sceneMap.get(gameState.currentSceneId);
  const selectedObject: SceneObject | null =
    currentScene?.objects.find((object) => object.id === selectedObjectId) ??
    null;

  const availableInteractions =
    (selectedObject
      ? selectedObject.interactions
      : currentScene?.interactions) ?? [];

  const sceneDescriptionText =
    gameState.message && gameState.message.trim() !== ""
      ? gameState.message
      : selectedObject
      ? selectedObject.description
      : currentScene?.description ?? null;

  useEffect(() => {
    if (!currentScene || !selectedObjectId) {
      return;
    }

    const activeObject = currentScene.objects.find(
      (object) => object.id === selectedObjectId
    );

    const isVisible = activeObject?.visible
      ? activeObject.visible(gameState)
      : Boolean(activeObject);

    if (!isVisible) {
      setSelectedObjectId(null);
    }
  }, [currentScene, selectedObjectId, gameState]);

  const handleObjectSelect = (object: SceneObject | null) => {
    setSelectedObjectId(object?.id ?? null);
    resetMessage();
  };

  const handleInteraction = (interaction: ObjectInteraction) => {
    if (!currentScene) {
      return;
    }
    executeEffect(interaction);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNewGame = () => {
    setSelectedObjectId(null);
    resetGame();
    setIsMenuOpen(false);
  };

  const handleOpenSceneEditor = () => {
    setIsSceneEditorOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseSceneEditor = () => {
    setIsSceneEditorOpen(false);
  };

  const handleChangeGame = () => {
    setSelectedObjectId(null);
    resetMessage();
    setIsMenuOpen(false);
    onExitToSelector();
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const menu = (
    <div className="menuGlobalSlot">
      <div className="menuControls" ref={menuWrapperRef}>
        <button
          type="button"
          className="menuTrigger"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          onClick={handleMenuToggle}
          aria-label="Game menu"
        >
          <span className="menuTriggerDots" aria-hidden="true" />
          Menu
        </button>
        {isMenuOpen && (
          <div className="appMenuOverlay" onClick={handleMenuClose}>
            <div
              className="appMenu"
              role="menu"
              aria-label="Game menu"
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="menuItem" onClick={handleNewGame}>
                New game
              </button>
              <button
                type="button"
                className="menuItem"
                onClick={handleChangeGame}
              >
                Select game
              </button>
              <button
                type="button"
                className="menuItem"
                onClick={handleOpenSceneEditor}
                disabled={game.scenes.length === 0}
              >
                DEV: edit current scene
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (!currentScene) {
    return (
      <>
        <div className="appStack">
          {menu}
          <main className="appShell">
            <section className="panel">
              <p>
                No scenes registered yet. Add one in{" "}
                <code>{`src/data/${game.id}/`}</code>.
              </p>
            </section>
          </main>
        </div>
        {isSceneEditorOpen && (
          <SceneEditor
            initialSceneId={gameState.currentSceneId}
            onClose={handleCloseSceneEditor}
            scenes={game.scenes}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="appStack">
        {menu}
        <main className="appShell">
          <section className="panel panel--flush" aria-label="Scene view">
            <SceneView
              scene={currentScene}
              gameState={gameState}
              selectedObjectId={selectedObjectId}
              onObjectSelect={handleObjectSelect}
              descriptionText={sceneDescriptionText}
              interactions={availableInteractions}
              onInteractionSelect={handleInteraction}
            />
          </section>
        </main>
      </div>
      {isSceneEditorOpen && (
        <SceneEditor
          initialSceneId={gameState.currentSceneId}
          onClose={handleCloseSceneEditor}
          scenes={game.scenes}
        />
      )}
    </>
  );
};

const App = () => {
  const [selectedGameId, setSelectedGameId] = useState<GameId | null>(
    loadSelectedGameId
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      if (selectedGameId) {
        window.localStorage.setItem(
          GAME_SELECTION_STORAGE_KEY,
          selectedGameId
        );
      } else {
        window.localStorage.removeItem(GAME_SELECTION_STORAGE_KEY);
      }
    } catch (error) {
      console.warn("Failed to store selected game", error);
    }
  }, [selectedGameId]);

  const selectedGame =
    games.find((game) => game.id === selectedGameId) ?? null;

  if (!selectedGame) {
    return <GameSelection onSelectGame={setSelectedGameId} />;
  }

  return (
    <GameSession
      key={selectedGame.id}
      game={selectedGame}
      onExitToSelector={() => setSelectedGameId(null)}
    />
  );
};

export default App;
