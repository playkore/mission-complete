import type { GameDefinition } from "../types/games";
import {
  initialSceneId as missionCompleteInitialSceneId,
  scenes as missionCompleteScenes,
} from "./mission-complete/scenes";
import {
  initialSceneId as eveHunterInitialSceneId,
  scenes as eveHunterScenes,
} from "./eve-hunter/scenes";

export const games: GameDefinition[] = [
  {
    id: "mission-complete",
    name: "Mission Complete",
    scenes: missionCompleteScenes,
    initialSceneId: missionCompleteInitialSceneId,
  },
  {
    id: "eve-hunter",
    name: "Eve Hunter",
    scenes: eveHunterScenes,
    initialSceneId: eveHunterInitialSceneId,
  },
];

export type GameId = (typeof games)[number]["id"];
