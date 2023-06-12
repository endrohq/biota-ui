
export const hederaTestnet = {
   id: 0x128,
   network: "Hedera Testnet",
   name: "Hedera",
   nativeCurrency: {
     name: "HBAR",
     symbol: "HBAR",
     decimals: 18,
  },
  rpcUrls: {
     hashio: {
       http:  ["https://testnet.hashio.io/api"],
    },
     default: {
       http:  ["https://testnet.hashio.io/api"],
    },
     public: {
       http:  ["https://testnet.hashio.io/api"],
    },
  },
   blockExplorers: {
     default: {
       name: "Etherscan",
       url: "https://etherscan.io",
    },
  },
};
