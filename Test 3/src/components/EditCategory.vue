<template>
  <div
    class="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md"
  >
    <h2 class="text-2xl font-bold mb-6">Edit Category</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label
          for="subcategories"
          class="block text-gray-700 font-semibold mb-2"
        >
          Subcategories
        </label>
        <div
          v-for="(sub, index) in form.subcategories"
          :key="index"
          class="flex items-center mb-2"
        >
          <select
            v-model="sub.id"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a subcategory</option>
            <option
              v-for="option in subcategoryOptions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Category
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/categoryStore";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "EditCategory",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const categoryStore = useCategoryStore();
    const form = ref({
      name: "",
      subcategories: [{ id: "" }],
    });
    const subcategoryOptions = ref([]);
    const categoryId = parseInt(route.params.id, 10);
    console.log(categoryId);

    // Fetch all categories and set subcategory options
    const fetchCategories = async () => {
      await categoryStore.fetchCategories();
      subcategoryOptions.value = categoryStore.category;
    };

    // Fetch the category by ID and set form fields
    const fetchCategoryById = async (id) => {
      const category = await categoryStore.fetchCategoryById(id);
      if (category) {
        form.value.name = category.name;
        form.value.subcategories = [{ id: category.parent_id }];
      }
    };

    // Submit the form to update the category
    const submitForm = async () => {
      const updatedSubcategories = form.value.subcategories.map(
        (sub) => sub.id
      );

      try {
        await categoryStore.updateCategory(
          categoryId,
          form.value.name,
          updatedSubcategories[0] || null
        );
        router.push("/"); // Redirect after successful update
      } catch (error) {
        console.error("Error updating category:", error);
      }
    };

    onMounted(async () => {
      await fetchCategories();
      await fetchCategoryById(categoryId); // Fetch category by ID
    });

    return {
      form,
      subcategoryOptions,
      submitForm,
    };
  },
};
</script>

<style scoped></style>
