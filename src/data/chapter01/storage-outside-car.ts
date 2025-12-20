import type { SceneDefinition } from "../../types/scenes";
import { setMessage, setScene } from "../../effects/mutators";

const storageOutsideCar: SceneDefinition = {
  id: "storage-outside-car",
  name: "Storage Facility Approach",
  description:
    "Late afternoon outside a suburban storage facility. Fallen leaves collect near unit doors while a sedan idles nearby.",
  imageSrc: "/scenes/chapter01/storage-outside-car.png",
  interactions: [],
  objects: [
    {
      id: "car_001",
      name: "Sedan",
      description: "Family sedan idling outside the storage facility.",
      boundingBox: {
        x: 0.64,
        y: 0.27,
        width: 0.36,
        height: 0.34,
      },
      interactions: [
        {
          label: "Get in car",
          effect: (state) => {
            if (state.inventory.includes("car-keys")) {
              return setScene("storage-outside-car-inside")(state);
            } 
            return setMessage("The car is locked. I need to find my keys.")(state);
          }
        },
      ],
    },
    {
      id: "storage_door_001",
      name: "Storage Unit Door",
      description: "Roll-up door leading into your rented unit.",
      boundingBox: {
        x: 0.22,
        y: 0.13,
        width: 0.19,
        height: 0.43,
      },
      interactions: [
        {
          label: "Get inside the storage unit",
          effect: setScene("storage-back"),
        },
      ],
    },
  ],
};

export default storageOutsideCar;
