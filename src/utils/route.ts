export const ROUTE_LANDING_PAGE = '/';
export const ROUTE_INCIDENTS = '/incidents';
export const ROUTE_INCIDENTS_ITEM = '/incidents/:id';
export const ROUTE_CREATE_INCIDENT = '/incidents/create';

export const ROUTE_FORESTS = '/forests';

export function getIncidentItemRoute(id: string) {
  return ROUTE_INCIDENTS_ITEM.replace(':id', id);
}
