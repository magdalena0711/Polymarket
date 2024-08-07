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
            <label for="username">Korisničko ime</label>
            <input type="text" id="username" v-model="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Lozinka</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit" class="register-button">Registruj se</button>
        </form>
        <button @click="connectWallet" class="wallet-button">Poveži MetaMask Wallet</button>
        <p v-if="account">Povezan wallet: {{ account }}</p>
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
    background-color: #f0f0f0;
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
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .register-button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .register-button:hover {
    background-color: #0056b3;
  }
  
  .wallet-button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .wallet-button:hover {
    background-color: #218838;
  }
  
  p {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  </style>
  