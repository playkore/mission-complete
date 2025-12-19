import { useMemo, useState } from 'react'
import SceneView from './components/SceneView'
import { initialSceneId, scenes } from './data/scenes'
import { executeEffects } from './effects/handlers'
import type {
  ObjectInteraction,
  SceneDefinition,
  SceneObject
} from './types'
import './App.css'
import { SceneEffectCommand } from './effects/types'

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

const describeEffect = (effect: SceneEffectCommand) => {
  switch (effect.type) {
    case 'enter_vehicle':
      return `enter_vehicle(${effect.vehicleId})`
    case 'maybe_hint':
      return `maybe_hint(${effect.topic ?? '—'})`
    case 'show_description':
      return effect.targetId
        ? `show_description(${effect.targetId})`
        : 'show_description'
    case 'open_ui':
      return `open_ui(${effect.interfaceId})`
    case 'give_item':
      return `give_item(${effect.itemId})`
    case 'set_state':
      return `set_state(${effect.targetId}, ${effect.state})`
    case 'set_position':
      return `set_position(${effect.position})`
    case 'set_visibility':
      return `set_visibility(${effect.delta})`
    case 'spawn_fx':
      return `spawn_fx(${effect.effectId})`
    case 'noise':
      return `noise(${effect.amount})`
    case 'maybe_alert':
      return 'maybe_alert'
    case 'loot_roll':
      return `loot_roll(${effect.tableId})`
    case 'maybe_find':
      return `maybe_find(${effect.resultId})`
    case 'set_cover':
      return `set_cover(${effect.value})`
    case 'reveal':
      return `reveal(${effect.targetId})`
    default:
      return ''
  }
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

  const handleObjectSelect = (object: SceneObject | null) => {
    setSelectedObjectId(object?.id ?? null)
    setLastAction(null)
  }

  const handleSceneChange = (sceneId: string) => {
    setCurrentSceneId(sceneId)
    setSelectedObjectId(null)
    setLastAction(null)
  }

  const handleInteraction = (interaction: ObjectInteraction) => {
    if (!currentScene || !selectedObject) return

    const results = executeEffects(interaction.effect, {
      scene: currentScene,
      object: selectedObject
    })

    const summary = results.length
      ? `${interaction.label} → ${results.join(' | ')}`
      : interaction.label

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
                  {interaction.effects.map(describeEffect).join(', ')}
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
