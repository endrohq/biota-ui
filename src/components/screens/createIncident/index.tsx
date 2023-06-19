import { CreateIncidentForm } from '@shared/typings';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { isObjectWithFields } from '@shared/utils/object.utils';
import React, { useState } from 'react';

import { Overview } from './_Overview';
import { CreateModal } from './createModal';
import { CreateProposal } from './CreateProposal';
import { CreateSummary } from './CreateSummary';
import { LocationForm } from './LocationForm';

export function CreateIncident() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [incidentForm, setIncidentForm] = useState<CreateIncidentForm>({
    location: [],
    proposal: {},
    locationName: '',
  });

  const handleSave = (key: keyof CreateIncidentForm, value: any) =>
    setIncidentForm(prevState => ({ ...prevState, [key]: value }));

  return (
    <>
      <div className="flex h-full items-center">
        <Overview incident={incidentForm} />
        <div className="w-8/12">
          <div className="mx-auto w-8/12">
            {!isArrayWithElements(incidentForm.location) ? (
              <LocationForm save={value => handleSave('location', value)} />
            ) : !isObjectWithFields(incidentForm.proposal) ? (
              <CreateProposal save={value => handleSave('proposal', value)} />
            ) : (
              <CreateSummary
                createIncident={() => setIsSubmitting(true)}
                incident={incidentForm}
              />
            )}
          </div>
        </div>
      </div>
      {isSubmitting && (
        <CreateModal
          close={() => setIsSubmitting(true)}
          incident={incidentForm}
        />
      )}
    </>
  );
}
