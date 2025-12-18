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
            verb: "inspect",
            label: "Inspect car",
            effects: ["show_description"],
          },
          {
            verb: "open_trunk",
            label: "Open trunk",
            requires: { anyOf: ["has_key_car_001", "lockpicked_trunk_001"] },
            effects: ["toggle_container:trunk", "maybe_alert"],
            cooldownSec: 1,
          },
          {
            verb: "search",
            label: "Search interior",
            effects: ["loot_roll:car_001", "show_loot_ui"],
            cooldownSec: 2,
          },
          {
            verb: "hide",
            label: "Hide behind car",
            requires: { notInCombat: true },
            effects: ["set_cover:0.7", "set_visibility:-0.4"],
          },
          {
            verb: "hotwire",
            label: "Try to hotwire",
            requires: { skillAtLeast: { mechanics: 2 } },
            effects: [
              "skill_check:mechanics",
              "on_success:set_flag:car_001_hotwired",
              "on_fail:maybe_alarm",
            ],
            cooldownSec: 10,
          },
        ],
      },
      {
        id: "storage_building_001",
        type: "building",
        name: "Storage Facility",
        boundingBox: { x: 0, y: 0, width: 0.65, height: 0.6 },
        properties: {
          material: "concrete",
          era: "1970s",
          color: "gray",
          enterable: false,
        },
        interactions: [
          {
            verb: "inspect",
            label: "Look around",
            effects: ["show_description"],
          },
          {
            verb: "listen",
            label: "Listen",
            effects: ["perception_roll:audio", "maybe_hint:nearby_activity"],
            cooldownSec: 3,
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
            effects: ["show_description", "maybe_hint:lock"],
          },
          {
            verb: "use_keypad",
            label: "Use keypad",
            requires: { powered: true },
            effects: ["open_ui:keypad_001"],
          },
          {
            verb: "try_open",
            label: "Try to open",
            effects: ["if_locked:show_message:locked", "if_unlocked:open_door"],
            cooldownSec: 1,
          },
          {
            verb: "lockpick",
            label: "Pick lock",
            requires: { item: "lockpick", skillAtLeast: { lockpicking: 1 } },
            effects: [
              "skill_check:lockpicking",
              "on_success:set_locked:false",
              "on_fail:maybe_alert",
            ],
            cooldownSec: 6,
          },
          {
            verb: "force_open",
            label: "Force open",
            requires: { skillAtLeast: { strength: 2 } },
            effects: [
              "skill_check:strength",
              "on_success:open_door",
              "on_fail:noise:+2",
              "maybe_alert",
            ],
            cooldownSec: 8,
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
            effects: ["show_description", "maybe_hint:lock"],
          },
          {
            verb: "try_open",
            label: "Try to open",
            effects: ["if_locked:show_message:locked", "if_unlocked:open_door"],
            cooldownSec: 1,
          },
          {
            verb: "lockpick",
            label: "Pick lock",
            requires: { item: "lockpick", skillAtLeast: { lockpicking: 1 } },
            effects: [
              "skill_check:lockpicking",
              "on_success:set_locked:false",
              "on_fail:maybe_alert",
            ],
            cooldownSec: 6,
          },
        ],
      },
      {
        id: "keypad_001",
        type: "device",
        name: "Access Keypad",
        boundingBox: { x: 0.175, y: 0.26, width: 0.025, height: 0.08 },
        properties: {
          deviceType: "numeric_keypad",
          powered: true,
          interactable: true,
          linkedDoorId: "storage_door_001",
        },
        interactions: [
          {
            verb: "inspect",
            label: "Inspect keypad",
            effects: ["show_description"],
          },
          {
            verb: "enter_code",
            label: "Enter code",
            effects: [
              "open_ui:keypad_input",
              "on_correct:unlock:storage_door_001",
              "on_wrong:beep",
              "maybe_alert",
            ],
          },
          {
            verb: "hack",
            label: "Hack keypad",
            requires: { item: "hack_tool", skillAtLeast: { electronics: 2 } },
            effects: [
              "skill_check:electronics",
              "on_success:unlock:storage_door_001",
              "on_fail:disable:10s",
              "maybe_alert",
            ],
            cooldownSec: 12,
          },
          {
            verb: "cut_power",
            label: "Cut power",
            requires: { item: "wire_cutter" },
            effects: [
              "set_powered:false",
              "set_flag:keypad_001_disabled",
              "noise:+1",
            ],
            cooldownSec: 5,
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
            effects: ["show_description"],
          },
          {
            verb: "take_wood",
            label: "Take scrap wood",
            requires: { inventorySpace: 1 },
            effects: [
              "give_item:scrap_wood",
              "set_state:wood_pallets_001:reduced",
            ],
            cooldownSec: 2,
          },
          {
            verb: "climb",
            label: "Climb",
            requires: { skillAtLeast: { agility: 1 } },
            effects: ["set_position:slightly_higher", "set_visibility:+0.1"],
          },
          {
            verb: "burn",
            label: "Burn",
            requires: { item: "lighter" },
            effects: ["spawn_fx:fire_small", "noise:+2", "maybe_alert"],
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
            effects: ["show_description"],
          },
          {
            verb: "search",
            label: "Search bush",
            effects: ["loot_roll:bush_001", "maybe_find:clue_or_item"],
            cooldownSec: 4,
          },
          {
            verb: "hide",
            label: "Hide in foliage",
            requires: { notInCombat: true },
            effects: ["set_cover:0.5", "set_visibility:-0.6"],
          },
          {
            verb: "clear",
            label: "Clear branches",
            requires: { item: "knife" },
            effects: ["set_state:bush_001:cleared", "reveal:ground_spot"],
            cooldownSec: 6,
          },
        ],
      },
      {
        id: "fallen_leaves_001",
        type: "environment_fx",
        name: "Fallen Leaves",
        boundingBox: { x: 0, y: 0.5, width: 1, height: 0.5 },
        properties: {
          slippery: false,
          noiseModifier: 1.3,
          seasonal: true,
          interactive: false,
        },
        interactions: [
          {
            verb: "inspect",
            label: "Inspect ground",
            effects: ["show_description"],
          },
          {
            verb: "sweep",
            label: "Sweep leaves",
            requires: { item: "broom" },
            effects: ["reveal:surface_detail", "maybe_find:trace"],
            cooldownSec: 8,
          },
          {
            verb: "track",
            label: "Look for footprints",
            requires: { skillAtLeast: { perception: 2 } },
            effects: [
              "skill_check:perception",
              "on_success:spawn_clue:footprints",
              "on_fail:show_message:nothing",
            ],
            cooldownSec: 5,
          },
        ],
      },
    ],
  },
];

export const initialSceneId = scenes[0]?.id ?? "";
