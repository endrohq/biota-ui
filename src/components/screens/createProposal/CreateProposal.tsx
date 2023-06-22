import { Button } from '@shared/components/button';
import InputText from '@shared/components/input/InputText';
import TextArea from '@shared/components/input/TextArea';
import UploadInput from '@shared/components/input/UploadInput';
import { MapBox } from '@shared/components/map';
import { CreateProposalForm, Forest } from '@shared/typings';
import React from 'react';

interface CreateProposalProps {
  forest: Forest | undefined;
  save(proposal: CreateProposalForm): void;
}

export function CreateProposal({ save, forest }: CreateProposalProps) {
  const [proposalForm, setProposalForm] = React.useState<CreateProposalForm>({
    title: 'construction of a water park',
    description:
      "Plopsaqua, a popular chain of indoor water parks operated by Plopsa/Studio 100, plans to expand its presence by building a new facility in the city of Mechelen, Belgium. The chosen location for this new venture is the Zennebeemden, a cherished local forest rich in biodiversity and often visited by the city's residents for its serene environment.",
  });

  const handleSave = (key: keyof CreateProposalForm, value: any) =>
    setProposalForm(prevState => ({ ...prevState, [key]: value }));

  return (
    <div className="flex w-full justify-between space-x-10">
      <div className="w-4/12">
        <MapBox
          mode="read-only"
          height={850}
          positions={forest?.properties.location}
        />
      </div>
      <div className=" mt-10 w-7/12 ">
        <div className="mx-auto w-10/12 space-y-12">
          <div className="space-y-1">
            <label className="text-sm" htmlFor="title">
              Title
            </label>
            <InputText
              name="title"
              placeholder="hello world"
              value={proposalForm.title}
              onChange={value => handleSave('title', value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm" htmlFor="description">
              Description
            </label>
            <TextArea
              name="description"
              minRows={3}
              placeholder="hello world"
              value={proposalForm.description}
              onChange={value => handleSave('description', value)}
            />
          </div>

          <div>
            <UploadInput
              images={proposalForm.images}
              onChange={value => handleSave('images', value)}
            />
          </div>

          <div className="!mt-10 flex justify-end space-y-1 border-t border-gray-100 pt-10">
            <Button
              fullSize
              disabled={
                proposalForm.title?.length === 0 ||
                proposalForm.description?.length === 0
              }
              onClick={() => save(proposalForm)}
              className="px-6 py-2"
              variant="primary"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
