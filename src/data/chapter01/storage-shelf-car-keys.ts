import type { SceneDefinition } from "../../types/scenes";

const storageShelfCarKeys: SceneDefinition = {
  id: "storage-shelf-car-keys",
  name: "Shelf with Car Keys",
  description:
    "A cluttered shelf inside the storage unit. Among the assorted items, your car keys are clearly visible.",
  imageSrc: "/scenes/chapter01/storage-shelf-car-keys.png",
  objects: [
    {
      id: "car-keys",
      name: "Car keys",
      description: "Old merceides car keys",
      boundingBox: {
        x: 0.37,
        y: 0.6,
        width: 0.36,
        height: 0.21,
      },
      interactions: [
        {
          label: "Take",
          effect: {
            type: "change_scene",
            sceneId: "storage-shelf-car-keys",
          },
        },
      ],
    },
  ],
};

export default storageShelfCarKeys;
