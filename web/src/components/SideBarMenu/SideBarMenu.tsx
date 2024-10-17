import { PanelMenu } from "primereact/panelmenu";
import './SideBarMenu.css';

export default function SideBarMenu() {

  const options = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      url: '/'
    },
    {
      label: 'Products',
      icon: 'pi pi-book',
      url: '/products'
    },
  ];

  return (
    <div className="card w-2">
      <PanelMenu model={options} />
    </div>
  )
}