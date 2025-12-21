import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const carLookRight: SceneDefinition = {
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
  objects: [
    {
      id: "glove_box",
      name: "Glove box",
      description: "The glove box is slightly ajar. This is a very old car.",
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
