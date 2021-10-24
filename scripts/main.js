async function main() {
    let HelloMo = await hre.ethers.getContractFactory("HelloMo")
    HelloMo = await HelloMo.deploy({
        value: hre.ethers.utils.parseEther('0.1')
    })
    await HelloMo.deployed()
    
    console.log("Contract deployed at address :", HelloMo.address)
    
    let contractBalance = await hre.ethers.provider.getBalance(
        HelloMo.address
      );
      console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
      );
    
    let helloTxn = await HelloMo.sayHello('Hello!')
    await helloTxn.wait()

    helloTxn = await HelloMo.sayHello('Hello!')
    await helloTxn.wait()

    contractBalance = await hre.ethers.provider.getBalance(HelloMo.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );
    
    const [owner, greeter] = await hre.ethers.getSigners()
    console.log("Contract deployed by :", owner.address)

    helloTxn = await HelloMo.connect(greeter).sayHello('Hi')
    await helloTxn.wait()

    hellos = await HelloMo.getAllHellos()
    console.log(hellos)
}

main()
    .then(() => { process.exit(0) })
    .catch(e => {
        console.log(e)
        process.exit(1)
    })