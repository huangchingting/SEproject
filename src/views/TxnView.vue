<template>
  <div class='txn-container ma-16'>
    <div class='header' v-if='txn.status === "paid"'>
      <v-icon size='100' class='mb-3'> {{ tickIcon }}</v-icon>
      <p>交易成功</p>
      <p>交易編號： {{ txnId }}</p>
    </div>

    <div class='header' v-if='txn.status === "created"'>
      <v-icon size='100' class='mb-3'> {{ crossIcon }}</v-icon>
      <p>尚未付款</p>
      <v-dialog v-model='dialog' width='500'>
        <template v-slot:activator='{ on, attrs }'>
          <v-btn
              color='red lighten-2'
              class='white--text'
              v-bind='attrs'
              v-on='on'
          >
            <v-icon>{{ cashIcon }}</v-icon>請點此付款
          </v-btn>
        </template>
        <payment-card
            :price='formatPrice(totalPrice)'
            :txn-id='txnId'
            @close-dialog='dialog = false'
        />
      </v-dialog>
    </div>

    <v-simple-table v-if='txn && productList'>
      <template v-slot:default>
        <thead>
          <tr>
            <th class='text-center'>
              商品圖片
            </th>
            <th class='text-center'>
              商品名稱
            </th>
            <th class='text-center'>
              價格
            </th>
            <th class='text-center'>
              數量
            </th>
            <th class='text-center'>
              小計
            </th>
          </tr>
        </thead>
        <tbody class='text-center'>
          <tr v-for='item in productList' :key='item.id'>
            <td v-if='item.id' class='pa-2'>
              <v-img
                  class='mx-auto'
                  height='100'
                  max-width='100'
                  max-height='100'
                  :src='base64ImgToSrc(item.img)'
              />
            </td>
            <td>
              {{ item.title }}
            </td>
            <td>{{ formatPrice(item.price) }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatPrice(item.subTotal) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <p v-if='totalPrice > 0' class='total-price my-0 mx-5 primary--text text-right'>
      總計：{{ formatPrice(totalPrice) }}
    </p>
  </div>
</template>

<script>
import { mdiCash, mdiCheckCircleOutline, mdiCloseCircleOutline } from '@mdi/js'

import { getTxnById } from '@/services/txn.service'
import { base64ImgToSrc, formatPrice } from '@/helpers/data.helper'
import PaymentCard from '@/components/PaymentCard'
import { mapGetters } from 'vuex'

export default {
  name: 'transactionView',
  components: { PaymentCard },
  data() {
    return {
      txnId: "",
      txn: {},
      tickIcon: mdiCheckCircleOutline,
      crossIcon: mdiCloseCircleOutline,
      cashIcon: mdiCash,
      dialog: false,
      // productList: [],
    }
  },
  computed: {
    ...mapGetters({ productById: 'product/productById' }),
    totalPrice() {
      let total = 0
      this.productList.forEach(product => {
        total += product.subTotal
      })
      return total
    },
    productList() {
      let result = []
      this.txn?.products?.forEach(product => {
        let target = this.productById(product.productId)
        let subTotal = product.amount * target?.price

        result.push({
          ...target,
          quantity: product.amount,
          subTotal
        })
      })
      return result
    }
  },
  methods: {
    base64ImgToSrc,
    formatPrice,
  },
  created: async function() {
    this.txnId = this.$route.query.txnId
    this.txn = await getTxnById(this.$route.query.txnId)
  },
  watch: {
    '$route.query.txnId': {
      handler: async function(id) {
        this.txnId = id
        this.txn = await getTxnById(this.$route.query.txnId)
      },
      deep: true,
      immediate: true,
    },
  }
}
</script>
<style lang='scss' scoped>
.header {
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>