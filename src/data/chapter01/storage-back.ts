import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageBack: SceneDefinition = {
  id: "storage-back",
  name: "Storage Unit Back Area",
  description:
    "The center of the unit is occupied by a splintered wooden chair. It appears to have lost the will to exist. Dust and aging shelves complete the composition.",
  imageSrc: "/scenes/chapter01/storage-back.png",
  interactions: [
    {
      label: "Turn left",
      effect: setScene("storage-exit"),
    },
    {
      label: "Turn right",
      effect: setScene("storage-mirror"),
    },
  ],
  objects: [
    {
      id: "broken_chair",
      name: "Splintered Chair",
      description:
        "The chair is broken. This conclusion required minimal analysis. I have been sitting on it for months. I am not lightweight. At least, not by human standards. Classification pending.",
      imageSrc: "/scenes/chapter01/storage-back-chair-broken.png",
      visible: (state) => !state.chairFixed,
      boundingBox: {
        x: 0.13,
        y: 0.45,
        width: 0.75,
        height: 0.31,
      },
      interactions: [
        {
          label: "Try to fix the chair",
          effect: (state) => {
            if (state.inventory.includes("duct-tape")) {
              return {
                ...state,
                isChairFixed: true,
              };
            } else {
              return {
                ...state,
                message: "I need something to fix the chair with.",
              };
            }
          },
        },
      ],
    },
    {
      id: "fixed_chair",
      name: "Chair",
      description:
        "The chair has been fixed. It is now safe to sit on it again. Comfort levels have not improved significantly.",
      imageSrc: "/scenes/chapter01/storage-back-chair-fixed.png",
      visible: (state) => state.chairFixed,
      boundingBox: {
        x: 0.3,
        y: 0.31,
        width: 0.45,
        height: 0.48,
      },
      interactions: [],
    },
    {
      id: "rear_shelf",
      name: "Stocked Shelf",
      description:
        "Shelf densely packed with objects. Most of them useless. Some of them familiar. None of them labeled, of course.",
      boundingBox: {
        x: 0,
        y: 0.04,
        width: 1,
        height: 0.23,
      },
      interactions: [
        {
          label: "Inspect the shelves",
          effect: setScene("storage-shelf-car-keys"),
        },
      ],
    },
  ],
};

export default storageBack;
