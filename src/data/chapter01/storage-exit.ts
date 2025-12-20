import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageExit: SceneDefinition = {
  id: "storage-exit",
  name: "Storage Exit Door",
  description:
    "An industrial metal door marked EXIT bleeds warm light through the crack at the floor.",
  imageSrc: "/scenes/chapter01/storage-exit.png",
  objects: [
    {
      id: "exit_door",
      name: "Exit Door",
      description: "Heavy steel door that opens to the parking lot.",
      boundingBox: {
        x: 0.34,
        y: 0.18,
        width: 0.29,
        height: 0.66,
      },
      interactions: [
        {
          label: "Step outside",
          effect: setScene("storage-outside-car"),
        },
        {
          label: "Return deeper inside",
          effect: setScene("storage-chair-broken"),
        },
      ],
    },
  ],
};

export default storageExit;
