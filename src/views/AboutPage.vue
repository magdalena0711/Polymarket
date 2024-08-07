<template>
  <div class="about-container">
    <div class="stickers-container">
      <img @click="goToRegister" src="../assets/run.png" alt="Running Sticker 1" class="sticker">
      <img @click="stayOnAbout" src="../assets/question1.png" alt="Running Sticker 2" class="sticker">
    </div>
    <h1>O Aplikaciji</h1>
    <p>Ova aplikacija je dizajnirana za trkače. Povezivanjem vašeg MetaMask wallet-a možete pratiti svoje aktivnosti i deliti ih sa drugima na blockchain-u.</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'AboutPage',
  setup() {
    const router = useRouter();

    const goToRegister = () => {
      router.push({ name: 'registration' });
    };

    const stayOnAbout = () => {
      console.log("Ostajem na stranici About.");
    };

    return {
      goToRegister,
      stayOnAbout
    };
  }
};
</script>

<style scoped>
.about-container {
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

.about-container h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.about-container p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  text-align: center;
}

.about-sticker {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}
</style>
