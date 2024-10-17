import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";

export default function TopBarMenu() {

  const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

  const center = (<InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />)

  const end = (<Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />);

    return (
      <div className="w-full mb-2">
        <Toolbar start={start} center={center} end={end} className=" shadow-2" />
      </div>
    )
}