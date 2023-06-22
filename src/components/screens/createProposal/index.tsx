import { CreateProposalForm } from '@shared/typings';
import { isObjectWithFields } from '@shared/utils/object.utils';
import React, { useState } from 'react';

import { CreateModal } from './createModal';
import { CreateProposal } from './CreateProposal';
import { CreateSummary } from './CreateSummary';
import { LocationForm } from './location';

export function CreateProposalPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [props, setProps] = useState<CreateProposalForm>({});

  return (
    <>
      <div className="flex h-full items-center">
        <div className="mx-auto w-11/12">
          {!isObjectWithFields(props?.forest) ? (
            <LocationForm
              save={forest => setProps(prevState => ({ ...prevState, forest }))}
            />
          ) : !props.title || !props.description ? (
            <CreateProposal
              forest={props.forest}
              save={value =>
                setProps(prevState => ({ ...prevState, ...value }))
              }
            />
          ) : (
            <CreateSummary
              createIncident={() => setIsSubmitting(true)}
              proposal={props}
            />
          )}
        </div>
      </div>
      {isSubmitting && (
        <CreateModal close={() => setIsSubmitting(true)} proposal={props} />
      )}
    </>
  );
}
