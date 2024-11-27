import React, { useEffect, useState } from "react";
import { decompressHexToSVG } from "../utils/compressAndHex";
import { BrowserProvider, Contract, formatEther } from "ethers";
import { useTraits } from "../contexts/TraitContext";
import { contractAddress, abi } from "../utils/blockchain";

const phaseNames = ["Phase1", "Phase2", "Phase3"];

const FinalMint = () => {
  const { traits } = useTraits();
  const [svgPreview, setSvgPreview] = useState(null);
  const [minting, setMinting] = useState(false);
  const [contractStatus, setContractStatus] = useState({
    currentPhase: "Phase1",
    mintPrice: 0n,
    paused: null,
  });
  const [walletConnected, setWalletConnected] = useState(false);

  // Connect MetaMask
  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
      return;
    }
    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setWalletConnected(true);
      console.log("MetaMask connected successfully.");
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Failed to connect to MetaMask. Please try again.");
    }
  };

  // Generate final preview by layering decompressed SVGs
  useEffect(() => {
    const generateFinalPreview = async () => {
      const layers = [];
      for (const hexValue of Object.values(traits)) {
        if (hexValue) {
          try {
            const svgLayer = await decompressHexToSVG(hexValue);
            layers.push(svgLayer);
          } catch (error) {
            console.error("Error decompressing SVG:", error);
          }
        }
      }
      const finalSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="382" height="382" viewBox="0 0 382 382" preserveAspectRatio="xMidYMid meet">
        ${layers.join("")}
      </svg>`;
      setSvgPreview(finalSVG);
    };

    generateFinalPreview();
  }, [traits]);

  // Fetch contract status
  const checkContractStatus = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, abi, provider);

      const currentPhaseIndex = await contract.currentPhase();
      const currentPhase = Number(currentPhaseIndex);
      const phaseDetails = await contract.phaseDetails(currentPhaseIndex);
      const paused = await contract.paused();

      // Debugging statements
      console.log("Current Phase Index:", currentPhaseIndex);
      console.log("Phase Details:", phaseDetails);
      console.log("Mint Price (wei):", phaseDetails.mintPrice.toString());

      setContractStatus({
        currentPhase: phaseNames[currentPhase],
        mintPrice: phaseDetails.mintPrice,
        paused,
      });
    } catch (error) {
      console.error("Error checking contract status:", error);
      alert("Failed to fetch contract status. Ensure the smart contract is deployed and accessible.");
    }
  };

  useEffect(() => {
    checkContractStatus();
  }, []);

  // Mint NFT
  const handleMintNFT = async () => {
    if (minting) return;
    setMinting(true);

    try {
      const hashes = Object.values(traits);
      if (
        hashes.length !== 9 ||
        hashes.includes(null) ||
        hashes.includes(undefined) ||
        hashes.includes("")
      ) {
        alert("Please ensure all 9 traits are selected before minting.");
        setMinting(false);
        return;
      }

      // Convert hashes to bytes32
      const hashesBytes32 = hashes.map((hash) => {
        // Remove '1b' prefix if present
        let cleanHash = hash.startsWith("1b") ? hash.slice(2) : hash;
        // Ensure it's 64 characters
        cleanHash = cleanHash.slice(0, 64);
        // Add '0x' prefix
        const hexString = "0x" + cleanHash;
        // Validate that it's 32 bytes
        if (hexString.length !== 66) {
          throw new Error(`Invalid hash length: ${hash}`);
        }
        return hexString;
      });

      console.log("Minting process started...");
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);

      // Debugging statements
      console.log("Hashes to store (bytes32):", hashesBytes32);
      console.log("Mint Price (wei):", contractStatus.mintPrice.toString());

      // First, call storeEthscriptionHashes
      console.log("Storing Ethscription Hashes...");
      try {
        const txStore = await contract.storeEthscriptionHashes(hashesBytes32);
        console.log("Transaction hash for storeEthscriptionHashes:", txStore.hash);
        await txStore.wait();
        console.log("Hashes stored successfully.");
      } catch (error) {
        console.error("Error storing hashes:", error);
        if (error.code === "CALL_EXCEPTION" && error.reason) {
          alert(`Failed to store hashes: ${error.reason}`);
        } else {
          alert("Failed to store hashes. Please check the console for more details.");
        }
        setMinting(false);
        return;
      }

      // Now, call mintNFT
      console.log("Minting NFT...");

      // Prepare transaction
      const txMint = await contract.mintNFT.populateTransaction({
        value: contractStatus.mintPrice,
      });

      // Estimate gas
      let gasLimit;
      try {
        gasLimit = await signer.estimateGas(txMint);
        console.log("Estimated Gas Limit:", gasLimit.toString());
      } catch (error) {
        console.error("Error estimating gas:", error);
        alert("Gas estimation failed. Check the smart contract and transaction data.");
        setMinting(false);
        return;
      }

      // Send the transaction
      try {
        const txResponse = await signer.sendTransaction({
          ...txMint,
          gasLimit,
        });

        console.log("Transaction hash for mintNFT:", txResponse.hash);
        await txResponse.wait();

        alert("NFT minted successfully!");
      } catch (error) {
        console.error("Error during minting:", error);
        if (error.info && error.info.error && error.info.error.message) {
          alert(`Minting failed: ${error.info.error.message}`);
        } else if (error.reason) {
          alert(`Minting failed: ${error.reason}`);
        } else if (error.message) {
          alert(`Minting failed: ${error.message}`);
        } else {
          alert("Minting failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Unexpected error during minting:", error);
      alert("An unexpected error occurred. Please check the console for more details.");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ color: "white" }}>Finalize & Mint</h2>
      {!walletConnected && (
        <button
          onClick={connectMetaMask}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Connect Wallet
        </button>
      )}
      <div>
        <p>Current Phase: {contractStatus.currentPhase}</p>
        <p>Mint Price: {formatEther(contractStatus.mintPrice)} ETH</p>
        <p>Contract Paused: {contractStatus.paused ? "Yes" : "No"}</p>
      </div>
      <div
        style={{
          width: "382px",
          height: "382px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          margin: "20px auto",
          position: "relative",
        }}
      >
        {svgPreview ? (
          <div
            dangerouslySetInnerHTML={{ __html: svgPreview }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <p style={{ color: "#000" }}>Loading preview...</p>
        )}
      </div>
      <button
        onClick={handleMintNFT}
        disabled={minting || !walletConnected}
        style={{
          padding: "10px 20px",
          backgroundColor: minting ? "gray" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: minting ? "not-allowed" : "pointer",
        }}
      >
        {minting ? "Minting..." : "Mint NFT"}
      </button>
    </div>
  );
};

export default FinalMint;