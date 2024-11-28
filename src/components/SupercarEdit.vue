<template>
  <div v-if="supercar" class="supercar-edit">
    <h1 class="title">Edit Supercar: {{ supercar.name }}</h1>
    <form @submit.prevent="updateSupercar" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="supercar.name" required />
      </div>

      <div class="form-group">
        <label for="release_year">Release Year</label>
        <input type="number" id="release_year" v-model="supercar.release_year" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="supercar.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="top_speed">Top Speed</label>
        <input type="text" id="top_speed" v-model="supercar.top_speed" required />
      </div>

      <div class="form-group">
        <label for="horsepower">Horsepower</label>
        <input type="number" id="horsepower" v-model="supercar.horsepower" required />
      </div>

      <div class="form-group">
        <label for="acceleration">Acceleration</label>
        <input type="text" id="acceleration" v-model="supercar.acceleration" required />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" id="price" v-model="supercar.price" required />
      </div>

    
      <div class="form-group">
        <label for="manufacturer">Manufacturer</label>
        <input type="text" id="manufacturer" v-model="supercar.manufacturer.name" disabled />
      </div>

      <div class="form-group">
        <label for="designer">Designer</label>
        <input type="text" id="designer" v-model="supercar.designer.name" disabled />
      </div>

      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="text" id="image" v-model="supercar.image" required />
      </div>

      <div class="form-actions">
        <button type="submit" class="save-button">Update Supercar</button>
      <br><br><router-link to="/" class="back-button">Back to List</router-link>
      </div>
    </form>
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
      isUpdating: false,
      updateMessage: '',
    };
  },
  created() {
    this.fetchSupercar();
  },
  methods: {
    fetchSupercar() {
      const supercarId = this.$route.params.id;
      fetch(`https://supercar24.netlify.app/.netlify/functions/supercarFind/${supercarId}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            this.supercar = data[0];
          } else {
            console.error('No supercar found');
          }
        })
        .catch(error => {
          console.error('Error fetching supercar:', error);
        });
    },
    updateSupercar() {
      if (this.isUpdating) return; 
      this.isUpdating = true;
      const supercarId = this.$route.params.id;
      fetch(`https://supercar24.netlify.app/.netlify/functions/supercarUpdate/${supercarId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.supercar),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error updating the supercar');
          }
          return response.text();
        })
        .then(data => {
      
          if (data === 'OK') {
            this.updateMessage = 'Supercar updated successfully';
            this.isUpdating = false;
            this.$router.push({ path: '/', query: { message: this.updateMessage } });
          } else {
            throw new Error('Unexpected response from server');
          }
        })
        .catch(error => {
          console.error('Error updating supercar:', error);
          this.isUpdating = false;
          this.updateMessage = 'Failed to update supercar';
        });
    },
  },
};
</script>

<style scoped>
.supercar-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
}

button,
.router-link {
  padding: 10px 20px;
  background-color: darkblue;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px 0;
  text-align: center;
}

button:hover {
  background-color: #155a7d;
}

.router-link {
  background-color: gray;
  margin-top: 15px;
  display: inline-block;
}

button:hover {
  opacity: 0.8;
}

.form-actions {
  text-align: center;
}

.error-message {
  color: red;
  font-size: 18px;
  text-align: center;
}

.back-button {
  background-color: gray;
  color: white;
  border: none;
  padding: 8px 10px;
  margin-right: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
}
</style>
