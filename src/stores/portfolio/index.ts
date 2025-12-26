import { defineStore } from 'pinia'
import type { PortfolioCoin, PortfolioState } from './types'

export const usePortfolioStore = defineStore('portfolio', {
  state: (): PortfolioState => ({
    coins: [],
    prices: {},
    loading: false,
    error: null,
  }),

  actions: {
    addCoin(coin: PortfolioCoin) {
      this.coins.push(coin)
    },

    removeCoinBySymbol(symbol: string) {
      this.coins = this.coins.filter((coin) => coin.symbol !== symbol)
    },

    updateCoinAmount(portfolioCoin: PortfolioCoin) {
      const coin = this.coins.find((c) => c.symbol === portfolioCoin.symbol)
      if (coin) coin.amount = portfolioCoin.amount
    },

    setPrice(symbol: string, price: number) {
      this.prices[symbol] = price
    },

    setLoading(isLoading: boolean) {
      this.loading = isLoading
    },

    setError(message: string | null) {
      this.error = message
    },
  },
})
