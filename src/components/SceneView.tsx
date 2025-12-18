import type { MouseEvent as ReactMouseEvent } from "react";
import type { SceneDefinition, SceneObject } from "../types";
import "./SceneView.css";

export interface SceneViewProps {
  scene: SceneDefinition;
  selectedObjectId: string | null;
  onObjectSelect: (sceneObject: SceneObject | null) => void;
}

const SceneView = ({
  scene,
  selectedObjectId,
  onObjectSelect,
}: SceneViewProps) => {
  const imageSrc = resolveSceneImage(scene.imageSrc);

  const handleSceneClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button.hitbox")) {
      return;
    }
    onObjectSelect(null);
  };

  return (
    <div className="povWrap" aria-label={`Scene ${scene.name}`}>
      <div className="pov" onClick={handleSceneClick}>
        <img
          src={imageSrc}
          alt={scene.description ?? scene.name}
          draggable="false"
        />
        <div className="hudGrid" aria-hidden="true" />
        <div className="vfx" aria-hidden="true" />

        {scene.objects.map((sceneObject) => (
          <button
            key={sceneObject.id}
            type="button"
            className={`hitbox${
              selectedObjectId === sceneObject.id ? " selected" : ""
            }`}
            style={{
              left: `${sceneObject.boundingBox.x * 100}%`,
              top: `${sceneObject.boundingBox.y * 100}%`,
              width: `${sceneObject.boundingBox.width * 100}%`,
              height: `${sceneObject.boundingBox.height * 100}%`,
            }}
            onClick={() => onObjectSelect(sceneObject)}
          >
            <span className="tag">{sceneObject.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SceneView;

const resolveSceneImage = (src: string) => {
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) {
    return src;
  }

  const normalized = src.startsWith("/") ? src.slice(1) : src;
  const rawBase = import.meta.env.BASE_URL ?? "/";
  const basePath = rawBase === "" ? "/" : rawBase;
  return `${basePath.replace(/\/+$/, "")}/${normalized}`;
};
