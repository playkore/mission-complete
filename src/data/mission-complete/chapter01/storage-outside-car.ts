import type { SceneDefinition } from "../../../types/scenes";
import { setMessage, setScene } from "../../../effects/mutators";

const storageOutsideCar: SceneDefinition = {
  id: "storage-outside-car",
  name: "Storage Facility Approach",
  description:
    "Late afternoon outside a suburban storage facility. Fallen leaves collect near unit doors while an old sedan sits nearby, looking like it hasn't moved in days.",
  imageSrc: "/scenes/mission-complete/chapter01/storage-outside-car.png",
  interactions: [],
  objects: [
    {
      id: "car_001",
      name: "Sedan",
      description: "An old family sedan covered in a thin layer of dust. It looks like it's been sitting here for days, maybe longer. Definitely not winning any beauty contests.",
      boundingBox: {
        x: 0.65,
        y: 0.39,
        width: 0.35,
        height: 0.17,
      },
      interactions: [
        {
          label: "Get in car",
          effect: (state) => {
            if (state.inventory.includes("car-keys")) {
              return setScene("car-inside")(state);
            } 
            return setMessage("The car is locked. I need to find my keys.")(state);
          }
        },
      ],
    },
    {
      id: "storage_door_001",
      name: "Storage Unit Door",
      description: "A roll-up door leading into your rented unit. Because calling it 'home' would be generous.",
      boundingBox: {
        x: 0.22,
        y: 0.31,
        width: 0.19,
        height: 0.23,
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
