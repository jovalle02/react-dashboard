"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function MaxTicketsToday({
  initialValue,
  isEditing,
  onChange,
}: {
  initialValue: number;
  isEditing: boolean;
  onChange: (value: number) => void;
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (delta: number) => {
    const newValue = value + delta;
    if (newValue >= 0) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <CardDescription className="font-medium text-sm text-muted-foreground mr-auto">
            Tickets Asignados Hoy
          </CardDescription>
          <CheckCircle className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex-1 flex items-center justify-center">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleChange(-1)}
                className="bg-red-100 text-red-800 px-2 py-1 rounded"
              >
                -
              </button>
              <CardTitle className="text-7xl font-semibold tabular-nums">
                {value}
              </CardTitle>
              <button
                onClick={() => handleChange(1)}
                className="bg-green-100 text-green-800 px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          ) : (
            <CardTitle className="text-7xl font-semibold tabular-nums">
              {value}
            </CardTitle>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
