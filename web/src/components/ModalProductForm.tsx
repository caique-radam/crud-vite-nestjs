
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { useEffect, useState } from 'react';
import { ProductInterface } from '../pages/Products/Product.interface';
import { ProductService } from '../pages/Products/Products.service';

interface props {
  isOpen: boolean;
  onHide: () => void;
  productToEdit: ProductInterface | null;
}       

export default function ModalProductForm({isOpen, onHide, productToEdit}: props) {
  const productService = new ProductService();
  const options = ['yes', 'no'];

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
        name: productToEdit.name
      });
    } else {
      // Limpa o formulário para criação de um novo produto
      setFormValues({
        code: '',
        name: ''
      });
    }
  }, [productToEdit]);
  
  // Se o obj "productToEdit" === null. Cria-se um produto novo
  const handleSave = () => {
    if (productToEdit) {
      const editProduct: ProductInterface = {
        id: productToEdit.id,
        code: formValues.code,
        name: formValues.name,
        created_at: productToEdit.created_at
      }
      productService.editProduct(editProduct);

      console.log('Editando produto:', formValues);
    } else {
      const newProduct: ProductInterface = {
        code: formValues.code,
        name: formValues.name,
        //is_active: isActive
      };
      productService.createNewProduct(newProduct);

      console.log('Criando novo produto:', formValues);
    }
    onHide(); // Fecha a modal após salvar
  }

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
        <SelectButton value={isActive} onChange={(e) => setIsActive(e.value)} options={options} className='mt-3'/>
        <div className='card flex justify-content-center mt-3'>
          <Button label={productToEdit ? 'Save Changes' : 'Create Product'} onClick={handleSave}/>
        </div>
      </div>
    </Dialog>
  );
}