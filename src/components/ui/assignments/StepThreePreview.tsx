"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table/datatable";
import { columns as baseColumns, Ticket } from "@/components/ui/table/columns";
import { getTechnicianDisplayName } from "@/lib/labels";
import { X } from "lucide-react";
import React, { useState } from "react";
import { submitPriorization } from "@/features/tickets/api";
import { Row } from "@tanstack/react-table";

export const revalidate = 60;

interface StepThreePreviewProps {
  previewMap: Record<string, Ticket[]>;
  unassignedTickets: Ticket[];
  selectedTicketToAssign: Record<string, string>;
  setSelectedTicketToAssign: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setPreviewMap: React.Dispatch<React.SetStateAction<Record<string, Ticket[]>>>;
  setUnassignedTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  onSaveSuccess: (uuid: string) => void;
  setSaveUuid: React.Dispatch<React.SetStateAction<string | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onBack: () => void;
}

const StepThreePreview: React.FC<StepThreePreviewProps> = ({
  previewMap,
  unassignedTickets,
  selectedTicketToAssign,
  setSelectedTicketToAssign,
  setPreviewMap,
  setUnassignedTickets,
  onSaveSuccess,
  setSaveUuid,
  setShowModal,
  onBack,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleTicketAssign = (tech: string) => {
    const ticketId = selectedTicketToAssign[tech];
    if (!ticketId) return;
    const ticket = unassignedTickets.find((t) => t.id === parseInt(ticketId));
    if (!ticket) return;

    setPreviewMap((prev) => ({
      ...prev,
      [tech]: [...(prev[tech] || []), ticket],
    }));
    setUnassignedTickets((prev) => prev.filter((t) => t.id !== ticket.id));
    setSelectedTicketToAssign((prev) => ({ ...prev, [tech]: "" }));
  };

  const handleUnassignTicket = (tech: string, ticketId: number) => {
    const ticket = previewMap[tech]?.find((t) => t.id === ticketId);
    if (!ticket) return;
    setPreviewMap((prev) => ({
      ...prev,
      [tech]: prev[tech].filter((t) => t.id !== ticketId),
    }));
    setUnassignedTickets((prev) => [...prev, ticket]);
  };

  const handleSaveAssignment = async () => {
    setIsSaving(true);
    const assignments: Record<string, number[]> = {};
    Object.entries(previewMap).forEach(([tech, tickets]) => {
      assignments[tech] = tickets.map((t) => t.id);
    });
    try {
      const response = await submitPriorization({ assignments });
      const uuid = response.uuid;
      setSaveUuid(uuid);
      onSaveSuccess(uuid);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Error saving assignments", err);
      alert("Hubo un error al guardar la priorización.");
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    ...baseColumns,
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }: { row: Row<Ticket> }) => (
        <button
          onClick={() =>
            handleUnassignTicket(row.original.nombre_tecnico || "", row.original.id)
          }
          className="text-red-600 hover:text-red-800"
          title="Quitar ticket"
        >
          <X size={16} />
        </button>
      ),
    },
  ];


  return (
    <>
      <h2 className="text-lg font-bold mb-4">Previsualización de Asignación</h2>
      <div className="mb-6 border border-yellow-300 bg-yellow-50 text-sm text-yellow-800 p-4 rounded-md">
        Aquí puedes revisar cómo quedarán asignados los tickets a cada técnico. Puedes:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Reasignar tickets haciendo clic en el icono rojo de quitar.</li>
          <li>Agregar tickets no asignados desde el selector bajo cada técnico.</li>
          <li>Verificar la fecha y técnico asignado por fila.</li>
          <li>Cuando estés conforme, presiona <strong>&quot;Guardar&quot;</strong> para finalizar.</li>
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-4">
        {Object.entries(previewMap).map(([technicianName, tickets]) => (
          <Card key={`tech-${technicianName}-${tickets.length}`}>
            <CardHeader>
              <CardTitle className="text-base">
                {getTechnicianDisplayName(technicianName)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={tickets.map((ticket) => ({
                  ...ticket,
                  nombre_tecnico: technicianName, // explicitly set from loop context
                }))}
              />
              {unassignedTickets.length > 0 && (
                <div className="mt-4">
                  <label className="block mb-1 text-sm font-medium">
                    Asignar ticket adicional:
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="border px-2 py-1 rounded"
                      value={selectedTicketToAssign[technicianName] || ""}
                      onChange={(e) =>
                        setSelectedTicketToAssign((prev) => ({
                          ...prev,
                          [technicianName]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Selecciona un ticket</option>
                      {unassignedTickets.map((t) => (
                        <option key={t.id} value={t.id}>
                          #{t.id} | {t.asunto} | {t.direccion_principal}
                        </option>
                      ))}
                    </select>
                    <Button onClick={() => handleTicketAssign(technicianName)}>
                      Asignar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
          <Button
            onClick={handleSaveAssignment}
            disabled={isSaving}
            className="bg-green-600 text-white"
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </>
  );

};

export default StepThreePreview;