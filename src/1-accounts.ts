import { createPublicClient, formatEther, Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains"

import dotenv from "dotenv"

dotenv.config();

const Private_key = process.env.PRIVATE_KEY;

const account = privateKeyToAccount(Private_key as Hex);

(async () => {
    const client = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(process.env.API_URL),
    });
    console.log(account.address)

    const balance = await client.getBalance({address: account.address});

    console.log(formatEther(balance));

    const nounce = await client.getTransactionCount({address: account.address})

    console.log(nounce)

})();