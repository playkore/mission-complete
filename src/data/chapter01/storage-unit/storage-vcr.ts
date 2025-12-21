import type { SceneDefinition } from "../../../types/scenes";
import { addToInventory, setScene } from "../../../effects/mutators";

const storageVcr: SceneDefinition = {
  id: "storage-vcr",
  name: "Workbench & VCR",
  description:
    "A dusty workbench holds a VCR surrounded by tools, extension cords, and paint cans.",
  imageSrc: "/scenes/chapter01/storage-vcr.png",
  interactions: [
    {
      label: "Turn left",
      effect: setScene("storage-mirror"),
    },
    {
      label: "Turn right",
      effect: setScene("storage-exit"),
    },
  ],
  objects: [
    {
      id: "duct_tape",
      name: "Duct Tape",
      description:
        "Reliable, gray, and ready to fix anything that's more stubborn than it should be. The universal solution to problems that probably needed actual repair.",
      imageSrc: "/scenes/chapter01/storage-vcr-duct-tape.png",
      visible: (state) => !state.inventory.includes("duct-tape"),
      boundingBox: {
        x: 0.54,
        y: 0.44,
        width: 0.24,
        height: 0.09,
      },
      interactions: [
        {
          label: "Pick up duct tape",
          effect: addToInventory("duct-tape"),
        },
      ],
    },
  ],
};

export default storageVcr;
