import type { SceneDefinition } from "../../types/scenes";
import { addToInventory, setScene } from "../../effects/mutators";

const carGloveBox: SceneDefinition = {
  id: "car-glove-box",
  name: "Car Glove Box",
  description:
    "The glove box of the sedan, filled with various papers and small items.",
  imageSrc: "/scenes/chapter01/car-glove-box.png",
  interactions: [
    {
      label: "Close glove box",
      effect: setScene("storage-outside-car-inside"),
    },
  ],
  objects: [
    {
      id: "map",
      name: "City Map",
      description: "A folded map of the city, marked with various locations.",
      visible: (state) => !state.inventory.includes("city-map"),
      imageSrc: "/scenes/chapter01/car-glove-box-map.png",
      boundingBox: {
        x: 0.03,
        y: 0.33,
        width: 0.89,
        height: 0.36,
      },
      interactions: [
        {
          label: "Take map",
          effect: addToInventory("city-map"),
        },
      ],
    },
  ],
};

export default carGloveBox;
