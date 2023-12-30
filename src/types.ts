/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GnafFeatures {
  id: number
  shahr: string
  area: string
  wkb_geometry: WkbGeometry
  deleted_at: any
  Buffer: any
  relations: any[]
}

interface WkbGeometry {
  type: string
  coordinates: number[][][][]
}
