<template>
  <div class='d-inline'>
    <v-btn class='mr-2 align-self-center'
      @click.stop='addToCart(product, quantity)'
      :disabled='!product.stock'
      :loading='loading'
    >
      <span v-if='product.stock'>
      <v-icon small class='mr-1'>{{ cartIcon }}</v-icon>
        加入購物車
      </span>
      <span v-else>
        已售完
      </span>
    </v-btn>
    <p v-if='showErrorMessage' class='error--text text-right'>抱歉！庫存不足，謝謝支持 &gt;_&lt; </p>
  </div>
</template>

<script>
import { mdiCart } from '@mdi/js'
import { mapActions } from 'vuex'

export default {
  name: 'add-to-cart-btn',
  props: {
    product: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    }
  },
  data: () => ({
    cartIcon: mdiCart,
    showErrorMessage: false,
    loading: false
  }),
  methods: {
    ...mapActions({ addItemToCart: 'cart/addItemToCart' }),
    addToCart(product, quantity) {
      try {
        this.setLoading()
        this.addItemToCart({ product, addQuantity: quantity })

      } catch (err) {
        this.loading = false
        this.showErrorMessage = true
        setTimeout(() => {
          this.showErrorMessage = false
        }, 5000)
      }
    },
    resetError() {
      this.loading = false
      this.showErrorMessage = false
    },
    setLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>