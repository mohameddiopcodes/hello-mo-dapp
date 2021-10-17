async function main() {
    let HelloMo = await hre.ethers.getContractFactory("HelloMo")
    HelloMo = await HelloMo.deploy()
    await HelloMo.deployed()

    console.log("Contract deployed at address :", HelloMo.address)
}

main()
    .then(() => { process.exit(0) })
    .catch(e => {
        console.log(e)
        process.exit(1)
    })