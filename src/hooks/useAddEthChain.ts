const useAddEthChain = () => {
    const addEthChain = async () => {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: "0x44E",
                    rpcUrls: ["https://trusted-sequencer-rpc.bsquared.network"],
                    chainName: "MISO TESTNET",
                    nativeCurrency: {
                        name: "BTC",
                        symbol: "BTC",
                        decimals: 18
                    },
                    blockExplorerUrls: ["https://testnet-role.bsquared.network"]
                }]
            });
        }
    };
    return { addEthChain };
}

export default useAddEthChain;
