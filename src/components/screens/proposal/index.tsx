import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { LocationOutlined } from '@shared/components/icons/LocationOutlined';
import { H1, H4 } from '@shared/components/typography/Title';

import { Description } from './_Description';
import { Gallery } from './_Gallery';
import { MapOverview } from './MapOverview';
import { Objections } from './objections';

import { ProposalVote } from './votes';

import { useProposalContext } from '../../../context/ProposalProvider';
import { useForest } from '../../../hooks/useForest';

export default function ProposalItemPage() {
  const { proposal } = useProposalContext();
  const { forest } = useForest(proposal?.forestTokenId);

  if (!forest) return <LoadingOutlined />;

  return (
    <div>
      <MapOverview positions={forest?.properties?.location} />
      <div className="mx-auto mt-6 w-8/12 rounded bg-white px-10 py-4 pb-20">
        <div className="mb-3 flex items-center space-x-4 rounded-t border-b border-gray-100 py-3">
          <div className="rounded bg-green-50 px-1.5 py-1">
            <LocationOutlined className="text-xl text-green-900" />
          </div>
          <H1 className="space-x-2 !text-base !font-medium">
            {forest?.name || '-'}
          </H1>
        </div>
        <div className="space-y-14 rounded py-10 pb-20">
          <div className="flex items-start justify-between space-x-10 ">
            <div className="w-8/12 space-y-6">
              <div>
                <div className="text-xs text-gray-600">#1 Proposal</div>
                <H4 className="capitalize">{proposal?.title}</H4>
              </div>
              <Description description={proposal?.description || ''} />
            </div>
            <div className="w-4/12 space-y-4 px-10">
              <Gallery cid={proposal?.cid} />
            </div>
          </div>
          <ProposalVote
            start={proposal?.startTimestamp || new Date()}
            end={proposal?.endTimestamp || new Date()}
            proposalId={proposal?.id}
          />
          <div>
            <Objections proposalId={proposal?.id || ''} />
          </div>
        </div>
      </div>
    </div>
  );
}
