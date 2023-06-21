import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { PageMenu } from '@shared/components/pageMenu';
import { H4 } from '@shared/components/typography/Title';
import {
  IpfsProposal,
  MenuItem,
  OnChainProposal,
  VoteTypes,
} from '@shared/typings';

import { useEffect, useState } from 'react';

import { Description } from './_Description';
import { Gallery } from './_Gallery';
import { Objections } from './objections';

import { ProposalVote } from './votes';

import { useStorage } from '../../../../hooks/useStorage';

interface ProposalsProps {
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

export function ProposalItem({ proposal }: ProposalsProps) {
  const { getJsonFile } = useStorage();
  const [ipfsContent, setIpfsContent] = useState<IpfsProposal>();
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItem, setMenuItem] = useState<ProposalMenu>(
    ProposalMenu.OBJECTIONS,
  );

  useEffect(() => {
    if (proposal.cid) {
      getJsonFile(proposal.cid, 'proposal').then(res => {
        setIpfsContent(res);
        setLoading(false);
      });
    }
  }, [proposal?.cid]);

  function vote(_: VoteTypes) {
    /* // TODO: Check if user has required courses
    const hasOpenCourses = proposal.requiredCourseIds?.length > 0;
    if (hasOpenCourses) {
      setRequiredCourses(proposal.requiredCourseIds || []);
    }*/
  }

  if (loading) {
    return (
      <div className="flex items-start justify-between space-x-10 rounded bg-gray-50 p-10">
        <LoadingOutlined />
      </div>
    );
  }

  return (
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
  );
}
