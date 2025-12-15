// types for one user's holding (portfolio entry)
export interface PortfolioCoin {
  symbol: string
  amount: number
}

// types for price API response
export interface PriceMap {
  [symbol: string]: number
}

// All state combined for Pinia
export interface PortfolioState {
  coins: PortfolioCoin[]
  prices: PriceMap
  loading: boolean
  error: string | null
}
