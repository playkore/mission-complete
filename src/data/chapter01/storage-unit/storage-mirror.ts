import type { SceneDefinition } from "../../../types/scenes";
import { setScene, setStateLook } from "../../../effects/mutators";

const storageMirror: SceneDefinition = {
  id: "storage-mirror",
  name: "Storage Mirror",
  description:
    "A wall-length mirror leans against the shelves, reflecting my determined expression. Or what passes for determination these days.",
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
      description: "A full-length mirror reflecting my stance. Looking perfectly neutral. How exciting.",
      imageSrc: "/scenes/chapter01/storage-mirror-neutral-male.png",
      visible: (gameState) => gameState.look === "neutral",
      boundingBox: {
        x: 0.16,
        y: 0.07,
        width: 0.65,
        height: 0.93,
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
      description: "A full-length mirror reflecting my happy stance. This smile won't last long, but let's enjoy it while it does.",
      imageSrc: "/scenes/chapter01/storage-mirror-happy-male.png",
      visible: (gameState) => gameState.look === "happy",
      boundingBox: {
        x: 0.16,
        y: 0.07,
        width: 0.65,
        height: 0.93,
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
      description: "A full-length mirror reflecting my angry stance. Yes, very intimidating. The storage unit is terrified.",
      imageSrc: "/scenes/chapter01/storage-mirror-angry-male.png",
      boundingBox: {
        x: 0.16,
        y: 0.07,
        width: 0.65,
        height: 0.93,
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
