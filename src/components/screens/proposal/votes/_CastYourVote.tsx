import { Button } from '@shared/components/button';
import { VoteType } from '@shared/typings';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { proposalContract } from '../../../../config/contracts/proposals';
import { useUser } from '../../../../hooks/useUser';

interface CastYourVoteProps {
  proposalId?: string;
  onSuccess: () => void;
  onError: (error: unknown) => void;
}

export function CastYourVote({
  proposalId,
  onSuccess,
  onError,
}: CastYourVoteProps) {
  const { signer } = useUser();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<VoteType>();

  useEffect(() => {
    if (isSubmitting) {
      handleVote();
    }
  }, [isSubmitting]);

  async function handleVote() {
    try {
      const myContract = new ethers.Contract(
        proposalContract.address,
        proposalContract.abi,
        signer,
      );
      const incrementTx = await myContract.vote(
        proposalId,
        voteType === VoteType.FOR,
        voteType === VoteType.AGAINST,
      );
      await incrementTx.wait();
      onSuccess();
    } catch (error) {
      onError(error);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6 rounded border-b border-gray-100 bg-white">
      <div className="border-b border-gray-100 py-2">
        <div className="font-medium">Cast your vote</div>
      </div>
      <div className="grid grid-cols-3 gap-x-2">
        <Button
          onClick={() => setVoteType(VoteType.FOR)}
          className="px-10 py-1"
          fullSize
          variant={voteType === VoteType.FOR ? 'black' : 'default'}
        >
          For
        </Button>
        <Button
          onClick={() => setVoteType(VoteType.AGAINST)}
          className="px-10 py-1"
          fullSize
          variant={voteType === VoteType.AGAINST ? 'black' : 'default'}
        >
          Against
        </Button>
        <Button
          onClick={() => setVoteType(VoteType.ABSTAIN)}
          className="px-10 py-1"
          fullSize
          variant={voteType === VoteType.ABSTAIN ? 'black' : 'default'}
        >
          Abstain
        </Button>
      </div>
      <div className="!mt-4 border-t border-gray-100 pt-4">
        <Button
          loading={isSubmitting}
          variant="primary"
          onClick={() => setIsSubmitting(true)}
          className="px-10 py-1"
          fullSize
        >
          Vote
        </Button>
      </div>
    </div>
  );
}
