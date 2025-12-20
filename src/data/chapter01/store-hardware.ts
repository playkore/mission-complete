import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storeHardware: SceneDefinition = {
  id: "store-hardware",
  name: "Hardware Aisle",
  description:
    "The aisle is lined with power tools, pliers, batteries, and anything else one could need.",
  imageSrc: "/scenes/chapter01/store-hardware.png",
  objects: [
    {
      id: "tape_shelf",
      name: "Adhesives Section",
      description: "Aisle section dedicated to adhesives and tapes.",
      boundingBox: { x: 0.64, y: 0.2, width: 0.3, height: 0.58 },
      interactions: [
        {
          label: "Grab duct tape",
          effect: setScene("store-hardware-ducttape"),
        },
      ],
    },
    {
      id: "tool_wall_left",
      name: "Power Tools",
      description: "Display of power tools buzzing with energy.",
      boundingBox: { x: 0.04, y: 0.18, width: 0.38, height: 0.6 },
      interactions: [
        {
          label: "Head back to the entrance",
          effect: setScene("store-entrance"),
        },
      ],
    },
    {
      id: "hardware_cart",
      name: "Cart Handle",
      description: "Cart handle inviting another lap around the store.",
      boundingBox: { x: 0.34, y: 0.68, width: 0.32, height: 0.28 },
      interactions: [
        {
          label: "Return to the workbench",
          effect: setScene("storage-vcr"),
        },
      ],
    },
  ],
};

export default storeHardware;
