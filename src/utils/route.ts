export const ROUTE_LANDING_PAGE = '/';
export const ROUTE_PROPOSAL_ITEM = '/proposals/:id';

export function getProposalItemRoute(id: string) {
  return ROUTE_PROPOSAL_ITEM.replace(':id', id);
}
