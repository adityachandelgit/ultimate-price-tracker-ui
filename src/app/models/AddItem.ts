export interface AddItem {
  externalId: string
  desiredPrice: number
  store: string
  metadata: Metadata | null
}

export interface Metadata {
  size: Color
  color: Size
}

export interface Color {
  id: string | undefined
  name: string | undefined
}

export interface Size {
  id: string | undefined
  name: string | undefined
}
