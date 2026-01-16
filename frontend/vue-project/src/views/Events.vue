<template>
  <div class="container">
    <div class="top">
      <div>
        <h2 class="title">Événements</h2>
        <p class="muted">Crée, consulte et gère tes événements en un clic.</p>
      </div>

      <div class="actions">
        <button class="btn-outline" @click="refresh" :disabled="loading">
          ↻ Rafraîchir
        </button>
        <button class="btn-primary" @click="openModal">
          ＋ Créer un événement
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid">
      <div class="card skeleton" v-for="n in 6" :key="n"></div>
    </div>

    <!-- Error -->
    <div v-if="error" class="card alert">
      {{ error }}
      <button class="btn-outline" style="margin-top:12px" @click="refresh">
        Réessayer
      </button>
    </div>

    <!-- Empty -->
    <div v-if="!loading && !error && events.length === 0" class="card empty">
      <h3>🗓️ Aucun événement pour le moment</h3>
      <p class="muted">Clique sur “Créer un événement” pour ajouter le premier.</p>
      <button class="btn-primary" style="margin-top:12px" @click="openModal">
        Créer mon premier événement
      </button>
    </div>

    <!-- List -->
    <div v-if="!loading && !error && events.length > 0" class="grid">
      <div class="card event" v-for="ev in events" :key="ev._id">
        <div class="event-head">
          <div class="pill">📌 {{ ev.category || "Général" }}</div>

          <button
            class="icon-btn"
            @click="removeEvent(ev._id)"
            :disabled="deletingId === ev._id"
            title="Supprimer"
          >
            <span v-if="deletingId === ev._id">…</span>
            <span v-else>🗑️</span>
          </button>
        </div>

        <h3 class="event-title">{{ ev.title }}</h3>

        <p class="muted event-desc" v-if="ev.description">
          {{ ev.description }}
        </p>
        <p class="muted event-desc" v-else>
          Aucune description.
        </p>

        <div class="meta">
          <div class="meta-item">📅 <strong>{{ formatDate(ev.date) }}</strong></div>
          <div class="meta-item">⏰ <strong>{{ ev.time || "—" }}</strong></div>
          <div class="meta-item">👥 <strong>{{ ev.capacity || "∞" }}</strong> places</div>
        </div>

        <div class="footer-row">
          <span class="muted">Créé via EasyMeet</span>
          <span class="badge2">REST API</span>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="overlay" @click.self="closeModal">
      <div class="card modal">
        <div class="modal-head">
          <h3>Créer un événement</h3>
          <button class="icon-btn" @click="closeModal">✕</button>
        </div>

        <form @submit.prevent="createEvent">
          <label>Titre</label>
          <input v-model.trim="form.title" required placeholder="ex: Atelier Vue.js" />

          <label>Description (optionnel)</label>
          <input v-model.trim="form.description" placeholder="ex: session pratique + Q&A" />

          <div class="two">
            <div>
              <label>Date</label>
              <input v-model="form.date" type="date" required />
            </div>
            <div>
              <label>Heure</label>
              <input v-model="form.time" type="time" />
            </div>
          </div>

          <div class="two">
            <div>
              <label>Catégorie</label>
              <input v-model.trim="form.category" placeholder="ex: Formation" />
            </div>
            <div>
              <label>Capacité</label>
              <input v-model.number="form.capacity" type="number" min="1" placeholder="ex: 20" />
            </div>
          </div>

          <div v-if="modalError" class="alert" style="margin-top:12px;">
            {{ modalError }}
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-outline" @click="closeModal">
              Annuler
            </button>
            <button class="btn-primary" :disabled="saving">
              <span v-if="saving">Création...</span>
              <span v-else>Créer</span>
            </button>
          </div>
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
      events: [],
      loading: false,
      error: "",
      showModal: false,
      saving: false,
      modalError: "",
      deletingId: null,
      form: {
        title: "",
        description: "",
        date: "",
        time: "",
        category: "",
        capacity: "",
      },
    };
  },

  async mounted() {
    // protection simple : si pas token -> login
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }
    await this.refresh();
  },

  methods: {
    formatDate(d) {
      if (!d) return "—";
      try {
        const date = new Date(d);
        return date.toLocaleDateString("fr-FR", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      } catch {
        return d;
      }
    },

    openModal() {
      this.modalError = "";
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalError = "";
    },

    async refresh() {
      this.loading = true;
      this.error = "";
      try {
        const res = await api.get("/events");
        this.events = res.data;
      } catch (e) {
        this.error =
          e.response?.data?.message ||
          "Impossible de charger les événements. Vérifie le backend.";
      } finally {
        this.loading = false;
      }
    },

    async createEvent() {
      this.saving = true;
      this.modalError = "";
      try {
        const payload = {
          title: this.form.title,
          description: this.form.description,
          date: this.form.date,
          time: this.form.time,
          category: this.form.category,
          capacity: this.form.capacity,
        };

        const res = await api.post("/events", payload);
        this.events = [res.data, ...this.events];
        this.closeModal();

        this.form = {
          title: "",
          description: "",
          date: "",
          time: "",
          category: "",
          capacity: "",
        };
      } catch (e) {
        this.modalError =
          e.response?.data?.message ||
          "Impossible de créer l'événement. Vérifie les champs.";
      } finally {
        this.saving = false;
      }
    },

    async removeEvent(id) {
      if (!confirm("Supprimer cet événement ?")) return;

      this.deletingId = id;
      try {
        await api.delete(`/events/${id}`);
        this.events = this.events.filter((e) => e._id !== id);
      } catch (e) {
        alert(e.response?.data?.message || "Suppression impossible.");
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
  gap: 14px;
  margin-bottom: 18px;
}

.title {
  font-size: 30px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.event {
  padding: 18px;
}

.event-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.pill {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
  font-weight: 900;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
}

.icon-btn {
  background: transparent;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 12px;
  padding: 10px 12px;
  box-shadow: none;
}

.icon-btn:hover {
  border-color: rgba(37, 99, 235, 0.35);
}

.event-title {
  font-size: 18px;
  margin-bottom: 8px;
}

.event-desc {
  line-height: 1.5;
}

.meta {
  margin-top: 14px;
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(248, 250, 252, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.meta-item {
  color: #334155;
}

.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}

.badge2 {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
  font-weight: 800;
  color: #334155;
  font-size: 12px;
}

.empty {
  text-align: center;
  padding: 30px;
}

.alert {
  background: #fff;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 14px;
  border-radius: 14px;
}

/* SKELETON */
.skeleton {
  height: 220px;
  background: linear-gradient(
    90deg,
    rgba(15, 23, 42, 0.05),
    rgba(15, 23, 42, 0.1),
    rgba(15, 23, 42, 0.05)
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* MODAL */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  z-index: 80;
}

.modal {
  width: min(620px, 96vw);
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

/* Responsive */
@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr; }
  .two { grid-template-columns: 1fr; }
  .title { font-size: 26px; }
}
</style>
