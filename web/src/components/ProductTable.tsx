import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { ProductInterface } from "../pages/Products/Product.interface";
import { ProductService } from "../pages/Products/Products.service";
import ModalProductForm from "./ModalProductForm";


export default function ProductTable() {
  const productService = new ProductService();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const loadProductList = () => productService.getProducts()
  .then((response) => setProducts(response));
  // Carrega a listagem de produtos
  useEffect(() => {
    loadProductList();
  });  
  
  const handleNewProduct = () => {
    setSelectedProduct(null); // Sem produto selecionado, novo produto
    setModalIsVisible(true);  
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Produto selecionado para edição
    setModalIsVisible(true);
  }

  function deleteProduct(id: string) {
    productService.deleteProduct(id);
    // recarrega a listagem
    loadProductList();
  }

  // Cria o header da DataTable com a Modal e o Button para criar um novo produto.
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">Products</span>
        <Button rounded={true} icon={PrimeIcons.PLUS} label="New Product" onClick={handleNewProduct} /> 
    </div>
  );

  // Cria o footer da DataTable
  const footer = `In total there are ${products ? products.length : 0} products.`;

  // Define as colunas da DataTable
  const columns = [
    {field: 'id', header: 'ID'},
    {field: 'code', header: 'Code'},
    {field: 'name', header: 'Name'},
    {field: 'created_at', header: 'Created At'},
    {field: 'is_active', header: 'Active'},
  ];

  return (
    <div className="w-full">
      <DataTable header={header} footer={footer} value={products} tableStyle={{ minWidth: '50rem' }}>
        {columns.map((col, i) => (
        <Column key={col.field} field={col.field} header={col.header} />
        ))}
        {/* Coluna com as ações de edit e delete */}
        <Column header="Actions" body={(rowData) => (
          <div className="flex space-x-2 gap-2">
          <Button icon="pi pi-pencil" onClick={
            () => handleEditProduct(rowData)
            } />
          <Button icon="pi pi-trash" onClick={() => deleteProduct(rowData.id)} className="p-button-danger" />
          </div>
        )} />
      </DataTable>
      {/* Modal para criar ou editar produto */}
      <ModalProductForm
        isOpen={modalIsVisible}
        onHide={() => setModalIsVisible(false)}
        productToEdit={selectedProduct} // Passa o produto a ser editado ou null para novo produto
      />
    </div>  
  );
}