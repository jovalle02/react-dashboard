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

const FALLBACK_TICKETS: Ticket[] = [
  {
    id: 1,
    cliente: "Cliente A",
    telefono_cliente: "300-111-0001",
    direccion_principal: "Calle 1 #10-01",
    asunto: "Reparación de conexión",
    categoria: "Red",
    nombre_tecnico: "Técnico 1",
    numero_tecnico: "321-000-0001",
    fecha_soporte: "2025-05-01T10:00:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 0,
    dias_desde_creacion: 5,
  },
  {
    id: 2,
    cliente: "Cliente B",
    telefono_cliente: "300-222-0002",
    direccion_principal: "Carrera 2 #20-02",
    asunto: "Falla eléctrica",
    categoria: "Eléctrica",
    nombre_tecnico: "Técnico 2",
    numero_tecnico: "321-000-0002",
    fecha_soporte: "2025-05-02T11:30:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 1,
    dias_desde_creacion: 4,
  },
  {
    id: 3,
    cliente: "Cliente C",
    telefono_cliente: "300-333-0003",
    direccion_principal: "Avenida 3 #30-03",
    asunto: "Instalación de nuevo router",
    categoria: "Red",
    nombre_tecnico: null,
    numero_tecnico: null,
    fecha_soporte: "2025-05-03T09:15:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 0,
    dias_desde_creacion: 3,
  },
  {
    id: 4,
    cliente: "Cliente D",
    telefono_cliente: "300-444-0004",
    direccion_principal: "Calle 4 #40-04",
    asunto: "Mantenimiento de UPS",
    categoria: "Eléctrica",
    nombre_tecnico: "Técnico 3",
    numero_tecnico: "321-000-0003",
    fecha_soporte: "2025-05-04T14:45:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 0,
    dias_desde_creacion: 2,
  },
  {
    id: 5,
    cliente: "Cliente E",
    telefono_cliente: "300-555-0005",
    direccion_principal: "Carrera 5 #50-05",
    asunto: "Cambio de impresora",
    categoria: "Hardware",
    nombre_tecnico: "Técnico 4",
    numero_tecnico: "321-000-0004",
    fecha_soporte: "2025-05-05T16:00:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 0,
    dias_desde_creacion: 1,
  },
  {
    id: 6,
    cliente: "Cliente F",
    telefono_cliente: "300-666-0006",
    direccion_principal: "Avenida 6 #60-06",
    asunto: "Soporte de software",
    categoria: "Software",
    nombre_tecnico: null,
    numero_tecnico: null,
    fecha_soporte: "2025-05-06T08:20:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 1,
    dias_desde_creacion: 0,
  },
  {
    id: 7,
    cliente: "Cliente G",
    telefono_cliente: "300-777-0007",
    direccion_principal: "Calle 7 #70-07",
    asunto: "Auditoría de seguridad",
    categoria: "Seguridad",
    nombre_tecnico: "Técnico 5",
    numero_tecnico: "321-000-0005",
    fecha_soporte: "2025-05-07T13:10:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 0,
    dias_desde_creacion: 7,
  },
  {
    id: 8,
    cliente: "Cliente H",
    telefono_cliente: "300-888-0008",
    direccion_principal: "Carrera 8 #80-08",
    asunto: "Instalación de CCTV",
    categoria: "Seguridad",
    nombre_tecnico: "Técnico 6",
    numero_tecnico: "321-000-0006",
    fecha_soporte: "2025-05-08T12:05:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 0,
    dias_desde_creacion: 8,
  },
  {
    id: 9,
    cliente: "Cliente I",
    telefono_cliente: "300-999-0009",
    direccion_principal: "Avenida 9 #90-09",
    asunto: "Reemplazo de disco duro",
    categoria: "Hardware",
    nombre_tecnico: null,
    numero_tecnico: null,
    fecha_soporte: "2025-05-09T15:25:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 1,
    dias_desde_creacion: 9,
  },
  {
    id: 10,
    cliente: "Cliente J",
    telefono_cliente: "300-000-0010",
    direccion_principal: "Calle 10 #100-10",
    asunto: "Configuración de VPN",
    categoria: "Red",
    nombre_tecnico: "Técnico 7",
    numero_tecnico: "321-000-0007",
    fecha_soporte: "2025-05-10T17:50:00Z",
    fecha_cerrado: "0000-00-00 00:00:00",
    sin_servicio_flag: 0,
    dias_desde_creacion: 10,
  },
];


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
