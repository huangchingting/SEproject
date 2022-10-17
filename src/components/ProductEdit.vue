<template>
  <v-form class='grey lighten-5 pa-10' ref='form' v-model='productFormValid'>
    <v-alert
        class='mx-auto mb-10'
        v-if='response.show'
        :type='response.type'
        max-width='500'
    >
      {{ response.message }}
    </v-alert>
    <v-row>
      <v-col cols='6' class='d-flex flex-column'>
        <v-img
            v-if='!isNullOrEmpty(product.img)'
            min-height='500'
            max-height='500'
            :src='base64ImgToSrc(product.img)'
        />
        <v-file-input
            show-size
            :label='isNullOrEmpty(product.img) ? "選擇產品圖片" : "更新產品圖片"'
            :rules='[file => !file || file.size <= 3e6 || "產品圖片需小於3MB"]'
            accept='image/*'
            @change='selectImage'
        />
      </v-col>
      <v-col cols='6' class='d-flex flex-column'>
        <v-text-field
            outlined
            required
            :rules='[v => !!v || "產品名稱為必填項目"]'
            label='產品名稱'
            class='mt-0 pt-0'
            v-model='product.title'
        />
        <v-text-field
            outlined
            required
            :rules='[v => v > 0 || "價錢為必填項目且需大於0"]'
            label='價錢'
            type='number'
            class='mt-0 pt-0'
            v-model='product.price'
        />
        <v-text-field
            outlined
            required
            :rules='[v => v > 0 || "庫存為必填項目且需大於0"]'
            label='庫存'
            type='number'
            class='mt-0 pt-0'
            v-model='product.stock'
        />

        <v-textarea
          outlined
          required
          :rules='[v => !!v || "產品描述名稱為必填項目"]'
          label='產品描述'
          v-model='product.description'
        />

        <v-btn @click='submitProduct' :loading='loading'>
          提交
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mdiCheck, mdiCloudUploadOutline } from '@mdi/js'
import { isEmpty } from 'lodash'

import { base64ImgToSrc, srcImgToBase64 } from '@/helpers/data.helper'
import { createProduct, updateProductById } from '@/services/product.service'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'productEdit',
  components: {},
  props: {
    productId: {
      type: String,
    }
  },
  data() {
    return {
      uploadIcon: mdiCloudUploadOutline,
      checkIcon: mdiCheck,
      emptyProduct: {
        img: '',
        title: '',
        price: 0,
        stock: 0,
        description: '',
      },
      productFormValid: true,
      response: {
        show: false,
        type: '',
        message: ''
      },
      loading: false,
    }
  },
  computed: {
    ...mapGetters({ productById: 'product/productById' }),
    ...mapState({ products: state => state.product.products }),
    createMode() {
      return isEmpty(this.productId)
    },
    product() {
      if (this.createMode) {
        return this.emptyProduct
      } else {
        let product = this.productById(this.productId)
        return product ? product : this.emptyProduct
      }
    },
  },
  methods: {
    base64ImgToSrc,
    isNullOrEmpty(obj) {
      return isEmpty(obj)
    },
    async selectImage(img) {
      if (img == null) {
        this.product.img = ''
      } else {
        this.product.img = await srcImgToBase64(img)
      }
    },
    submitProduct: async function() {
      if (!this.productFormValid) {
        return
      }

      this.loading = true
      let message = ''

      try {
        if (this.createMode) {
          let productId = await createProduct(this.product)
          await this.$router.push(`/product?productId=${ productId }`)
          await this.$store.dispatch('product/getAllProducts')
          message = '新增商品'
        } else {
          await updateProductById(this.productId, this.product)
          await this.$store.dispatch('product/getAllProducts')
          message = '修改商品'
        }

        this.response = {
          show: true,
          type: 'success',
          message: `${message}成功`
        }

      } catch (err) {
        this.response = {
          show: true,
          type: 'error',
          message: `${message}失敗，請稍後再試`
        }
      } finally {
        this.loading = false
        setTimeout(() => {
          this.response = {
            show: false,
            type: '',
            message: '',
          }
        }, 5000)
      }
    }
  },
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