import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormProduction from "@/app/dashboard/production/FormProduction";

function ModalDialog({ isOpen, setIsOpen, FormPage, action, production }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{action}</DialogTitle>
        </DialogHeader>
        <div>
          {/* <FormPage/> Aquí se mostrará el formulario */}
          <FormProduction production={production}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalDialog;










// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { useState } from "react";
// import { Button } from "../ui/button";
// function ModalDialog({ FormPage, action}) {
//     const [isOpen, setIsOpen] = useState(false);
//     // const [action , setAction] = useState("");
//     return ( 
//         <>
//         <Button onClick={()=> setIsOpen(true)}
//         className="text-white bg-[#e87204] hover:bg-[#030712] focus:outline-none hover:text-white focus:ring-primary"
// >
//             Agregar
//         </Button>

//         <Dialog open={isOpen} onOpenChange={()=>setIsOpen(false)}>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>
//                        {action}
//                     </DialogTitle>
                   

//                 </DialogHeader>
//                 <div className="">
//                     <FormPage/>
//                 </div>
//             </DialogContent>
//         </Dialog>
//         </>
//      );
// }

// export default ModalDialog;