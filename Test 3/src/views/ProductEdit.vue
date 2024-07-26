<!-- ProductEdit.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Category and Product Table
    </h1>
    <EditProduct :id="id" />
  </div>
</template>

<script>
import EditProduct from "../components/EditProduct.vue";

export default {
  name: "ProductEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    EditProduct,
  },
};
</script>

<style></style>
