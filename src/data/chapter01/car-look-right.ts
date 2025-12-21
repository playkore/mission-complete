import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageOutsideCarInside: SceneDefinition = {
  id: "car-look-right",
  name: "Inside The Car",
  description: "I look to my right and see the glove box slightly ajar.",
  imageSrc: "/scenes/chapter01/car-look-right.png",
  interactions: [
    {
      label: "Look left",
      effect: setScene("storage-outside-car-inside"),
    },
  ],
  objects: [],
};

export default storageOutsideCarInside;
