import type {
  SceneDefinition,
  SceneEffectCommand,
  SceneObject,
} from "../types";

export interface EffectContext {
  scene: SceneDefinition;
  object: SceneObject;
}

type EffectHandler<T extends SceneEffectCommand = SceneEffectCommand> = (
  command: T,
  context: EffectContext
) => string[];

type EffectHandlerMap = {
  [Type in SceneEffectCommand["type"]]: EffectHandler<
    Extract<SceneEffectCommand, { type: Type }>
  >;
};

const defaultHandler: EffectHandler = (command) => [`${command.type}`];

const effectHandlers: EffectHandlerMap = {
  enter_vehicle: (command) => [`Enter vehicle ${command.vehicleId}`],
  maybe_hint: (command) => [`Hint about ${command.topic ?? "something"}`],
  show_description: (command, context) => [
    `Describe ${command.targetId ?? context.object.name}`,
  ],
  open_ui: (command) => [`Open interface: ${command.interfaceId}`],
  give_item: (command, context) => [
    `Obtain ${command.itemId} from ${context.object.name}`,
  ],
  set_state: (command) => [
    `Set ${command.targetId} state to ${command.state}`,
  ],
  set_position: (command, context) => [
    `Adjust ${context.object.name} position to ${command.position}`,
  ],
  set_visibility: (command, context) => [
    `Visibility modifier ${command.delta} applied to ${context.object.name}`,
  ],
  spawn_fx: (command) => [`Trigger FX: ${command.effectId}`],
  noise: (command) => [`Noise change: ${command.amount}`],
  maybe_alert: () => ["Potential alert triggered"],
  loot_roll: (command) => [`Roll loot table ${command.tableId}`],
  maybe_find: (command) => [`Maybe find ${command.resultId}`],
  set_cover: (command) => [`Cover adjusted to ${command.value}`],
  reveal: (command) => [`Reveal ${command.targetId}`],
};

export const effectRegistry = effectHandlers;

export const executeEffects = (
  commands: SceneEffectCommand[],
  context: EffectContext
) =>
  commands.flatMap((command) => {
    const handler = (effectHandlers[command.type] ??
      defaultHandler) as EffectHandler;
    return handler(command, context);
  });
