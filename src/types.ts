export interface SceneAction {
  id: string
  label: string
  description: string
  /**
   * Optional ID of the scene that should be loaded
   * after the action is completed.
   */
  nextSceneId?: string
  notes?: string
}

export interface SceneHotspot {
  id: string
  name: string
  description: string
  region: HotspotRegion
  actions: SceneAction[]
}

export interface HotspotRegion {
  /**
   * Percentage from the left edge of the image.
   */
  x: number
  /**
   * Percentage from the top edge of the image.
   */
  y: number
  width: number
  height: number
}

export interface SceneDefinition {
  id: string
  name: string
  imageSrc: string
  narrative: string
  hotspots: SceneHotspot[]
  ambientSound?: string
}
