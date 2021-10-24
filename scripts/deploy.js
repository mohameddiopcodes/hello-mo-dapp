async function main() {
    const [owner] = await hre.ethers.getSigners()
    const balance = await owner.getBalance()

    console.log('Contract deployed by: ', owner.address)
    console.log('Balance: ', balance.toString())

    const Token = await hre.ethers.getContractFactory("HelloMo")
    const contract = await Token.deploy({
        value: hre.ethers.utils.parseEther('0.001')
      })
    await contract.deployed()

    console.log('Contract deployed at address: ', contract.address)
}

main()
    .then(() => { process.exit(0) })
    .catch(e => {
        console.log(e)
        process.exit(1)
    })