import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
function ModalDialog({TitlePage, FormPage, TitlesPage}) {
    const [isOpen, setIsOpen] = useState(false);
    return ( 
        <>
        <Button onClick={()=> setIsOpen(true)}
        className="text-white bg-[#e87204] hover:bg-[#030712] focus:outline-none hover:text-white focus:ring-primary"
>
            Agregar {TitlePage}
        </Button>

        <Dialog open={isOpen} onOpenChange={()=>setIsOpen(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        REGISTRAR {TitlesPage}
                    </DialogTitle>
                   

                </DialogHeader>
                <div className="">
                    <FormPage/>
                </div>
            </DialogContent>
        </Dialog>
        </>
     );
}

export default ModalDialog;