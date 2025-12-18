import type { SceneDefinition } from "../types";

export const scenes: SceneDefinition[] = [
  {
    id: "storage_facility_autumn",
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
            verb: "get_in",
            label: "Get in car",
            effects: [{ type: "enter_vehicle", vehicleId: "car_001" }],
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
            verb: "inspect",
            label: "Inspect door",
            effects: [
              { type: "show_description" },
              { type: "maybe_hint", topic: "lock" },
            ],
          },
          {
            verb: "use_keypad",
            label: "Use keypad",
            effects: [{ type: "open_ui", interfaceId: "keypad_001" }],
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
            verb: "inspect",
            label: "Inspect door",
            effects: [
              {
                type: "show_description",
                targetId: "storage_door_002",
              },
            ],
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
            verb: "inspect",
            label: "Inspect pallets",
            effects: [{ type: "show_description" }],
          },
          {
            verb: "take_wood",
            label: "Take scrap wood",
            requires: { inventorySpace: 1 },
            effects: [
              { type: "give_item", itemId: "scrap_wood" },
              {
                type: "set_state",
                targetId: "wood_pallets_001",
                state: "reduced",
              },
            ],
            cooldownSec: 2,
          },
          {
            verb: "climb",
            label: "Climb",
            requires: { skillAtLeast: { agility: 1 } },
            effects: [
              { type: "set_position", position: "slightly_higher" },
              { type: "set_visibility", delta: 0.1 },
            ],
          },
          {
            verb: "burn",
            label: "Burn",
            requires: { item: "lighter" },
            effects: [
              { type: "spawn_fx", effectId: "fire_small" },
              { type: "noise", amount: "+2" },
              { type: "maybe_alert" },
            ],
            cooldownSec: 20,
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
            verb: "inspect",
            label: "Inspect bush",
            effects: [{ type: "show_description" }],
          },
          {
            verb: "search",
            label: "Search bush",
            effects: [
              { type: "loot_roll", tableId: "bush_001" },
              { type: "maybe_find", resultId: "clue_or_item" },
            ],
            cooldownSec: 4,
          },
          {
            verb: "hide",
            label: "Hide in foliage",
            requires: { notInCombat: true },
            effects: [
              { type: "set_cover", value: 0.5 },
              { type: "set_visibility", delta: -0.6 },
            ],
          },
          {
            verb: "clear",
            label: "Clear branches",
            requires: { item: "knife" },
            effects: [
              {
                type: "set_state",
                targetId: "bush_001",
                state: "cleared",
              },
              { type: "reveal", targetId: "ground_spot" },
            ],
            cooldownSec: 6,
          },
        ],
      },
    ],
  },
];

export const initialSceneId = scenes[0]?.id ?? "";
