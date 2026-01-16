<template>
  <div class="app">
    <Header />
    <main class="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Header, Footer },
};
</script>

<style>
/* Global reset */
* {
  box-sizing: border-box;
}

body {
  font-family: Inter, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #ffffff;
  color: #0f172a;
}

/* Layout global */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}

/* Container global : plus large + propre */
.container {
  width: 100%;
  max-width: 1400px; /* 🔥 plus large */
  margin: 0 auto;
  padding: 0 24px;
}

/* Responsive padding */
@media (max-width: 600px) {
  .container {
    padding: 0 16px;
  }
}
</style>
