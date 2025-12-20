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
  ],
  objects: [
    {
      id: "steering-wheel",
      name: "Steering Wheel",
      description: "The steering wheel of the car. Can be used to drive.",
      boundingBox: {
        x: 0.03,
        y: 0.48,
        width: 0.38,
        height: 0.52,
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
      id: "glove_box",
      name: "Glove Box",
      description: "Glove compartment stuffed with paperwork.",
      boundingBox: {
        x: 0.61,
        y: 0.7,
        width: 0.39,
        height: 0.18,
      },
      interactions: [
        {
          label: "Look in the glove box",
          effect: setScene("car-glove-box"),
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
      interactions: [],
    },
  ],
};

export default storageOutsideCarInside;
