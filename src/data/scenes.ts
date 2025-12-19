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
        type: "vehicle",
        name: "Sedan",
        boundingBox: { x: 0.66, y: 0.31, width: 0.34, height: 0.28 },
        properties: {
          model: "1980s_sedan",
          color: "off_white",
          drivable: false,
          doors: 4,
          trunkAccessible: true,
          condition: "used",
        },
        interactions: [
          {
            label: "Get in car",
            effect: { type: "enter_vehicle", vehicleId: "car_001" },
          },
        ],
      },
      {
        id: "storage_door_001",
        type: "door",
        name: "Storage Unit Door",
        boundingBox: { x: 0, y: 0.06, width: 0.14, height: 0.54 },
        properties: {
          color: "green",
          lockType: "keypad",
          locked: true,
          unitNumber: 12,
        },
        interactions: [
          {
            label: "Get inside the storage unit",
            effect: { type: "change_scene", sceneId: "storage" },
          },
          {
            label: "Use keypad",
            effect: { type: "open_ui", interfaceId: "keypad_001" },
          },
        ],
      },
      {
        id: "storage_door_002",
        type: "door",
        name: "Storage Unit Door",
        boundingBox: { x: 0.25, y: 0.15, width: 0.13, height: 0.36 },
        properties: {
          color: "green",
          lockType: "keypad",
          locked: true,
          unitNumber: 13,
        },
        interactions: [
          {
            label: "Inspect door",
            effect: {
              type: "show_description",
              targetId: "storage_door_002",
            },
          },
        ],
      },
      {
        id: "wood_pallets_001",
        type: "prop",
        name: "Wooden Pallets",
        boundingBox: { x: 0.2, y: 0.37, width: 0.13, height: 0.22 },
        properties: {
          material: "wood",
          movable: false,
          flammable: true,
          lootable: false,
        },
        interactions: [
          {
            label: "Inspect pallets",
            effect: { type: "show_description" },
          },
          {
            label: "Take scrap wood",
            effect: {
              type: "give_item",
              itemId: "scrap_wood",
            },
          },
          {
            label: "Reduce pallets",
            effect: {
              type: "set_state",
              targetId: "wood_pallets_001",
              state: "reduced",
            },
          },
          {
            label: "Climb",
            effect: {
              type: "set_position",
              position: "slightly_higher",
            },
          },
        ],
      },
      {
        id: "bush_001",
        type: "vegetation",
        name: "Overgrown Bush",
        boundingBox: { x: 0.4, y: 0.37, width: 0.09, height: 0.12 },
        properties: {
          season: "autumn",
          walkable: false,
          concealment: 0.6,
        },
        interactions: [
          {
            label: "Inspect bush",
            effect: { type: "show_description" },
          },
        ],
      },
    ],
  },
];

export const initialSceneId = scenes[0]?.id ?? "";
