import { createWalletClient, getContract, Hash, Hex, http, publicActions, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";
import funJson from "../artifacts/Fun.json";

import dotenv from "dotenv";

const {abi, bin } = funJson["contracts"]["contracts/Fun.sol:Fun"]

dotenv.config();

const Private_key = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(Private_key as Hex);

const contractAddress = '0x026f5fb2a1dcffd95ee76ec5f7756230041a5455';

(async ()=>{
    const client = createWalletClient({
        account,
        transport: http(process.env.API_URL),
        chain: arbitrumSepolia
    })

    const contract = await getContract({
        address: contractAddress,
        abi,
        client
    })

    const events = await contract.getEvents.XWasChanged({
        fromBlock: BigInt(0),
    })
    console.log(events)
})();