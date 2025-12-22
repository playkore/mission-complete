import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const cityMap: SceneDefinition = {
  id: "city-map",
  name: "City Map",
  description:
    "A detailed map of the city, showing various landmarks and routes. Unfortunately, this is the end of the demo. Thanks for playing!",
  imageSrc: "/scenes/chapter01/city-map.png",
  interactions: [
    {
      label: "Close map",
      effect: setScene("storage-outside-car-inside"),
    },
  ],
  objects: [
    {
      id: "storages",
      name: "Storage Units",
      description: "",
      boundingBox: {
        x: 0.02,
        y: 0.06,
        width: 0.41,
        height: 0.17,
      },
      interactions: [
        {
          label: "Go to Storage Units",
          effect: setScene("storage-outside-car-inside"),
        },
      ],
    },
    {
      id: "city-mall",
      name: "City Mall",
      description: "",
      boundingBox: {
        x: 0.53,
        y: 0.06,
        width: 0.47,
        height: 0.22,
      },
      interactions: [
        {
          label: "Go to City Mall",
          effect: setScene("city-mall-restaurant-table"),
        },
      ],
    },
  ],
};

export default cityMap;
