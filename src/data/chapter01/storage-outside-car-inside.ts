import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageOutsideCarInside: SceneDefinition = {
  id: "storage-outside-car-inside",
  name: "Inside The Car",
  description:
    "Inside the sedan parked outside the storage facility. The engine is off, and the keys are in the ignition.",
  imageSrc: "/scenes/chapter01/storage-outside-car-inside.png",
  interactions: [],
  objects: [
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Dusty dashboard with the ignition and gauges.",
      boundingBox: { x: 0.22, y: 0.56, width: 0.32, height: 0.32 },
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
      boundingBox: { x: 0.52, y: 0.6, width: 0.34, height: 0.28 },
      interactions: [
        {
          label: "Step back outside",
          effect: setScene("storage-outside-car"),
        },
      ],
    },
    {
      id: "rearview_mirror",
      name: "Rear View Mirror",
      description: "Mirror aligned toward the storage row behind you.",
      boundingBox: { x: 0.44, y: 0.28, width: 0.12, height: 0.08 },
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
