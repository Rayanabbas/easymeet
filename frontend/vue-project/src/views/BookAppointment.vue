<template>
  <div class="container">
    <div class="top">
      <div>
        <h2 class="title">📅 Prendre un rendez-vous</h2>
        <p class="muted">Choisis un créneau et confirme en une seconde.</p>
      </div>

      <router-link to="/my-appointments" class="btn-outline">
        Mes rendez-vous →
      </router-link>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Nouveau rendez-vous</h3>

        <form @submit.prevent="create" class="form">
          <label>Motif</label>
          <input v-model.trim="form.reason" required placeholder="Ex: Coaching / Consultation" />

          <div class="two">
            <div>
              <label>Date</label>
              <input v-model="form.date" type="date" required />
            </div>
            <div>
              <label>Heure</label>
              <input v-model="form.time" type="time" required />
            </div>
          </div>

          <div v-if="success" class="success">✅ Rendez-vous confirmé !</div>
          <div v-if="error" class="alert">{{ error }}</div>

          <button class="btn-primary full" :disabled="loading">
            <span v-if="loading">Création...</span>
            <span v-else>Confirmer</span>
          </button>
        </form>
      </div>

      <div class="card">
        <h3>Pourquoi EasyMeet ?</h3>
        <p class="muted">
          Une solution simple pour remplacer WhatsApp/Excel :
          prise de rendez-vous, consultation, annulation, le tout sécurisé.
        </p>

        <div class="tips">
          <div class="tip">✅ Auth JWT</div>
          <div class="tip">✅ MongoDB</div>
          <div class="tip">✅ API REST</div>
          <div class="tip">✅ RGPD (minimisation)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      form: { reason: "", date: "", time: "" },
      loading: false,
      error: "",
      success: false,
    };
  },
  mounted() {
    if (!localStorage.getItem("token")) this.$router.push("/login");
  },
  methods: {
    async create() {
      this.loading = true;
      this.error = "";
      this.success = false;

      try {
        await api.post("/appointments", this.form);
        this.success = true;
        this.form = { reason: "", date: "", time: "" };
      } catch (e) {
        this.error = e.response?.data?.message || "Erreur lors de la création.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.title { font-size: 28px; }

.grid {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 14px;
}

.form label {
  display: block;
  font-weight: 800;
  margin-top: 10px;
}

.form input {
  width: 100%;
  margin-top: 6px;
  padding: 12px;
  border-radius: var(--radius);
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.full { width: 100%; margin-top: 12px; }

.alert {
  margin-top: 10px;
  padding: 12px;
  border-radius: var(--radius);
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  font-weight: 800;
}

.success {
  margin-top: 10px;
  padding: 12px;
  border-radius: var(--radius);
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
  font-weight: 800;
}

.tips { margin-top: 12px; display: grid; gap: 8px; }
.tip {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
  font-weight: 800;
  color: #0f172a;
}

@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr; }
  .two { grid-template-columns: 1fr; }
}
</style>
