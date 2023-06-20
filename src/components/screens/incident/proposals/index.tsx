import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import { isArrayWithElements } from '@shared/utils/array.utils';

import { ProposalItem } from './ProposalItem';

import { useProposals } from '../../../../hooks/useProposals';

interface ProposalsProps {
  incidentId: string;
}

export function Proposals({ incidentId }: ProposalsProps) {
  const { proposals, loading } = useProposals(incidentId);

  return (
    <div className="w-full">
      {isArrayWithElements(proposals) &&
        proposals?.map((proposal, index) => (
          <ProposalItem key={index} proposal={proposal} />
        ))}
      {loading && (
        <div className="rounded bg-gray-50 p-10">
          <LoadingOutlined />
        </div>
      )}
    </div>
  );
}
