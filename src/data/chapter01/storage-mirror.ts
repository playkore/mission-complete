import type { SceneDefinition } from "../../types/scenes";
import { setScene, setStateLook } from "../../effects/mutators";

const storageMirror: SceneDefinition = {
  id: "storage-mirror",
  name: "Storage Mirror",
  description:
    "A wall-length mirror leans against the shelves, reflecting your determined expression.",
  imageSrc: "/scenes/chapter01/storage-mirror.png",
  interactions: [
    {
      label: "Turn left",
      effect: setScene("storage-back"),
    },
    {
      label: "Turn right",
      effect: setScene("storage-vcr"),
    },
  ],
  objects: [
    {
      id: "mirror_frame_neutral",
      name: "My reflection",
      description: "Full-length mirror reflecting my stance.",
      imageSrc: "public/scenes/chapter01/storage-mirror-neutral-male.png",
      visible: (gameState) => gameState.look === "neutral",
      boundingBox: {
        x: 0.1878,
        y: 0.0008,
        width: 0.4694,
        height: 0.995,
      },
      interactions: [
        {
          label: "Practice a tough stare",
          effect: setStateLook("angry"),
        },
        {
          label: "Smile at myself",
          effect: setStateLook("happy"),
        },
      ],
    },
    {
      id: "mirror_frame_happy",
      name: "My reflection",
      description: "Full-length mirror reflecting my happy stance.",
      imageSrc: "public/scenes/chapter01/storage-mirror-happy-male.png",
      visible: (gameState) => gameState.look === "happy",
      boundingBox: {
        x: 0.1878,
        y: 0.0008,
        width: 0.4694,
        height: 0.995,
      },
      interactions: [
        {
          label: "Practice a tough stare",
          effect: setStateLook("angry"),
        },
        {
          label: "Calm down",
          effect: setStateLook("neutral"),
        },
      ],
    },
    {
      id: "mirror_frame_angry",
      name: "My reflection",
      description: "Full-length mirror reflecting my angry stance.",
      imageSrc: "public/scenes/chapter01/storage-mirror-angry-male.png",
      boundingBox: {
        x: 0.1878,
        y: 0.0008,
        width: 0.4694,
        height: 0.995,
      },
      visible: (gameState) => gameState.look === "angry",
      interactions: [
        {
          label: "Calm down",
          effect: setStateLook("neutral"),
        },
        {
          label: "Smile at myself",
          effect: setStateLook("happy"),
        },
      ],
    },
  ],
};

export default storageMirror;
