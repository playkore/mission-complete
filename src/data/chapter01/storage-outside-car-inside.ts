import type { SceneDefinition } from "../../types/scenes";
import { setMessage, setScene } from "../../effects/mutators";

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
    {
      label: "Look right",
      effect: setScene("car-look-right"),
    },
  ],
  objects: [
    {
      id: "steering-wheel",
      name: "Steering Wheel",
      description: "The steering wheel of the car. Can be used to drive.",
      boundingBox: {
        x: 0.01,
        y: 0.48,
        width: 0.6,
        height: 0.41,
      },
      interactions: [
        {
          label: "Drive",
          effect: (state) => {
            if (state.inventory.includes("city-map")) {
              return setScene("city-map")(state);
            }
            return setMessage("Where do I go? I need a map. I'm wondering where do I store it?")(state);
          },
        },
      ],
    },
    {
      id: "rearview_mirror",
      name: "Rear View Mirror",
      description: "Mirror aligned toward the storage row behind you.",
      boundingBox: {
        x: 0.69,
        y: 0.2,
        width: 0.31,
        height: 0.1,
      },
      interactions: [],
    },
  ],
};

export default storageOutsideCarInside;
