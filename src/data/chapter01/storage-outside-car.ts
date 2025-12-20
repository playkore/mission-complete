import type { SceneDefinition } from "../../types/scenes";

const storageOutsideCar: SceneDefinition = {
  id: "storage-outside-car",
  name: "Storage Facility Approach",
  description:
    "Late afternoon outside a suburban storage facility. Fallen leaves collect near unit doors while a sedan idles nearby.",
  imageSrc: "/scenes/chapter01/storage-outside-car.png",
  objects: [
    {
      id: "car_001",
      name: "Sedan",
      description: "Family sedan idling outside the storage facility.",
      boundingBox: { x: 0.66, y: 0.31, width: 0.34, height: 0.28 },
      interactions: [
        {
          label: "Get in car",
          effect: {
            type: "change_scene",
            sceneId: "storage-outside-car-inside",
          },
        },
      ],
    },
    {
      id: "storage_door_001",
      name: "Storage Unit Door",
      description: "Roll-up door leading into your rented unit.",
      boundingBox: { x: 0, y: 0.06, width: 0.14, height: 0.54 },
      interactions: [
        {
          label: "Get inside the storage unit",
          effect: { type: "change_scene", sceneId: "storage-chair-broken" },
        },
      ],
    },
    {
      id: "storage_door_002",
      name: "Storage Unit Door",
      description: "Neighboring unit door with a rusted latch.",
      boundingBox: { x: 0.25, y: 0.15, width: 0.13, height: 0.36 },
      interactions: [],
    },
    {
      id: "wood_pallets_001",
      name: "Wooden Pallets",
      description: "Stack of loose pallets leaning near the curb.",
      boundingBox: { x: 0.2, y: 0.37, width: 0.13, height: 0.22 },
      interactions: [],
    },
    {
      id: "bush_001",
      name: "Overgrown Bush",
      description: "Overgrown shrub creeping toward the driveway.",
      boundingBox: { x: 0.4, y: 0.37, width: 0.09, height: 0.12 },
      interactions: [],
    },
  ],
};

export default storageOutsideCar;
