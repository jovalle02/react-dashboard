"use client";

import { getTechnicianDisplayName } from "@/lib/labels";
import { Button } from "@/components/ui/button";

type Props = {
  visibleTechnicians: string[];
  selectedRoles: Record<string, string>;
  setSelectedRoles: (r: Record<string, string>) => void;
  reassignAll: boolean;
  setReassignAll: (value: boolean) => void;
  onNext: () => void;
};

export default function StepOneRoleSelection({
  visibleTechnicians,
  selectedRoles,
  setSelectedRoles,
  reassignAll,
  setReassignAll,
  onNext,
}: Props) {
  const allSelected =
    visibleTechnicians.length > 0 &&
    visibleTechnicians.every((techName) => selectedRoles[techName]);

  return (
    <>
      <h2 className="text-lg sm:text-xl font-bold mb-4">
        Selecciona el tipo de soporte para cada técnico
      </h2>

      <div className="mb-6 border border-yellow-300 bg-yellow-50 text-sm text-yellow-800 p-4 rounded-md">
        El rol <strong>Instalación</strong> incluye automáticamente los tipos:{" "}
        <em>Instalación</em>, <em>Traslado</em> y <em>Retiro</em>. Asegúrate de
        asignarlo a técnicos que puedan realizar cualquiera de esas tres tareas.
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={reassignAll}
            onChange={(e) => setReassignAll(e.target.checked)}
          />
          ¿Reasignar todos los tickets existentes?
        </label>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleTechnicians.map((techName) => (
            <div
              key={techName}
              className="border p-4 rounded-md w-full min-w-0 bg-white shadow-sm"
            >
              <h3 className="font-semibold mb-3 text-base">
                {getTechnicianDisplayName(techName)}
              </h3>

              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`role-${techName}`}
                    value="Instalacion"
                    checked={selectedRoles[techName] === "Instalacion"}
                    onChange={() =>
                      setSelectedRoles({
                        ...selectedRoles,
                        [techName]: "Instalacion",
                      })
                    }
                  />
                  <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-500 text-white">
                    Instalación
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`role-${techName}`}
                    value="Soporte"
                    checked={selectedRoles[techName] === "Soporte"}
                    onChange={() =>
                      setSelectedRoles({
                        ...selectedRoles,
                        [techName]: "Soporte",
                      })
                    }
                  />
                  <span className="px-3 py-1 text-xs rounded-full font-medium bg-blue-500 text-white">
                    Soporte
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button disabled={!allSelected} onClick={onNext}>
            Siguiente
          </Button>
        </div>
      </div>
    </>
  );
}
