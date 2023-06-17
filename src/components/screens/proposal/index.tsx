import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { MapBox } from '@shared/components/map';
import { H1 } from '@shared/components/typography/Title';

import { VoteTypes, Proposal, IpfsProposal } from '@shared/typings';
import { getShortenedFormat } from '@shared/utils/string.utils';
import { useEffect, useState } from 'react';

import { CastYourVote } from './_CastYourVote';
import { Description } from './_Description';
import { Gallery } from './_Gallery';
import { Results } from './_Results';
import { RequiredCourses } from './RequiredCourses';

import { useStorage } from '../../../hooks/useStorage';

interface ProposalItemPageProps {
  proposal: Proposal;
}

export function ProposalItemPage({ proposal }: ProposalItemPageProps) {
  const [requiredCourses, setRequiredCourses] = useState<string[]>();
  const { getJsonFile } = useStorage();
  const [ipfsProposal, setIpfsProposal] = useState<IpfsProposal>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function handleIpfsFetch() {
      try {
        const ipfsProposal = await getJsonFile(proposal.cid, 'proposal');
        setIpfsProposal(ipfsProposal);
      } catch (error) {
        console.log(error);
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
    <>
      <div className="mx-auto flex w-10/12 items-start justify-between space-x-10 pb-20">
        <div className="w-7/12 space-y-10">
          <div className="">
            <H1 weight="black" className="">
              {ipfsProposal?.title || '-'}
            </H1>
            <div className="my-3 space-y-1 rounded border border-gray-100 bg-gray-50 px-4 py-2 text-sm">
              <div>Author</div>
              <div className="flex items-center space-x-2">
                <EthAddressIcon address={proposal.author} />
                <div className="font-medium text-gray-600">
                  {getShortenedFormat(proposal.author)}
                </div>
              </div>
            </div>
          </div>
          <Description description={ipfsProposal?.description || '-'} />
          <Gallery cid={proposal.cid} />
          <CastYourVote vote={vote} />
        </div>
        <div className="w-5/12 space-y-4">
          <MapBox
            positions={ipfsProposal?.positions}
            height={300}
            mode="read-only"
          />
          <Results />
        </div>
      </div>
      {requiredCourses && (
        <RequiredCourses
          close={() => setRequiredCourses(undefined)}
          requiredCourseIds={requiredCourses}
        />
      )}
    </>
  );
}
