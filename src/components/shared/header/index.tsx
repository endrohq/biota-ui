import {Button} from "@shared/components/button";
import {getShortenedFormat} from "@shared/utils/string.utils";
import {EthAddressIcon} from "@shared/components/icons/EthAddressIcon";
import {useUser} from "../../../hooks/useUser";
import {Paragraph} from "@shared/components/typography/Paragraph";


export function Header () {
  const { address, isConnected, login } = useUser()
  return (
    <div className="flex justify-between items-center w-full h-16 bg-third px-10">
      <div className="flex justify-between">
        <div className="text-xl font-semibold text-black">RIVERS</div>
      </div>
      <div>
        {
          isConnected ? (
            <div className="flex w-full space-x-2 px-4 transition-all py-2 duration-500 hover:bg-green-100 bg-green-50 rounded justify-between items-center">
              <EthAddressIcon address={address} />
              <Paragraph className="text-sm">
                {getShortenedFormat(address, 6)}
              </Paragraph>
            </div>
          ) : (
              <Button
                onClick={login}
                variant="primary"
              >
                Connect
              </Button>
            )
        }
      </div>
    </div>
  );
}
