import type { SceneDefinition } from "../../types/scenes";

const storeEntrance: SceneDefinition = {
  id: "store-entrance",
  name: "Grocery Store Entrance",
  description:
    "A festive supermarket entryway greets customers with pumpkins, produce, and a Halloween banner.",
  imageSrc: "/scenes/chapter01/store-entrance.png",
  objects: [
    {
      id: "pumpkin_display",
      name: "Pumpkin Sale",
      description: "Pumpkin sale piled up beside the entrance.",
      boundingBox: { x: 0.42, y: 0.38, width: 0.22, height: 0.32 },
      interactions: [
        {
          label: "Push the cart inside",
          effect: { type: "change_scene", sceneId: "store-hardware" },
        },
      ],
    },
    {
      id: "shopping_cart",
      name: "Shopping Cart",
      description: "Shopping cart waiting for a push down the aisles.",
      boundingBox: { x: 0.32, y: 0.68, width: 0.36, height: 0.3 },
      interactions: [
        {
          label: "Head down the hardware aisle",
          effect: { type: "change_scene", sceneId: "store-hardware" },
        },
      ],
    },
    {
      id: "exit_to_lot",
      name: "Sliding Doors",
      description: "Automatic doors sliding back out to the lot.",
      boundingBox: { x: 0.02, y: 0.22, width: 0.2, height: 0.62 },
      interactions: [
        {
          label: "Return to the car",
          effect: {
            type: "change_scene",
            sceneId: "storage-outside-car",
          },
        },
      ],
    },
  ],
};

export default storeEntrance;
