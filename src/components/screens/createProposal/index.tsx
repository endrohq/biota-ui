import { Button } from '@shared/components/button';
import InputText from '@shared/components/input/InputText';
import { BackLink } from '@shared/components/link/BackLink';
import { H4 } from '@shared/components/typography/Title';
import { IpfsProposal } from '@shared/typings';
import { ROUTE_PROPOSALS } from '@shared/utils/route';
import { randomBytes32 } from '@shared/utils/string.utils';
import { useState } from 'react';

import { CreateModal } from './createModal';
import { PositionMap } from './map';

export function CreateProposal() {
  const [submitWithId, setSubmitWithId] = useState<string>();
  const [proposal, setProposal] = useState<Partial<IpfsProposal>>({
    title: 'Hello',
    description: 'My world',
  });

  function handleCreate() {
    const id = randomBytes32();
    setSubmitWithId(id);
  }

  const handleProposal = (key: keyof IpfsProposal, value: string) =>
    setProposal(prevState => ({ ...prevState, [key]: value }));

  return (
    <>
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
              value={proposal.title}
              onChange={value => handleProposal('title', value)}
            />
          </div>
          <div className="space-y-1">
            <label className="pl-1" htmlFor="description">
              Description
            </label>
            <InputText
              name="title"
              placeholder="hello world"
              value={proposal.description}
              onChange={value => handleProposal('description', value)}
            />
          </div>
          <div className="">
            {typeof window !== 'undefined' && <PositionMap />}
          </div>
          <div className="flex justify-end space-y-1">
            <Button
              loading={!!submitWithId}
              onClick={() => handleCreate()}
              className="px-6 py-1"
              variant="primary"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
      {!!submitWithId && (
        <CreateModal
          id={submitWithId}
          close={() => setSubmitWithId(undefined)}
          proposal={proposal}
        />
      )}
    </>
  );
}
