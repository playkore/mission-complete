import { useMemo, useState } from "react";
import SceneView from "./components/SceneView";
import { scenes } from "./data/scenes";
import { useGameState } from "./effects/useGameState";
import type {
  ObjectInteraction,
  SceneDefinition,
  SceneObject,
} from "./types/scenes";
import "./App.css";

const App = () => {
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const { executeEffect, currentSceneId } = useGameState();

  const sceneMap = useMemo(() => {
    return new Map<string, SceneDefinition>(
      scenes.map((scene) => [scene.id, scene])
    );
  }, []);

  const currentScene = sceneMap.get(currentSceneId);
  const selectedObject: SceneObject | null =
    currentScene?.objects.find((object) => object.id === selectedObjectId) ??
    null;

  const handleObjectSelect = (object: SceneObject | null) => {
    setSelectedObjectId(object?.id ?? null);
  };

  const handleInteraction = (interaction: ObjectInteraction) => {
    if (!currentScene || !selectedObject) return;

    executeEffect(interaction.effect);
  };

  if (!currentScene) {
    return (
      <main className="appShell">
        <section className="panel">
          <p>No scenes registered yet. Add one in src/data/scenes.ts.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="appShell">
      <section className="panel panel--flush" aria-label="Scene view">
        <SceneView
          scene={currentScene}
          selectedObjectId={selectedObjectId}
          onObjectSelect={handleObjectSelect}
        />
      </section>

      <section className="panel actionsPanel" aria-label="Available actions">
        <div className="overviewHeader">
          <div>
            <p className="eyebrow">{currentScene.name}</p>
            {selectedObject && <h1>{selectedObject.name}</h1>}
            <p className="sceneDescription">
              {selectedObject
                ? selectedObject.description
                : currentScene.description}
            </p>
          </div>
        </div>
        {selectedObject && (
          <div className="actionsGrid">
            {selectedObject.interactions.map((interaction) => (
              <button
                key={`${selectedObject.id}-${interaction.effect.type}`}
                type="button"
                className="actionButton"
                onClick={() => handleInteraction(interaction)}
              >
                <strong>{interaction.label}</strong>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
