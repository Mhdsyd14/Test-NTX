import { defineStore } from "pinia";
import { gql } from "@apollo/client/core";
import client from "@/apolloClient";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    category: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCategories() {
      this.loading = true;
      try {
        const result = await client.query({
          query: gql`
            query {
              categories {
                id
                name
                parent_id
                created_at
                category {
                  id
                  name
                }
              }
            }
          `,
        });
        this.category = result.data.categories; // Pastikan `categories` ada di `result.data`
      } catch (error) {
        this.error = error;
        console.error("Error fetching categories:", error);
      } finally {
        this.loading = false;
      }
    },
    async createCategory(name, parentId) {
      try {
        const result = await client.mutate({
          mutation: gql`
            mutation CreateCategory($name: String!, $parent_id: Int) {
              insert_categories_one(
                object: { name: $name, parent_id: $parent_id }
              ) {
                id
                name
                parent_id
                created_at
              }
            }
          `,
          variables: {
            name,
            parent_id: parentId,
          },
        });
        this.category.push(result.data.insert_categories_one);
        console.log(result, "new category");
      } catch (error) {
        this.error = error;
        console.error("Error creating category:", error);
      }
    },
    async deleteCategory(id) {
      try {
        await client.mutate({
          mutation: gql`
            mutation DeleteCategory($id: Int!) {
              delete_categories_by_pk(id: $id) {
                id
                name
                parent_id
                created_at
              }
            }
          `,
          variables: { id },
        });
        // Remove the deleted category from the store
        this.category = this.category.filter((category) => category.id !== id);
        console.log("Category deleted:", id);
      } catch (error) {
        this.error = error;
        console.error("Error deleting category:", error);
      }
    },
    async updateCategory(id, name, parentId) {
      try {
        const result = await client.mutate({
          mutation: gql`
            mutation UpdateCategory($id: Int!, $name: String, $parent_id: Int) {
              update_categories_by_pk(
                pk_columns: { id: $id }
                _set: { name: $name, parent_id: $parent_id }
              ) {
                id
                name
                parent_id
                created_at
              }
            }
          `,
          variables: {
            id,
            name,
            parent_id: parentId,
          },
        });
        // Update the category in the local state
        const updatedCategory = result.data.update_categories_by_pk;
        this.categories = this.categories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        );
        console.log("Category updated:", updatedCategory);
      } catch (error) {
        this.error = error;
        console.error("Error updating category:", error);
      }
    },
    async fetchCategoryById(id) {
      this.loading = true;
      try {
        const result = await client.query({
          query: gql`
            query GetCategoryById($id: Int!) {
              categories_by_pk(id: $id) {
                id
                name
                parent_id
                created_at
                category {
                  id
                  name
                }
              }
            }
          `,
          variables: { id },
        });
        this.category = result.data.categories_by_pk;
        return this.category;
      } catch (error) {
        this.error = error;
        console.error("Error fetching category by ID:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
