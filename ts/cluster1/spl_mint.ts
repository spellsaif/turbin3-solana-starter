import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../Turbin3-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 10_000n;

// Mint address
const mint = new PublicKey("435xeXtoLBpKPJF22KYBhztskmyhen1cJCbDNad47yQY");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(
                            connection,
                            keypair,
                            mint,
                            keypair.publicKey,
                            false,
                            commitment
                        );
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        // ATA(Associated Token Account Addr): 5cRdYCJRJn4ptjhyHFA8rTWVPwdqfzyyj5wtM6ckpU1G

        // Mint to ATA
        const mintTx = await mintTo(
                            connection,
                            keypair,
                            mint,
                            ata.address,
                            keypair.publicKey,
                            1000n * token_decimals
                    );
        console.log(`Your mint txid: ${mintTx}`);
        //tx: 3Hnt3eLcicXt5rxSGuyGzWXRu7mcePDmAMtQV8Dvx3eJyX4XzYVnDcXyKiAi2wpLMnrz7MXy6v7EYYKutdyWK89a
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
