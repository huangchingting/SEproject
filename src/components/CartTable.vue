<template>
  <span>
    <v-alert
      v-if='quantityError'
      type='error'
    >
      抱歉！您選的商品庫存不足，謝謝支持 &gt;_&lt;
    </v-alert>
    <v-simple-table>
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
          <th class='text-center'>
            庫存
          </th>
          <th class='text-center'>
            操作
          </th>
        </tr>
        </thead>
        <tbody v-if='cartItems.length > 0' class='text-center'>
          <tr
              v-for='item in cartItems'
              :key='item.id'
          >
            <td class='pa-2'>
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
            <td class=''>
              <v-text-field
                  type='number'
                  class='quantity-input'
                  readonly
                  :append-outer-icon='addIcon'
                  :prepend-icon='subIcon'
                  @click:append-outer='changeQuantity(item.id, item.quantity + 1, item.stock)'
                  @click:prepend='changeQuantity(item.id, item.quantity - 1, item.stock)'
                  v-model.number='item.quantity'
              />
            </td>
            <td>{{ formatPrice(item.price * item.quantity) }}</td>
            <td>
                <span v-if='item.stock' class='mr-5'>
                  有
                </span>
              <span v-else class='mr-5'>
                  無
                </span>
            </td>
            <td>
              <v-btn small class='pa-3' @click='deleteItem(item.id)'>
                <v-icon>{{trashIcon}}</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tbody v-else class='text-center'>
          <tr>
            <td class='text-center pa-5' colspan='7'>
              <h2>購物車無商品...</h2>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </span>
</template>
<script>
import { mdiPlusThick, mdiTrashCanOutline, mdiWindowMinimize } from '@mdi/js'
import { mapGetters } from 'vuex'

import { base64ImgToSrc, formatPrice } from '@/helpers/data.helper'

export default {
  name: 'cartTable',
  data() {
    return {
      addIcon: mdiPlusThick,
      subIcon: mdiWindowMinimize,
      trashIcon: mdiTrashCanOutline,
      quantityError: false,
    }
  },
  computed: {
    ...mapGetters({ getCartItems: 'cart/cartItems' }),
    cartItems() {
      return this.getCartItems.filter(item => item !== undefined && item !== null)
    }
  },
  methods: {
    base64ImgToSrc,
    formatPrice,
    deleteItem(id){
      this.$store.commit('cart/removeItemFromCart', { id })
    },
    changeQuantity(id, quantity) {
      this.quantityError = false
      if (quantity < 1) return
      try {
        this.$store.dispatch('cart/changeItemQuantity', { id, newQuantity: quantity })
      } catch (err) {
        this.setQuantityError()
      }
    },
    setQuantityError() {
      this.quantityError = true
      setTimeout(() => {
        this.quantityError = false
      }, 3000)
    }
  }
}
</script>

<style lang='scss' scoped>
.v-image {
  border-radius: 5px;
}

.quantity-input {
  max-width: 150px;
  margin: 0 auto !important;
}
</style>
