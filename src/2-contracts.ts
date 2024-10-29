import { createWalletClient, getContract, Hash, Hex, http, publicActions, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";
import funJson from "../artifacts/Fun.json";

import dotenv from "dotenv";

const {abi, bin } = funJson["contracts"]["contracts/Fun.sol:Fun"]

dotenv.config();

const Private_key = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(Private_key as Hex);

(async () => {
    const client = createWalletClient({
        account,
        chain: arbitrumSepolia,
        transport: http(process.env.API_URL)
    }).extend(publicActions);

    const hash = await client.deployContract({
        abi,
        bytecode: `0x${bin}`,
        args: [127],
    })

    const {contractAddress} = await client.getTransactionReceipt({ hash });
    
    console.log("address : ",await contractAddress)
    
    if(contractAddress) {
        const contract = getContract({
            address: contractAddress,
            abi,
            client,
        })

        const x = await contract.read.x()
        console.log(x)
        
        await contract.write.changeX([132]);
        
        const x2 = await contract.read.x()
        console.log(x2)
    }
})();