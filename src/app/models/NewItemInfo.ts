export interface NewItemInfo {
  /*itemId: string;
  store: string;*/
  imageUrl: string | null;
  metadata: Metadata;
}

export interface Metadata {
  colorSizes: ColorSizes[]
}

export interface ColorSizes {
  color: Color
  sizePrices: SizePrices[]
}

export interface Color {
  name: string
  id: string
}

export interface SizePrices {
  size: Size
  price: number
}

export interface Size {
  name: string
  id: string
}
