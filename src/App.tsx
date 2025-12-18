import { useMemo, useState } from 'react'
import SceneView from './components/SceneView'
import { initialSceneId, scenes } from './data/scenes'
import type {
  ObjectInteraction,
  SceneDefinition,
  SceneObject
} from './types'
import './App.css'

const formatPropertyKey = (key: string) =>
  key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()

const formatPropertyValue = (value: unknown) => {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (value === null || value === undefined) return '—'
  return String(value)
}

const App = () => {
  const [currentSceneId, setCurrentSceneId] = useState(initialSceneId)
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const sceneMap = useMemo(() => {
    return new Map<string, SceneDefinition>(
      scenes.map((scene) => [scene.id, scene])
    )
  }, [])

  const currentScene = sceneMap.get(currentSceneId)
  const selectedObject: SceneObject | null =
    currentScene?.objects.find((object) => object.id === selectedObjectId) ??
    null

  const handleObjectSelect = (object: SceneObject) => {
    setSelectedObjectId(object.id)
    setLastAction(null)
  }

  const handleSceneChange = (sceneId: string) => {
    setCurrentSceneId(sceneId)
    setSelectedObjectId(null)
    setLastAction(null)
  }

  const handleInteraction = (interaction: ObjectInteraction) => {
    const summary = `${interaction.label} :: ${interaction.effects.join(', ')}`
    setLastAction(summary)
  }

  if (!currentScene) {
    return (
      <main className="appShell">
        <section className="panel">
          <p>No scenes registered yet. Add one in src/data/scenes.ts.</p>
        </section>
      </main>
    )
  }

  const propertyEntries = selectedObject
    ? Object.entries(selectedObject.properties)
    : []

  return (
    <main className="appShell">
      <section className="panel propertiesPanel" aria-label="Object properties">
        <div className="propertiesHeader">
          <div>
            <p className="eyebrow">{currentScene.name}</p>
            <h1>
              {selectedObject ? selectedObject.name : 'Select an object'}
            </h1>
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
                : 'Select an object to see contextual actions'}
            </p>
          </div>
          {lastAction ? (
            <span className="pill">Last: {lastAction}</span>
          ) : null}
        </div>
        {selectedObject ? (
          <div className="actionsGrid">
            {selectedObject.interactions.map((interaction) => (
              <button
                key={`${selectedObject.id}-${interaction.verb}`}
                type="button"
                className="actionButton"
                onClick={() => handleInteraction(interaction)}
              >
                <strong>{interaction.label}</strong>
                <span className="actionMeta">
                  {interaction.effects.join(', ')}
                </span>
                {interaction.cooldownSec ? (
                  <span className="actionMeta">
                    Cooldown: {interaction.cooldownSec}s
                  </span>
                ) : null}
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
  )
}

export default App
