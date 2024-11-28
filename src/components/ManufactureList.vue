<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <h1>List of Manufacturers</h1>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;" v-if="manufacturers.length">
        <RouterLink
          style="text-decoration: none; color: black; text-align: center;"
          :to="'/manufacturer/' + manufacturer.id"
          v-for="manufacturer in manufacturers"
          :key="manufacturer.id"
        >
          <img
            :src="manufacturer.logo"
            alt="Logo of {{ manufacturer.name }}"
            style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 10px;"
          />
          <h2>{{ manufacturer.name }}</h2>
          <p>{{ manufacturer.description }}</p>
        </RouterLink>
      </div>
      <p v-else>No manufacturers available.</p>
      <RouterLink to="/manufacturercreate" class="button">Add a New Manufacturer</RouterLink>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        manufacturers: []
      };
    },
    created() {
      this.fetchManufacturers();
    },
    methods: {
      fetchManufacturers() {
        fetch('https://supercar24.netlify.app/.netlify/functions/manufacturersFindAll')
          .then(response => response.json())
          .then(data => {
            console.log('Fetched manufacturers:', data);
            this.manufacturers = data;
          })
          .catch(error => {
            console.error('Error fetching manufacturers:', error);
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
  