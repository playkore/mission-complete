import type { SceneDefinition } from "../../types/scenes";

const storageMirrorAngry: SceneDefinition = {
  id: "storage-mirror-angry",
  name: "Storage Mirror — Angry",
  description:
    "Your reflection mirrors your frustration with crossed arms and a glare.",
  imageSrc: "/scenes/chapter01/storage-mirror-angry.png",
  objects: [
    {
      id: "angry_reflection",
      name: "Defiant Reflection",
      description: "Reflection showing your fiercest expression.",
      boundingBox: { x: 0.18, y: 0.08, width: 0.44, height: 0.8 },
      interactions: [
        {
          label: "Take a calming breath",
          effect: { type: "change_scene", sceneId: "storage-mirror" },
        },
      ],
    },
    {
      id: "doorway_shadow",
      name: "Doorway",
      description: "Shadowed doorway stretching toward the exit.",
      boundingBox: { x: 0.6, y: 0.16, width: 0.26, height: 0.72 },
      interactions: [
        {
          label: "Storm toward the exit",
          effect: { type: "change_scene", sceneId: "storage-exit" },
        },
      ],
    },
  ],
};

export default storageMirrorAngry;
