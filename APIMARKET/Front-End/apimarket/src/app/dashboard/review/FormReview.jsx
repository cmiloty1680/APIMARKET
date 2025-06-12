"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { ClipboardCheck } from "lucide-react";
import DynamicAlert from "@/components/utils/DynamicAlert";

function FormReview({ buttonForm, review, onDataUpdated, closeModal }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responsibles, setResponsibles] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [nomResponsible, setNomResponsible] = useState("");
  const [isModalOpenFall, setModalOpenFall] = useState(false);
  const [id_Review, setIdReview] = useState(null);
  const [msSuccess, setMsSuccess] = useState("");
  const [fecha, setFecha] = useState("");
  const [idHives, setIdHives] = useState("");

  const [hives, setHives] = useState([]);




  useEffect(() => {
    async function fetchresponsibles() {
      try {
        const response = await axiosInstance.get(
          "/Api/Responsible/GetsAllResponsible"
        );
        setResponsibles(response.data);

      } catch (error) {
        console.error("Error al octener responsable:", error);
      }
    }
    fetchresponsibles();
  }, []);


  useEffect(() => {
    async function fetchHives() {
      try {
        const response = await axiosInstance.get("/Api/Hive/AllHive"); // Ajusta la URL según tu API
        setHives(response.data); // Guardar las razas en el estado
      } catch (error) {
        console.error("Error al obtener colmena:", error);
      }
    }
    fetchHives();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    if (!fecha || !descripcion || !nomResponsible || !descripcion) {
      setError("Todos los campos son requeridos.");
      setSubmitting(false);
      setModalOpenFall(true);
      return;
    }



    function capitalizarNombreCompleto(texto) {
      return texto
        .toLowerCase()                            // todo en minúscula
        .replace(/\s+/g, " ")                     // elimina espacios múltiples
        .trim()                                   // quita espacios al inicio/final
        .split(" ")                               // separa por palabra
        .map(p => p.charAt(0).toUpperCase() + p.slice(1)) // primera en mayúscula
        .join(" ");                               // une de nuevo
    }
    const descripcionFormateada = capitalizarNombreCompleto(descripcion);

    const formattedFecha = fecha ? fecha.split("T")[0] : "";

    try {
      if (buttonForm === "Actualizar") {
        const UpdateReview = {
          id_Review: id_Review,
          fec_Review: formattedFecha,
          des_Review: descripcionFormateada,
          id_Responsible: nomResponsible,
          id_Hive: idHives,
        };
        const response = await axiosInstance.put(`/Api/Review/UpdateReview/${id_Review}`,
          UpdateReview
        )
        if (response.status === 200) {
          setMsSuccess(response.data.message || "revicion actualizada correctamente.")
          setModalOpen(true);
          onDataUpdated();
        }
      } else if (buttonForm === "Registrar") {
        const response = await axiosInstance.post("/Api/Review/CreateReview", {
          fec_Review: formattedFecha,
          des_Review: descripcionFormateada,
          id_Responsible: nomResponsible,
          id_Hive: idHives,
        });

        if (response.status === 200) {
          setMsSuccess(response.data.message || "revicion registrada correctamente.");
          setModalOpen(true);
          onDataUpdated();
        }
      }
    } catch (error) {
      console.log("Error:", error.response || error.message);
      setError(
        error.response?.data?.message || "Error al conectar al servidor."
      );
      setModalOpenFall(true);
    } finally {
      setSubmitting(false);
    }
  }



  useEffect(() => {
    if (review) {
      setFecha(review.fec_Review ?? "");
      setIdReview(review.id_Review);
      setIdHives(review.id_Hive);
      setNomResponsible(review.id_Responsible);
      setDescripcion(review.des_Review);
    }
  }, [review]);

  return (
    <>
      <form
        className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-gray-900">Revisión</h2>
              <p className="text-xs text-gray-500">
                Ingrese los datos de la revisión
              </p>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {msSuccess && (
          <p className="text-green-500 mb-4 text-sm">{msSuccess}</p>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-1">
            <label htmlFor="estado" className="text-sm font-medium text-gray-700">
              Fecha de Revisión
            </label>
            <input
              type="date"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              id="cantidad"
              required
              name="fecha"
              value={fecha || ""}
              onChange={(event) => setFecha(event.target.value)}
            />
          </div>


          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">ID Colmena</label>
            <select
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
              value={idHives || ""}
              onChange={(event) => setIdHives(event.target.value)}
              required
            >
              <option value="" disabled>Seleccione ID colmena</option>
              {hives.map((hive) => (
                <option key={hive.id_Hive} value={hive.id_Hive}>
                  {hive.id_Hive}
                </option>
              ))}
            </select>
          </div>

        </div>


        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Nombre de responsable</label>
          <select
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
            value={nomResponsible || ""}
            onChange={(event) => setNomResponsible(event.target.value)}
            required
          >
            <option value="" disabled>Seleccione</option>
            {responsibles
              .filter((responsible) => responsible.est_Responsible === "activo")
              .map((responsible) => (
                <option key={responsible.id_Responsible} value={responsible.id_Responsible}>
                  {responsible.nam_Responsible} {responsible.lasNam_Responsible}
                </option>
              ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="comments"
            className="text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="comments"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-[#e87204] text-sm"
            rows="3"
            required
            value={descripcion || ""}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>

        <div className="flex justify-end pt-3">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
          >
            {isSubmitting ? "Guardando..." : buttonForm}
          </Button>
        </div>
      </form>

      <DynamicAlert
        isOpen={isModalOpen}
        onOpenChange={(isOpen) => {
          setModalOpen(isOpen); // Cambia el estado del modal
          if (!isOpen) {
            closeModal();  // Cierra el modal del formulario cuando se cierra el modal de éxito
          }
        }}
        type="success"
        message={msSuccess || "Operación exitosa"}
        redirectPath=""
      />
    </>
  );
}

export default FormReview;