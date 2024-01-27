export interface TrackItem {
  id: number,
  name: string,
  externalId: string,
  desiredPrice: number,
  latestPrice: number,
  latestPriceTimestamp: Date,
  store: string,
  url: string,
  imageUrl: string,
  trackingEnabled: boolean,
  priceTrend: string
}
