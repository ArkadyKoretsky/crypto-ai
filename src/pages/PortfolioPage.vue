<script setup lang="ts">
import { ref } from 'vue'
import {
  NCard,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NButton,
  NTable,
  type FormInst,
  type FormRules,
} from 'naive-ui'

import { usePortfolioStore } from '@/stores/portfolio'

const portfolioStore = usePortfolioStore()

const symbol = ref<string>('')
const amount = ref<number | null>(null)

const formRef = ref<FormInst | null>(null)
const formModel = ref<{ symbol: string; amount: number | null }>({
  symbol: '',
  amount: null,
})
const rules: FormRules = {
  symbol: [{ required: true, message: 'Symbol is required', trigger: 'blur' }],
  amount: [
    { required: true, message: 'Amount is required', trigger: 'blur' },
    {
      type: 'number',
      min: 0,
      message: 'Amount must be greater than or equal to 0',
      trigger: 'blur',
    },
  ],
}

function addCoin() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      portfolioStore.addCoin({
        symbol: formModel.value.symbol.toUpperCase(),
        amount: formModel.value.amount!,
      })
      // reset form
      symbol.value = ''
      amount.value = null
    }
  })
}

function removeCoin(symbol: string) {
  portfolioStore.removeCoinBySymbol(symbol)
}
</script>

<template>
  <n-card title="Crypto Portfolio" class="portfolio-card">
    <!-- Add Coin Form -->
    <n-form ref="formRef" :model="formModel" :rules="rules" @submit.prevent="addCoin">
      <n-form-item label="Symbol" path="symbol">
        <n-input v-model:value="formModel.symbol" placeholder="e.g. BTC" />
      </n-form-item>
      <n-form-item label="Amount" path="amount">
        <n-input-number v-model:value="formModel.amount" placeholder="e.g. 0.5" :min="0" />
      </n-form-item>
      <n-button type="primary" block attr-type="submit">Add Coin</n-button>
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
