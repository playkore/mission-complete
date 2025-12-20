import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageOutsideCarInside: SceneDefinition = {
  id: "storage-outside-car-inside",
  name: "Inside The Car",
  description:
    "Inside the sedan parked outside the storage facility. The engine is off, and the keys are in the ignition.",
  imageSrc: "/scenes/chapter01/storage-outside-car-inside.png",
  interactions: [
    {
      label: "Step back outside",
      effect: setScene("storage-outside-car"),
    },
  ],
  objects: [
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Dusty dashboard with the ignition and gauges.",
      boundingBox: {
        x: 0.03,
        y: 0.48,
        width: 0.38,
        height: 0.52,
      },
      interactions: [
        {
          label: "Drive over to the store",
          effect: setScene("store-entrance"),
        },
      ],
    },
    {
      id: "glove_box",
      name: "Glove Box",
      description: "Glove compartment stuffed with paperwork.",
      boundingBox: {
        x: 0.62,
        y: 0.78,
        width: 0.35,
        height: 0.08,
      },
      interactions: [
        {
          label: "Look in the glove box",
          effect: setScene("storage-outside-car"),
        },
      ],
    },
    {
      id: "rearview_mirror",
      name: "Rear View Mirror",
      description: "Mirror aligned toward the storage row behind you.",
      boundingBox: {
        x: 0.44,
        y: 0.14,
        width: 0.21,
        height: 0.1,
      },
      interactions: [
        {
          label: "Check the storage unit",
          effect: setScene("storage-back"),
        },
      ],
    },
  ],
};

export default storageOutsideCarInside;
