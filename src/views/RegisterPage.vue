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
        <div class="form-group">
          <label for="runs-per-week">Broj puta nedeljno</label>
          <input type="number" id="runs-per-week" v-model="runsPerWeek" min="1" required>
        </div>
        <div class="form-group">
          <label for="fitness-level">Nivo Spremnosti</label>
          <select id="fitness-level" v-model="fitnessLevel" required>
            <option value="" disabled>Izaberi nivo</option>
            <option value="beginner">Početnik</option>
            <option value="intermediate">Srednji</option>
            <option value="advanced">Napredni</option>
          </select>
        </div>
        <div class="form-group">
          <label for="reason">Razlog za Trčanje</label>
          <select id="reason" v-model="reason" required>
            <option value="" disabled>Izaberi razlog</option>
            <option value="fitness">Fitnes</option>
            <option value="weight-loss">Gubitak težine</option>
            <option value="stress-relief">Oslobađanje od stresa</option>
            <option value="competition">Takmičenje</option>
          </select>
        </div>
        <button type="submit" class="register-button">Registruj se</button>
      </form>
      
      <button @click="toggleLoginForm" class="toggle-login-button">
        Prijava
      </button>

      <div v-if="showLoginForm" class="login-container">
        <h1>Prijava</h1>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="login-username">Korisničko ime</label>
            <input type="text" id="login-username" v-model="loginName" required>
          </div>
          <div class="form-group">
            <label for="login-password">Lozinka</label>
            <input type="password" id="login-password" v-model="loginPassword" required>
          </div>
          <button type="submit" class="login-button">Prijavi se</button>
        </form>
      </div>
      
      <button @click="connectWallet" class="wallet-button">Poveži MetaMask Wallet</button>
      <button v-if="walletConnected" @click="goToDashboard" class="dashboard-button">Idi na Dashboard</button>
      <p v-if="account">Povezan wallet: {{ account }}</p>
    </div>
    <div v-if="showQuickLoginForm" class="quick-login-form">
      <h2>Prebaci na Ulogovanu Stranu</h2>
      <button @click="goToDashboard">Idi na Dashboard</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ethers } from 'ethers';
import { useRouter } from 'vue-router';
import { registerRunnerOnChain } from '../services/contractService'; // Import the function

export default {
  name: 'RegisterPage',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const runsPerWeek = ref(null);
    const fitnessLevel = ref('');
    const reason = ref('');
    const loginName = ref('');
    const loginPassword = ref('');
    const account = ref(null);
    const walletConnected = ref(false);
    const showLoginForm = ref(false);
    const showQuickLoginForm = ref(false);
    const router = useRouter();

    const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      account.value = accountAddress;
      localStorage.setItem('account', accountAddress); // Save to localStorage
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
      try {
        const res = await registerRunnerOnChain(name.value, email.value);
        console.log(res);
        console.log("Registracija korisnika:", { 
          name: name.value, 
          email: email.value, 
          password: password.value, 
          account: account.value, 
          runsPerWeek: runsPerWeek.value, 
          fitnessLevel: fitnessLevel.value, 
          reason: reason.value 
        });
        alert('Korisnik je uspešno registrovan!');
        // Redirect to DashboardPage after successful registration
        router.push({ name: 'home' });
      } catch (error) {

        console.log(name.value)
        console.log(email.value)
        console.log(password.value)
        console.log(account.value)
        
        console.log(runsPerWeek.value)
        console.log(fitnessLevel.value)
        console.log(reason.value)
        console.error("Error registering user on chain:", error);
        alert('Greška pri registraciji korisnika na blockchainu');
      }
    };

    const loginUser = async () => {
      console.log("Prijava korisnika:", { 
        loginName: loginName.value, 
        loginPassword: loginPassword.value 
      });
      // Add logic for handling login here
      alert('Korisnik je uspešno prijavljen!');
      // Redirect to DashboardPage after successful login
      router.push({ name: 'home' });
    };

    const toggleLoginForm = () => {
      showLoginForm.value = !showLoginForm.value;
    };

    const stayOnRegister = () => {
      console.log("Ostajem na formi za registraciju.");
    };

    const goToAbout = () => {
      router.push({ name: 'about' });
    };

    const goToDashboard = () => {
      router.push({ name: 'home' });
    };

    return {
      name,
      email,
      password,
      runsPerWeek,
      fitnessLevel,
      reason,
      loginName,
      loginPassword,
      account,
      walletConnected,
      showLoginForm,
      showQuickLoginForm,
      connectWallet,
      registerUser,
      loginUser,
      toggleLoginForm,
      stayOnRegister,
      goToAbout,
      goToDashboard
    };
  }
};
</script>

<style scoped>
/* Existing styles */
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

.toggle-login-button {
  width: 100%;
  padding: 10px;
  background-color: #61afc0;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.toggle-login-button:hover {
  background-color: #587b9f;
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

.dashboard-button {
  width: 100%;
  padding: 2%;
}
</style>
