"use client";

import { CATEGORY_LABELS, CATEGORY_STYLES } from "@/lib/categoryConfig";
import { ColumnDef } from "@tanstack/react-table";
import { PriorityBadge } from "../priority-badge";

/**
 * Column definitions for the Ticket table.
 *
 * This configuration is used by @tanstack/react-table to define:
 * - Column labels (headers)
 * - Field accessors (via accessorKey)
 * - Optional cell rendering logic
 *
 * ⚠️ NOTE:
 * Some columns like `fecha_soporte` and `fecha_cerrado` had custom formatting
 * (e.g., converting to `toLocaleString()`), but those render functions have been
 * temporarily commented out to avoid hydration issues in server/client mismatch.
 */

export type Ticket = {
  id: number;
  cliente: string;
  telefono_cliente: string;
  direccion_principal: string;
  asunto: string;
  categoria: string;
  nombre_tecnico: string | null;
  numero_tecnico: string | null;
  fecha_soporte: string;
  fecha_cerrado: string;
  sin_servicio_flag: number;
  dias_desde_creacion: number;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: "Ticket",
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      const asunto = row.original.asunto;
      const isPriority = row.original.sin_servicio_flag === 1;

      return (
        <div className="items-start text-left gap-1 space-y-1">
          {/* Ticket ID + optional priority badge */}
          <div className="flex items-center gap-2">
            <span className="text-md font-bold text-gray-900">{id}</span>
            {isPriority && <PriorityBadge />}
          </div>

          {/* Asunto */}
          <div className="text-sm text-gray-500">{asunto}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "categoria",
    header: "Categoría",
    cell: ({ row }) => {
      const categoria = row.getValue("categoria") as string;
      const label = CATEGORY_LABELS[categoria] || categoria;
      const style = CATEGORY_STYLES[categoria] || "bg-gray-400 text-white";

      return (
        <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${style}`}>
          {label}
        </div>
      );
    },
  },
  {
    accessorKey: "nombre_tecnico",
    header: "Técnico",
    cell: ({ row }) => {
      const nombreTecnico = row.getValue("nombre_tecnico") as string;
      return (
        <div className="text-sm text-gray-500">
          {nombreTecnico || "Sin asignar"}
        </div>
      );
    },
  },
  {
    accessorKey: "fecha_visita",
    header: "Fecha de Visita",
    cell: ({ row }) => {
      const fechaVisita = row.getValue("fecha_visita") as string;
      return (
        <div className="text-sm">
          {fechaVisita || "Sin asignar"}
        </div>
      );
    },
  },
  {
    accessorKey: "fecha_soporte",
    header: "Fecha Soporte",
    //cell: ({ row }) => {
    //   const date = new Date(row.getValue("fecha_soporte"));
    //   const formated = date.toLocaleString();
    //   return <div>{formated}</div>
    // },
  },
  {
    accessorKey: "fecha_cerrado",
    header: "Fecha Cierre",
    // Temporarily comment out the formatting to avoid hydration issues
    // cell: ({ getValue }) => {
    //   const value = getValue() as string;
    //   if (value === "0000-00-00 00:00:00") return "Abierto";
    //   return new Date(value).toLocaleString();
    // },
  },
  {
    accessorKey: "dias_desde_creacion",
    header: "Dias desde Creación",
    // Temporarily comment out the formatting to avoid hydration issues
    // cell: ({ getValue }) => {
    //   const value = getValue() as string;
    //   if (value === "0000-00-00 00:00:00") return "Abierto";
    //   return new Date(value).toLocaleString();
    // },
  }
];
