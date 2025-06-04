import api from "@/lib/api";

/**
 * Fetches ticket data from the backend API.
 *
 * Uses the configured Axios instance from `@/lib/api` to call:
 *   GET /tickets/get_data
 *
 * @returns {Promise<any>} Resolves with the response data (array of tickets).
 *
 * @example
 * const tickets = await fetchTickets();
 */

export async function fetchOpenTickets() {
  const response = await api.get("/open_tickets/fetch");
  return response.data;
}

export async function fetchAmmountOpenTickets() {
  const response = await api.get("/open_tickets/count");
  return response.data;
}
  
export async function fetchTechniciansTickets() {
  const response = await api.get("/open_tickets/by_technician_and_category");
  return response.data;
}

export async function fetchTicketsNotAssigned() {
  const response = await api.get("/open_tickets/not_assigned_by_category");
  return response.data;
}

export async function fetchAvgResponseTime() {
  const response = await api.get("/closed_tickets/average_response_time");
  return response.data;
}

export async function fetchTechniciansResp() {
  const response = await api.get("/assigner/roles");
  return response.data;
}

export async function submitSetupOrder(
  payload: {
    roles: Record<string, string>;
    limites: Record<string, number>;
  },
  reassignAll: boolean = false
) {
  const response = await api.post("/assigner/preview-prioritized", payload, {
    params: {
      reassign_all: reassignAll,
      limit_by_role: true,
    },
  });
  return response.data;
}

export const submitPriorization = async (payload: { assignments: Record<string, number[]> }) => {
  const response = await api.post("/assigner/create_prorization", payload);
  return response.data;
};

export const getFinalPriorization = async (assignmentUuid: string) => {
  const response = await api.get(`/assigner/prorization/${assignmentUuid}`);
  return response.data;
};


export async function fetchTechniciansList(): Promise<string[]> {
  const response = await api.get("/assigner/technicians");
  return response.data;
}

//Para testing
export const applyAssignment = async (assignmentUuid: string, dryRun: boolean = true) => {
  const response = await api.patch(`/assigner/prorization/${assignmentUuid}/apply`, null, {
    params: { dry_run: dryRun }
  });
  return response.data; 
};

export const notifyAssignment = async (assignmentUuid: string) => {
  const response = await api.post(`/assigner/prorization/${assignmentUuid}/notify`);
  return response.data;
};







