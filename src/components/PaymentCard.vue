<template>
  <v-card>
    <v-card-title class='text-h5 grey lighten-2'>
      購物車結帳
    </v-card-title>

    <v-card-text>
      <p class='mt-3 mb-0'>交易編號： {{ txnId }}</p>
      <v-img src='@/assets/QRcode.jpg' />
    </v-card-text>

    <v-divider/>

    <v-card-actions>
        <span>
          總計：{{ price }}
        </span>
      <v-spacer/>
      <v-btn
          color='primary'
          text
          @click='updateTxnStatus()'
      >
        已完成結帳
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { updateTxnById } from '@/services/txn.service'

export default {
  name: 'paymentCard',
  props: {
    price: {
      type: String,
      required: true,
    },
    txnId: {
      type: String,
    }
  },
  methods: {
    async updateTxnStatus() {
      await updateTxnById(this.txnId, 'paid')
      this.$emit('close-dialog')
      await this.$router.push(`/transaction?txnId=${this.txnId}`)
    }
  }
}
</script>