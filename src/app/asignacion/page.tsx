"use client";

import { useEffect, useState } from "react";
import { columns as baseColumns, Ticket } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/datatable";
import {
  applyAssignment,
  fetchTechniciansList,
  getFinalPriorization,
  notifyAssignment,
  submitSetupOrder,
} from "@/features/tickets/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { getTechnicianDisplayName } from "@/lib/labels";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import fallbackAssignedTickets from "@/data/fallbackAssignedTickets.json";
import StepOneRoleSelection from "@/components/ui/assignments/StepOneRoleSelection";
import StepTwoLimitsSelection from "@/components/ui/assignments/StepTwoLimitsSelection";
import StepThreePreview from "@/components/ui/assignments/StepThreePreview";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar } from "lucide-react";
import ConfirmDialog from "@/components/ui/confirmDialog";

export default function TechnicianTicketsPage() {
  const [dryRun, setDryRun] = useState(false);
  const [reassignAll, setReassignAll] = useState(false);
  const [technicianMap, setTechnicianMap] = useState<Record<string, Ticket[]>>({});
  const [previewMap, setPreviewMap] = useState<Record<string, Ticket[]>>(fallbackAssignedTickets);
  const [showModal, setShowModal] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [maxByType, setMaxByType] = useState({ Soporte: 5, Instalacion: 5 });
  const [unassignedTickets, setUnassignedTickets] = useState<Ticket[]>([]);
  const [selectedTicketToAssign, setSelectedTicketToAssign] = useState<Record<string, string>>({});
  const [saveUuid, setSaveUuid] = useState<string | null>(null);
  const [finalAssignmentMap, setFinalAssignmentMap] = useState<Record<string, Ticket[]>>({});
  const [showApplyConfirm, setShowApplyConfirm] = useState(false);
  const [showNotifyConfirm, setShowNotifyConfirm] = useState(false);


  useEffect(() => {
    const loadData = async () => {
      const res = await fetchTechniciansList();
      const emptyMap: Record<string, Ticket[]> = {};
      res.forEach((techName) => {
        emptyMap[techName] = [];
      });
      setTechnicianMap(emptyMap);
    };
    loadData();
  }, []);

  useEffect(() => {
    const fetchFinalAssignment = async () => {
      if (!saveUuid) return;
      try {
        const res = await getFinalPriorization(saveUuid);
        setFinalAssignmentMap(res.assignments);
      } catch (error) {
        console.error("Error fetching final assignment:", error);
      }
    };
    fetchFinalAssignment();
  }, [saveUuid]);

  const visibleTechnicians = Object.keys(technicianMap).filter(
    (name) => name.toLowerCase() !== "others"
  );

  const handleBackendSubmit = async () => {
    const roles: Record<string, string> = {};
    Object.entries(selectedRoles).forEach(([technician, role]) => {
      roles[technician] =
        role === "Instalacion" ? "Instalacion|Traslado|Retiro" : "Soporte";
    });

    const limites: Record<string, number> = {
      Soporte: maxByType.Soporte,
      "Instalacion|Traslado|Retiro": maxByType.Instalacion,
    };

    const payload = { roles, limites, reassign_all: reassignAll };

    try {
      const data = await submitSetupOrder(payload, reassignAll);
      console.log("✅ Preview received:", data);
      setPreviewMap(data);
      setStep(3);
    } catch (error) {
      console.error("❌ Error submitting preview setup:", error);
    }
  };

  const handleReset = () => {
    setShowModal(true);
    setSaveUuid(null);
    setStep(1);
    setSelectedRoles({});
    setReassignAll(false);
    setDryRun(false);
    setMaxByType({ Soporte: 5, Instalacion: 5 });
    setPreviewMap({});
    setFinalAssignmentMap({});
    setUnassignedTickets([]);
    setSelectedTicketToAssign({});
  };

  const currentDate = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
  <section className="px-4 sm:px-6 py-8 sm:py-10">
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogOverlay className="fixed inset-0 bg-gray-900/70 z-40" />
      <DialogContent className="fixed z-50 top-1/2 left-1/2 max-h-[90vh] w-[95vw] sm:w-full sm:max-w-fit -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg flex flex-col">
        <div className="overflow-y-auto p-4 sm:p-6">
          <DialogTitle>
            <VisuallyHidden>Asignación de técnicos</VisuallyHidden>
          </DialogTitle>

          {step === 1 && (
            <StepOneRoleSelection
              visibleTechnicians={visibleTechnicians}
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              reassignAll={reassignAll}
              setReassignAll={setReassignAll}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepTwoLimitsSelection
              maxByType={maxByType}
              setMaxByType={setMaxByType}
              onSubmit={handleBackendSubmit}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepThreePreview
              previewMap={previewMap}
              unassignedTickets={unassignedTickets}
              selectedTicketToAssign={selectedTicketToAssign}
              setSelectedTicketToAssign={setSelectedTicketToAssign}
              setPreviewMap={setPreviewMap}
              setUnassignedTickets={setUnassignedTickets}
              setSaveUuid={setSaveUuid}
              setShowModal={setShowModal}
              onBack={() => setStep(2)}
              onSaveSuccess={(uuid) => {
                console.log("✅ Assignment saved with UUID:", uuid);
                setSaveUuid(uuid);
                setShowModal(false);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>

    {!showModal && saveUuid && (
      <section className="mt-8 sm:mt-10 space-y-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">Asignación</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-gray-500" />
              <span>{currentDate}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              onClick={() => setShowApplyConfirm(true)}
              className="bg-blue-600 text-white"
            >
              Aplicar en Mikrowisp
            </Button>

            <Button
              onClick={() => setShowNotifyConfirm(true)}
              className="bg-emerald-600 text-white"
            >
              Notificar Técnicos
            </Button>

            <Button onClick={handleReset} className="bg-gray-700 text-white">
              Nueva asignación
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {Object.entries(finalAssignmentMap).map(([tech, tickets]) => (
            <Card key={tech}>
              <CardHeader>
                <CardTitle className="text-base">
                  {getTechnicianDisplayName(tech)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={baseColumns}
                  data={tickets.map((t) => ({
                    ...t,
                    nombre_tecnico: tech,
                  }))}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )}

    {!showModal && !saveUuid && (
      <div className="mt-8 sm:mt-10 bg-blue-50 border border-blue-300 text-blue-800 p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Asignación pendiente</h3>
          <p className="text-sm">
            Aún no se ha completado el proceso de asignación. Puedes volver a abrir el asistente para continuar.
          </p>
        </div>
        <Button
          className="bg-blue-600 text-white w-full sm:w-auto"
          onClick={() => setShowModal(true)}
        >
          Volver a asignar
        </Button>
      </div>
    )}

    <ConfirmDialog
      open={showApplyConfirm}
      onCancel={() => setShowApplyConfirm(false)}
      onConfirm={async () => {
        setShowApplyConfirm(false);
        if (!saveUuid) {
          alert("No hay una asignación válida para aplicar.");
          return;
        }
        try {
          const res = await applyAssignment(saveUuid, dryRun);
          console.log("✅ Aplicado:", res);
          alert("Asignación aplicada correctamente.");
        } catch (err) {
          console.error("❌ Error aplicando asignación", err);
          alert("Error al aplicar asignación.");
        }
      }}
    />

    <ConfirmDialog
      open={showNotifyConfirm}
      onCancel={() => setShowNotifyConfirm(false)}
      onConfirm={async () => {
        setShowNotifyConfirm(false);
        if (!saveUuid) {
          alert("No hay una asignación válida para notificar.");
          return;
        }
        try {
          const res = await notifyAssignment(saveUuid);
          console.log("📢 Notificación enviada:", res);
          alert("Notificación enviada correctamente.");
        } catch (err) {
          console.error("❌ Error notificando asignación", err);
          alert("Error al notificar asignación.");
        }
      }}
    />
  </section>
);

}
