import { useMemo, useState } from "react";
import SceneView from "./components/SceneView";
import { scenes } from "./data/scenes";
import { useGameState } from "./effects/useGameState";
import type { ObjectInteraction, SceneDefinition, SceneObject } from "./types/scenes";
import "./App.css";

const formatPropertyKey = (key: string) =>
  key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

const formatPropertyValue = (value: unknown) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined) return "—";
  return String(value);
};

const App = () => {
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const { executeEffect, currentSceneId, setCurrentSceneId } = useGameState();

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

  const handleSceneChange = (sceneId: string) => {
    setCurrentSceneId(sceneId);
    setSelectedObjectId(null);
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

  const propertyEntries = selectedObject
    ? Object.entries(selectedObject.properties)
    : [];

  return (
    <main className="appShell">
      <section className="panel propertiesPanel" aria-label="Object properties">
        <div className="propertiesHeader">
          <div>
            <p className="eyebrow">{currentScene.name}</p>
            <h1>{selectedObject ? selectedObject.name : "Select an object"}</h1>
            <p className="sceneDescription">
              {selectedObject
                ? `Type: ${formatPropertyKey(selectedObject.type)}`
                : currentScene.description}
            </p>
          </div>
          <label className="scenePicker">
            <span>Scene</span>
            <select
              value={currentSceneId}
              onChange={(event) => handleSceneChange(event.target.value)}
            >
              {scenes.map((scene) => (
                <option key={scene.id} value={scene.id}>
                  {scene.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="propertyGrid">
          {selectedObject ? (
            propertyEntries.map(([key, value]) => (
              <div key={key} className="propertyRow">
                <span className="label">{formatPropertyKey(key)}</span>
                <span className="value">{formatPropertyValue(value)}</span>
              </div>
            ))
          ) : (
            <p className="emptyState">
              Tap the scene to inspect an object and view its properties.
            </p>
          )}
        </div>
      </section>

      <section className="panel panel--flush" aria-label="Scene view">
        <SceneView
          scene={currentScene}
          selectedObjectId={selectedObjectId}
          onObjectSelect={handleObjectSelect}
        />
      </section>

      <section className="panel actionsPanel" aria-label="Available actions">
        <div className="actionsHeader">
          <div>
            <h2>Actions</h2>
            <p>
              {selectedObject
                ? `${selectedObject.interactions.length} options available`
                : "Select an object to see contextual actions"}
            </p>
          </div>
        </div>
        {selectedObject ? (
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
        ) : (
          <p className="emptyState">
            Choose an object above to reveal its actions.
          </p>
        )}
      </section>
    </main>
  );
};

export default App;
