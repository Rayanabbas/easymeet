<template>
  <div>
    <h1>Liste des Events</h1>
    <ul>
      <li v-for="event in events" :key="event._id">
        {{ event.title }} - {{ event.date }} - Participants: {{ event.participants.join(', ') }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Events',
  data() {
    return {
      events: []
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/events')
      .then(res => {
        this.events = res.data;
      })
      .catch(err => console.log(err));
  }
}
</script>
