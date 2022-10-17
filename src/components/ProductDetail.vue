<template>
  <v-container v-if='isNil(product)' class='grey lighten-5 pa-16'>
    <h1>抱歉，你要找的商品不存在 :(</h1>
    <p>請重新整理或稍後再試</p>
  </v-container>
  <v-container v-else class='grey lighten-5 pa-16'>
    <v-row>
      <v-col cols='5'>
        <v-img
            min-height='400'
            max-height='400'
            :src='base64ImgToSrc(product.img)'
        />
      </v-col>
      <v-col cols='7' class='d-flex flex-column'>
        <h2>{{ product.title }}</h2>
        <span class='body-1 primary--text'>
          {{ formatPrice(product.price) }}
        </span>

        <v-divider class='my-3'/>
        <h4>{{ product.description }}</h4>

        <v-spacer />
        <v-divider class='mt-3'/>
        <div class='cart-toolbar d-flex mt-5'>
          <v-text-field
              type='number'
              solo
              min='1'
              :append-outer-icon='addIcon'
              :prepend-icon='subIcon'
              @click:append-outer='incrementQuantity()'
              @click:prepend='decrementQuantity()'
              v-model.number='quantity'
              :disabled='!product.stock'
          />

          <div class='stock-text grey--text'>
            <span v-if='product.stock > 10' class='mr-5'>
              庫存 > 10
            </span>
            <span v-else-if='product.stock > 0' class='mr-5'>
              庫存: {{product.stock}}
            </span>
            <add-to-cart-btn
                ref='add-to-cart-btn'
                :product='product'
                :quantity='quantity'
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { mdiCart, mdiPlusThick, mdiWindowMinimize } from '@mdi/js'
import { isNil } from 'lodash'

import addToCartBtn from '@/components/AddToCartBtn'
import { base64ImgToSrc, formatPrice } from '@/helpers/data.helper'

export default {
  name: 'productDetail',
  components: { addToCartBtn },
  props: {
    productId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      cartIcon: mdiCart,
      addIcon: mdiPlusThick,
      subIcon: mdiWindowMinimize,
      quantity: 1,
    }
  },
  computed: {
    ...mapGetters({ productById: 'product/productById' }),
    ...mapState({ products: state => state.product.products }),
    product() {
      return this.productById(this.productId)
    },
  },
  methods: {
    base64ImgToSrc,
    formatPrice,
    isNil(obj) {
      return isNil(obj)
    },
    incrementQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },
    decrementQuantity(){
      this.quantity = this.quantity <= 1 ? 1 : this.quantity - 1
    },
  },
  watch: {
    productId: function() {
      this.quantity = 1
      this.$refs['add-to-cart-btn'].resetError()
    }
  }
}

</script>

<style lang='scss' scoped>
.cart-toolbar {
  height: 50px;
  justify-content: space-between;

  .stock-text {
    font-size: 12px;
    line-height: 50px;
  }
  .v-input {
    max-width: 150px;
  }
}
</style>