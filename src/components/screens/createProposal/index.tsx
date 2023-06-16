import { Button } from '@shared/components/button';
import InputText from '@shared/components/input/InputText';
import TextArea from '@shared/components/input/TextArea';
import { BackLink } from '@shared/components/link/BackLink';
import { MapBox } from '@shared/components/map';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H4 } from '@shared/components/typography/Title';
import { IpfsProposal } from '@shared/typings';
import { ROUTE_PROPOSALS } from '@shared/utils/route';
import { randomBytes32 } from '@shared/utils/string.utils';
import React, { useState } from 'react';

import { CreateModal } from './createModal';
import { CreateProposalMap } from './map';

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

  const handleProposal = (key: keyof IpfsProposal, value: any) =>
    setProposal(prevState => ({ ...prevState, [key]: value }));

  return (
    <>
      <div className="mx-auto w-1/2 pb-20">
        <BackLink href={ROUTE_PROPOSALS} />
        <H4>Report a new incident</H4>
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
            <TextArea
              name="description"
              minRows={3}
              placeholder="hello world"
              value={proposal.description}
              onChange={value => handleProposal('description', value)}
            />
          </div>
          <div className="!mt-8 border-t border-gray-100 pt-6">
            {typeof window !== 'undefined' && (
              <div className="w-full space-y-4">
                <div className="">
                  <div>Location</div>
                  <Paragraph className="text-sm text-gray-700">
                    Pinpoint the location where the incident is happening
                  </Paragraph>
                </div>
                <MapBox
                  mode="editable"
                  positions={proposal.positions}
                  onChange={value => handleProposal('positions', value)}
                />
              </div>
            )}
          </div>
          <div className="!mt-10 flex justify-end space-y-1 border-t border-gray-100 pt-10">
            <Button
              fullSize
              loading={!!submitWithId}
              onClick={() => handleCreate()}
              className="px-6 py-2"
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
