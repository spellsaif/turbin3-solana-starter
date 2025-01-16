import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../Turbin3-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
       //creating mint account
       const mint = await createMint(
                        connection,
                        keypair,
                        keypair.publicKey,
                        null,
                        4
                    ) 
    
    console.log("Mint Account Address: ", mint.toBase58());

    //Mint account address: 435xeXtoLBpKPJF22KYBhztskmyhen1cJCbDNad47yQY
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
