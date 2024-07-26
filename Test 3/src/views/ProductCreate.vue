<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Category and Product Table
    </h1>
    <CreateProduct />
  </div>
</template>

<script>
import CreateProduct from "../components/CreateProduct.vue";

export default {
  name: "ProductCreate",
  components: {
    CreateProduct,
  },
};
</script>

<style></style>
