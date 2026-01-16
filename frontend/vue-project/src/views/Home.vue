<template>
  <div class="page">
    <section class="hero">
      <div class="container heroGrid">
        <!-- LEFT -->
        <div>
          <span class="pill">✨ Plateforme de rendez-vous</span>

          <h1>
            Planification
            <br />
            facile à
            <span class="accent">l’avance</span>
          </h1>

          <p class="lead">
            EasyMeet est votre outil de prise de rendez-vous pour médecins, coiffeurs, vétérinaires,
            esthéticiennes, coachs… Fini WhatsApp/Excel : tout est clair, rapide et pro.
          </p>

          <div class="cta">
            <router-link v-if="!isLogged" to="/register" class="btnPrimary">
              Commencer
            </router-link>
            <router-link v-else to="/book" class="btnPrimary">
              Prendre RDV
            </router-link>

            <router-link to="/events" class="btnGhost">Voir une démo</router-link>
          </div>

          <div class="mini">
            <div class="miniItem"><strong>📅</strong> RDV en 30 sec</div>
            <div class="miniItem"><strong>📱</strong> 100% mobile</div>
            <div class="miniItem"><strong>✅</strong> Annulation simple</div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="visual">
          <div class="mock">
            <div class="mockTop">
              <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
              <span class="mockTitle">EasyMeet — Réservation</span>
            </div>

            <div class="mockBody">
              <div class="row">
                <div class="field">
                  <label>Service</label>
                  <div class="input">Consultation</div>
                </div>
                <div class="field">
                  <label>Durée</label>
                  <div class="input">30 min</div>
                </div>
              </div>

              <div class="row">
                <div class="field">
                  <label>Date</label>
                  <div class="input">Vendredi</div>
                </div>
                <div class="field">
                  <label>Heure</label>
                  <div class="input">18:00</div>
                </div>
              </div>

              <button class="mockBtn">Confirmer</button>

              <div class="ok">✅ RDV confirmé</div>
            </div>
          </div>

          <div class="blob"></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Tout ce qu’il faut pour gérer vos rendez-vous</h2>
        <p class="muted">
          Une solution digitale simple, pensée pour les petites structures.
        </p>

        <div class="grid4">
          <div class="card">
            <h3>📌 Prendre RDV</h3>
            <p>Choix date/heure + confirmation immédiate.</p>
          </div>
          <div class="card">
            <h3>🧾 Mes RDV</h3>
            <p>Consulter, suivre et annuler facilement.</p>
          </div>
          <div class="card">
            <h3>🔔 Organisation</h3>
            <p>Moins d’allers-retours, plus de clarté.</p>
          </div>
          <div class="card">
            <h3>🤝 Pro</h3>
            <p>Design premium, expérience fluide et moderne.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    isLogged() {
      return !!localStorage.getItem("token");
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 70vh;
}

.container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 24px;
}


/* HERO full width */
.hero {
  padding: 70px 0 40px;
  width: 100%;
  background:
    radial-gradient(circle at 25% 20%, rgba(37, 99, 235, 0.16), transparent 55%),
    radial-gradient(circle at 75% 35%, rgba(168, 85, 247, 0.14), transparent 55%);
}

.heroGrid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 22px;
  align-items: center;
}

.pill {
  display: inline-block;
  padding: 12px 16px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
  font-weight: 900;
  font-size: 14px;
  margin-bottom: 16px;
}


h1 {
  font-size: 72px;
  line-height: 1.02;
  margin: 0 0 16px;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.accent {
  color: #2563eb;
}

.lead {
  color: #475569;
  font-size: 18px;
  line-height: 1.8;
  max-width: 620px;
}

.cta {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btnPrimary {
  background: #2563eb;
  color: #fff;
  padding: 14px 22px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 16px;
  text-decoration: none;
  box-shadow: 0 14px 34px rgba(37, 99, 235, 0.28);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btnPrimary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 44px rgba(37, 99, 235, 0.34);
}

.btnGhost {
  background: #fff;
  color: #0f172a;
  padding: 14px 22px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 16px;
  text-decoration: none;
  border: 1px solid rgba(226, 232, 240, 0.95);
  transition: transform 0.15s ease;
}

.btnGhost:hover {
  transform: translateY(-2px);
}

.mini {
  margin-top: 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.miniItem {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-radius: 999px;
  padding: 12px 14px;
  font-weight: 900;
  font-size: 14px;
  color: #0f172a;
}


.visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.blob {
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 999px;
  background: rgba(168, 85, 247, 0.14);
  right: 0;
  top: 10px;
}

.mock {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 430px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 20px;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.12);
  overflow: hidden;
}

.mockTop {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}
.r {
  background: #ef4444;
}
.y {
  background: #f59e0b;
}
.g {
  background: #22c55e;
}

.mockTitle {
  margin-left: 8px;
  font-weight: 900;
  font-size: 13px;
  color: #0f172a;
}

.mockBody {
  padding: 16px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

.field label {
  display: block;
  font-size: 12px;
  font-weight: 900;
  color: #64748b;
  margin-bottom: 6px;
}

.input {
  padding: 12px;
  border-radius: 14px;
  background: #f1f5f9;
  border: 1px solid rgba(226, 232, 240, 0.9);
  font-weight: 800;
  color: #0f172a;
}

.mockBtn {
  width: 100%;
  border: none;
  background: #2563eb;
  color: #fff;
  padding: 12px 16px;
  border-radius: 999px;
  font-weight: 900;
  cursor: pointer;
  margin-top: 6px;
}

.ok {
  margin-top: 12px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #166534;
  font-weight: 900;
  font-size: 13px;
}

/* SECTION */
.section {
  padding: 44px 0 70px;
}

h2 {
  margin: 0 0 8px;
  font-size: 32px;
  color: #0f172a;
}

.muted {
  color: #64748b;
}

.grid4 {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.card {
  background: #fff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
}

.card h3 {
  margin: 0 0 6px;
  font-size: 16px;
}

.card p {
  margin: 0;
  color: #64748b;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .heroGrid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 48px;
  }

  .lead {
    font-size: 16px;
  }

  .grid4 {
    grid-template-columns: 1fr;
  }

  .row {
    grid-template-columns: 1fr;
  }
}

</style>
