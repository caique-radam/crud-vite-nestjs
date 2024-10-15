import axios from "axios";
import { ProductInterface } from "./Product.interface";

export class ProductService {
  private fetchUrl: string; // Endereço base das requisições

  constructor() {
    this.fetchUrl = "http://localhost:3000";
  }

  async getProducts() {
    try {
      const response = await axios.get(`${this.fetchUrl}/product`);
      const productList = response.data; // Retorna apenas os dados da resposta
      return productList;
    } catch (error) {
      console.error("Erro ao carregar os produtos", error);
      return []; // Retorna uma lista vazia em caso de erro
    }
  }

  async createNewProduct(product: ProductInterface) {
    try {
      await axios.post(`${this.fetchUrl}/product`, product);
    } catch (error) {
      console.log("Error ao salvar o produto", error);
    }
  }

  async editProduct(product: ProductInterface) {
    try {
      await axios.put(`${this.fetchUrl}/product`, product);
    } catch (error) {
      console.log("Error ao salvar alterações", error);
    }
  }

  async deleteProduct(id: string) {
    try {
      await axios.delete(`${this.fetchUrl}/product/${id}`);
    } catch (error) {
      console.log("Error ao deletar o produto!", error);
    }
  }
}
