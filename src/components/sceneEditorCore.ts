import type {
  SceneDefinition,
  SceneId,
  SceneObject,
} from "../types/scenes";

type SceneEditorOptions = {
  scenes: SceneDefinition[];
  initialSceneId: SceneId;
};

type DragState =
  | {
      id: string;
      mode: "move";
      startMouse: { x: number; y: number };
      startBox: SceneObject["boundingBox"];
    }
  | {
      id: string;
      mode: "resize";
      corner: "nw" | "ne" | "sw" | "se";
      startMouse: { x: number; y: number };
      startBox: SceneObject["boundingBox"];
    };

type DrawState = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const defaultImportBlock =
  'import type { SceneDefinition } from "../../types/scenes";';

export const initializeSceneEditor = (
  root: HTMLElement,
  options: SceneEditorOptions
) => {
  const { scenes, initialSceneId } = options;
  const sceneMap = new Map<SceneId, SceneDefinition>();
  scenes.forEach((scene) => sceneMap.set(scene.id, scene));

  const cleanupFns: Array<() => void> = [];

  const fallbackSceneId: SceneId = sceneMap.has(initialSceneId)
    ? initialSceneId
    : scenes[0]?.id ?? initialSceneId;

  const state = {
    image: {
      url: null as string | null,
      naturalWidth: 0,
      naturalHeight: 0,
    },
    scene: null as SceneDefinition | null,
    selectedObjectId: null as string | null,
    ui: {
      drawing: false,
      drawStart: null as DrawState | null,
      drawCurrent: null as DrawState | null,
      dragging: null as DragState | null,
    },
  };

  const makeEmptyScene = (seedId?: SceneId): SceneDefinition => ({
    id: seedId ?? fallbackSceneId,
    name: "New Scene",
    description: "",
    imageSrc: "",
    objects: [],
  });

  const q = <T extends HTMLElement>(selector: string): T => {
    const element = root.querySelector<T>(selector);
    if (!element) {
      throw new Error(`SceneEditor: Missing element ${selector}`);
    }
    return element;
  };

  const el = {
    sceneSelect: q<HTMLSelectElement>("#sceneSelect"),
    addObjectBtn: q<HTMLButtonElement>("#addObjectBtn"),
    deleteObjectBtn: q<HTMLButtonElement>("#deleteObjectBtn"),
    fitBtn: q<HTMLButtonElement>("#fitBtn"),
    clearSelBtn: q<HTMLButtonElement>("#clearSelBtn"),
    stageBadge: q<HTMLDivElement>("#stageBadge"),
    imageFrame: q<HTMLDivElement>("#imageFrame"),
    sceneImg: q<HTMLImageElement>("#sceneImg"),
    overlay: q<HTMLDivElement>("#overlay"),
    drawRect: q<HTMLDivElement>("#drawRect"),
    objectList: q<HTMLDivElement>("#objectList"),
    loadHint: q<HTMLDivElement>("#loadHint"),
    sceneId: q<HTMLInputElement>("#sceneId"),
    sceneName: q<HTMLInputElement>("#sceneName"),
    sceneDesc: q<HTMLTextAreaElement>("#sceneDesc"),
    sceneImageSrc: q<HTMLInputElement>("#sceneImageSrc"),
    noSelectionHint: q<HTMLDivElement>("#noSelectionHint"),
    objectEditor: q<HTMLDivElement>("#objectEditor"),
    objId: q<HTMLInputElement>("#objId"),
    objName: q<HTMLInputElement>("#objName"),
    objDesc: q<HTMLTextAreaElement>("#objDesc"),
    bbX: q<HTMLInputElement>("#bbX"),
    bbY: q<HTMLInputElement>("#bbY"),
    bbW: q<HTMLInputElement>("#bbW"),
    bbH: q<HTMLInputElement>("#bbH"),
    normalizeBtn: q<HTMLButtonElement>("#normalizeBtn"),
    copyCoordsBtn: q<HTMLButtonElement>("#copyCoordsBtn"),
    addInteractionBtn: q<HTMLButtonElement>("#addInteractionBtn"),
    interactionList: q<HTMLDivElement>("#interactionList"),
    tsPreview: q<HTMLTextAreaElement>("#tsPreview"),
    toast: q<HTMLDivElement>("#toast"),
    stageScroll: q<HTMLDivElement>("#stageScroll"),
  };

  const addListener = (
    target: HTMLElement | Document | Window,
    type: string,
    handler: EventListener
  ) => {
    target.addEventListener(type, handler);
    cleanupFns.push(() => target.removeEventListener(type, handler));
  };

  const toast = (msg: string, ms = 2200) => {
    el.toast.textContent = msg;
    el.toast.style.display = "block";
    window.clearTimeout((toast as any)._t);
    (toast as any)._t = window.setTimeout(
      () => (el.toast.style.display = "none"),
      ms
    );
  };

  const clamp01 = (n: number) => {
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(1, n));
  };
  const round4 = (n: number) => Math.round(n * 10000) / 10000;
  const deepClone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

  const getSelectedObject = (): SceneObject | null => {
    if (!state.scene || !state.selectedObjectId) return null;
    return (
      state.scene.objects.find((o) => o.id === state.selectedObjectId) || null
    );
  };

  const ensureScene = () => {
    if (!state.scene) {
      state.scene = makeEmptyScene();
    }
  };

  const pointerToImagePx = (clientX: number, clientY: number) => {
    const rect = el.sceneImg.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      w: rect.width,
      h: rect.height,
    };
  };

  const normToPx = (box: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    const rect = el.sceneImg.getBoundingClientRect();
    return {
      left: box.x * rect.width,
      top: box.y * rect.height,
      width: box.width * rect.width,
      height: box.height * rect.height,
    };
  };

  const toConstIdentifier = (id: string) => {
    const cleaned = id.replace(/[^A-Za-z0-9_$]/g, "_");
    if (!cleaned) return "scene";
    if (/^[0-9]/.test(cleaned)) {
      return `scene_${cleaned}`;
    }
    return cleaned;
  };

  const toTsValue = (value: unknown, indent = 0): string => {
    const pad = "  ".repeat(indent);
    const padIn = "  ".repeat(indent + 1);

    if (value === null) return "null";
    if (typeof value === "number")
      return Number.isFinite(value) ? String(value) : "null";
    if (typeof value === "boolean") return value ? "true" : "false";
    if (typeof value === "string") return JSON.stringify(value);
    if (Array.isArray(value)) {
      if (value.length === 0) return "[]";
      const items = value
        .map((item) => padIn + toTsValue(item, indent + 1))
        .join(",\n");
      return "[\n" + items + "\n" + pad + "]";
    }
    if (typeof value === "object" && value) {
      const keys = Object.keys(value as Record<string, unknown>);
      if (keys.length === 0) return "{}";
      const lines = keys
        .map((key) => {
          const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
            ? key
            : JSON.stringify(key);
          return (
            padIn + safeKey + ": " + toTsValue((value as any)[key], indent + 1)
          );
        })
        .join(",\n");
      return "{\n" + lines + "\n" + pad + "}";
    }
    return "undefined";
  };

  const sceneForPreview = () => {
    const s = deepClone(state.scene);
    if (!s) return makeEmptyScene();
    s.objects = (s.objects || []).map((obj) => {
      const bb = obj.boundingBox || {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
      obj.boundingBox = {
        x: round4(clamp01(bb.x)),
        y: round4(clamp01(bb.y)),
        width: round4(clamp01(bb.width)),
        height: round4(clamp01(bb.height)),
      };
      return obj;
    });
    return s;
  };

  const buildTsFile = (sceneObj: SceneDefinition) => {
    const varName = toConstIdentifier(sceneObj.id || "scene");
    const objTs = toTsValue(sceneObj, 0);
    return [
      defaultImportBlock,
      "",
      `const ${varName}: SceneDefinition = ${objTs};`,
      "",
      `export default ${varName};`,
      "",
    ].join("\n");
  };

  const updateTsPreview = () => {
    if (!state.scene) return;
    el.tsPreview.value = buildTsFile(sceneForPreview());
  };

  const refreshAll = ({ rerenderInteractions = true } = {}) => {
    ensureScene();
    if (!state.scene) return;

    const hasImage = Boolean(state.image.url);
    el.addObjectBtn.disabled = !state.scene;
    el.fitBtn.disabled = !hasImage;
    el.clearSelBtn.disabled = !state.scene;
    el.deleteObjectBtn.disabled = !getSelectedObject();

    if (hasImage) {
      el.imageFrame.style.display = "inline-block";
      const dims =
        state.image.naturalWidth && state.image.naturalHeight
          ? ` (${state.image.naturalWidth}×${state.image.naturalHeight})`
          : "";
      el.stageBadge.textContent = `Image loaded${dims}`;
    } else {
      el.imageFrame.style.display = "none";
      el.stageBadge.textContent = "No image";
    }

    el.loadHint.style.display =
      state.scene.objects.length === 0 && !state.selectedObjectId
        ? "block"
        : "none";

    el.sceneId.value = state.scene.id ?? "";
    el.sceneName.value = state.scene.name ?? "";
    el.sceneDesc.value = state.scene.description ?? "";
    el.sceneImageSrc.value = state.scene.imageSrc ?? "";

    el.objectList.innerHTML = "";
    for (const obj of state.scene.objects) {
      const card = document.createElement("div");
      card.className =
        "card" + (obj.id === state.selectedObjectId ? " selected" : "");
      card.onclick = () => {
        state.selectedObjectId = obj.id;
        refreshAll();
        scrollRectIntoView(obj.id);
      };
      const bb = obj.boundingBox || { x: 0, y: 0, width: 0, height: 0 };
      const pct = `x:${Math.round((bb.x || 0) * 100)}% y:${Math.round(
        (bb.y || 0) * 100
      )}% w:${Math.round((bb.width || 0) * 100)}% h:${Math.round(
        (bb.height || 0) * 100
      )}%`;
      card.innerHTML = `
        <div class="title">
          <strong>${escapeHtml(obj.name || obj.id || "(unnamed)")}</strong>
          <span class="mono">${escapeHtml(obj.id || "")}</span>
        </div>
        <div class="sub">${escapeHtml(obj.description || "")}</div>
        <div style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap;">
          <span class="badge mono">${pct}</span>
          <span class="badge">${
            obj.interactions?.length || 0
          } interactions</span>
        </div>
      `;
      el.objectList.appendChild(card);
    }

    renderRects();

    const selected = getSelectedObject();
    el.noSelectionHint.style.display = selected ? "none" : "block";
    el.objectEditor.style.display = selected ? "block" : "none";

    if (selected) {
      el.objId.value = selected.id ?? "";
      el.objName.value = selected.name ?? "";
      el.objDesc.value = selected.description ?? "";
      const bb =
        selected.boundingBox ||
        (selected.boundingBox = { x: 0.1, y: 0.1, width: 0.2, height: 0.2 });
      el.bbX.value = String(round4(bb.x ?? 0));
      el.bbY.value = String(round4(bb.y ?? 0));
      el.bbW.value = String(round4(bb.width ?? 0));
      el.bbH.value = String(round4(bb.height ?? 0));
      if (rerenderInteractions) renderInteractions(selected);
    } else if (rerenderInteractions) {
      el.interactionList.innerHTML = "";
    }

    updateTsPreview();
  };

  const renderRects = () => {
    el.overlay.innerHTML = "";
    if (!state.scene || !state.image.url) return;

    for (const obj of state.scene.objects) {
      const bb = obj.boundingBox || { x: 0, y: 0, width: 0, height: 0 };
      const rect = normToPx(bb);
      const div = document.createElement("div");
      div.className =
        "rect" + (obj.id === state.selectedObjectId ? " selected" : "");
      div.style.left = rect.left + "px";
      div.style.top = rect.top + "px";
      div.style.width = rect.width + "px";
      div.style.height = rect.height + "px";
      div.dataset.id = obj.id;

      const label = document.createElement("div");
      label.className = "label";
      label.textContent = obj.name || obj.id || "";
      div.appendChild(label);

      if (obj.id === state.selectedObjectId) {
        for (const corner of ["nw", "ne", "sw", "se"] as const) {
          const handle = document.createElement("div");
          handle.className = "handle " + corner;
          handle.dataset.corner = corner;
          handle.addEventListener("pointerdown", (event) =>
            startResize(event, obj.id, corner)
          );
          div.appendChild(handle);
        }
      }

      div.addEventListener("pointerdown", (event) => {
        if ((event.target as HTMLElement).classList.contains("handle")) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        state.selectedObjectId = obj.id;
        refreshAll();
        startMove(event, obj.id);
      });

      el.overlay.appendChild(div);
    }
  };

  const renderInteractions = (obj: SceneObject) => {
    el.interactionList.innerHTML = "";
    const interactions = obj.interactions || (obj.interactions = []);

    interactions.forEach((interaction, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.cursor = "default";
      card.innerHTML = `
        <div class="title">
          <strong>Interaction #${idx + 1}</strong>
          <span class="badge">${escapeHtml(
            interaction.effect?.type || "effect"
          )}</span>
        </div>
        <div style="margin-top:10px" class="field">
          <label>label</label>
          <input type="text" data-k="label" />
        </div>
        <div class="field">
          <label>effect (JSON)</label>
          <textarea class="mono" data-k="effect"></textarea>
        </div>
        <div class="row" style="gap:8px;">
          <button class="btn small danger" data-act="del">Delete</button>
          <button class="btn small" data-act="dup">Duplicate</button>
        </div>
      `;

      const labelInput = card.querySelector(
        'input[data-k="label"]'
      ) as HTMLInputElement;
      const effectTextarea = card.querySelector(
        'textarea[data-k="effect"]'
      ) as HTMLTextAreaElement;
      labelInput.value = interaction.label ?? "";
      effectTextarea.value = safeJsonStringify(interaction.effect ?? {}, 2);

      labelInput.addEventListener("input", () => {
        interaction.label = labelInput.value;
        updateTsPreview();
      });

      effectTextarea.addEventListener("input", () => {
        const txt = effectTextarea.value;
        try {
          interaction.effect = JSON.parse(txt);
          effectTextarea.style.borderColor = "rgba(34,197,94,0.45)";
        } catch {
          effectTextarea.style.borderColor = "rgba(245,158,11,0.55)";
        }
        updateTsPreview();
      });

      (card.querySelector('[data-act="del"]') as HTMLButtonElement).onclick =
        () => {
          interactions.splice(idx, 1);
          refreshAll();
          toast("Interaction deleted.");
        };

      (card.querySelector('[data-act="dup"]') as HTMLButtonElement).onclick =
        () => {
          interactions.splice(idx + 1, 0, deepClone(interaction));
          refreshAll();
          toast("Interaction duplicated.");
        };

      el.interactionList.appendChild(card);
    });
  };

  const scrollRectIntoView = (id: string) => {
    const node = el.overlay.querySelector(`.rect[data-id="${cssEscape(id)}"]`);
    if (!node) return;
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  const fitImage = () => {
    el.stageScroll.scrollTop = 0;
    el.stageScroll.scrollLeft = 0;
    toast("Fit: scroll reset.");
  };

  const startMove = (event: PointerEvent, id: string) => {
    const obj = state.scene?.objects.find((o) => o.id === id);
    if (!obj) return;
    const bb =
      obj.boundingBox ||
      (obj.boundingBox = { x: 0, y: 0, width: 0, height: 0 });
    const start = pointerToImagePx(event.clientX, event.clientY);
    state.ui.dragging = {
      id,
      mode: "move",
      startMouse: { x: start.x, y: start.y },
      startBox: deepClone(bb),
    };
    addWindowDragListeners();
  };

  const startResize = (
    event: PointerEvent,
    id: string,
    corner: "nw" | "ne" | "sw" | "se"
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const obj = state.scene?.objects.find((o) => o.id === id);
    if (!obj) return;
    const bb =
      obj.boundingBox ||
      (obj.boundingBox = { x: 0, y: 0, width: 0, height: 0 });
    const start = pointerToImagePx(event.clientX, event.clientY);
    state.ui.dragging = {
      id,
      mode: "resize",
      corner,
      startMouse: { x: start.x, y: start.y },
      startBox: deepClone(bb),
    };
    addWindowDragListeners();
  };

  const onDragMove = (event: PointerEvent) => {
    const drag = state.ui.dragging;
    if (!drag || !state.scene) return;
    const obj = state.scene.objects.find((o) => o.id === drag.id);
    if (!obj) return;
    const bb =
      obj.boundingBox ||
      (obj.boundingBox = { x: 0, y: 0, width: 0, height: 0 });
    const pointer = pointerToImagePx(event.clientX, event.clientY);
    const rect = el.sceneImg.getBoundingClientRect();
    const dx = (pointer.x - drag.startMouse.x) / rect.width;
    const dy = (pointer.y - drag.startMouse.y) / rect.height;

    if (drag.mode === "move") {
      bb.x = clamp01(drag.startBox.x + dx);
      bb.y = clamp01(drag.startBox.y + dy);
    } else {
      let left = drag.startBox.x;
      let top = drag.startBox.y;
      let right = drag.startBox.x + drag.startBox.width;
      let bottom = drag.startBox.y + drag.startBox.height;
      if (drag.corner === "nw") {
        left = drag.startBox.x + dx;
        top = drag.startBox.y + dy;
      }
      if (drag.corner === "ne") {
        right = drag.startBox.x + drag.startBox.width + dx;
        top = drag.startBox.y + dy;
      }
      if (drag.corner === "sw") {
        left = drag.startBox.x + dx;
        bottom = drag.startBox.y + drag.startBox.height + dy;
      }
      if (drag.corner === "se") {
        right = drag.startBox.x + drag.startBox.width + dx;
        bottom = drag.startBox.y + drag.startBox.height + dy;
      }
      const minSize = 0.005;
      const nl = Math.min(left, right - minSize);
      const nt = Math.min(top, bottom - minSize);
      const nr = Math.max(right, nl + minSize);
      const nb = Math.max(bottom, nt + minSize);
      bb.x = round4(clamp01(nl));
      bb.y = round4(clamp01(nt));
      bb.width = round4(clamp01(nr - nl));
      bb.height = round4(clamp01(nb - nt));
    }

    if (state.selectedObjectId === obj.id) {
      el.bbX.value = String(round4(bb.x));
      el.bbY.value = String(round4(bb.y));
      el.bbW.value = String(round4(bb.width));
      el.bbH.value = String(round4(bb.height));
    }

    renderRects();
    updateTsPreview();
  };

  const onDragEnd = () => {
    state.ui.dragging = null;
    window.removeEventListener("pointermove", onDragMove);
    window.removeEventListener("pointerup", onDragEnd);
    refreshAll({ rerenderInteractions: false });
  };

  const addWindowDragListeners = () => {
    window.addEventListener("pointermove", onDragMove);
    window.addEventListener("pointerup", onDragEnd, { once: true });
  };

  const escapeHtml = (value: string) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const safeJsonStringify = (obj: unknown, space = 2) => {
    try {
      return JSON.stringify(obj, null, space) ?? "{}";
    } catch {
      return "{}";
    }
  };

  const cssEscape = (value: string) =>
    String(value).replace(/["\\]/g, "\\$&");

  const loadSceneById = (sceneId: SceneId) => {
    const base = sceneMap.get(sceneId);
    state.scene = deepClone(base || makeEmptyScene(sceneId));
    state.selectedObjectId = null;
    if (sceneId !== el.sceneSelect.value) {
      el.sceneSelect.value = sceneId;
    }
    updateImageSource();
    refreshAll();
    toast(`Loaded scene: ${state.scene?.name || state.scene?.id || sceneId}`);
  };

  const updateImageSource = () => {
    if (!state.scene) return;
    const src = state.scene.imageSrc?.trim();
    if (src) {
      state.image.url = src;
      el.sceneImg.src = src;
    } else {
      state.image.url = null;
      el.sceneImg.removeAttribute("src");
    }
  };

  addListener(el.sceneImg, "load", () => {
    state.image.naturalWidth = el.sceneImg.naturalWidth;
    state.image.naturalHeight = el.sceneImg.naturalHeight;
    refreshAll({ rerenderInteractions: false });
  });

  addListener(el.sceneImg, "error", () => {
    state.image.url = null;
    refreshAll({ rerenderInteractions: false });
  });

  addListener(el.sceneSelect, "change", () => {
    const nextId = el.sceneSelect.value as SceneId;
    loadSceneById(nextId);
  });

  addListener(el.sceneId, "input", () => {
    ensureScene();
    if (!state.scene) return;
    state.scene.id = el.sceneId.value as SceneId;
    refreshAll();
  });
  addListener(el.sceneName, "input", () => {
    ensureScene();
    if (!state.scene) return;
    state.scene.name = el.sceneName.value;
    refreshAll();
  });
  addListener(el.sceneDesc, "input", () => {
    ensureScene();
    if (!state.scene) return;
    state.scene.description = el.sceneDesc.value;
    refreshAll();
  });
  addListener(el.sceneImageSrc, "input", () => {
    ensureScene();
    if (!state.scene) return;
    state.scene.imageSrc = el.sceneImageSrc.value;
    updateImageSource();
    refreshAll();
  });

  el.addObjectBtn.onclick = () => {
    ensureScene();
    const id = uniqId("region");
    const obj: SceneObject = {
      id,
      name: "New Region",
      description: "",
      boundingBox: { x: 0.1, y: 0.1, width: 0.2, height: 0.2 },
      interactions: [],
    };
    state.scene!.objects.push(obj);
    state.selectedObjectId = id;
    refreshAll();
    toast("Object added.");
  };

  el.deleteObjectBtn.onclick = () => {
    const selected = getSelectedObject();
    if (!selected || !state.scene) return;
    const idx = state.scene.objects.findIndex((o) => o.id === selected.id);
    if (idx >= 0) {
      state.scene.objects.splice(idx, 1);
    }
    state.selectedObjectId = null;
    refreshAll();
    toast("Object deleted.");
  };

  el.clearSelBtn.onclick = () => {
    state.selectedObjectId = null;
    refreshAll();
  };

  el.objId.addEventListener("input", () => {
    const selected = getSelectedObject();
    if (!selected || !state.scene) return;
    const oldId = selected.id;
    const newId = el.objId.value.trim();
    if (!newId) return;
    if (
      newId !== oldId &&
      state.scene.objects.some((obj) => obj.id === newId)
    ) {
      el.objId.style.borderColor = "rgba(245,158,11,0.55)";
      return;
    }
    el.objId.style.borderColor = "rgba(255,255,255,0.12)";
    selected.id = newId;
    state.selectedObjectId = newId;
    refreshAll();
  });

  addListener(el.objName, "input", () => {
    const selected = getSelectedObject();
    if (!selected) return;
    selected.name = el.objName.value;
    refreshAll();
  });

  addListener(el.objDesc, "input", () => {
    const selected = getSelectedObject();
    if (!selected) return;
    selected.description = el.objDesc.value;
    refreshAll();
  });

  const writeBoundingBoxFromInputs = () => {
    const selected = getSelectedObject();
    if (!selected) return;
    const bb =
      selected.boundingBox ||
      (selected.boundingBox = { x: 0, y: 0, width: 0, height: 0 });
    const x = Number(el.bbX.value);
    const y = Number(el.bbY.value);
    const w = Number(el.bbW.value);
    const h = Number(el.bbH.value);
    if ([x, y, w, h].some((n) => !Number.isFinite(n))) return;
    bb.x = x;
    bb.y = y;
    bb.width = w;
    bb.height = h;
    refreshAll();
  };

  [el.bbX, el.bbY, el.bbW, el.bbH].forEach((input) => {
    addListener(input, "input", writeBoundingBoxFromInputs);
  });

  el.normalizeBtn.onclick = () => {
    const selected = getSelectedObject();
    if (!selected) return;
    const bb =
      selected.boundingBox ||
      (selected.boundingBox = { x: 0, y: 0, width: 0, height: 0 });
    bb.x = clamp01(bb.x);
    bb.y = clamp01(bb.y);
    bb.width = clamp01(bb.width);
    bb.height = clamp01(bb.height);
    refreshAll();
    toast("Clamped to 0..1");
  };

  el.copyCoordsBtn.onclick = async () => {
    const selected = getSelectedObject();
    if (!selected) return;
    const bb = selected.boundingBox || { x: 0, y: 0, width: 0, height: 0 };
    const txt = `{ x: ${round4(bb.x)}, y: ${round4(
      bb.y
    )}, width: ${round4(bb.width)}, height: ${round4(bb.height)} }`;
    try {
      await navigator.clipboard.writeText(txt);
      toast("Copied boundingBox.");
    } catch {
      toast("Clipboard blocked by browser.");
    }
  };

  el.addInteractionBtn.onclick = () => {
    const selected = getSelectedObject();
    if (!selected) return;
    selected.interactions = selected.interactions || [];
    selected.interactions.push({
      label: "New interaction",
      effect: { type: "noop" } as any,
    });
    refreshAll();
    toast("Interaction added.");
  };

  const startDraw = (event: PointerEvent) => {
    if (!state.scene || !state.image.url) return;
    if (
      (event.target as HTMLElement).classList.contains("rect") ||
      (event.target as HTMLElement).classList.contains("handle")
    ) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const pointer = pointerToImagePx(event.clientX, event.clientY);
    if (
      pointer.x < 0 ||
      pointer.y < 0 ||
      pointer.x > pointer.w ||
      pointer.y > pointer.h
    ) {
      return;
    }
    state.ui.drawing = true;
    state.ui.drawStart = { x: pointer.x, y: pointer.y, width: 0, height: 0 };
    state.ui.drawCurrent = { x: pointer.x, y: pointer.y, width: 0, height: 0 };
    el.drawRect.style.display = "block";
    updateDrawRect();
    el.sceneImg.setPointerCapture(event.pointerId);
  };

  const handleDrawMove = (event: PointerEvent) => {
    if (!state.ui.drawing) return;
    const pointer = pointerToImagePx(event.clientX, event.clientY);
    if (state.ui.drawCurrent) {
      state.ui.drawCurrent.x = pointer.x;
      state.ui.drawCurrent.y = pointer.y;
    }
    updateDrawRect();
  };

  const endDraw = () => {
    if (!state.ui.drawing) return;
    state.ui.drawing = false;
    el.drawRect.style.display = "none";
    const start = state.ui.drawStart;
    const current = state.ui.drawCurrent;
    if (!start || !current || !state.scene) return;
    const left = Math.min(start.x, current.x);
    const top = Math.min(start.y, current.y);
    const width = Math.abs(start.x - current.x);
    const height = Math.abs(start.y - current.y);
    if (width < 8 || height < 8) {
      toast("Too small — draw a bigger rectangle.");
      return;
    }
    const rect = el.sceneImg.getBoundingClientRect();
    const bb = {
      x: clamp01(left / rect.width),
      y: clamp01(top / rect.height),
      width: clamp01(width / rect.width),
      height: clamp01(height / rect.height),
    };
    const id = uniqId("region");
    const obj: SceneObject = {
      id,
      name: "New Region",
      description: "",
      boundingBox: {
        x: round4(bb.x),
        y: round4(bb.y),
        width: round4(bb.width),
        height: round4(bb.height),
      },
      interactions: [],
    };
    state.scene.objects.push(obj);
    state.selectedObjectId = id;
    refreshAll();
    toast("Region created.");
  };

  const updateDrawRect = () => {
    const start = state.ui.drawStart;
    const current = state.ui.drawCurrent;
    if (!start || !current) return;
    const left = Math.min(start.x, current.x);
    const top = Math.min(start.y, current.y);
    const width = Math.abs(start.x - current.x);
    const height = Math.abs(start.y - current.y);
    el.drawRect.style.left = left + "px";
    el.drawRect.style.top = top + "px";
    el.drawRect.style.width = width + "px";
    el.drawRect.style.height = height + "px";
  };

  const uniqId = (prefix = "obj") => {
    ensureScene();
    const base = prefix.replace(/[^a-z0-9_-]/gi, "_");
    const ids = new Set((state.scene?.objects || []).map((o) => o.id));
    let index = 1;
    let candidate = base;
    while (ids.has(candidate)) {
      candidate = `${base}_${index++}`;
    }
    return candidate;
  };

  addListener(el.sceneImg, "pointerdown", (event) =>
    startDraw(event as PointerEvent)
  );
  addListener(window, "pointermove", (event) => {
    if (state.ui.drawing) {
      handleDrawMove(event as PointerEvent);
    }
  });
  addListener(el.sceneImg, "pointerup", () => {
    if (state.ui.drawing) {
      endDraw();
    }
  });

  el.fitBtn.onclick = fitImage;

  const defaultSceneId = fallbackSceneId;
  loadSceneById(defaultSceneId);
  el.sceneSelect.value = defaultSceneId;
  toast("Use the selector to edit a scene, then copy the TS preview.", 3200);

  return () => {
    cleanupFns.forEach((fn) => fn());
    window.removeEventListener("pointermove", onDragMove);
    window.removeEventListener("pointerup", onDragEnd);
  };
};
