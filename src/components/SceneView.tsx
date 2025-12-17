import { useEffect, useMemo, useState } from 'react'
import type { SceneAction, SceneDefinition, SceneHotspot } from '../types'
import './SceneView.css'

export interface SceneViewProps {
  scene: SceneDefinition
  onActionSelect: (
    sceneId: string,
    hotspot: SceneHotspot,
    action: SceneAction
  ) => void
}

const SceneView = ({ scene, onActionSelect }: SceneViewProps) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)

  const hotspotById = useMemo(() => {
    return new Map(scene.hotspots.map((hotspot) => [hotspot.id, hotspot]))
  }, [scene.hotspots])

  useEffect(() => {
    setSelectedHotspot(null)
  }, [scene.id])

  const openHotspot = (id: string) => {
    setSelectedHotspot((current) => (current === id ? null : id))
  }

  const handleActionClick = (
    hotspot: SceneHotspot,
    action: SceneAction
  ): void => {
    onActionSelect(scene.id, hotspot, action)
    setSelectedHotspot(null)
  }

  const activeHotspot = selectedHotspot
    ? hotspotById.get(selectedHotspot)
    : null

  return (
    <figure className="scene-view">
      <div
        className="scene-view__image"
        role="img"
        aria-label={scene.narrative}
        style={{ backgroundImage: `url(${scene.imageSrc})` }}
      >
        {scene.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            className={`scene-view__hotspot${
              selectedHotspot === hotspot.id ? ' is-active' : ''
            }`}
            style={{
              left: `${hotspot.region.x}%`,
              top: `${hotspot.region.y}%`,
              width: `${hotspot.region.width}%`,
              height: `${hotspot.region.height}%`
            }}
            onClick={() => openHotspot(hotspot.id)}
          >
            <span className="sr-only">{hotspot.name}</span>
          </button>
        ))}
        {activeHotspot ? (
          <div className="scene-view__actions">
            <header>
              <p className="scene-view__actions-label">Interact with</p>
              <h3>{activeHotspot.name}</h3>
              <p className="scene-view__actions-description">
                {activeHotspot.description}
              </p>
            </header>
            <ul>
              {activeHotspot.actions.map((action) => (
                <li key={action.id}>
                  <button
                    type="button"
                    onClick={() => handleActionClick(activeHotspot, action)}
                  >
                    <strong>{action.label}</strong>
                    <span>{action.description}</span>
                    {action.notes ? (
                      <em className="scene-view__action-note">
                        {action.notes}
                      </em>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <figcaption>
        <p>{scene.narrative}</p>
      </figcaption>
    </figure>
  )
}

export default SceneView
