const {
  Connection,
  PublicKey,
  clusterApiUrl,
  
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
console.log(`Working of address => ${publicKey}`);
const secretKey = newPair._keypair.secretKey;

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet", "confirm"));
    const myWallet = Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(myWallet.publicKey);

    console.log(
      `Balance is ${
        parseInt(walletBalance) / LAMPORTS_PER_SOL
      }\nFor wallet => ${myWallet.publicKey}`
    );
  } catch (error) {
    console.log(`Error while getting the balanace...\n${error}`);
  }
};

const getAirdrop = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet", "confirm"));
    const walletKeyPair = Keypair.fromSecretKey(secretKey);

    console.log("\n-- Airdropping 2 SOL --");
    const formAirDropSignature = await connection.requestAirdrop(
      walletKeyPair.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(formAirDropSignature);
  } catch (err) {
    console.log(`Error while getting error...\n${error}`);
  }
};

const driverFunction = async () => {
  await getWalletBalance();
  await getAirdrop();
  await getWalletBalance();
};

driverFunction();
