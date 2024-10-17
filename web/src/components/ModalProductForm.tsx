
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { useEffect, useState } from 'react';
import { ProductInterface } from '../pages/Products/Product.interface';
import { ProductService } from '../pages/Products/Products.service';

interface props {
  isOpen: boolean;
  onHide: (product?: ProductInterface | null) => void;
  productToEdit: ProductInterface | null;
}       

export default function ModalProductForm({isOpen, onHide, productToEdit}: props) {
  const productService = new ProductService(); // Instância a classe de serviços
  const options = ['Yes', 'No'];

  const [formValues, setFormValues] = useState({
    code: '',
    name: ''
  });
  const [isActive, setIsActive] = useState<string>(options[0]);
  
  

  // Se um produto for passado, preenche o formulário para edição
  useEffect(() => {
    if (productToEdit) {
      setFormValues({
        code: productToEdit.code,
        name: productToEdit.name,
      });
      setIsActive(productToEdit.is_active === 'Y'? 'Yes':'No')
      
    } else {
      // Limpa o formulário para criação de um novo produto
      setFormValues({
        code: '',
        name: ''
      });
      setIsActive('Yes'); // Limpa o campo de ativo
    }
  }, [productToEdit, isOpen]);
  
  const handleSave = async () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!formValues.code || !formValues.name || !isActive) {
      console.error('Todos os campos devem ser preenchidos.');
      return;
    }
  
    let savedProduct: ProductInterface | null = null; // Variável que será retornada para o componente pai
  
    try {
      if (productToEdit) {
        const editedProduct = {
          ...productToEdit, // Mantém o ID e created_at
          code: formValues.code,
          name: formValues.name,
          is_active: isActive === 'Yes' ? 'Y' : 'N'
        };
        await productService.editProduct(editedProduct); // Espera a edição
        savedProduct = editedProduct; // Atribui o produto editado
      } else {
        const newProduct: ProductInterface = {
          code: formValues.code,
          name: formValues.name,
          is_active: isActive === 'Yes' ? 'Y' : 'N'
        };
        await productService.createNewProduct(newProduct); // Espera a criação
        // Nenhum produto é retornado no caso de novo produto, pois a listagem será atualizada separadamente
      }
  
      onHide(savedProduct); // Retorna o produto editado ou null (para novos produtos) ao componente pai
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
    }
  };
  
  

  return (
    <Dialog header={productToEdit ? 'Edit Product' : 'New Product'} visible={isOpen} onHide={onHide} style={{ width: '50vw' }} >
      <div className='card flex-column m-2rem justify-content-center w-full'>
        <div className="card w-full justify-content-center">
          <label htmlFor="Code Field" className='w-full'>Product Code</label>
          <InputText name='Code Field' value={formValues.code} onChange={e => setFormValues({ ...formValues, code: e.target.value })} placeholder='Code' className='w-full'/>
        </div>
        <div className="card w-full justify-content-center mt-3">
          <label htmlFor="Name Field">Product Name</label>
          <InputText name='Name Field' value={formValues.name} onChange={e => setFormValues({ ...formValues, name: e.target.value })} placeholder='Name' className='w-full'/>
        </div>
        <div className='card w-full'>
          <SelectButton value={isActive} onChange={(e) => setIsActive(e.value)} options={options} className='mt-3'/>
        </div>
        <div className='card flex justify-content-center mt-3'>
          <Button label={productToEdit ? 'Save Changes' : 'Create Product'} onClick={handleSave}/>
        </div>
      </div>
    </Dialog>
  );
}