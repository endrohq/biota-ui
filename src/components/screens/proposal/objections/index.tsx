import { Button } from '@shared/components/button';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H3 } from '@shared/components/typography/Title';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { useState } from 'react';

import { CreateObjectionForm } from './create';
import { ObjectionItem } from './ObjectionItem';

import { useObjections } from '../../../../hooks/useObjections';

interface ObjectionsProps {
  proposalId: string;
}

export function Objections({ proposalId }: ObjectionsProps) {
  const { objections } = useObjections(proposalId);
  const [intentionToCreateObjection, setIntentionToCreateObjection] =
    useState<boolean>(false);

  function handleSuccessfulCreate() {
    setIntentionToCreateObjection(false);
  }
  return (
    <>
      <div className="mt-6 space-y-6">
        <div className="flex justify-between">
          <div>
            <H3 className="">Forum</H3>
            <Paragraph className="w-7/12 text-sm text-gray-600">
              Showcase what you might think is positive or negative around the
              proposal. It's important to have a healthy discussion and share
              your knowledge & thoughts.
            </Paragraph>
          </div>
          <div>
            <Button onClick={() => setIntentionToCreateObjection(true)}>
              Create Objection
            </Button>
          </div>
        </div>
        <div className="flex justify-between space-x-6">
          <div className="w-12/12 grid grid-cols-3 gap-4">
            {isArrayWithElements(objections) ? (
              objections?.map((objection, idx) => (
                <ObjectionItem objection={objection} key={idx} />
              ))
            ) : (
              <div className="text-sm text-gray-500">No objections yet</div>
            )}
          </div>
        </div>
      </div>

      {intentionToCreateObjection && (
        <CreateObjectionForm
          onSuccess={handleSuccessfulCreate}
          proposalId={proposalId}
          close={() => setIntentionToCreateObjection(false)}
        />
      )}
    </>
  );
}
