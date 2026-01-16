<template>
  <div class="container">
    <div class="auth-grid">
      <!-- Left -->
      <div class="auth-left">
        <span class="badge">🔐 Connexion</span>
        <h2>Heureux de te revoir sur <span class="accent">EasyMeet</span></h2>
        <p class="muted">
          Connecte-toi pour accéder à tes événements et gérer tes rendez-vous en toute simplicité.
        </p>

        <div class="mini card">
          <div class="mini-row">
            <span class="mini-icon">⚡</span>
            <div>
              <strong>Rapide</strong>
              <p class="muted">Connexion instantanée, navigation fluide.</p>
            </div>
          </div>
          <div class="mini-row">
            <span class="mini-icon">🛡️</span>
            <div>
              <strong>Sécurisé</strong>
              <p class="muted">JWT + mots de passe hashés.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right -->
      <div class="card auth-card">
        <h3>Se connecter</h3>
        <p class="muted">Entre tes informations pour continuer.</p>

        <form @submit.prevent="handleLogin" class="form">
          <label>Email</label>
          <input v-model.trim="email" type="email" placeholder="ex: rayan@mail.com" required />

          <label>Mot de passe</label>
          <input v-model="password" type="password" placeholder="••••••••" required />

          <div v-if="error" class="alert">
            {{ error }}
          </div>

          <button class="btn-primary full" :disabled="loading">
            <span v-if="loading">Connexion...</span>
            <span v-else>Connexion</span>
          </button>

          <p class="muted bottom">
            Pas encore de compte ?
            <RouterLink to="/register" class="link">Créer un compte</RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      this.loading = true;

      try {
        const res = await api.post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        // token
        localStorage.setItem("token", res.data.token);

        // email (si backend renvoie user)
        if (res.data.user?.email) {
          localStorage.setItem("userEmail", res.data.user.email);
        } else {
          // fallback: garder l'email saisi (utile pour le Header)
          localStorage.setItem("userEmail", this.email.trim().toLowerCase());
        }

        this.$router.push("/events");
      } catch (e) {
        this.error =
          e.response?.data?.message ||
          "Impossible de se connecter. Vérifie ton email et mot de passe.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.auth-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;
  align-items: start;
}

.auth-left {
  padding: 10px 6px;
}

.badge {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: var(--primary);
  font-weight: 800;
  margin-bottom: 12px;
}

.accent {
  color: var(--primary);
}

h2 {
  font-size: 34px;
  line-height: 1.15;
  margin-bottom: 10px;
}

.auth-card h3 {
  margin-bottom: 6px;
}

.form {
  margin-top: 14px;
}

label {
  display: block;
  font-weight: 700;
  margin-top: 10px;
}

.full {
  width: 100%;
  margin-top: 6px;
}

.alert {
  margin-top: 8px;
  padding: 12px;
  border-radius: var(--radius);
  background: #fef2f2;
  color: #991b1b;
  font-weight: 600;
  border: 1px solid #fecaca;
}

.bottom {
  margin-top: 14px;
  text-align: center;
}

.link {
  color: var(--primary);
  font-weight: 800;
}

.mini {
  margin-top: 18px;
}

.mini-row {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius);
  background: #f3f4f6;
  margin-top: 10px;
}

.mini-icon {
  font-size: 18px;
}

@media (max-width: 980px) {
  .auth-grid {
    grid-template-columns: 1fr;
  }
  h2 {
    font-size: 30px;
  }
}
</style>
