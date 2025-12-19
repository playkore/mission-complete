import type { SceneDefinition } from "../types/scenes";

export const scenes: SceneDefinition[] = [
  {
    id: "storage-outside-car",
    name: "Storage Facility Approach",
    description:
      "Late afternoon outside a suburban storage facility. Fallen leaves collect near unit doors while a sedan idles nearby.",
    imageSrc: "/scenes/chapter01/storage-outside-car.png",
    objects: [
      {
        id: "car_001",
        name: "Sedan",
        description: "Family sedan idling outside the storage facility.",
        boundingBox: { x: 0.66, y: 0.31, width: 0.34, height: 0.28 },
        interactions: [
          {
            label: "Get in car",
            effect: {
              type: "change_scene",
              sceneId: "storage-outside-car-inside",
            },
          },
        ],
      },
      {
        id: "storage_door_001",
        name: "Storage Unit Door",
        description: "Roll-up door leading into your rented unit.",
        boundingBox: { x: 0, y: 0.06, width: 0.14, height: 0.54 },
        interactions: [
          {
            label: "Get inside the storage unit",
            effect: { type: "change_scene", sceneId: "storage" },
          },
        ],
      },
      {
        id: "storage_door_002",
        name: "Storage Unit Door",
        description: "Neighboring unit door with a rusted latch.",
        boundingBox: { x: 0.25, y: 0.15, width: 0.13, height: 0.36 },
        interactions: [],
      },
      {
        id: "wood_pallets_001",
        name: "Wooden Pallets",
        description: "Stack of loose pallets leaning near the curb.",
        boundingBox: { x: 0.2, y: 0.37, width: 0.13, height: 0.22 },
        interactions: [],
      },
      {
        id: "bush_001",
        name: "Overgrown Bush",
        description: "Overgrown shrub creeping toward the driveway.",
        boundingBox: { x: 0.4, y: 0.37, width: 0.09, height: 0.12 },
        interactions: [],
      },
    ],
  },
  {
    id: "storage-outside-car-inside",
    name: "Inside The Car",
    description:
      "Inside the sedan parked outside the storage facility. The engine is off, and the keys are in the ignition.",
    imageSrc: "/scenes/chapter01/storage-outside-car-inside.png",
    objects: [
      {
        id: "dashboard",
        name: "Dashboard",
        description: "Dusty dashboard with the ignition and gauges.",
        boundingBox: { x: 0.22, y: 0.56, width: 0.32, height: 0.32 },
        interactions: [
          {
            label: "Drive over to the store",
            effect: { type: "change_scene", sceneId: "store-entrance" },
          },
        ],
      },
      {
        id: "glove_box",
        name: "Glove Box",
        description: "Glove compartment stuffed with paperwork.",
        boundingBox: { x: 0.52, y: 0.6, width: 0.34, height: 0.28 },
        interactions: [
          {
            label: "Step back outside",
            effect: {
              type: "change_scene",
              sceneId: "storage-outside-car",
            },
          },
        ],
      },
      {
        id: "rearview_mirror",
        name: "Rear View Mirror",
        description: "Mirror aligned toward the storage row behind you.",
        boundingBox: { x: 0.44, y: 0.28, width: 0.12, height: 0.08 },
        interactions: [
          {
            label: "Check the storage unit",
            effect: { type: "change_scene", sceneId: "storage" },
          },
        ],
      },
    ],
  },
  {
    id: "storage-chair-broken",
    name: "Storage Unit — Broken Chair",
    description:
      "The center of the unit is dominated by a splintered wooden chair surrounded by dust and old shelving.",
    imageSrc: "/scenes/chapter01/storage-chair-broken.png",
    objects: [
      {
        id: "broken_chair",
        name: "Splintered Chair",
        description: "Splintered wooden chair missing several slats.",
        boundingBox: { x: 0.37, y: 0.52, width: 0.26, height: 0.34 },
        interactions: [
          {
            label: "Try to fix the chair",
            effect: { type: "fix_chair" },
          },
        ],
      },
      {
        id: "rear_shelves",
        name: "Stocked Shelves",
        description: "Shelving packed with boxes and forgotten supplies.",
        boundingBox: { x: 0.08, y: 0.14, width: 0.53, height: 0.5 },
        interactions: [
          {
            label: "Inspect the workbench wall",
            effect: { type: "change_scene", sceneId: "storage-vcr" },
          },
        ],
      },
      {
        id: "hall_light",
        name: "Hall Toward Exit",
        description: "Narrow hallway glowing toward the exit.",
        boundingBox: { x: 0.66, y: 0.14, width: 0.28, height: 0.64 },
        interactions: [
          {
            label: "Walk toward the exit door",
            effect: { type: "change_scene", sceneId: "storage-exit" },
          },
        ],
      },
    ],
  },
  {
    id: "storage-chair-fixed",
    name: "Storage Unit — Chair Repaired",
    description:
      "After a liberal application of duct tape the chair stands proud once again in the dusty storage unit.",
    imageSrc: "/scenes/chapter01/storage-chair-fixed.png",
    objects: [
      {
        id: "repaired_chair",
        name: "Mended Chair",
        description: "Freshly mended chair wrapped in duct tape.",
        boundingBox: { x: 0.4, y: 0.48, width: 0.24, height: 0.32 },
        interactions: [
          {
            label: "Admire your handiwork",
            effect: { type: "change_scene", sceneId: "storage-mirror" },
          },
        ],
      },
      {
        id: "taped_legs",
        name: "Wrapped Legs",
        description: "Chair legs reinforced with overlapping strips of tape.",
        boundingBox: { x: 0.42, y: 0.64, width: 0.18, height: 0.22 },
        interactions: [
          {
            label: "Double-check the supplies",
            effect: { type: "change_scene", sceneId: "storage-vcr" },
          },
        ],
      },
      {
        id: "hall_light_fixed",
        name: "Hall Toward Exit",
        description: "Hallway flooded with warm light toward the exit.",
        boundingBox: { x: 0.66, y: 0.14, width: 0.28, height: 0.64 },
        interactions: [
          {
            label: "Head toward the exit",
            effect: { type: "change_scene", sceneId: "storage-exit" },
          },
        ],
      },
    ],
  },
  {
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
            effect: { type: "change_scene", sceneId: "storage-outside-car" },
          },
          {
            label: "Return deeper inside",
            effect: { type: "change_scene", sceneId: "storage" },
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
            effect: { type: "change_scene", sceneId: "storage" },
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
            effect: {
              type: "change_scene",
              sceneId: "storage-outside-car",
            },
          },
        ],
      },
    ],
  },
  {
    id: "storage-mirror",
    name: "Storage Mirror",
    description:
      "A wall-length mirror leans against the shelves, reflecting your determined expression.",
    imageSrc: "/scenes/chapter01/storage-mirror.png",
    objects: [
      {
        id: "mirror_frame",
        name: "Full-Length Mirror",
        description: "Full-length mirror reflecting your stance.",
        boundingBox: { x: 0.14, y: 0.08, width: 0.46, height: 0.78 },
        interactions: [
          {
            label: "Practice a tough stare",
            effect: { type: "change_scene", sceneId: "storage-mirror-angry" },
          },
        ],
      },
      {
        id: "doorway_glow",
        name: "Doorway",
        description: "Backlit doorway inviting you toward the corridor.",
        boundingBox: { x: 0.56, y: 0.14, width: 0.28, height: 0.72 },
        interactions: [
          {
            label: "Walk toward the exit",
            effect: { type: "change_scene", sceneId: "storage-exit" },
          },
        ],
      },
      {
        id: "shelf_edge",
        name: "Side Shelves",
        description: "Side shelves stacked with crates and bins.",
        boundingBox: { x: 0.02, y: 0.1, width: 0.2, height: 0.72 },
        interactions: [
          {
            label: "Check on the chair",
            effect: { type: "change_scene", sceneId: "storage" },
          },
        ],
      },
    ],
  },
  {
    id: "storage-mirror-angry",
    name: "Storage Mirror — Angry",
    description:
      "Your reflection mirrors your frustration with crossed arms and a glare.",
    imageSrc: "/scenes/chapter01/storage-mirror-angry.png",
    objects: [
      {
        id: "angry_reflection",
        name: "Defiant Reflection",
        description: "Reflection showing your fiercest expression.",
        boundingBox: { x: 0.18, y: 0.08, width: 0.44, height: 0.8 },
        interactions: [
          {
            label: "Take a calming breath",
            effect: { type: "change_scene", sceneId: "storage-mirror" },
          },
        ],
      },
      {
        id: "doorway_shadow",
        name: "Doorway",
        description: "Shadowed doorway stretching toward the exit.",
        boundingBox: { x: 0.6, y: 0.16, width: 0.26, height: 0.72 },
        interactions: [
          {
            label: "Storm toward the exit",
            effect: { type: "change_scene", sceneId: "storage-exit" },
          },
        ],
      },
    ],
  },
  {
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
        boundingBox: { x: 0.46, y: 0.62, width: 0.22, height: 0.16 },
        interactions: [
          {
            label: "Head back to the chair",
            effect: { type: "change_scene", sceneId: "storage" },
          },
        ],
      },
      {
        id: "tool_wall",
        name: "Hanging Tools",
        description: "Pegboard wall lined with well-worn tools.",
        boundingBox: { x: 0.16, y: 0.1, width: 0.62, height: 0.36 },
        interactions: [
          {
            label: "Go look for supplies at the store",
            effect: { type: "change_scene", sceneId: "store-entrance" },
          },
        ],
      },
      {
        id: "paint_cans",
        name: "Paint Cans",
        description: "Stacks of dusty paint cans with faded labels.",
        boundingBox: { x: 0.06, y: 0.6, width: 0.2, height: 0.2 },
        interactions: [
          {
            label: "Check on the mirror",
            effect: { type: "change_scene", sceneId: "storage-mirror" },
          },
        ],
      },
    ],
  },
  {
    id: "store-entrance",
    name: "Grocery Store Entrance",
    description:
      "A festive supermarket entryway greets customers with pumpkins, produce, and a Halloween banner.",
    imageSrc: "/scenes/chapter01/store-entrance.png",
    objects: [
      {
        id: "pumpkin_display",
        name: "Pumpkin Sale",
        description: "Pumpkin sale piled up beside the entrance.",
        boundingBox: { x: 0.42, y: 0.38, width: 0.22, height: 0.32 },
        interactions: [
          {
            label: "Push the cart inside",
            effect: { type: "change_scene", sceneId: "store-hardware" },
          },
        ],
      },
      {
        id: "shopping_cart",
        name: "Shopping Cart",
        description: "Shopping cart waiting for a push down the aisles.",
        boundingBox: { x: 0.32, y: 0.68, width: 0.36, height: 0.3 },
        interactions: [
          {
            label: "Head down the hardware aisle",
            effect: { type: "change_scene", sceneId: "store-hardware" },
          },
        ],
      },
      {
        id: "exit_to_lot",
        name: "Sliding Doors",
        description: "Automatic doors sliding back out to the lot.",
        boundingBox: { x: 0.02, y: 0.22, width: 0.2, height: 0.62 },
        interactions: [
          {
            label: "Return to the car",
            effect: {
              type: "change_scene",
              sceneId: "storage-outside-car",
            },
          },
        ],
      },
    ],
  },
  {
    id: "store-hardware",
    name: "Hardware Aisle",
    description:
      "The aisle is lined with power tools, pliers, batteries, and anything else one could need.",
    imageSrc: "/scenes/chapter01/store-hardware.png",
    objects: [
      {
        id: "tape_shelf",
        name: "Adhesives Section",
        description: "Aisle section dedicated to adhesives and tapes.",
        boundingBox: { x: 0.64, y: 0.2, width: 0.3, height: 0.58 },
        interactions: [
          {
            label: "Grab duct tape",
            effect: {
              type: "change_scene",
              sceneId: "store-hardware-ducttape",
            },
          },
        ],
      },
      {
        id: "tool_wall_left",
        name: "Power Tools",
        description: "Display of power tools buzzing with energy.",
        boundingBox: { x: 0.04, y: 0.18, width: 0.38, height: 0.6 },
        interactions: [
          {
            label: "Head back to the entrance",
            effect: { type: "change_scene", sceneId: "store-entrance" },
          },
        ],
      },
      {
        id: "hardware_cart",
        name: "Cart Handle",
        description: "Cart handle inviting another lap around the store.",
        boundingBox: { x: 0.34, y: 0.68, width: 0.32, height: 0.28 },
        interactions: [
          {
            label: "Return to the workbench",
            effect: { type: "change_scene", sceneId: "storage-vcr" },
          },
        ],
      },
    ],
  },
  {
    id: "store-hardware-ducttape",
    name: "Hardware Aisle — Duct Tape",
    description:
      "A pair of duct tape rolls sit proudly in the cart, mission accomplished.",
    imageSrc: "/scenes/chapter01/store-hardware-ducttape.png",
    objects: [
      {
        id: "duct_tape_rolls",
        name: "Heavy Duty Duct Tape",
        description: "Pair of heavy-duty duct tape rolls resting in the cart.",
        boundingBox: { x: 0.42, y: 0.54, width: 0.22, height: 0.2 },
        interactions: [
          {
            label: "Wheel back to the aisle",
            effect: { type: "change_scene", sceneId: "store-hardware" },
          },
        ],
      },
      {
        id: "hardware_exit",
        name: "Aisle Exit",
        description: "Pathway at the aisle's end leading toward the lot.",
        boundingBox: { x: 0.32, y: 0.72, width: 0.34, height: 0.24 },
        interactions: [
          {
            label: "Return to the car with supplies",
            effect: {
              type: "change_scene",
              sceneId: "storage-outside-car",
            },
          },
        ],
      },
      {
        id: "right_shelf_detail",
        name: "Hardware Shelves",
        description: "Right-hand shelving crammed with hardware odds and ends.",
        boundingBox: { x: 0.64, y: 0.2, width: 0.3, height: 0.56 },
        interactions: [
          {
            label: "Survey the rest of the tools",
            effect: { type: "change_scene", sceneId: "store-hardware" },
          },
        ],
      },
    ],
  },
];

export const initialSceneId = scenes[0]?.id ?? "";
