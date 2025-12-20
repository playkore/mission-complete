import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageChairBroken: SceneDefinition = {
  id: "storage-chair-broken",
  name: "Storage Unit — Broken Chair",
  description:
    "The center of the unit is occupied by a splintered wooden chair. It appears to have lost the will to exist. Dust and aging shelves complete the composition.",
  imageSrc: "/scenes/chapter01/storage-chair-broken.png",
  objects: [
    {
      id: "broken_chair",
      name: "Splintered Chair",
      description:
        "The chair is broken. This conclusion required minimal analysis. I have been sitting on it for months. I am not lightweight. At least, not by human standards. Classification pending.",
      boundingBox: {
        x: 0.3075,
        y: 0.6164,
        width: 0.2653,
        height: 0.3072,
      },
      interactions: [
        {
          label: "Try to fix the chair",
          effect: (state) => {
            if (state.inventory.includes("duct_tape")) {
              return {
                ...state,
                isChairFixed: true,
              };
            } else {
              return {
                ...state,
                message: "I need something to fix the chair with.",
              }
            }
          },
        },
      ],
    },
    {
      id: "rear_shelves",
      name: "Stocked Shelves",
      description:
        "Shelves densely packed with objects. Most of them useless. Some of them familiar. None of them labeled, of course.",
      boundingBox: {
        x: 0.2057,
        y: 0.14,
        width: 0.493,
        height: 0.3506,
      },
      interactions: [
        {
          label: "Inspect the shelves",
          effect: setScene("storage-shelf-car-keys"),
        },
      ],
    },
    {
      id: "hall_light",
      name: "Hall Toward the Exit",
      description:
        "The exit is in that direction. Bright. Inviting. Almost suspiciously obvious.",
      boundingBox: {
        x: 0.8212,
        y: 0.1031,
        width: 0.1588,
        height: 0.8384,
      },
      interactions: [
        {
          label: "Walk toward the exit door",
          effect: setScene("storage-exit"),
        },
      ],
    },
    {
      id: "storage-mirror",
      name: "Wall with an Old Mirror",
      description:
        "A wall to my left. Mostly unremarkable. An old mirror is mounted there, stubbornly intact. Simple reflective technology tends to survive longer than people.",
      boundingBox: {
        x: 0.0192,
        y: 0.1083,
        width: 0.1764,
        height: 0.8194,
      },
      interactions: [
        {
          label: "Turn toward the mirror",
          effect: setScene("storage-mirror"),
        },
      ],
    },
  ],
};

export default storageChairBroken;
