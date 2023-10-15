const { expect } = require('chai');

describe('MyNFTCollection', function () {
  let myNFT;

  beforeEach(async function () {
    const MyNFT = await ethers.getContractFactory('MyNFTCollection');
    myNFT = await MyNFT.deploy('MyNFT', 'NFT');
    await myNFT.deployed();
  });

  it('Should mint a new NFT', async function () {
    await myNFT.safeMint('0x123...', 1);
    const totalSupply = await myNFT.totalSupply();
    expect(totalSupply).to.equal(1);
  });

  it('Should return the correct token owner', async function () {
    await myNFT.safeMint('0x456...', 2);
    const owner = await myNFT.ownerOf(2);
    expect(owner).to.equal('0x456...');
  });

  it('Should not allow minting from non-owner', async function () {
    const initialSupply = await myNFT.totalSupply();
    await expect(myNFT.connect(signer2).safeMint('0x789...', 3)).to.be.revertedWith('Ownable: caller is not the owner');
    const newSupply = await myNFT.totalSupply();
    expect(newSupply).to.equal(initialSupply);
  });
});
