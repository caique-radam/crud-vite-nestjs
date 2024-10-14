import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() { 
  interface Product {
    id: string;
    code: string;
    name: string;
    created_at: Date;
  }
  
  const [products, setProducts] = useState<Product[]>([]);
  const [productCode, setProductCode] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Para edição

  const fetchUrl = 'http://localhost:3000'; // Endereço base das requisições

  // Carrega a lista em primeira instância
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(`${fetchUrl}/product`);
        console.log(result);
        setProducts(result.data);
      } catch (error) {
        console.error('Erro ao buscar produtos: ', error);
      }
    };

    fetchProducts();
  }, []);

  // Atualiza a lista de produtos
  async function reloadProductList() {
    const resultFetch =  await axios.get(`${fetchUrl}/product`);
    setProducts(resultFetch.data);
  }

  // Limpar campos e selecionar produto
  function cleanStates() {    
    setProductCode('');
    setProductName('');
    setSelectedProduct(null);
  }


  const handleSave = async () => {
    try {
      if (selectedProduct) {
        try {
          const {id, created_at} = selectedProduct;

          await axios.put(`${fetchUrl}/product`, {
            id: id,
            code: productCode,
            name: productName,
            create_at: created_at
          });
        } catch (error) {
          console.log('Erro ao salvar as alterações!', error);
        }
      }
      else {
        try {
          await axios.post(`${fetchUrl}/product`, {
            code: productCode,
            name: productName
          });
        } catch (error) {
          console.log('Erro ao salvar o produto', error);
        }
      } 

      cleanStates();
      reloadProductList();
    } catch (error) {
      console.log('Erro ao Salvar o produto' + error);
    }
  };

  const handleEdit = async (product: Product) => {
    setProductCode(product.code);
    setProductName(product.name);
    setSelectedProduct(product); // Define o produto está sendo editado
  };

  const handleDelete = async (product: Product) => {
    try {
      await axios.delete(`${fetchUrl}/product/${product.id}`);
      reloadProductList();
    } catch (error) {
      console.log('Erro ao deletar o produto' + error);
    }
  };

  return (
    <>
      <section>
        <div className='div-inputs'>
          <div>
            <label htmlFor="codeField">Code:</label>
            <input type="text" value={productCode} onChange={(event) => setProductCode(event.target.value)} />
          </div>
          <div>
            <label htmlFor="nameField">Name:</label>
            <input type="text" value={productName} onChange={(event) => setProductName(event.target.value)} />
          </div>
          <button onClick={handleSave}>
            {selectedProduct ? 'Atualizar' : 'Salvar'}
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Created_At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.created_at}</td>
                  <td>
                    <button onClick={() => handleEdit(product)}>Editar</button>
                    <button onClick={() => handleDelete(product)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default App;
