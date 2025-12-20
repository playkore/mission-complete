import { useEffect, useRef } from "react";
import { scenes } from "../data/scenes";
import type { SceneId } from "../types/scenes";
import { initializeSceneEditor } from "./sceneEditorCore";
import "./SceneEditor.css";

const resolveSceneImage = (src: string) => {
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) {
    return src;
  }

  const normalized = src.startsWith("/") ? src.slice(1) : src;
  const rawBase = import.meta.env.BASE_URL ?? "/";
  const basePath = rawBase === "" ? "/" : rawBase;
  return `${basePath.replace(/\/+$/, "")}/${normalized}`;
};

const editorScenes = scenes.map((scene) => ({
  ...scene,
  imageSrc: resolveSceneImage(scene.imageSrc),
}));

type SceneEditorProps = {
  initialSceneId: SceneId;
  onClose: () => void;
};

const SceneEditor = ({ initialSceneId, onClose }: SceneEditorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initializeSceneEditor(containerRef.current, {
      scenes: editorScenes,
      initialSceneId,
    });
    return cleanup;
  }, [initialSceneId]);

  return (
    <div className="sceneEditorOverlay">
      <div className="sceneEditor" ref={containerRef}>
        <button
          type="button"
          className="sceneEditorCloseButton"
          onClick={onClose}
        >
          Close
        </button>
        <div className="app">
          <div className="topbar">
            <div className="pill">
              <strong style={{ color: "var(--text)" }}>
                Scene TS Visual Editor
              </strong>
              <span>— draw + edit regions</span>
            </div>
            <div className="sceneSelectWrap">
              <label htmlFor="sceneSelect">Scene</label>
              <select id="sceneSelect" defaultValue={initialSceneId}>
                {scenes.map((scene) => (
                  <option key={scene.id} value={scene.id}>
                    {scene.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="spacer" />
            <div className="pill">
              <span className="kbd">Drag</span> move ·
              <span className="kbd">Handles</span> resize ·
              <span className="kbd">Empty space</span> draw new
            </div>
          </div>

          <section className="panel">
            <header>
              <h2>Objects</h2>
              <div
                className="row"
                style={{ justifyContent: "flex-end", gap: 8, flex: "0 0 auto" }}
              >
                <button id="addObjectBtn" className="btn small primary">
                  + Object
                </button>
              </div>
            </header>
            <div className="content">
              <div className="hint" id="loadHint">
                Select a scene above to begin editing. Use <strong>+ Object</strong>{" "}
                after drawing or to add placeholders.
              </div>
              <div className="list" id="objectList" />
            </div>
          </section>

          <section className="panel">
            <header>
              <h2>Stage</h2>
              <div
                className="row"
                style={{ justifyContent: "flex-end", gap: 8, flex: "0 0 auto" }}
              >
                <span className="badge" id="stageBadge">
                  No image
                </span>
              </div>
            </header>

            <div className="stageWrap">
              <div className="stageToolbar">
                <button id="fitBtn" className="btn small">
                  Fit
                </button>
                <button id="clearSelBtn" className="btn small">
                  Clear selection
                </button>
                <div className="spacer" />
                <span className="hint">
                  Rectangles use normalized coords:
                  <span className="mono"> x,y,width,height</span> in 0..1
                </span>
              </div>

              <div className="stage" id="stageScroll">
                <div className="imageFrame" id="imageFrame" style={{ display: "none" }}>
                  <img id="sceneImg" alt="Scene" />
                  <div className="overlay" id="overlay" />
                  <div className="drawRect" id="drawRect" style={{ display: "none" }} />
                </div>
              </div>
            </div>
          </section>

          <section className="panel">
            <header>
              <h2>Editor</h2>
              <div
                className="row"
                style={{ justifyContent: "flex-end", gap: 8, flex: "0 0 auto" }}
              >
                <button id="deleteObjectBtn" className="btn small danger">
                  Delete
                </button>
              </div>
            </header>
            <div className="content">
              <div className="hint" style={{ marginBottom: 10 }}>
                Edit scene + selected object fields. Interactions’
                <span className="mono"> effect</span> is edited as JSON. Copy the TS
                from the preview at the bottom.
              </div>

              <div className="hr" />

              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: 13,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: 0.2,
                }}
              >
                Scene
              </h3>

              <div className="field">
                <label htmlFor="sceneId">id</label>
                <input id="sceneId" type="text" />
              </div>
              <div className="field">
                <label htmlFor="sceneName">name</label>
                <input id="sceneName" type="text" />
              </div>
              <div className="field">
                <label htmlFor="sceneDesc">description</label>
                <textarea id="sceneDesc" />
              </div>
              <div className="field">
                <label htmlFor="sceneImageSrc">
                  imageSrc (string in TS file; keep your project path)
                </label>
                <input id="sceneImageSrc" type="text" />
              </div>

              <div className="hr" />

              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: 13,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: 0.2,
                }}
              >
                Selected object
              </h3>

              <div className="hint" id="noSelectionHint">
                No object selected. Click a rectangle or an object on the left.
              </div>

              <div id="objectEditor" style={{ display: "none" }}>
                <div className="field">
                  <label htmlFor="objId">id</label>
                  <input id="objId" type="text" />
                </div>
                <div className="field">
                  <label htmlFor="objName">name</label>
                  <input id="objName" type="text" />
                </div>
                <div className="field">
                  <label htmlFor="objDesc">description</label>
                  <textarea id="objDesc" />
                </div>

                <div className="split">
                  <div className="field">
                    <label htmlFor="bbX">x</label>
                    <input id="bbX" type="text" className="mono" />
                  </div>
                  <div className="field">
                    <label htmlFor="bbY">y</label>
                    <input id="bbY" type="text" className="mono" />
                  </div>
                  <div className="field">
                    <label htmlFor="bbW">width</label>
                    <input id="bbW" type="text" className="mono" />
                  </div>
                  <div className="field">
                    <label htmlFor="bbH">height</label>
                    <input id="bbH" type="text" className="mono" />
                  </div>
                </div>

                <div className="row" style={{ gap: 8, marginTop: 8 }}>
                  <button id="normalizeBtn" className="btn small">
                    Clamp 0..1
                  </button>
                  <button id="copyCoordsBtn" className="btn small">
                    Copy coords
                  </button>
                </div>

                <div className="hr" />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: 0.2,
                    }}
                  >
                    Interactions
                  </h3>
                  <button id="addInteractionBtn" className="btn small primary">
                    + Interaction
                  </button>
                </div>

                <div
                  id="interactionList"
                  className="list"
                  style={{ marginTop: 10 }}
                />
              </div>

              <div className="hr" />

              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: 13,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: 0.2,
                }}
              >
                TS Preview
              </h3>
              <div className="field">
                <label className="hint">Copy this into your .ts file.</label>
                <textarea
                  id="tsPreview"
                  className="mono"
                  style={{ minHeight: 220 }}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="toast" id="toast" />
      </div>
    </div>
  );
};

export default SceneEditor;
