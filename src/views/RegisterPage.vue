<template>
    <div class="register-container">
      <div class="stickers-container">
        <img @click="stayOnRegister" src="../assets/run.png" alt="Running Sticker 1" class="sticker">
        <img @click="goToAbout" src="../assets/question1.png" alt="Running Sticker 2" class="sticker">
      </div>
      <div class="register-form">
        <h1>Registracija</h1>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="username">Adresa</label>
            <input type="text" id="username" v-model="name" required>
          </div>
          <button type="submit" class="register-button">Registruj se</button>
        </form>
        <button @click="connectWallet" class="wallet-button">Poveži MetaMask Wallet</button>
        <p v-if="account">Povezan wallet: {{ account }}</p>
        
        <!-- Dugme za prikaz ankete -->
        <button @click="showSurvey = !showSurvey" class="survey-button">
          {{ showSurvey ? 'Sakrij anketu' : 'Popuni anketu' }}
        </button>
        
        <!-- Anketa -->
        <div v-if="showSurvey" class="survey-form">
          <h2>Koji je vaš cilj?</h2>
          <form @submit.prevent="submitSurvey">
            <div class="form-group">
              <label for="age">Koliko imate godina?</label>
              <input type="number" id="age" v-model="age" required>
            </div>
            <div class="form-group">
              <label for="activity">Kakva vam je fizička aktivnost?</label>
              <select id="activity" v-model="activity" required>
                <option value="low">Niska</option>
                <option value="moderate">Umerena</option>
                <option value="high">Visoka</option>
              </select>
            </div>
            <div class="form-group">
              <label for="frequency">Koliko često trčite?</label>
              <input type="text" id="frequency" v-model="frequency" required>
            </div>
            <div class="form-group">
              <label for="goal">Koji vam je cilj u trčanju?</label>
              <input type="text" id="goal" v-model="goal" required>
            </div>
            <button type="submit" class="survey-button">Pošalji</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { ethers } from 'ethers';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'RegisterPage',
    setup() {
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const account = ref(null);
      const router = useRouter();
  
      // Dodajte ove promenljive za anketu
      const showSurvey = ref(false);
      const age = ref('');
      const activity = ref('');
      const frequency = ref('');
      const goal = ref('');
  
      const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            account.value = userAddress;
          } catch (error) {
            console.error("Error connecting to wallet", error);
          }
        } else {
          alert('MetaMask nije instaliran. Molimo instalirajte ga da biste koristili ovu funkciju.');
        }
      };
  
      const registerUser = async () => {
        if (!account.value) {
          await connectWallet();
        }
        console.log("Registracija korisnika:", { name: name.value, email: email.value, password: password.value, account: account.value });
        alert('Korisnik je uspešno registrovan!');
      };
  
      const submitSurvey = () => {
        console.log("Popunjena anketa:", { age: age.value, activity: activity.value, frequency: frequency.value, goal: goal.value });
        alert('Anketa je uspešno poslata!');
        showSurvey.value = false; // Sakrij anketu nakon slanja
      };
  
      const stayOnRegister = () => {
        console.log("Ostajem na formi za registraciju.");
      };
  
      const goToAbout = () => {
        router.push({ name: 'about' });
      };
  
      return {
        name,
        email,
        password,
        account,
        connectWallet,
        registerUser,
        showSurvey,
        age,
        activity,
        frequency,
        goal,
        submitSurvey,
        stayOnRegister,
        goToAbout
      };
    }
  };
  </script>
    
    <style scoped>
    .register-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #e6e6fa;
      padding: 20px;
    }
    
    .stickers-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .sticker {
      width: 80px;
      height: 80px;
      margin: 0 10px;
      cursor: pointer;
      border-radius: 8px;
    }
    
    .register-form {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    
    .register-form h1 {
      margin-bottom: 20px;
      font-size: 24px;
      color: #333;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #333;
    }
    
    .form-group input,
    .form-group select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .register-button {
      width: 100%;
      padding: 10px;
      background-color: #ca61ce;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }
    
    .register-button:hover {
      background-color: #ad50c2;
    }
    
    .wallet-button {
      width: 100%;
      padding: 10px;
      background-color: #65a7c4;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }
    
    .wallet-button:hover {
      background-color: #2a5f67;
    }
    
    .survey-button {
      width: 100%;
      padding: 10px;
      background-color: #47b493;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }
    
    .survey-button:hover {
      background-color: #389270;
    }
    
    .survey-form {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }
    
    p {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    }
    </style>
    