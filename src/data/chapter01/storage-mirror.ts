import type { SceneDefinition } from "../../types/scenes";

const storageMirror: SceneDefinition = {
  id: "storage-mirror",
  name: "Storage Mirror",
  description: "A wall-length mirror leans against the shelves, reflecting your determined expression.",
  imageSrc: "/scenes/chapter01/storage-mirror.png",
  objects: [
    {
      id: "mirror_frame",
      name: "Full-Length Mirror",
      description: "Full-length mirror reflecting your stance.",
      boundingBox: {
        x: 0.1878,
        y: 0.0008,
        width: 0.4694,
        height: 0.995
      },
      interactions: [
        {
          label: "Practice a tough stare",
          effect: {
            type: "change_scene",
            sceneId: "storage-mirror-angry"
          }
        }
      ]
    },
    {
      id: "doorway_glow",
      name: "Doorway",
      description: "Backlit doorway inviting you toward the corridor.",
      boundingBox: {
        x: 0.6978,
        y: 0.0102,
        width: 0.293,
        height: 0.979
      },
      interactions: [
        {
          label: "Walk toward the exit",
          effect: {
            type: "change_scene",
            sceneId: "storage-exit"
          }
        }
      ]
    },
    {
      id: "shelf_edge",
      name: "Side Shelves",
      description: "Side shelves stacked with crates and bins.",
      boundingBox: {
        x: 0.0051,
        y: 0.0099,
        width: 0.1574,
        height: 0.9788
      },
      interactions: [
        {
          label: "Check on the chair",
          effect: {
            type: "change_scene",
            sceneId: "storage-chair-broken"
          }
        }
      ]
    }
  ]
};

export default storageMirror;
