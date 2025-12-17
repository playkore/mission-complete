import type { SceneDefinition } from '../types'

export const scenes: SceneDefinition[] = [
  {
    id: 'relay-platform',
    name: 'Relay Platform',
    imageSrc: '/sample-scene.svg',
    narrative:
      'The makeshift listening post overlooks the city harbor. You need to locate the saboteur before radio silence begins.',
    hotspots: [
      {
        id: 'antenna-array',
        name: 'Antenna Array',
        description:
          'A nest of copper wires and improvised receivers hum with static. Whoever was here left in a hurry.',
        region: { x: 41, y: 28, width: 15, height: 14 },
        actions: [
          {
            id: 'scan-signal',
            label: 'Scan signal',
            description:
              'Sweep the dials to triangulate the strongest frequency spike.',
            notes: 'Opens the path to the cargo tram scene',
            nextSceneId: 'cargo-tram'
          },
          {
            id: 'secure-logs',
            label: 'Secure logs',
            description:
              'Copy the encrypted chatter to your pocket terminal for later decoding.'
          }
        ]
      },
      {
        id: 'supply-crates',
        name: 'Supply Crates',
        description:
          'Standard-issue crates, but the seals are broken and the inventory tags are missing.',
        region: { x: 30, y: 58, width: 18, height: 18 },
        actions: [
          {
            id: 'search',
            label: 'Search for clues',
            description:
              'You sift through cables and ration packs until you find a torn patch with tram line insignia.'
          }
        ]
      },
      {
        id: 'skyline',
        name: 'City Skyline',
        description:
          'The watchlights sweep in wide arcs. In the distance a tram sparks across the cables.',
        region: { x: 65, y: 25, width: 25, height: 25 },
        actions: [
          {
            id: 'observe',
            label: 'Observe movement',
            description:
              'A shadow leaps between tram cars then vanishes into the cargo platform haze.'
          }
        ]
      }
    ]
  },
  {
    id: 'cargo-tram',
    name: 'Cargo Tram',
    imageSrc:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60',
    narrative:
      'Fog and neon. The tram cables sing while the cargo bay lights pulse in warning. The saboteur might be hiding in the crates or on the catwalks.',
    hotspots: [
      {
        id: 'cargo-door',
        name: 'Cargo Door',
        description:
          'Industrial steel door with a new scorch mark along the hinge.',
        region: { x: 5, y: 60, width: 30, height: 25 },
        actions: [
          {
            id: 'force-open',
            label: 'Force door open',
            description:
              'You pry the latch open. The interior is empty, but the saboteur left a portable projector ticking down.',
            notes: 'Future action hook: disarm puzzle'
          }
        ]
      },
      {
        id: 'tram-cables',
        name: 'Tram Cables',
        description:
          'Heavy copper cables disappearing into the night, vibrating with approaching weight.',
        region: { x: 60, y: 5, width: 30, height: 18 },
        actions: [
          {
            id: 'listen',
            label: 'Listen to cables',
            description:
              'You catch faint footsteps above you. Someone is moving toward the control tower.'
          }
        ]
      }
    ]
  }
]

export const initialSceneId = scenes[0]?.id ?? ''
