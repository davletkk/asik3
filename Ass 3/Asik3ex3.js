const { expect } = require('chai');

describe('MyNFT', function () {
  let myNFT;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    const MyNFT = await ethers.getContractFactory('MyNFT');
    myNFT = await MyNFT.deploy('https://ipfs.mynft.com/');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });

  it('Should mint a new NFT', async function () {
    await myNFT.connect(owner).mintNFT(addr1.address, 'ipfs://QmX5ZKpjVKoP4y1kE8PbA4p4mS3J4zmeY1EbdSNaPq39ji');
    const totalSupply = await myNFT.totalSupply();
    expect(totalSupply).to.equal(1);
  });

  it('Should return the correct token URI', async function () {
    const tokenURI = 'ipfs://QmX5ZKpjVKoP4y1kE8PbA4p4mS3J4zmeY1EbdSNaPq39ji';
    await myNFT.connect(owner).mintNFT(addr1.address, tokenURI);
    const newTokenId = 1;
    expect(await myNFT.tokenURI(newTokenId)).to.equal(tokenURI);
  });

  it('Should set the base URI', async function () {
    const newBaseURI = 'https://newipfs.mynft.com/';
    await myNFT.connect(owner).setBaseURI(newBaseURI);
    expect(await myNFT._baseURI()).to.equal(newBaseURI);
  });
});
