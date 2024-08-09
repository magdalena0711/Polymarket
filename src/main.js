import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { ethers } from 'ethers'; // Uverite se da je ethers pravilno uvezen

const app = createApp(App);

app.use(router);
app.mount('#app');

window.ethers = ethers; // Dodajte ethers globalno ako je potrebno za debagovanje
