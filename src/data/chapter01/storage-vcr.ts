import type { SceneDefinition } from "../../types/scenes";

const storageVcr: SceneDefinition = {
  id: "storage-vcr",
  name: "Workbench & VCR",
  description:
    "A dusty workbench holds a VCR surrounded by tools, extension cords, and paint cans.",
  imageSrc: "/scenes/chapter01/storage-vcr.png",
  objects: [
    {
      id: "vcr_player",
      name: "VCR Deck",
      description: "Old VCR hooked up on the workbench.",
      boundingBox: {
        x: 0.4391943705673759,
        y: 0.5926908798758864,
        width: 0.3365780141843972,
        height: 0.20688885195035478,
      },
      interactions: [
        {
          label: "Head back to the chair",
          effect: {
            type: "change_scene",
            sceneId: "storage-chair-broken",
          },
        },
      ],
    },
    {
      id: "tool_wall",
      name: "Hanging Tools",
      description: "Pegboard wall lined with well-worn tools.",
      boundingBox: {
        x: 0.16,
        y: 0.1,
        width: 0.625434581855792,
        height: 0.46106382978723404,
      },
      interactions: [],
    },
    {
      id: "exit-door",
      name: "Turn right",
      description: "The exit door is to my right.",
      boundingBox: {
        x: 0.8,
        y: 0.11,
        width: 0.2,
        height: 0.69,
      },
      interactions: [],
    },
  ],
};

export default storageVcr;
