import type { SceneDefinition } from "../../types/scenes";
import { setMessage, setScene } from "../../effects/mutators";

const storageOutsideCarInside: SceneDefinition = {
  id: "storage-outside-car-inside",
  name: "Inside The Car",
  description:
    "Inside the dusty sedan parked outside the storage facility. The engine is off, the keys are in the ignition, and everything smells vaguely of regret and old upholstery.",
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
      description: "The steering wheel of the car. Surprisingly, it can still be used to drive. Who would have thought?",
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
            return setMessage("Where do I go? I need a map. Now, where would I store something important? Probably somewhere inconvenient.")(state);
          },
        },
      ],
    },
    {
      id: "rearview_mirror",
      name: "Rear View Mirror",
      description: "A rear-view mirror aligned toward the storage row behind you. Perfect for reflecting on poor life choices.",
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
