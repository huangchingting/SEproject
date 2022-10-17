<template>
  <v-hover v-slot='{ hover }'>
    <v-card
        class='d-flex flex-column'
        :class='small ? `v-card--small ma-3` : `ma-5`'
        :elevation='hover ? 10 : 4'
        @click='goToProduct(product.id)'
    >
      <v-img :src='base64ImgToSrc(product.img)' />

      <v-card-title>
        {{ product.title }}
      </v-card-title>
      <v-spacer />
      <v-card-actions class='mb-2'>
        <span class='ml-2 body-1 primary--text'>
          {{ formatPrice(product.price) }}
        </span>
        <v-spacer />
        <span v-if='isLogin'>
          <v-btn
              class='mr-2 pa-2 align-self-center'
              @click.stop='goToProduct(product.id)'
          >
            <v-icon small class='mr-1'>{{ editIcon }}</v-icon>
            修改
          </v-btn>
          <v-btn
              class='mr-2 pa-2 align-self-center red lighten-2 white--text'
              @click.stop='deleteProduct(product.id)'
              :loading='loading'
          >
            <v-icon small class='mr-1'>{{ deleteIcon }}</v-icon>
            刪除
          </v-btn>
        </span>
        <span v-else>
          <add-to-cart-btn
              v-if='!small'
              :product='product'
              :quantity='1'
          />
        </span>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { mdiPencil, mdiDeleteOutline } from '@mdi/js'
import { mapActions, mapState } from 'vuex'
import { base64ImgToSrc, formatPrice } from '@/helpers/data.helper'
import AddToCartBtn from '@/components/AddToCartBtn'
import { deleteProductById } from '@/services/product.service.js'

export default {
  name: 'product-card',
  components: { AddToCartBtn },
  props: {
    product: {
      type: Object,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      editIcon: mdiPencil,
      deleteIcon: mdiDeleteOutline,
      loading: false
    }
  },
  computed: {
    ...mapState( 'user', ['isLogin'] )
  },
  methods: {
    ...mapActions('cart', ['addItemToCart']),
    base64ImgToSrc,
    formatPrice,
    goToProduct(productId) {
      this.$router.push(`/product?productId=${productId}`)
    },
    async deleteProduct(productId) {
      this.loading = true
      await deleteProductById(productId)
      await this.$store.dispatch('product/getAllProducts')
      this.loading = false
    }
  }
}
</script>

<style lang='scss' scoped>
.v-card {
  width: 250px;
  .v-image {
    height: 200px;
    min-height: 200px;
    max-height: 200px;
  }
  &--small {
    width: 200px;
    .v-image {
      height: 150px;
      min-height: 150px;
      max-height: 150px;
    }
    .v-card__title {
      font-size: 16px;
      line-height: 18px;
    }
  }
}
</style>