<template>
  <div class="p-5">
    <div class="flex justify-between mb-5">
      <router-link
        to="/create-category"
        class="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Create Category
      </router-link>
      <router-link
        to="/create-product"
        class="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Create Product
      </router-link>
    </div>
    <div
      v-for="(categoryGroup, categoryName) in groupedProducts"
      :key="categoryName"
      class="mb-8"
    >
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-lg font-bold">Category: {{ categoryName }}</h2>
        <div class="flex flex-row gap-2">
          <router-link
            :to="{
              name: 'edit-category',
              params: { id: categoryGroup[0].category_id },
            }"
            class="bg-yellow-400 py-1 px-2 rounded"
          >
            Edit Category
          </router-link>
          <button
            @click="deleteCategory(categoryGroup[0].category_id)"
            class="bg-red-600 text-white py-1 px-2 rounded"
          >
            Delete Category
          </button>
        </div>
      </div>
      <table class="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Sub Category</th>
            <th class="py-2 px-4 border">Product</th>
            <th class="py-2 px-4 border">Price</th>
            <th class="py-2 px-4 border">Qty</th>
            <th class="py-2 px-4 border">Action Product</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in categoryGroup" :key="product.id">
            <td class="py-2 px-4 border">{{ product.subcategory_name }}</td>
            <td class="py-2 px-4 border">{{ product.name }}</td>
            <td class="py-2 px-4 border">
              {{ formatCurrency(product.price) }}
            </td>
            <td class="py-2 px-4 border">{{ product.quantity }}</td>
            <td class="py-2 px-4 border text-center">
              <div class="flex flex-row justify-center gap-2">
                <router-link
                  :to="{ name: 'edit-product', params: { id: product.id } }"
                  class="bg-green-200 py-1 px-2 rounded"
                >
                  Edit
                </router-link>
                <button
                  @click="deleteProduct(product.id)"
                  class="bg-red-600 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="py-2 px-4 border font-bold" colspan="2">Total</td>
            <td class="py-2 px-4 border">
              {{ formatCurrency(getTotalPrice(categoryGroup)) }}
            </td>
            <td class="py-2 px-4 border">
              {{ getTotalQuantity(categoryGroup) }}
            </td>
            <td class="py-2 px-4 border font-bold">
              {{ formatCurrency(getTotalAmount(categoryGroup)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useCategoryStore } from "../stores/categoryStore";

export default {
  name: "CategoryTable",
  setup() {
    const productsStore = useProductsStore();
    const categoryStore = useCategoryStore();
    const products = ref([]);
    const categories = ref([]);

    const fetchData = async () => {
      try {
        await productsStore.fetchProducts();
        await categoryStore.fetchCategories();
        products.value = productsStore.products || [];
        categories.value = categoryStore.category || [];
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(fetchData);

    const combinedProducts = computed(() => {
      return products.value.map((product) => {
        const category =
          categories.value.find((cat) => cat.id === product.category_id) || {};
        const subcategoryName = category.category
          ? category.category.name
          : "Tidak Ada Subcategory";
        return {
          ...product,
          category_name: category.name || "Tidak ada Category",
          subcategory_name: subcategoryName,
        };
      });
    });

    const groupedProducts = computed(() => {
      const groups = {};
      combinedProducts.value.forEach((product) => {
        if (!groups[product.category_name]) {
          groups[product.category_name] = [];
        }
        groups[product.category_name].push(product);
      });
      return groups;
    });

    const getTotalQuantity = (products) => {
      return products.reduce(
        (sum, product) => sum + (product.quantity || 0),
        0
      );
    };

    const getTotalPrice = (products) => {
      return products.reduce((sum, product) => sum + (product.price || 0), 0);
    };

    const getTotalAmount = (products) => {
      return products.reduce(
        (sum, product) => sum + (product.price * product.quantity || 0),
        0
      );
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    };

    const deleteCategory = async (categoryId) => {
      try {
        await categoryStore.deleteCategory(categoryId);
        await fetchData();
        alert("Category berhasil dihapus!");
        location.reload();
      } catch (error) {
        alert("Category tidak berhasil dihapus!");
        console.error("Error deleting category:", error);
      }
    };

    const deleteProduct = async (productId) => {
      try {
        await productsStore.deleteProduct(productId);
        alert("Produk berhasil dihapus!");
        location.reload(); // Refresh halaman setelah menghapus produk
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

    return {
      groupedProducts,
      getTotalQuantity,
      getTotalPrice,
      getTotalAmount,
      formatCurrency,
      deleteCategory,
      deleteProduct,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS will handle the styling */
</style>
