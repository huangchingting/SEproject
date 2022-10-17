<template>
  <div v-if='products.length > 0' class='d-flex flex-wrap'>
    <div
        v-if='showAddProduct'
        class='add-product-card ma-5 d-flex flex-column justify-center align-center'
        @click='addToAddProuduct'
      >
      <v-icon size='100'>{{ addIcon }}</v-icon>
      <p>新增商品</p>
    </div>
    <product-card
        v-for='product in products'
        :key='product.id'
        v-bind:product='product'
        :small='small'
    />
  </div>
</template>

<script>
import { mdiPlusCircleOutline } from '@mdi/js'
import ProductCard from '@/components/ProductCard'

export default {
  name: 'ProductList',
  components: { ProductCard },
  props: {
    products: Array,
    small: {
      type: Boolean,
      default: false,
    },
    showAddProduct: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addIcon: mdiPlusCircleOutline
    }
  },
  methods: {
    addToAddProuduct() {
      this.$router.push(`/product`)
    }
  }
}

</script>

<style lang='scss' scoped>
.add-product-card {
  width: 250px;
  cursor: pointer;
}
</style>