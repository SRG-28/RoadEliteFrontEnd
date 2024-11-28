<template>
  <div v-if="manufacturer" class="manufacturer-detail">
    <h1 class="title">{{ manufacturer.name }}</h1>
    <img :src="'/' + manufacturer.logo" alt="Manufacturer Image" class="manufacturer-image" />
    <p><strong>Country:</strong> {{ manufacturer.country }}</p>
    <p><strong>Founded Year:</strong> {{ manufacturer.founded_year }}</p>
    <p><strong>Description:</strong> {{ manufacturer.description }}</p>
    <router-link :to="`/manufactureredit/${manufacturer.id}`" class="button edit-button">Edit</router-link>
    <button @click="deleteManufacturer" class="button delete-button">Delete</button>
    
    <br/><br/>
    <router-link to="/manufactureList" class="button back-button">Back to List</router-link>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      manufacturer: null,
    };
  },
  created() {
    this.fetchManufacturer();
  },
  methods: {
    fetchManufacturer() {
      const manufacturerId = this.$route.params.id;
      fetch(`https://supercar24.netlify.app/.netlify/functions/manufacturerFind/${manufacturerId}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            this.manufacturer = data[0]; 
          } else {
            console.error('Invalid response structure or no data:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching manufacturer:', error);
        });
    },
    deleteManufacturer() {
      const manufacturerId = this.$route.params.id;
      if (confirm('Are you sure you want to delete this manufacturer?')) {
        fetch(`https://supercar24.netlify.app/.netlify/functions/manufacturerDelete/${manufacturerId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error deleting the manufacturer');
            }
            alert('Manufacturer deleted successfully');
            this.$router.push('/manufactureList');
          })
          .catch(error => {
            console.error('Error deleting manufacturer:', error);
          });
      }
    }
  }
};
</script>

<style scoped>
.manufacturer-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.manufacturer-image {
    max-width: 500px;
    margin-bottom: 20px;
}

.title {
    color: darkblue;
    font-size: 24px;
    margin-top: 30px;
}

h1, p {
    font-size: 20px;
}

.button {
    padding: 10px 15px;
    margin-right: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
}

.edit-button {
    background-color: gray;
    color: white;
}

.delete-button {
    background-color: darkred;
    color: white;
}

.back-button {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
}

.button:hover {
    opacity: 0.8;
}
</style>
