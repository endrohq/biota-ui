

import { H1 } from '@shared/components/typography/Title';

import { Container } from "@shared/components/container";
import {useRouter} from "next/router";

export default function ProposalItemPage() {
  const { query } = useRouter();
  return (
    <Container>
      <section className="w-full py-10 lg:py-10">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center space-y-6 text-center">
            <H1 className="!text-5xl font-black">
              Proposal: {query.proposalId}
            </H1>
          </div>
        </div>
      </section>
    </Container>
  );
}
