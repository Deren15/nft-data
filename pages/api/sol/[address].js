import axios from 'axios'

export default async function handler(req, res) {
    try {
        const { address } = req.query;
        console.log(address);
        // random number between 1 to 4
        const random = Math.floor(Math.random() * 4) + 1;
        console.log(random);
        const request = await axios.post(
          "https://rest-api.hellomoon.io/v0/nft/magiceden/wallet-all-time-stats",
          {
            ownerAccount: address,
          },
          {
            headers: {
                // HELLO_MOON_API_KEY_1 - here 1 is the random number
                Authorization: `Bearer ${process.env[`HELLO_MOON_API_KEY_${random}`]}`,
            },
          }
        );
    
        let data = request.data?.data;
        let nftData = {}
    
        if (data?.length > 0) {
            data = data[0]
            nftData = {
                realizedProfits: data?.totalRealizedProfits,
                volume: data?.volumeNftPurchased,
                minted: data?.nftMintedCount,
                sold: data?.nftSoldCount,
                purchased: data?.nftPurchasedCount,
                profitAndLossPercentage: data?.profitAndLossPercentage,
                nftVolumeTraded: data?.volumeNftTraded,
                nftSoldVolume: data?.volumeNftSold
            }
        }
    
        res.status(200).json({
          address: address,
          nftData: nftData,
        });
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
      }
}