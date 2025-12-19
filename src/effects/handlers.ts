import {
  EnterVehicleEffect,
  MaybeHintEffect,
  ShowDescriptionEffect,
  OpenUiEffect,
  GiveItemEffect,
  SetStateEffect,
  SetPositionEffect,
  SetVisibilityEffect,
  SpawnFxEffect,
  NoiseEffect,
  MaybeAlertEffect,
  LootRollEffect,
  MaybeFindEffect,
  SetCoverEffect,
  RevealEffect,
  SceneEffectCommand,
} from "./types";


const effectHandlers = {
  enter_vehicle: (command: EnterVehicleEffect) => {
    console.log(`Entering vehicle ${command}`);
  },
  maybe_hint: (command: MaybeHintEffect) => {
    console.log("Maybe hint effect:", command);
  },
  show_description: function (command: ShowDescriptionEffect): void {
    console.log("Function not implemented.", command);
  },
  open_ui: function (command: OpenUiEffect): void {
    console.log("Function not implemented.", command);
  },
  give_item: function (command: GiveItemEffect): void {
    console.log("Function not implemented.", command);
  },
  set_state: function (command: SetStateEffect): void {
    console.log("Function not implemented.", command);
  },
  set_position: function (command: SetPositionEffect): void {
    console.log("Function not implemented.", command);
  },
  set_visibility: function (command: SetVisibilityEffect): void {
    console.log("Function not implemented.", command);
  },
  spawn_fx: function (command: SpawnFxEffect): void {
    console.log("Function not implemented.", command);
  },
  noise: function (command: NoiseEffect): void {
    console.log("Function not implemented.", command);
  },
  maybe_alert: function (command: MaybeAlertEffect): void {
    console.log("Function not implemented.", command);
  },
  loot_roll: function (command: LootRollEffect): void {
    console.log("Function not implemented.", command);
  },
  maybe_find: function (command: MaybeFindEffect): void {
    console.log("Function not implemented.", command);
  },
  set_cover: function (command: SetCoverEffect): void {
    console.log("Function not implemented.", command);
  },
  reveal: function (command: RevealEffect): void {
    console.log("Function not implemented.", command);
  }
};

export const executeEffects = (command: SceneEffectCommand) => {
  effectHandlers[command.type](command as never);
};
