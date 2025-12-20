import type { SceneDefinition } from "../../types/scenes";
import { addToInventory } from "../../effects/mutators";

const storageShelf: SceneDefinition = {
  id: "storage-shelf-car-keys",
  name: "Shelf",
  description:
    "A cluttered shelf inside the storage unit. Among the assorted items, your car keys are clearly visible.",
  imageSrc: "/scenes/chapter01/storage-shelf.png",
  objects: [
    {
      id: "car-keys",
      name: "Car keys",
      description: "Old merceides car keys",
      imageSrc: "/scenes/chapter01/storage-shelf-car-keys.png",
      visible: (state) => !state.inventory.includes("car-keys"),
      boundingBox: {
        x: 0.37,
        y: 0.6,
        width: 0.36,
        height: 0.21,
      },
      interactions: [
        {
          label: "Take",
          effect: addToInventory("car-keys"),
        },
      ],
    },
  ],
};

export default storageShelf;
