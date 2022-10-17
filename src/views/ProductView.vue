<template>
  <div v-if='isLogin'>
    <ProductEdit :product-id='productId' />
  </div>
  <div v-else>
    <ProductDetail :product-id='productId' />
    <div
        v-if='!isNullOrEmpty(productRecs)'
        class='my-10 mx-16'
    >
      <h3>其他人都在買...</h3>
      <product-card-list
          :small='true'
          :products='productRecs'
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import ProductDetail from '@/components/ProductDetail'
import ProductEdit from '@/components/ProductEdit'
import ProductCardList from '@/components/ProductCardList'
import { isEmpty } from 'lodash'

export default {
  name: 'productView',
  components: { ProductDetail, ProductEdit, ProductCardList },
  data() {
    return {
      productId: '',
    }
  },
  computed: {
    ...mapState( 'user', ['isLogin'] ),
    ...mapGetters({ getProductRec: 'product/getProductRec' }),
    productRecs() {
      return this.getProductRec(this.productId)
    }
  },
  methods: {
    isNullOrEmpty(obj) {
      return isEmpty(obj)
    },
  },
  watch: {
    '$route.query.productId': {
      handler: function(id){
        this.productId = id
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.productId = this.$route.query.productId
  }
}

</script>

<style lang='scss'>
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