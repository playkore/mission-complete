import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageExit: SceneDefinition = {
  id: "storage-exit",
  name: "Storage Exit Door",
  description:
    "An industrial metal door marked EXIT bleeds warm light through the crack at the bottom. Freedom is just beyond this door. Or at least a parking lot.",
  imageSrc: "/scenes/chapter01/storage-exit.png",
  interactions: [
    {
      label: "Turn left",
      effect: setScene("storage-vcr"),
    },
    {
      label: "Turn right",
      effect: setScene("storage-back"),
    },
  ],
  objects: [
    {
      id: "exit_door",
      name: "Exit Door",
      description: "A heavy steel door that opens to the parking lot. Your gateway to the thrilling world of asphalt and painted lines.",
      boundingBox: {
        x: 0.34,
        y: 0.18,
        width: 0.33,
        height: 0.42,
      },
      interactions: [
        {
          label: "Step outside",
          effect: setScene("storage-outside-car"),
        },
      ],
    },
  ],
};

export default storageExit;
