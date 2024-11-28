<template>
    <div v-if="supercar" class="supercar-detail">
      <h1 class="title">{{ supercar.name }}</h1>
      <img :src="'/' + supercar.image" alt="Supercar Image" class="supercar-image" />
      <p>{{ supercar.description }}</p>
      <p><strong>Release Year:</strong> {{ supercar.release_year }}</p>
      <p><strong>Top Speed:</strong> {{ supercar.top_speed }}</p>
      <p><strong>Horsepower:</strong> {{ supercar.horsepower }}</p>
      <p><strong>Acceleration:</strong> {{ supercar.acceleration }}</p>
      <p><strong>Price:</strong> {{ supercar.price }}</p>
      <p><strong>Manufacturer:</strong> {{ supercar.manufacturer.name }}</p>
      <p><strong>Designer:</strong> {{ supercar.designer.name }}</p>
      <router-link :to="`/supercaredit/${supercar.id}`" class="button edit-button">Edit Supercar</router-link>
      <button @click="deleteSupercar" class="button delete-button">Delete Supercar</button>
      <router-link to="/" class="button back-button">Back to List</router-link>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            supercar: null,
            error: null
        };
    },
    created() {
        this.fetchSupercar();
    },
    methods: {
        fetchSupercar() {
            const supercarId = this.$route.params.id; 
            fetch(`https://supercar24.netlify.app/.netlify/functions/supercarFind/${supercarId}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        const supercar = data[0];
                        supercar.id = parseInt(supercar.id, 10);  
                        supercar.manufacturer.id = parseInt(supercar.manufacturer.id, 10);  
                        supercar.designer.id = parseInt(supercar.designer.id, 10);  
                        this.supercar = supercar;
                    }
                })
                .catch(error => {
                    this.error = 'Error fetching supercar: ' + error.message;
                    console.error('Error fetching supercar:', error);
                });
        },
        deleteSupercar() {
            const supercarId = this.$route.params.id;
            if (confirm('Are you sure you want to delete this supercar?')) {
                fetch(`https://supercar24.netlify.app/.netlify/functions/supercarDelete/${supercarId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error deleting supercar');
                    }
                    alert('Supercar deleted successfully');
                    this.$router.push('/'); // Redirigir al usuario a la lista
                })
                .catch(error => {
                    console.error('Error deleting the supercar:', error);
                });
            }
        }
    }
};
</script>

<style scoped>
.supercar-detail {
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    text-align: center; 
}

.supercar-image {
    max-width: 500px;
    margin-bottom: 20px;
}

.title {
    color: darkred; 
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
