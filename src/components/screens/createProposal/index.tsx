import { Button } from '@shared/components/button';
import InputText from '@shared/components/input/InputText';
import { BackLink } from '@shared/components/link/BackLink';
import { H4 } from '@shared/components/typography/Title';
import { ROUTE_PROPOSALS } from '@shared/utils/route';
import { useState } from 'react';

import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { votingContractABI } from '../../../config/abi/proposal';
import { useStorage } from '../../../hooks/useStorage';
import { useUser } from '../../../hooks/useUser';

export function CreateProposal() {
  const { address } = useUser();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { config } = usePrepareContractWrite({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: votingContractABI,
    functionName: 'createProposal',
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const { upload } = useStorage();

  const uploadContent = async () => {
    const cid = await upload({
      title,
      description,
    });

    console.log(`CID: ${cid}`);
    // // Generate a unique proposalId (or you can have the user input this)
    // const proposalId = Math.floor(Math.random() * Math.floor(1000));
    //
    // write({
    //   3: [proposalId, cid],
    //   from: address,
    // });
  };

  return (
    <div className="mx-auto w-1/2">
      <BackLink href={ROUTE_PROPOSALS} />
      <H4>Create Proposal</H4>
      <div className="space-y-5 py-6">
        <div className="space-y-1">
          <label className="pl-1" htmlFor="title">
            Title
          </label>
          <InputText
            name="title"
            placeholder="hello world"
            value={title}
            onChange={setTitle}
          />
        </div>
        <div className="space-y-1">
          <label className="pl-1" htmlFor="description">
            Description
          </label>
          <InputText
            name="title"
            placeholder="hello world"
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="flex justify-end space-y-1">
          <Button
            onClick={() => uploadContent()}
            className="px-6 py-1"
            variant="primary"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
