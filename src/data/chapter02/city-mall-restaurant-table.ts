import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const cityMallRestaurantTable: SceneDefinition = {
  id: "city-mall-restaurant-table",
  name: "Restaurant Table",
  description:
    "A fancy restaurant table inside the city mall. The ambiance is perfect for a quiet meal.",
  imageSrc: "/scenes/chapter02/city-mall-restaurant-table.png",
  interactions: [
    {
      label: "Stand up and leave",
      effect: setScene("city-map"),
    },
  ],
  objects: [],
};

export default cityMallRestaurantTable;
