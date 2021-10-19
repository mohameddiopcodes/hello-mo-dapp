async function main() {
    const [owner, greeter] = await hre.ethers.getSigners()
    let HelloMo = await hre.ethers.getContractFactory("HelloMo")
    HelloMo = await HelloMo.deploy()
    await HelloMo.deployed()

    console.log("Contract deployed at address :", HelloMo.address)
    console.log("Contract deployed by :", owner.address)

    let helloCount = await HelloMo.getTotalHellos()

    let helloTxn = await HelloMo.sayHello()
    await helloTxn.wait()

    helloCount = await HelloMo.getTotalHellos()

    helloTxn = await HelloMo.connect(greeter).sayHello()
    await helloTxn.wait()

    helloCount = await HelloMo.getTotalHellos()
}

main()
    .then(() => { process.exit(0) })
    .catch(e => {
        console.log(e)
        process.exit(1)
    })