<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <h1>List of Supercars</h1>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;" v-if="supercars.length">
        <RouterLink
          style="text-decoration: none; color: black; text-align: center;"
          :to="'/supercar/' + supercar.id" 
          v-for="supercar in supercars"
          :key="supercar.id"
        >
          <img
            :src="supercar.image"
            alt="Image of {{ supercar.name }}"
            style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 10px;"
          />
          <h2>{{ supercar.name }}</h2>
          <p>{{ supercar.description }}</p>
        </RouterLink>
      </div>
      <p v-else>No supercars available.</p>
      <RouterLink to="/supercarcreate" class="button">Add a New Supercar</RouterLink>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        supercars: []
      };
    },
    created() {
      this.fetchSupercars();
    },
    methods: {
      fetchSupercars() {
        fetch('https://supercar24.netlify.app/.netlify/functions/supercarsFindAll')
          .then(response => response.json())
          .then(data => {
            console.log('Fetched supercars:', data);
            this.supercars = data;
          })
          .catch(error => {
            console.error('Error fetching supercars:', error);
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
  