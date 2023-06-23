import { Button } from '@shared/components/button';
import { VoteTypes } from '@shared/typings';
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
  const [voteType, setVoteType] = useState<VoteTypes>();

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
        voteType === VoteTypes.for,
        voteType === VoteTypes.against,
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
        {Object.keys(VoteTypes).map(key => (
          <Button
            key={key}
            onClick={() => setVoteType(VoteTypes[key])}
            className="px-10 py-1"
            fullSize
            variant={voteType === VoteTypes[key] ? 'black' : 'default'}
          >
            {key}
          </Button>
        ))}
      </div>
      <div className="!mt-4 border-t border-gray-100 pt-4">
        <Button
          loading={isSubmitting}
          disabled={!voteType}
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
