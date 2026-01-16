<template>
  <div class="container">
    <div class="top">
      <div>
        <h2 class="title">📌 Mes rendez-vous</h2>
        <p class="muted">Consulte et annule tes rendez-vous.</p>
      </div>

      <div class="actions">
        <button class="btn-outline" @click="fetchAll" :disabled="loading">↻ Rafraîchir</button>
        <router-link class="btn-primary" to="/book">＋ Prendre RDV</router-link>
      </div>
    </div>

    <div v-if="loading" class="muted">Chargement...</div>
    <div v-if="error" class="alert">{{ error }}</div>

    <div v-if="!loading && !error && items.length === 0" class="card">
      <h3>Aucun rendez-vous</h3>
      <p class="muted">Prends ton premier rendez-vous en quelques secondes.</p>
      <router-link class="btn-primary" to="/book">Prendre RDV</router-link>
    </div>

    <div v-if="items.length" class="list">
      <div class="card item" v-for="a in items" :key="a._id">
        <div>
          <div class="pill" :class="{ canceled: a.status === 'canceled' }">
            {{ a.status === "canceled" ? "Annulé" : "Confirmé" }}
          </div>

          <h3 class="reason">{{ a.reason }}</h3>
          <p class="muted">{{ formatDate(a.date) }} • {{ a.time }}</p>
        </div>

        <button
          class="btn-danger"
          :disabled="a.status === 'canceled' || deletingId === a._id"
          @click="cancel(a._id)"
        >
          <span v-if="deletingId === a._id">...</span>
          <span v-else>Annuler</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      items: [],
      loading: false,
      error: "",
      deletingId: null,
    };
  },
  mounted() {
    if (!localStorage.getItem("token")) this.$router.push("/login");
    this.fetchAll();
  },
  methods: {
    formatDate(d) {
      try {
        return new Date(d).toLocaleDateString("fr-FR");
      } catch {
        return d;
      }
    },

    async fetchAll() {
      this.loading = true;
      this.error = "";
      try {
        const res = await api.get("/appointments");
        this.items = Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        this.error = e.response?.data?.message || "Erreur chargement rendez-vous.";
        this.items = [];
      } finally {
        this.loading = false;
      }
    },

    async cancel(id) {
      if (!confirm("Annuler ce rendez-vous ?")) return;
      this.deletingId = id;

      try {
        await api.delete(`/appointments/${id}`);
        await this.fetchAll();
      } catch (e) {
        alert(e.response?.data?.message || "Erreur annulation.");
      } finally {
        this.deletingId = null;
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

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.title { font-size: 28px; }

.list { display: grid; gap: 12px; }

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.reason { margin: 8px 0 4px; }

.pill {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12px;
  background: rgba(34, 197, 94, 0.12);
  color: #166534;
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.pill.canceled {
  background: rgba(239, 68, 68, 0.12);
  color: #991b1b;
  border-color: rgba(239, 68, 68, 0.25);
}

.alert {
  margin-top: 10px;
  padding: 12px;
  border-radius: var(--radius);
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  font-weight: 800;
}

.btn-danger {
  background: #ef4444;
  color: white;
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 900;
  border: none;
  cursor: pointer;
}
.btn-danger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
