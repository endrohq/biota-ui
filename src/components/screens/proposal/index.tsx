import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { LocationOutlined } from '@shared/components/icons/LocationOutlined';
import { PageMenu } from '@shared/components/pageMenu';
import { H1, H4 } from '@shared/components/typography/Title';

import {
  IpfsProposal,
  MenuItem,
  OnChainProposal,
  VoteTypes,
} from '@shared/typings';
import { useEffect, useState } from 'react';

import { Description } from './_Description';
import { Gallery } from './_Gallery';
import { MapOverview } from './MapOverview';
import { Objections } from './objections';

import { ProposalVote } from './votes';

import { useForest } from '../../../hooks/useForest';
import { useStorage } from '../../../hooks/useStorage';

interface ProposalItemPageProps {
  proposal: OnChainProposal;
}

enum ProposalMenu {
  OBJECTIONS = 'Objections',
  PROJECT = 'Project',
}

const menuItems: MenuItem<ProposalMenu>[] = Object.keys(ProposalMenu).map(
  key => ({
    label: ProposalMenu[key],
    id: key,
  }),
);

export function ProposalItemPage({ proposal }: ProposalItemPageProps) {
  const { getJsonFile } = useStorage();
  const { forest } = useForest(proposal.forestTokenId);
  const [ipfsContent, setIpfsContent] = useState<IpfsProposal>();
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItem, setMenuItem] = useState<ProposalMenu>(
    ProposalMenu.OBJECTIONS,
  );

  useEffect(() => {
    async function handleIpfsFetch() {
      try {
        const content = await getJsonFile(proposal.cid, 'proposal');
        setIpfsContent(content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    handleIpfsFetch();
  }, []);

  function vote(_: VoteTypes) {
    /* // TODO: Check if user has required courses
    const hasOpenCourses = proposal.requiredCourseIds?.length > 0;
    if (hasOpenCourses) {
      setRequiredCourses(proposal.requiredCourseIds || []);
    }*/
  }

  if (loading) {
    return (
      <div className="mx-auto flex w-10/12 items-start justify-between space-x-10 pb-20">
        <LoadingOutlined />
      </div>
    );
  }

  return (
    <div className="">
      <MapOverview positions={forest?.properties?.location} />
      <div className="mx-auto mt-6 w-7/12 pb-20">
        <div className=" mb-3 flex items-center space-x-4 rounded-t border-b border-gray-100 py-3">
          <div className="rounded bg-green-50 px-1.5 py-1">
            <LocationOutlined className="text-xl text-green-900" />
          </div>
          <H1 className="space-x-2 !text-base !font-medium">
            {forest?.name || '-'}
          </H1>
        </div>
        <div className="rounded bg-gray-50 p-10 pb-20">
          <div className="flex items-start justify-between space-x-10 ">
            <div className="w-8/12 space-y-6">
              <div>
                <div className="text-xs text-gray-600">#1 Proposal</div>
                <H4 className="capitalize">{ipfsContent?.title}</H4>
              </div>
              <Description description={ipfsContent?.description || ''} />
            </div>
            <div className="w-4/12 space-y-4 px-10">
              <Gallery cid={proposal.cid} />
            </div>
          </div>
          <div className="pt-10">
            <ProposalVote vote={vote} />
          </div>
          <PageMenu
            activeItem={menuItem}
            menu={menuItems}
            // @ts-ignore
            onClick={val => setMenuItem(val)}
          />
          <Objections />
        </div>
      </div>
    </div>
  );
}
