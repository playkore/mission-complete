import type { SceneDefinition } from "../../types/scenes";

const storeHardwareDucttape: SceneDefinition = {
  id: "store-hardware-ducttape",
  name: "Hardware Aisle — Duct Tape",
  description:
    "A pair of duct tape rolls sit proudly in the cart, mission accomplished.",
  imageSrc: "/scenes/chapter01/store-hardware-ducttape.png",
  objects: [
    {
      id: "duct_tape_rolls",
      name: "Heavy Duty Duct Tape",
      description: "Pair of heavy-duty duct tape rolls resting in the cart.",
      boundingBox: { x: 0.42, y: 0.54, width: 0.22, height: 0.2 },
      interactions: [
        {
          label: "Wheel back to the aisle",
          effect: { type: "change_scene", sceneId: "store-hardware" },
        },
      ],
    },
    {
      id: "hardware_exit",
      name: "Aisle Exit",
      description: "Pathway at the aisle's end leading toward the lot.",
      boundingBox: { x: 0.32, y: 0.72, width: 0.34, height: 0.24 },
      interactions: [
        {
          label: "Return to the car with supplies",
          effect: {
            type: "change_scene",
            sceneId: "storage-outside-car",
          },
        },
      ],
    },
    {
      id: "right_shelf_detail",
      name: "Hardware Shelves",
      description: "Right-hand shelving crammed with hardware odds and ends.",
      boundingBox: { x: 0.64, y: 0.2, width: 0.3, height: 0.56 },
      interactions: [
        {
          label: "Survey the rest of the tools",
          effect: { type: "change_scene", sceneId: "store-hardware" },
        },
      ],
    },
  ],
};

export default storeHardwareDucttape;
