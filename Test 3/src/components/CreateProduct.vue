<template>
  <div
    class="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md"
  >
    <h2 class="text-2xl font-bold mb-6">Create Product</h2>
    <form @submit.prevent="handleSubmit">
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
        <label for="price" class="block text-gray-700 font-semibold mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          v-model.number="form.price"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="quantity" class="block text-gray-700 font-semibold mb-2">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          v-model.number="form.quantity"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="category" class="block text-gray-700 font-semibold mb-2">
          Category
        </label>
        <select
          id="category"
          v-model="form.category_id"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Product
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useRouter } from "vue-router";

export default {
  name: "CreateProduct",
  setup() {
    const productStore = useProductsStore();
    const categoryStore = useCategoryStore();
    const router = useRouter();
    const form = ref({
      name: "",
      price: null,
      quantity: null,
      category_id: null,
    });

    const categories = ref([]);

    const fetchCategories = async () => {
      try {
        await categoryStore.fetchCategories();
        categories.value = categoryStore.category;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const handleSubmit = async () => {
      try {
        console.log("Submitting form data:", form.value);

        if (
          !form.value.name ||
          form.value.price === null ||
          form.value.quantity === null ||
          !form.value.category_id
        ) {
          throw new Error("Incomplete form data");
        }

        const newProduct = await productStore.createProduct(form.value);
        console.log("Product created:", newProduct);

        // Navigate to home page and refresh it
        router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error creating product:", error);
        // Handle error (e.g., show error message)
      }
    };

    onMounted(fetchCategories);

    return {
      form,
      categories,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS will handle styling */
</style>
