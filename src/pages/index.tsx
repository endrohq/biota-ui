import { H1 } from '@shared/components/typography/Title';

import {Header} from "@shared/components/header";
import {useBlockNumber} from "wagmi";

export default function LandingPage() {
  const { data  } = useBlockNumber({
    enabled: true,
    watch:true,
  })
  return (
    <div className="h-screen bg-white">
      <Header />
      <section className="w-full py-10 lg:py-10">
        <div className="lg:container-sm mx-6 flex flex-col-reverse justify-start gap-y-12 lg:h-[500px] lg:flex-row lg:justify-between lg:gap-x-20">
          <div className="flex flex-col justify-center space-y-6 text-center lg:mx-auto lg:h-full lg:space-y-12 lg:text-left">
            <H1 className="!text-5xl font-black">
              Hello {data?.toString()}
            </H1>
            <div className="space-y-10">
              <div className="flex justify-center">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
