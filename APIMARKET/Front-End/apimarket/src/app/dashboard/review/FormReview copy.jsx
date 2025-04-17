"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Dialog } from "@headlessui/react";
import { ClipboardCheck } from "lucide-react";

function FormReview({ buttonForm, review }) {
    const router = useRouter();
    const [reviewDate, setReviewDate] = useState("");
    const [reviewerName, setReviewerName] = useState("");
    const [comments, setComments] = useState("");
    const [rating, setRating] = useState("");

    const [protocolType, setProtocolType] = useState("");
    const [protocolName, setProtocolName] = useState("");
    const [responsibleFirstName, setResponsibleFirstName] = useState("");
    const [responsibleLastName, setResponsibleLastName] = useState("");
    const [responsibleType, setResponsibleType] = useState("");

    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const [hives, setHives] = useState(null);

    useEffect(() => {
        if (review) {
            setDataReviewForUpdate(review);
        }
    }, [review]);

    const setDataReviewForUpdate = () => {
        setReviewDate(review.reviewDate ? new Date(review.reviewDate).toLocaleDateString("sv-SE") : "");
        setReviewerName(review.reviewerName || "");
        setComments(review.comments || "");
        setRating(review.rating || "");

        setProtocolType(review.protocolType || "");
        setProtocolName(review.protocolName || "");
        setResponsibleFirstName(review.responsibleFirstName || "");
        setResponsibleLastName(review.responsibleLastName || "");
        setResponsibleType(review.responsibleType || "");

        setReviewId(review.id);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        if (
            !reviewDate ||
            !reviewerName ||
            !comments ||
            !rating ||
            !protocolType ||
            !protocolName ||
            !responsibleFirstName ||
            !responsibleLastName ||
            !responsibleType
        ) {
            setModalMessage("Todos los campos son requeridos.");
            setModalOpen(true);
            setSubmitting(false);
            return;
        }

        const formattedDate = new Date(reviewDate).toISOString().split("T")[0];

        const reviewPayload = {
            reviewDate: formattedDate,
            reviewerName,
            comments,
            rating,
            protocolType,
            protocolName,
            responsibleFirstName,
            responsibleLastName,
            responsibleType,
        };

        try {
            if (buttonForm === "Actualizar") {
                const response = await axiosInstance.put(`/Api/Review/UpdateReview/${reviewId}`, {
                    id: reviewId,
                    ...reviewPayload,
                });
                if (response.status === 200) {
                    setModalMessage("Revisión actualizada correctamente.");
                    setModalOpen(true);
                }
            } else if (buttonForm === "Registrar") {
                const response = await axiosInstance.post("/Api/Review/CreateReview", reviewPayload);
                if (response.status === 200) {
                    setModalMessage("Revisión registrada correctamente.");
                    setModalOpen(true);
                }
            }
        } catch (error) {
            setModalMessage(error.response?.data?.message || "Error al conectar con el servidor.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <form className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#e87204] rounded-full flex items-center justify-center text-white">
                            <ClipboardCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                            <h2 className="text-xl font-bold text-gray-900">Revisión</h2>
                            <p className="text-xs text-gray-500">Ingrese los datos de la revisión</p>
                        </div>
                    </div>
                </div>

                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="reviewDate" className="text-sm font-medium text-gray-700">Fecha de Revisión</label>
                        <input
                            type="date"
                            id="reviewDate"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            required
                            value={reviewDate}
                            onChange={(e) => setReviewDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="rating" className="text-sm font-medium text-gray-700">Calificación</label>
                        <input
                            type="number"
                            id="rating"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            required
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="protocolType" className="text-sm font-medium text-gray-700">Tipo de Protocolo</label>
                        <input
                            type="text"
                            id="protocolType"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            value={protocolType}
                            onChange={(e) => setProtocolType(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="protocolName" className="text-sm font-medium text-gray-700">Nombre del Protocolo</label>
                        <input
                            type="text"
                            id="protocolName"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            value={protocolName}
                            onChange={(e) => setProtocolName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="responsibleFirstName" className="text-sm font-medium text-gray-700">Nombre del Responsable</label>
                        <input
                            type="text"
                            id="responsibleFirstName"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            value={responsibleFirstName}
                            onChange={(e) => setResponsibleFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="responsibleLastName" className="text-sm font-medium text-gray-700">Apellido del Responsable</label>
                        <input
                            type="text"
                            id="responsibleLastName"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            value={responsibleLastName}
                            onChange={(e) => setResponsibleLastName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="responsibleType" className="text-sm font-medium text-gray-700">Tipo de Responsable</label>
                        <input
                            type="text"
                            id="responsibleType"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            value={responsibleType}
                            onChange={(e) => setResponsibleType(e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="comments" className="text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            id="comments"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            rows="3"
                            required
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-5">
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-[#e87204] text-white px-6 py-2 text-sm rounded-lg hover:bg-[#030712] focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
                    >
                        {isSubmitting ? "Guardando..." : buttonForm}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default FormReview;
