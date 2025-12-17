import { useMemo, useState } from 'react'
import SceneView from './components/SceneView'
import { initialSceneId, scenes } from './data/scenes'
import type {
  SceneAction,
  SceneDefinition,
  SceneHotspot
} from './types'
import './App.css'

type LogVariant = 'info' | 'warn' | 'error'

interface LogEntry {
  id: string
  timestamp: number
  message: string
  variant: LogVariant
}

const createLogEntry = (
  message: string,
  variant: LogVariant = 'info'
): LogEntry => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  timestamp: Date.now(),
  message,
  variant
})

const App = () => {
  const [currentSceneId, setCurrentSceneId] = useState(initialSceneId)
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null)
  const [log, setLog] = useState<LogEntry[]>(() => [
    createLogEntry('BOOT :: SENSOR ARRAY ONLINE'),
    createLogEntry('SCAN :: BASELINE CALIBRATED'),
    createLogEntry('STATUS :: Awaiting target selection', 'warn')
  ])

  const sceneMap = useMemo(() => {
    return new Map<string, SceneDefinition>(
      scenes.map((scene) => [scene.id, scene])
    )
  }, [])

  const currentScene = sceneMap.get(currentSceneId)
  const selectedHotspot =
    currentScene?.hotspots.find((hotspot) => hotspot.id === selectedHotspotId) ??
    null

  const totalActions =
    currentScene?.hotspots.reduce(
      (sum, hotspot) => sum + hotspot.actions.length,
      0
    ) ?? 0

  const branchHotspots =
    currentScene?.hotspots.filter((hotspot) =>
      hotspot.actions.some((action) => action.nextSceneId)
    ).length ?? 0

  const appendLog = (message: string, variant: LogVariant = 'info') => {
    setLog((entries) => {
      const nextEntries = [...entries, createLogEntry(message, variant)]
      return nextEntries.slice(-40)
    })
  }

  const handleSceneChange = (sceneId: string) => {
    setCurrentSceneId(sceneId)
    setSelectedHotspotId(null)
    const newScene = sceneMap.get(sceneId)
    appendLog(`SCENE LOAD :: ${newScene?.name ?? sceneId}`)
  }

  const handleHotspotSelect = (hotspot: SceneHotspot) => {
    setSelectedHotspotId(hotspot.id)
    appendLog(`TARGET LOCK :: ${hotspot.name}`)
  }

  const handleActionTrigger = (action: SceneAction) => {
    if (!currentScene || !selectedHotspot) return

    appendLog(`ACTION :: ${action.label}`)
    appendLog(action.description, 'warn')

    if (action.nextSceneId && sceneMap.has(action.nextSceneId)) {
      const nextScene = sceneMap.get(action.nextSceneId)
      appendLog(
        `ROUTE :: Linking to ${nextScene?.name ?? action.nextSceneId}`,
        'warn'
      )
      setCurrentSceneId(action.nextSceneId)
      setSelectedHotspotId(null)
    }
  }

  if (!currentScene) {
    return (
      <main className="hud-app">
        <section className="hud-log">
          <p>No scenes registered yet. Add one in src/data/scenes.ts.</p>
        </section>
      </main>
    )
  }

  const metrics = [
    {
      label: 'Hotspots',
      value: `${currentScene.hotspots.length} nodes`,
      percent: Math.min(currentScene.hotspots.length / 6, 1) * 100
    },
    {
      label: 'Actions',
      value: `${totalActions} options`,
      percent: Math.min(totalActions / 12, 1) * 100
    },
    {
      label: 'Branches',
      value: `${branchHotspots} exits`,
      percent: Math.min(branchHotspots / 4, 1) * 100
    }
  ]

  const fallbackStats = [
    ['Narrative', currentScene.narrative],
    ['Hotspots', `${currentScene.hotspots.length}`],
    ['Scene', currentScene.name],
    [
      'Branch',
      branchHotspots > 0 ? `${branchHotspots} possible` : 'Linear'
    ]
  ]

  const logVariantClass: Record<LogVariant, string> = {
    info: 'logLine--info',
    warn: 'logLine--warn',
    error: 'logLine--error'
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const millis = String(date.getMilliseconds()).padStart(3, '0')
    return `[00:${seconds}.${millis}]`
  }

  return (
    <main className="hud-app">
      <section className="hud-log" aria-label="CPU log">
        <div className="logHeader">
          <div>CPU LOG :: NEURAL CORE</div>
          <div className="status">
            <span className="dot" />
            <span>ONLINE</span>
          </div>
        </div>
        <div className="logBody">
          {log.map((entry) => (
            <p key={entry.id} className={`logLine ${logVariantClass[entry.variant]}`}>
              <span className="t">{formatTimestamp(entry.timestamp)}</span>{' '}
              <span className="k">{entry.message}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="hud-center" aria-label="POV">
        <SceneView
          scene={currentScene}
          selectedHotspotId={selectedHotspotId}
          onHotspotSelect={handleHotspotSelect}
        />
      </section>

      <section className="hud-panel" aria-label="HUD">
        <div className="hudHeader">
          <div>HUD :: ENVIRONMENT & TARGET</div>
          <div className="pill">
            MODE: {selectedHotspot ? selectedHotspot.name : 'PASSIVE'}
          </div>
        </div>
        <div className="hudBody">
          <div className="meters">
            {metrics.map((metric) => (
              <div key={metric.label} className="meter">
                <div className="label">{metric.label}</div>
                <div className="bar">
                  <span style={{ width: `${metric.percent}%` }} />
                </div>
                <div className="value">{metric.value}</div>
              </div>
            ))}
          </div>

          <div className="targetCard">
            <div className="targetTitle">
              <h3>
                TARGET:{' '}
                {selectedHotspot ? selectedHotspot.name : 'NONE'}
              </h3>
              <span className="pill">
                {selectedHotspot
                  ? `${selectedHotspot.actions.length} actions`
                  : '—'}
              </span>
            </div>
            <div className="kv">
              {(selectedHotspot
                ? [
                    ['Description', selectedHotspot.description],
                    [
                      'Branches',
                      selectedHotspot.actions.some(
                        (action) => action.nextSceneId
                      )
                        ? 'Possible'
                        : 'None'
                    ],
                    ['Scene', currentScene.name],
                    ['Hotspots', `${currentScene.hotspots.length}`]
                  ]
                : fallbackStats
              ).map(([key, value]) => (
                <div key={key}>
                  <span className="key">{key}:</span> {value}
                </div>
              ))}
            </div>
          </div>

          <div className="actions">
            {(selectedHotspot ? selectedHotspot.actions : []).map(
              (action) => (
                <button
                  key={action.id}
                  type="button"
                  className={`actionButton${
                    action.notes ? ' primary' : ''
                  }`}
                  onClick={() => handleActionTrigger(action)}
                >
                  <div>{action.label}</div>
                  <small>{action.description}</small>
                </button>
              )
            )}
            {!selectedHotspot ? (
              <p className="actions__empty">
                Select a hotspot to access its actions.
              </p>
            ) : null}
          </div>

          <label className="sceneSwitch">
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
      </section>
    </main>
  )
}

export default App
