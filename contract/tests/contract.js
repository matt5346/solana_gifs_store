const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

describe("contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.Contract;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});

const main = async() => {
  console.log("🚀 Starting test...", SystemProgram)
  const provider = anchor.Provider.env()

  anchor.setProvider(provider)
  const program = anchor.workspace.Contract
  const baseAccount = anchor.web3.Keypair.generate()
  console.log(program, "program");
  const tx = await program.rpc.startStuff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseAccount],
  })

  console.log("📝 Your transaction signature", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('👀 GIF Count', account.totalGifs.toString())

  await program.rpc.addGif("https://media.giphy.com/media/26BRyD3KiIvaRPluM/giphy.gif", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    }
  })
  account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('👀 GIF Count', account.totalGifs.toString())
  console.log('👀 GIF List', account.gifList)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch(err) {
    console.log(err)
    process.exit(1)
  }
}

runMain()