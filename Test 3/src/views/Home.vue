<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Category and Product Table
    </h1>
    <CategoryTable />
  </div>
</template>

<script>
import CategoryTable from "../components/CategoryTable.vue";

export default {
  name: "Home",
  components: {
    CategoryTable,
  },
};
</script>

<style></style>
