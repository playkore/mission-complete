import type { SceneDefinition } from "../../types/scenes";

const storageChairBroken: SceneDefinition = {
  id: "storage-chair-broken",
  name: "Storage Unit — Broken Chair",
  description:
    "The center of the unit is dominated by a splintered wooden chair surrounded by dust and old shelving.",
  imageSrc: "/scenes/chapter01/storage-chair-broken.png",
  objects: [
    {
      id: "broken_chair",
      name: "Splintered Chair",
      description: "Splintered wooden chair missing several slats.",
      boundingBox: { x: 0.37, y: 0.52, width: 0.26, height: 0.34 },
      interactions: [
        {
          label: "Try to fix the chair",
          effect: { type: "fix_chair" },
        },
      ],
    },
    {
      id: "rear_shelves",
      name: "Stocked Shelves",
      description: "Shelving packed with boxes and forgotten supplies.",
      boundingBox: { x: 0.08, y: 0.14, width: 0.53, height: 0.5 },
      interactions: [
        {
          label: "Inspect the workbench wall",
          effect: { type: "change_scene", sceneId: "storage-vcr" },
        },
      ],
    },
    {
      id: "hall_light",
      name: "Hall Toward Exit",
      description: "Narrow hallway glowing toward the exit.",
      boundingBox: { x: 0.66, y: 0.14, width: 0.28, height: 0.64 },
      interactions: [
        {
          label: "Walk toward the exit door",
          effect: { type: "change_scene", sceneId: "storage-exit" },
        },
      ],
    },
  ],
};

export default storageChairBroken;
