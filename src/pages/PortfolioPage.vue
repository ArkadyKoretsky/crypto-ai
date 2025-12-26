<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NForm, NFormItem, NInput, NInputNumber, NButton, NTable } from 'naive-ui'

import { usePortfolioStore } from '@/stores/portfolio'

const portfolioStore = usePortfolioStore()

const symbol = ref<string>('')
const amount = ref<number | null>(null)

function addCoin() {
  if (symbol.value && amount.value !== null) {
    portfolioStore.addCoin({ symbol: symbol.value.toLocaleUpperCase(), amount: amount.value })

    // reset form
    symbol.value = ''
    amount.value = null
  }
}

function removeCoin(symbol: string) {
  portfolioStore.removeCoinBySymbol(symbol)
}
</script>

<template>
  <n-card title="Crypto Portfolio" class="portfolio-card">
    <!-- Add Coin Form -->
    <n-form @submit.prevent="addCoin">
      <n-form-item label="Symbol">
        <n-input v-model:value="symbol" placeholder="e.g. BTC" />
      </n-form-item>
      <n-form-item label="Amount">
        <n-input-number v-model:value="amount" placeholder="e.g. 0.5" :min="0" />
      </n-form-item>
      <n-button type="primary" block @click="addCoin"> Add Coin</n-button>
    </n-form>

    <!-- Portfolio Table -->
    <n-table v-if="portfolioStore.coins.length" class="portfolio-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coin in portfolioStore.coins" :key="coin.symbol">
          <td>{{ coin.symbol }}</td>
          <td>{{ coin.amount }}</td>
          <td>
            <n-button type="error" size="small" @click="removeCoin(coin.symbol)">Remove</n-button>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>

<style scoped>
.portfolio-card {
  max-width: 37.5rem;
  margin: auto;
}

.portfolio-table {
  margin-top: 1.5rem;
}
</style>
