"use client";

import { labelFor } from "@/lib/categoryConfig";
import { Button } from "@/components/ui/button";

type Props = {
  maxByType: { Soporte: number; Instalacion: number };
  setMaxByType: (v: { Soporte: number; Instalacion: number }) => void;
  onSubmit: () => void;
  onBack: () => void; // ← Add this line
};

export default function StepTwoLimitsSelection({
  maxByType,
  setMaxByType,
  onSubmit,
  onBack, // ← Add this line
}: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-lg font-bold mb-4">
        Define el máximo de tickets por tipo
      </h2>
      <div className="flex flex-col gap-6 mt-6">
        {Object.entries(maxByType).map(([type, count]) => (
          <div
            key={type}
            className="flex items-center justify-between border p-4 rounded-md"
          >
            <span className="font-medium">{labelFor(type)}</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  setMaxByType({
                    ...maxByType,
                    [type]: Math.max(0, count - 1),
                  })
                }
              >
                -
              </Button>
              <span className="text-lg font-semibold tabular-nums">{count}</span>
              <Button
                variant="outline"
                onClick={() =>
                  setMaxByType({
                    ...maxByType,
                    [type]: count + 1,
                  })
                }
              >
                +
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
          <Button onClick={onSubmit}>Siguiente</Button>
        </div>
      </div>
    </div >
  );
}
