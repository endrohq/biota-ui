export const ROUTE_LANDING_PAGE = '/';
export const ROUTE_INCIDENTS = '/incidents';
export const ROUTE_COURSES = '/courses';
export const ROUTE_COURSE_ITEM = '/courses/:id';
export const ROUTE_INCIDENTS_ITEM = '/incidents/:id';
export const ROUTE_CREATE_INCIDENT = '/incidents/create';

export function getIncidentItemRoute(id: string) {
  return ROUTE_INCIDENTS_ITEM.replace(':id', id);
}

export function getCourseItemRoute(id: string) {
  return ROUTE_COURSE_ITEM.replace(':id', id);
}
