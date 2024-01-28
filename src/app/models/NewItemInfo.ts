export interface NewItemInfo {
  imageUrl: string | null;
  options: ItemOptions[];
}

export interface ItemOptions {
  color: Color
  sizePrices: SizePrices[]
  imageUrl: string
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
