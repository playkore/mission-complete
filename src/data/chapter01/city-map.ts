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
  objects: [],
};

export default cityMap;
