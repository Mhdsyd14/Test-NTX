<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Category and Product Table
    </h1>
    <CreateCategory />
  </div>
</template>

<script>
import CreateCategory from "../components/CreateCategory.vue";

export default {
  name: "CategoryCreate",
  components: {
    CreateCategory,
  },
};
</script>

<style></style>
