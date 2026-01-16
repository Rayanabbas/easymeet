<template>
  <header class="header">
    <div class="wrap">
      <router-link to="/" class="logo">
        <span class="dot"></span>
        <span>EasyMeet</span>
      </router-link>

      <nav class="nav">
        <router-link to="/" class="link">Accueil</router-link>

        <template v-if="isLogged">
          <router-link to="/book" class="link">Prendre RDV</router-link>
          <router-link to="/my-appointments" class="link">Mes RDV</router-link>
        </template>

        <router-link to="/events" class="link">Events</router-link>

        <template v-if="!isLogged">
          <router-link to="/login" class="btn-outline">Login</router-link>
          <router-link to="/register" class="btn-primary">Register</router-link>
        </template>

        <template v-else>
          <span class="user-pill">👤 {{ userEmail }}</span>
          <span class="status-pill">🟢 Connecté</span>
          <button class="btn-outline" @click="logout">Logout</button>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLogged() {
      return !!localStorage.getItem("token");
    },
    userEmail() {
      return localStorage.getItem("userEmail") || "Utilisateur";
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.wrap {
  width: 100%;
  max-width: 1400px; 
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  font-size: 18px;
  color: #0f172a;
  text-decoration: none;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #2563eb;
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.15);
}

.nav {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.link {
  padding: 10px 12px;
  border-radius: 999px;
  text-decoration: none;
  color: #334155;
  font-weight: 700;
}

.link.router-link-active {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}

.user-pill {
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
  font-weight: 800;
  color: #0f172a;
}

.status-pill {
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #166534;
  font-weight: 900;
  font-size: 12px;
}

.btn-outline {
  border: 1px solid rgba(226, 232, 240, 0.9);
  background: white;
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
}

.btn-primary {
  background: #2563eb;
  color: white;
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 800;
  text-decoration: none;
}
</style>
