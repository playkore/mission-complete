import { useCallback, useMemo, useState } from 'react'
import SceneView from './components/SceneView'
import { initialSceneId, scenes } from './data/scenes'
import type { SceneAction, SceneDefinition, SceneHotspot } from './types'
import './App.css'

interface LogEntry {
  id: string
  text: string
}

const App = () => {
  const [currentSceneId, setCurrentSceneId] = useState(initialSceneId)
  const [log, setLog] = useState<LogEntry[]>([])

  const sceneMap = useMemo(() => {
    return new Map<string, SceneDefinition>(
      scenes.map((scene) => [scene.id, scene])
    )
  }, [])

  const currentScene = sceneMap.get(currentSceneId)

  const handleSceneChange = (sceneId: string) => {
    setCurrentSceneId(sceneId)
    setLog([])
  }

  const handleActionSelect = useCallback(
    (sceneId: string, hotspot: SceneHotspot, action: SceneAction) => {
      const sceneName = sceneMap.get(sceneId)?.name ?? sceneId
      setLog((entries) => [
        {
          id: `${Date.now()}-${action.id}`,
          text: `${sceneName} · ${hotspot.name}: ${action.label}`
        },
        ...entries
      ])

      if (action.nextSceneId && sceneMap.has(action.nextSceneId)) {
        setCurrentSceneId(action.nextSceneId)
      }
    },
    [sceneMap]
  )

  if (!currentScene) {
    return (
      <main className="app-shell">
        <p>No scenes registered yet. Add one in src/data/scenes.ts.</p>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header>
        <div>
          <p className="eyebrow">Mission Complete</p>
          <h1>Pixel Hunt Storybook</h1>
          <p className="lead">
            Build a story-rich scene by wiring hotspots to narrated actions. Add
            more scenes in <code>src/data/scenes.ts</code> and point them to new
            art when you are ready.
          </p>
        </div>
        <label className="scene-select">
          <span>Active Scene</span>
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
      </header>

      <section className="scene-layout">
        <SceneView scene={currentScene} onActionSelect={handleActionSelect} />
        <aside className="scene-sidebar">
          <h2>Story Log</h2>
          {log.length === 0 ? (
            <p>
              Tap a hotspot in the scene to surface the interactions. Actions
              will be tracked here chronologically.
            </p>
          ) : (
            <ol>
              {log.map((entry) => (
                <li key={entry.id}>{entry.text}</li>
              ))}
            </ol>
          )}
          <div className="scene-notes">
            <h3>Scene Notes</h3>
            <p>
              Narrative:{' '}
              <span className="scene-notes__value">
                {currentScene.narrative}
              </span>
            </p>
            <p>
              Hotspots: <strong>{currentScene.hotspots.length}</strong>
            </p>
            <p>
              Image Source:{' '}
              <code>
                {currentScene.imageSrc.startsWith('http')
                  ? 'remote asset'
                  : currentScene.imageSrc}
              </code>
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
