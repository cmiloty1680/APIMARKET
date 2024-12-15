import { Button } from "../ui/button";
import DataTable from "./DataTable";
import ModalDialog from "./ModalDialog";

function ContentPage({ TitlePage, Data, TitlesTable, FormPage, Actions, TitlesPage }) {
    return (
        <>
            {/* Título de la página */}
            <div>
                <h1 className="text-xl font-bold mb-5">{TitlePage}</h1>
            </div>
            
            {/* Contenedor de botones */}
            <div className="flex justify-end items-center space-x-3 mb-5">
                <ModalDialog TitlesPage={TitlesPage} FormPage={FormPage} />
                <Button className="border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#030712] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Exportar
                </Button>
            </div>

            {/* Tabla de datos */}
            <div>
                <DataTable Data={Data} TitlesTable={TitlesTable} Actions={Actions} />
            </div>
        </>
    );
}

export default ContentPage;
