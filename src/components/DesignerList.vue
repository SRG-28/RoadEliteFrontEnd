<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <h1>List of Designers</h1>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;" v-if="designers.length">
      <RouterLink
        style="text-decoration: none; color: black; text-align: center;"
        :to="'/designer/' + designer.id"
        v-for="designer in designers"
        :key="designer.id"
      >
        <img
          :src="designer.image"
          alt="Image of {{ designer.name }}"
          style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 10px;"
        />
        <h2>{{ designer.name }}</h2>
        <p>{{ designer.description }}</p>
      </RouterLink>
    </div>
    <p v-else>No designers available.</p>
    <RouterLink to="/designercreate" class="button">Add a New Designer</RouterLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      designers: []
    };
  },
  created() {
    this.fetchDesigners();
  },
  methods: {
    fetchDesigners() {
      fetch('https://supercar24.netlify.app/.netlify/functions/designersFindAll')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched designers:', data);
          this.designers = data;
        })
        .catch(error => {
          console.error('Error fetching designers:', error);
        });
    }
  }
};
</script>

<style scoped>
.button {
  padding: 10px 15px;
  margin-right: 10px;
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}

.button:hover {
  opacity: 0.8;
}

h1, h2, h3, p {
  color: white;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.supercar-card {
  text-align: center;
}
</style>
