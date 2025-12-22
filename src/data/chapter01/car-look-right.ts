import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const carLookRight: SceneDefinition = {
  id: "car-look-right",
  name: "Inside The Car",
  description: "Looking to my right, I see the glove box slightly ajar. At least something in this car still opens.",
  imageSrc: "/scenes/chapter01/car-look-right.png",
  interactions: [
    {
      label: "Look left",
      effect: setScene("car-inside"),
    },
  ],
  objects: [
    {
      id: "glove_box",
      name: "Glove box",
      description: "The glove box is slightly ajar. This is a very old car. The kind that has character, which is code for 'falling apart'.",
      boundingBox: {
        x: 0,
        y: 0.38,
        width: 0.56,
        height: 0.27,
      },
      interactions: [
        {
          label: "Open",
          effect: setScene("car-glove-box"),
        },
      ],
    },
  ],
};

export default carLookRight;
