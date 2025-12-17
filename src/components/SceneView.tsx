import type { SceneDefinition, SceneHotspot } from '../types'
import './SceneView.css'

export interface SceneViewProps {
  scene: SceneDefinition
  selectedHotspotId: string | null
  onHotspotSelect: (hotspot: SceneHotspot) => void
}

const SceneView = ({
  scene,
  selectedHotspotId,
  onHotspotSelect
}: SceneViewProps) => {
  return (
    <div className="povWrap" aria-label={`Scene ${scene.name}`}>
      <div className="pov">
        <img src={scene.imageSrc} alt={scene.narrative} draggable="false" />
        <div className="hudGrid" aria-hidden="true" />
        <div className="vfx" aria-hidden="true" />

        {scene.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            className={`hitbox${
              selectedHotspotId === hotspot.id ? ' selected' : ''
            }`}
            style={{
              left: `${hotspot.region.x}%`,
              top: `${hotspot.region.y}%`,
              width: `${hotspot.region.width}%`,
              height: `${hotspot.region.height}%`
            }}
            onClick={() => onHotspotSelect(hotspot)}
          >
            <span className="tag">{hotspot.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SceneView
