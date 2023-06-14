export const ROUTE_LANDING_PAGE = '/';
export const ROUTE_PROPOSALS = '/proposals';
export const ROUTE_COURSES = '/courses';
export const ROUTE_COURSE_ITEM = '/courses/:id';
export const ROUTE_PROPOSAL_ITEM = '/proposals/:id';
export const ROUTE_CREATE_PROPOSAL = '/proposals/create';

export function getProposalItemRoute(id: string) {
  return ROUTE_PROPOSAL_ITEM.replace(':id', id);
}

export function getCourseItemRoute(id: string) {
  return ROUTE_COURSE_ITEM.replace(':id', id);
}
