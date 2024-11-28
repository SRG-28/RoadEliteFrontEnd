<template>
  <div class="manufacturer-create">
    <h1 class="title">Create New Manufacturer</h1>
    <form @submit.prevent="createManufacturer" class="form">
      <div class="form-group">
        <label>Name</label>
        <input v-model="newManufacturer.name" type="text" required />
      </div>
      <div class="form-group">
        <label>Country</label>
        <input v-model="newManufacturer.country" type="text" required />
      </div>
      <div class="form-group">
        <label>Founded Year</label>
        <input v-model="newManufacturer.founded_year" type="number" required />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="newManufacturer.description" required></textarea>
      </div>
      <div class="form-group">
        <label>Logo URL</label>
        <input v-model="newManufacturer.logo" type="text" required />
      </div>
      <button type="submit" class="button save-button">Create Manufacturer</button>
      <br /><br />
      <router-link to="/manufactureList" class="button back-button">Cancel creation</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newManufacturer: {
        name: '',
        country: '',
        founded_year: null,
        description: '',
        logo: 'manufacturers/manufactureNew.jpg', 
      },
    };
  },
  methods: {
    createManufacturer() {
      fetch('https://supercar24.netlify.app/.netlify/functions/manufacturerInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newManufacturer),
      })
        .then(() => {
          alert('Manufacturer created successfully');
          this.$router.push('/manufactureList');
        })
        .catch((error) => {
          console.error('Error creating manufacturer:', error);
        });
    },
  },
};
</script>

<style scoped>
.manufacturer-create {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
}

.title {
  color: darkblue;
  font-size: 30px;
  margin-bottom: 20px;
}

.form {
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.save-button {
  background-color: darkblue;
  color: white;
  border: none;
  width: 35%;
}

.back-button {
  background-color: gray;
  color: white;
  border: none;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  opacity: 0.8;
}
</style>
