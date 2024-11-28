<template>
  <div class="supercar-create">
    <h1 class="title">Create New Supercar</h1>
    <form @submit.prevent="createSupercar" class="form">
      <div class="form-group">
        <label>Supercar Name</label>
        <input v-model="newSupercar.name" type="text" required />
      </div>
      <div class="form-group">
        <label>Release Year</label>
        <input v-model="newSupercar.release_year" type="number" required />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="newSupercar.description" required></textarea>
      </div>
      <div class="form-group">
        <label>Top Speed</label>
        <input v-model="newSupercar.top_speed" type="text" required />
      </div>
      <div class="form-group">
        <label>Horsepower</label>
        <input v-model="newSupercar.horsepower" type="number" required />
      </div>
      <div class="form-group">
        <label>Acceleration (0-100 km/h)</label>
        <input v-model="newSupercar.acceleration" type="text" required />
      </div>
      <div class="form-group">
        <label>Price</label>
        <input v-model="newSupercar.price" type="text" required />
      </div>
      <div class="form-group">
        <label>Manufacturer</label>
        <select v-model="selectedManufacturerId" required>
          <option disabled value="">Select a manufacturer</option>
          <option v-for="manufacturer in manufacturers" :value="manufacturer.id" :key="manufacturer.id">
            {{ manufacturer.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Designer</label>
        <select v-model="selectedDesignerId" required>
          <option disabled value="">Select a designer</option>
          <option v-for="designer in designers" :value="designer.id" :key="designer.id">
            {{ designer.name }}
          </option>
        </select>
      </div>
      <button type="submit" class="button save-button">Create Supercar</button>
      <br /><br />
      <button @click="cancelCreation" class="button back-button">Cancel Creation</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newSupercar: {
        name: '',
        release_year: null,
        description: '',
        top_speed: '',
        horsepower: null,
        acceleration: '',
        price: '',
        image: 'supercars/newCar.jpg',
        manufacturer: {},
        designer: {}
      },
      manufacturers: [],
      designers: [],
      selectedManufacturerId: '',
      selectedDesignerId: ''
    };
  },
  created() {
    this.fetchManufacturers();
    this.fetchDesigners();
  },
  methods: {
    fetchManufacturers() {
      fetch('https://supercar24.netlify.app/.netlify/functions/manufacturersFindAll')
        .then(response => response.json())
        .then(data => {
          this.manufacturers = data;
        })
        .catch(error => {
          console.error('Error fetching manufacturers:', error);
        });
    },
    fetchDesigners() {
      fetch('https://supercar24.netlify.app/.netlify/functions/designersFindAll')
        .then(response => response.json())
        .then(data => {
          this.designers = data;
        })
        .catch(error => {
          console.error('Error fetching designers:', error);
        });
    },
    createSupercar() {
      const { id, ...supercarWithoutId } = this.newSupercar;

      const selectedManufacturer = this.manufacturers.find(
        manufacturer => manufacturer.id === this.selectedManufacturerId
      );
      const selectedDesigner = this.designers.find(
        designer => designer.id === this.selectedDesignerId
      );

      if (selectedManufacturer) {
        supercarWithoutId.manufacturer = {
          id: selectedManufacturer.id,
          name: selectedManufacturer.name
        };
      }
      if (selectedDesigner) {
        supercarWithoutId.designer = {
          id: selectedDesigner.id,
          name: selectedDesigner.name
        };
      }

      fetch('https://supercar24.netlify.app/.netlify/functions/supercarInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(supercarWithoutId)
      })
        .then(() => {
          alert('Supercar created successfully');
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error creating supercar:', error);
        });
    },
    cancelCreation() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
  .supercar-create {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }
  
  .title {
    color: darkred;
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
  textarea,
  select {
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
    background-color: darkred;
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
