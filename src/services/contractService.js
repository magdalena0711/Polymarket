import { ethers } from 'ethers';

import RunningTrackerABI from '../RunningTrackerABI.json';

// Replace with your contract address and ABI
const CONTRACT_ADDRESS = '0xcc44fB322F44dB75a34FB4Fa2E82AAfB3EB59BB2';


let provider;
let contract;

export async function initProvider() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, RunningTrackerABI, signer);
      console.log('Provider and contract initialized.');
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  } catch (error) {
    console.error('Error initializing provider:', error);
  }
}




export async function setDailyGoal(goal) {
    await initProvider();
  if (contract) {
    try {
        console.log("USLO",goal)
        const tx = await contract.setDailyGoal(goal);
        console.log(tx)  
        alert("Uspesno ste postavi cilj!");
          
      //await tx.wait();
      //const tx = await contract.methods.setDailyGoal(goal).send({ from: account });
    //await tx.wait();
      console.log('Daily goal set:', goal);
    } catch (error) {
      console.error('Error setting daily goal:', error);
    }
  }
  else {
    console.log("Contract is not initialized!");
  }
  return "end"
}

export async function updateDistance(distance) {
    await initProvider(); 
  if (contract) {
    try {
      const tx = await contract.updateDistance(distance);
      await tx.wait();
      console.log('Distance updated:', distance);
    } catch (error) {
      console.error('Error updating distance:', error);
    }
  }
}

export async function getRunnerData() {
    await initProvider();  
  if (contract) {
    try {
      const data = await contract.getRunnerData();
      return data;
    } catch (error) {
      console.error('Error getting runner data:', error);
    }
  }
}

export async function getLeaderboard() {
    
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, RunningTrackerABI, provider);
  
      try {
        const leaderboardData = await contract.getLeaderboard();
        console.log('Leaderboard data:', leaderboardData); 
        return leaderboardData.map(user => ({
          address: user.address,
          name: user.name,
          level: user.level.toNumber(),
          distanceTraveled: user.distanceTraveled.toNumber(),
        }));
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        return [];
      }
    } else {
      console.error("Ethereum wallet is not available");
      return [];
    }
  }

  export async function registerRunnerOnChain(name, email) {
    console.log(name, email)
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(name, email)
      const signer = provider.getSigner();
      console.log(name, email)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, RunningTrackerABI, signer);
      console.log(name, email)      
    
      try {

        await contract.registerRunner(name, email);
        alert("Uspesno ste se registrovali!");
        //await transaction.wait();

        console.log("Runner registered:", { name, email });
      } catch (error) {
        console.error("Error registering runner:", error);
      }
    } else {
      console.error("Ethereum wallet is not available");
    }
  }  

export async function registerDeviceOnChain(deviceId) {
    await initProvider();
  if (contract) {
    console.log("postoji");
    try {
      await contract.registerDeviceOnChain(deviceId);
      //await tx.wait();
      console.log('Device registered:', deviceId);
    } catch (error) {
      console.error('Error registering device:', error);
    }
  }
}

