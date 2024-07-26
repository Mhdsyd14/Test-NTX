<template>
  <div
    class="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md"
  >
    <h2 class="text-2xl font-bold mb-6">Create Category</h2>
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
          Create Category
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/categoryStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // Import useRouter

export default {
  name: "CreateCategory",
  setup() {
    const categoryStore = useCategoryStore();
    const router = useRouter(); // Initialize router
    const form = ref({
      name: "",
      subcategories: [{ id: "" }], // Menyimpan ID subkategori
    });
    const subcategoryOptions = ref([]);

    // Ambil data kategori dan set subkategoriOptions
    const fetchCategories = async () => {
      await categoryStore.fetchCategories();
      subcategoryOptions.value = categoryStore.category; // Update subcategory options
    };

    // Fungsi untuk mengirim form
    const submitForm = async () => {
      // Ambil ID subkategori yang dipilih
      const selectedSubcategories = form.value.subcategories.map(
        (sub) => sub.id
      );

      // Buat kategori dengan ID subkategori yang dipilih
      await categoryStore.createCategory(
        form.value.name,
        selectedSubcategories[0] || null // Pass the first selected subcategory ID or null
      );

      // Reset form setelah berhasil
      form.value.name = "";
      form.value.subcategories = [{ id: "" }];

      // Navigate to home page
      router.push("/");
    };

    onMounted(fetchCategories);

    return {
      form,
      subcategoryOptions,
      submitForm,
    };
  },
};
</script>

<style scoped></style>
