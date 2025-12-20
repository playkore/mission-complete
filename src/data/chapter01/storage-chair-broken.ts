import type { SceneDefinition } from "../../types/scenes";

const storageChairBroken: SceneDefinition = {
  id: "storage-chair-broken",
  name: "Storage Unit — Broken Chair",
  description: "The center of the unit is dominated by a splintered wooden chair surrounded by dust and old shelving.",
  imageSrc: "/scenes/chapter01/storage-chair-broken.png",
  objects: [
    {
      id: "broken_chair",
      name: "Splintered Chair",
      description: "The chair is broken. Obviously. I've been sitting on it for months. And I'm in no way a lightweight person. If I can call myself a person.",
      boundingBox: {
        x: 0.3075,
        y: 0.6164,
        width: 0.2653,
        height: 0.3072
      },
      interactions: [
        {
          label: "Try to fix the chair",
          effect: {
            type: "fix_chair"
          }
        }
      ]
    },
    {
      id: "rear_shelves",
      name: "Stocked Shelves",
      description: "Shelving packed with... a lot of things.",
      boundingBox: {
        x: 0.2057,
        y: 0.14,
        width: 0.493,
        height: 0.3506
      },
      interactions: [
        {
          label: "Inspect the workbench wall",
          effect: {
            type: "change_scene",
            sceneId: "storage-vcr"
          }
        }
      ]
    },
    {
      id: "hall_light",
      name: "Hall Toward Exit",
      description: "Exit is that way. Hard to miss.",
      boundingBox: {
        x: 0.8212,
        y: 0.0183,
        width: 0.1707,
        height: 0.9764
      },
      interactions: [
        {
          label: "Walk toward the exit door",
          effect: {
            type: "change_scene",
            sceneId: "storage-exit"
          }
        }
      ]
    },
    {
      id: "storage-mirror",
      name: "The waill with an old mirror",
      description: "There is a wall to my left. Nothing remarcable, except for an old mirror. The mirrors still works, probably. This kind of technology is hard to break.",
      boundingBox: {
        x: 0.0192,
        y: 0.0289,
        width: 0.1734,
        height: 0.9681
      },
      interactions: [
        {
          label: "Turn to the mirror",
          effect: {
            type: "change_scene",
            sceneId: "storage-mirror"
          }
        }
      ]
    }
  ]
};

export default storageChairBroken;
