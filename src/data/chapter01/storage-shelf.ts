import type { SceneDefinition } from "../../types/scenes";
import { addToInventory, setScene } from "../../effects/mutators";

const storageShelf: SceneDefinition = {
  id: "storage-shelf-car-keys",
  name: "Shelf",
  description:
    "A cluttered shelf inside the storage unit. Among the assorted items, your car keys are clearly visible.",
  imageSrc: "/scenes/chapter01/storage-shelf.png",
  interactions: [
    {
      label: "Get back",
      effect: setScene("storage-back"),
    },
  ],
  objects: [
    {
      id: "car-keys",
      name: "Car keys",
      description: "Old merceides car keys",
      imageSrc: "/scenes/chapter01/storage-shelf-car-keys.png",
      visible: (state) => !state.inventory.includes("car-keys"),
      boundingBox: {
        x: 0.37,
        y: 0.61,
        width: 0.32,
        height: 0.2,
      },
      interactions: [
        {
          label: "Take",
          effect: addToInventory("car-keys"),
        },
      ],
    },
    {
      id: "storage_back_area",
      name: "Storage back area",
      description: "",
      boundingBox: {
        x: 0.78,
        y: 0.06,
        width: 0.2,
        height: 0.94,
      },
      interactions: [
        {
          label: "Get back",
          effect: setScene("storage-back"),
        },
      ],
    },
  ],
};

export default storageShelf;
