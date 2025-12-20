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
      boundingBox: { x: 0.34, y: 0.18, width: 0.32, height: 0.54 },
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
    {
      id: "keypad",
      name: "Security Keypad",
      description: "Security keypad waiting for the entry code.",
      boundingBox: { x: 0.63, y: 0.34, width: 0.06, height: 0.12 },
      interactions: [
        {
          label: "Unlock the unit",
          effect: setScene("storage-chair-broken"),
        },
      ],
    },
    {
      id: "exit_sign",
      name: "Exit Sign",
      description: "Red EXIT sign humming above the doorway.",
      boundingBox: { x: 0.42, y: 0.05, width: 0.16, height: 0.08 },
      interactions: [
        {
          label: "Head back to the lot",
          effect: setScene("storage-outside-car"),
        },
      ],
    },
  ],
};

export default storageExit;
