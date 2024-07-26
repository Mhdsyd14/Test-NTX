<template>
  <div
    class="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md"
  >
    <h2 class="text-2xl font-bold mb-6">Edit Product</h2>
    <form @submit.prevent="editProduct">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-semibold mb-2"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="price" class="block text-gray-700 font-semibold mb-2"
          >Price</label
        >
        <input
          type="number"
          id="price"
          v-model="form.price"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="category" class="block text-gray-700 font-semibold mb-2"
          >Category</label
        >
        <select
          id="category"
          v-model="form.category"
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

      <div class="mb-4">
        <label for="quantity" class="block text-gray-700 font-semibold mb-2"
          >Quantity</label
        >
        <input
          type="number"
          id="quantity"
          v-model="form.quantity"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Product
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
  name: "EditProduct",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const productStore = useProductsStore();
    const categoryStore = useCategoryStore();
    const router = useRouter(); // Initialize router

    const form = ref({
      name: "",
      price: "",
      category: "",
      quantity: "",
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

    const loadProductData = async () => {
      try {
        await productStore.fetchProducts();
        const product = productStore.products.find(
          (p) => p.id === parseInt(props.id, 10)
        );
        if (product) {
          form.value = {
            name: product.name || "",
            price: product.price || "",
            category: product.category_id || "",
            quantity: product.quantity || "",
          };
        }
      } catch (error) {
        console.error("Error loading product data:", error);
      }
    };

    const editProduct = async () => {
      try {
        const updatedProduct = {
          name: form.value.name,
          price: parseFloat(form.value.price),
          category_id: form.value.category,
          quantity: parseInt(form.value.quantity, 10),
        };
        await productStore.updateProduct(
          parseInt(props.id, 10),
          updatedProduct
        );
        router.push("/"); // Navigate to home page after successful update
        console.log("Product updated successfully", updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };

    onMounted(() => {
      fetchCategories();
      loadProductData();
    });

    return {
      form,
      categories,
      editProduct,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
