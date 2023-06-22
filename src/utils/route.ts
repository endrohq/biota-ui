export const ROUTE_LANDING_PAGE = '/';
export const ROUTE_PROPOSALS = '/proposals';
export const ROUTE_INCIDENTS_ITEM = '/proposals/:id';
export const ROUTE_CREATE_PROPOSAL = '/proposals/create';

export const ROUTE_FORESTS = '/forests';
export const ROUTE_CREATE_FOREST = '/forests/create';

export function getIncidentItemRoute(id: string) {
  return ROUTE_INCIDENTS_ITEM.replace(':id', id);
}
