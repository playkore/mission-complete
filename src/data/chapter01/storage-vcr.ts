import type { SceneDefinition } from "../../types/scenes";
import { setScene } from "../../effects/mutators";

const storageVcr: SceneDefinition = {
  id: "storage-vcr",
  name: "Workbench & VCR",
  description:
    "A dusty workbench holds a VCR surrounded by tools, extension cords, and paint cans.",
  imageSrc: "/scenes/chapter01/storage-vcr.png",
  interactions: [
    {
      label: "Turn left",
      effect: setScene("storage-mirror"),
    },
    {
      label: "Turn right",
      effect: setScene("storage-exit"),
    },
  ],
  objects: [],
};

export default storageVcr;
