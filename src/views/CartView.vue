<template>
  <div class='cart-container pa-16' >
    <cart-table />

    <v-divider class='mb-3'/>

    <div class='d-flex justify-end align-center'>
    <p class='total-price my-0 mx-5 primary--text'>
      總計：{{ formatPrice(totalPrice) }}
    </p>
    <v-dialog v-model='dialog' width='500'>
      <template v-slot:activator='{ on, attrs }'>
        <v-btn
          color='red lighten-2'
          class='white--text'
          v-bind='attrs'
          v-on='on'
          @click='createTransaction()'
          :disabled='totalPrice === 0'
        >
          <v-icon>{{ cashIcon }}</v-icon>結帳 go go
        </v-btn>
      </template>
      <payment-card
          :price='formatPrice(totalPrice)'
          :txn-id='txnId'
          @close-dialog='dialog = false'
      />
    </v-dialog>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { mdiCash } from '@mdi/js'
import { isEmpty } from 'lodash'

import { formatPrice } from '@/helpers/data.helper'
import CartTable from '@/components/CartTable'
import PaymentCard from '@/components/PaymentCard'
import { createTxn } from '@/services/txn.service'

export default {
  name: 'shoppingCartView',
  components: { CartTable, PaymentCard },
  data() {
    return {
      cashIcon: mdiCash,
      dialog: false,
      txnId: '',
    }
  },
  computed: {
    ...mapGetters({ totalPrice: 'cart/cartTotalPrice'}),
    ...mapGetters({ getCartItems: 'cart/cartItems' }),
    cartItems() {
      return this.getCartItems.filter(item => item !== undefined && item !== null)
    }
  },
  methods: {
    ...mapActions('cart', ['removeAllItems']),
    formatPrice,
    async createTransaction() {
      if (isEmpty(this.txnId)) {
        try {
          this.txnId = await createTxn()
          this.removeAllItems()
        } catch (err) {
          // transaction not created, dont proceed
          setTimeout(() => this.dialog = false, 200)
        }
      }
    },
  }
}
</script>

<style lang='scss' scoped>
.total-price {
  display: inline;
  font-size: 1.25rem;
  font-weight: 600;
}
</style>