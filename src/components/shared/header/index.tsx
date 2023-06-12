import {Button} from "@shared/components/button";
import {getShortenedFormat} from "@shared/utils/string.utils";
import {EthAddressIcon} from "@shared/components/icons/EthAddressIcon";
import {useUser} from "../../../hooks/useUser";
import {Paragraph} from "@shared/components/typography/Paragraph";
import {useBlockNumber} from "wagmi";
import {MenuItem} from "@shared/components/header/MenuItem";
import {Modal} from "@shared/components/modal";
import {useState} from "react";


export function Header () {

  const [showUserDetails, setShowUserDetails] = useState(false);
  const { address, isConnected, login } = useUser()
  const { data  } = useBlockNumber({
    enabled: true,
    watch:true,
  })
  return (
    <>
      <div className="flex justify-between items-center w-full h-16 bg-third px-10">
        <div className="flex items-center space-x-10 justify-between">
          <div className="text-2xl font-semibold text-black">⚫️</div>
          <div>
            <MenuItem label="Proposals" href="" />
          </div>
        </div>
        <div className="flex items-center space-x-8 cursor-pointer">
          <div className="text-xs font-medium">{data?.toString()}</div>
          {
            isConnected ? (
              <div onClick={() => setShowUserDetails(true)} className="flex w-full space-x-2 px-4 transition-all py-2 duration-500 hover:bg-green-100 bg-green-50 rounded justify-between items-center">
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
      {
        showUserDetails && (<Modal close={() => setShowUserDetails(false)} open={true}>
          hello world
        </Modal>
    )
      }
    </>
  );
}
