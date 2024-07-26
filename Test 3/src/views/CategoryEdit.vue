<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Category and Product Table
    </h1>
    <EditCategory />
  </div>
</template>

<script>
import EditCategory from "../components/EditCategory.vue";

export default {
  name: "CategoryEdit",
  components: {
    EditCategory,
  },
};
</script>

<style></style>
