<template>
  <div class='px-5'>
    <v-card max-width='80%' elevation='5' class='mx-auto mb-5'>
      <v-carousel
          cycle
          height='400'
          show-arrows-on-hover
      >
        <v-carousel-item
            v-for='(img, i) in images'
            :key='i'
            :src='img'
        />
      </v-carousel>
    </v-card>

    <product-card-list
        v-if='products.length > 0'
        :products='products'
        :showAddProduct='isLogin'
    />

    <div v-else class='d-flex flex-wrap'>
      <v-skeleton-loader
        v-for='index in 10'
        class='d-flex flex-column ma-5'
        width='250'
        :key='index'
        elevation='2'
        type='card, actions'
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCardList from '@/components/ProductCardList'

export default {
  name: 'Home',
  components: { ProductCardList },
  data() {
    return {
      images: [
        require('@/assets/homeCarousel/1.jpg'),
        require('@/assets/homeCarousel/2.jpg'),
        require('@/assets/homeCarousel/3.jpg'),
        require('@/assets/homeCarousel/4.jpg'),
        require('@/assets/homeCarousel/5.jpg'),
        require('@/assets/homeCarousel/6.jpg'),
        require('@/assets/homeCarousel/7.jpg'),
      ],
    }
  },
  computed: mapState({
    products: state => state.product.products,
    isLogin: state => state.user.isLogin,
  }),
}
</script>
