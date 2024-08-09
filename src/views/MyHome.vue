<template>
    <div class="dashboard-container">
      <h1>Dobrodošli, {{ account }}</h1>
      <div class="dashboard-grid">
        <div class="device-registration">
          <h2>Registracija Uređaja</h2>
          <form @submit.prevent="registerDevice">
            <div class="form-group">
              <label for="device-name">Javni ključ uređaja</label>
              <input type="text" id="device-name" v-model="deviceName" required>
            </div>
            <button type="submit" class="register-button">Registruj Uređaj</button>
          </form>
        </div>
        
        <div class="set-goal">
          <h2>Postavi Cilj za Sutra</h2>
          <form @submit.prevent="setGoal">
            <div class="form-group">
              <label for="goal">Cilj (km)</label>
              <input type="number" id="goal" v-model="goal" required>
            </div>
            <button type="submit" class="goal-button">Postavi Cilj</button>
          </form>
        </div>
        
        <div class="my-data">
          <h2>Moji Podaci</h2>
          <div v-if="myData">
            <p><strong>Pređeno Km:</strong> {{ myData.distanceTraveled }}</p>
            <p><strong>Nivo:</strong> {{ myData.level }}</p>
          </div>
          <div v-else>
            <p>Učitavanje podataka...</p>
          </div>
        </div>
        
        <div class="leaderboard">
          <h2>Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Korisničko Ime</th>
                <th>Nivo</th>
                <th>Pređeno Km</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in leaderboard" :key="user.address">
                <td>{{ user.name }}</td>
                <td>{{ user.level }}</td>
                <td>{{ user.distanceTraveled }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { ethers } from 'ethers';
  import { getLeaderboard, registerDeviceOnChain, setDailyGoal, getRunnerData } from '../services/contractService'; // Import helper functions
  
  export default {
    name: 'MyHome',
    
    setup() {
        const deviceName = ref('');
        const goal = ref(0);
        const account = ref(localStorage.getItem('account')); // Read from localStorage
        const leaderboard = ref([]);
        const myData = ref(null);
  
      // Connect to wallet and fetch account
      const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          account.value = await signer.getAddress();
          localStorage.setItem('account', account.value); // Update localStorage
        } catch (error) {
          console.error("Error connecting to wallet", error);
        }
      } else {
        alert('MetaMask nije instaliran. Molimo instalirajte ga da biste koristili ovu funkciju.');
      }
    };
  
      // Register device
      const registerDevice = async () => {
        if (!account.value) {
          await connectWallet();
        }
        await registerDeviceOnChain(account.value, deviceName.value);
        alert('Uređaj je uspešno registrovan!');
        deviceName.value = ''; // Clear the input after registration
      };
  
      // Set daily goal
      const setGoal = async () => {
      if (!account.value) {

        await connectWallet();
      }
      console.log(goal.value)        
      const res =await setDailyGoal(goal.value);
      alert('Cilj za sutra je uspešno postavljen!');
      console.log(res);
      goal.value = 0; // Clear the input after setting the goal
    };
      // Fetch leaderboard data
      const fetchLeaderboard = async () => {
        leaderboard.value = await getLeaderboard();
      };
  
      // Fetch my data
      const fetchMyData = async () => {
        myData.value = await getRunnerData(account.value);
      };
  
      onMounted(async () => {
        await connectWallet();
        await fetchLeaderboard();
        await fetchMyData();
      });
  
      return {
        deviceName,
        goal,
        account,
        leaderboard,
        myData,
        registerDevice,
        setGoal
      };
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    padding: 20px;
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 100%;
    max-width: 1200px;
  }
  
  .device-registration, .set-goal, .my-data, .leaderboard {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .device-registration h2, .set-goal h2, .my-data h2, .leaderboard h2 {
    margin-bottom: 15px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .register-button, .goal-button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
  
  .register-button:hover, .goal-button:hover {
    background-color: #0056b3;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  </style>
  