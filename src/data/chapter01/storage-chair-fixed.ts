import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageChairFixed: SceneDefinition = {
  id: "storage-chair-fixed",
  name: "Storage Unit — Chair Repaired",
  description:
    "After a liberal application of duct tape the chair stands proud once again in the dusty storage unit.",
  imageSrc: "/scenes/chapter01/storage-chair-fixed.png",
  objects: [
    {
      id: "repaired_chair",
      name: "Mended Chair",
      description: "Freshly mended chair wrapped in duct tape.",
      boundingBox: { x: 0.4, y: 0.48, width: 0.24, height: 0.32 },
      interactions: [
        {
          label: "Admire your handiwork",
          effect: setScene("storage-mirror"),
        },
      ],
    },
    {
      id: "taped_legs",
      name: "Wrapped Legs",
      description: "Chair legs reinforced with overlapping strips of tape.",
      boundingBox: { x: 0.42, y: 0.64, width: 0.18, height: 0.22 },
      interactions: [
        {
          label: "Double-check the supplies",
          effect: setScene("storage-vcr"),
        },
      ],
    },
    {
      id: "hall_light_fixed",
      name: "Hall Toward Exit",
      description: "Hallway flooded with warm light toward the exit.",
      boundingBox: { x: 0.66, y: 0.14, width: 0.28, height: 0.64 },
      interactions: [
        {
          label: "Head toward the exit",
          effect: setScene("storage-exit"),
        },
      ],
    },
  ],
};

export default storageChairFixed;
