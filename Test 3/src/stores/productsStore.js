// src/stores/productsStore.js
import { defineStore } from "pinia";
import { gql } from "@apollo/client/core";
import client from "@/apolloClient";

export const useProductsStore = defineStore("productsStore", {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const result = await client.query({
          query: gql`
            query {
              products {
                id
                name
                price
                quantity
                category_id
              }
            }
          `,
        });
        this.products = result.data.products; // Pastikan `products` ada di `result.data`
        console.log("Fetched products:", result);
      } catch (error) {
        this.error = error;
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteProduct(id) {
      try {
        const result = await client.mutate({
          mutation: gql`
            mutation DeleteProduct($id: Int!) {
              delete_products_by_pk(id: $id) {
                id
                name
                price
                category_id
                quantity
                created_at
              }
            }
          `,
          variables: {
            id,
          },
        });
        // Remove the deleted product from the local state
        this.products = this.products.filter((product) => product.id !== id);
        console.log("Product deleted:", result.data.delete_products_by_pk);
      } catch (error) {
        this.error = error;
        console.error("Error deleting product:", error);
      }
    },
    async createProduct(product) {
      const mutation = gql`
        mutation CreateProduct(
          $name: String!
          $price: numeric!
          $category_id: Int
          $quantity: Int!
        ) {
          insert_products_one(
            object: {
              name: $name
              price: $price
              category_id: $category_id
              quantity: $quantity
            }
          ) {
            id
            name
            price
            category_id
            quantity
            created_at
          }
        }
      `;

      const variables = {
        name: product.name,
        price: product.price.toString(), // Kirim sebagai string jika backend mengharapkannya
        category_id: parseInt(product.category_id, 10),
        quantity: parseInt(product.quantity, 10),
      };

      try {
        const response = await client.mutate({
          mutation,
          variables,
        });
        return response.data.insert_products_one;
      } catch (error) {
        console.error("Error creating product:", error.message);

        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
        }

        if (error.networkError) {
          console.error(`[Network error]: ${error.networkError}`);
        }

        throw error; // Lempar ulang atau tangani kesalahan sesuai kebutuhan
      }
    },
    async getProductById(id) {
      this.loading = true;
      try {
        const result = await client.query({
          query: gql`
            query GetProduct($id: Int!) {
              products_by_pk(id: $id) {
                id
                name
                price
                quantity
                category_id
              }
            }
          `,
          variables: { id },
        });
        return result.data.product_by_pk;
      } catch (error) {
        this.error = error;
        console.error("Error fetching product by ID:", error);
      } finally {
        this.loading = false;
      }
    },
    async updateProduct(id, updatedProduct) {
      const mutation = gql`
        mutation UpdateProduct(
          $id: Int!
          $name: String!
          $price: numeric!
          $category_id: Int
          $quantity: Int!
        ) {
          update_products_by_pk(
            pk_columns: { id: $id }
            _set: {
              name: $name
              price: $price
              category_id: $category_id
              quantity: $quantity
            }
          ) {
            id
            name
            price
            category_id
            quantity
          }
        }
      `;

      try {
        const response = await client.mutate({
          mutation,
          variables: {
            id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            category_id: updatedProduct.category_id,
            quantity: updatedProduct.quantity,
          },
        });
        return response.data.update_products_by_pk;
      } catch (error) {
        console.error("Error updating product:", error.message);
        throw error;
      }
    },
  },
});
