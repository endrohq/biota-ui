import { Button } from '@shared/components/button';
import InputText from '@shared/components/input/InputText';
import TextArea from '@shared/components/input/TextArea';
import UploadInput from '@shared/components/input/UploadInput';
import { BackLink } from '@shared/components/link/BackLink';
import { MapBox } from '@shared/components/map';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H4 } from '@shared/components/typography/Title';
import { CreateIncidentForm } from '@shared/typings';
import { ROUTE_INCIDENTS } from '@shared/utils/route';
import { randomBytes32 } from '@shared/utils/string.utils';
import React, { useState } from 'react';

import { CreateModal } from './createModal';

export function CreateIncident() {
  const [submitWithId, setSubmitWithId] = useState<string>();
  const [incidentForm, setIncidentForm] = useState<CreateIncidentForm>({
    title: 'Hello',
    description: 'My world',
  });

  function handleCreate() {
    const id = randomBytes32();
    setSubmitWithId(id);
  }

  const handleSave = (key: keyof CreateIncidentForm, value: any) =>
    setIncidentForm(prevState => ({ ...prevState, [key]: value }));

  return (
    <>
      <div className="mx-auto w-1/2 pb-20">
        <BackLink href={ROUTE_INCIDENTS} />
        <H4>Report a new incident</H4>
        <div className="space-y-5 py-6">
          <div className="space-y-1">
            <label className="pl-1" htmlFor="title">
              Title
            </label>
            <InputText
              name="title"
              placeholder="hello world"
              value={incidentForm.title}
              onChange={value => handleSave('title', value)}
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
              value={incidentForm.description}
              onChange={value => handleSave('description', value)}
            />
          </div>
          <div>
            <UploadInput
              images={incidentForm.images}
              onChange={value => handleSave('images', value)}
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
                  positions={incidentForm.positions}
                  onChange={value => handleSave('positions', value)}
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
          incident={incidentForm}
        />
      )}
    </>
  );
}
