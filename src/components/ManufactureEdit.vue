<template>
  <div v-if="manufacturer" class="manufacturer-edit">
    <h1 class="title">Edit Manufacturer: {{ manufacturer.name }}</h1>
    <form @submit.prevent="updateManufacturer" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="manufacturer.name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="country">Country</label>
        <input v-model="manufacturer.country" id="country" type="text" required />
      </div>
      <div class="form-group">
        <label for="founded_year">Founded Year</label>
        <input v-model="manufacturer.founded_year" id="founded_year" type="number" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="manufacturer.description" id="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="logo">Logo URL</label>
        <input v-model="manufacturer.logo" id="logo" type="text" required />
      </div>
      <button type="submit" class="button save-button">Save Changes</button>
      <br /><br />
      <router-link to="/manufactureList" class="back-button">Back to List</router-link>
    </form>
  
  </div>
  
  <div v-else-if="error">
    <p class="error-message">{{ error }}</p>
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
      error: null,
    };
  },
  created() {
    this.fetchManufacturer();
  },
  methods: {
    fetchManufacturer() {
      const manufacturerId = this.$route.params.id;

     
      fetch(`https://supercar24.netlify.app/.netlify/functions/manufacturerFind/${manufacturerId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch manufacturer details.");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.manufacturer = { ...data[0], id: manufacturerId }; 
          } else if (typeof data === "object" && data) {
            this.manufacturer = { ...data, id: manufacturerId }; 
          } else {
            throw new Error("Invalid response format or empty data.");
          }
        })
        .catch((error) => {
          console.error("Error fetching manufacturer:", error);
          this.error = "Unable to load manufacturer details. Please try again later.";
        });
    },
    updateManufacturer() {
      const manufacturerId = this.manufacturer.id;

      const manufacturerData = { ...this.manufacturer };

      fetch(`https://supercar24.netlify.app/.netlify/functions/manufacturerUpdate/${manufacturerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(manufacturerData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update the manufacturer.");
          }
          return response.text(); 
        })
        .then((responseText) => {
          if (responseText === "OK") {
            alert("Manufacturer updated successfully.");
            this.$router.push("/manufactureList");
          } else {
            throw new Error("Unexpected response from the server.");
          }
        })
        .catch((error) => {
          console.error("Error updating manufacturer:", error);
          alert("There was a problem updating the manufacturer. Please try again.");
        });
    },
  },
};
</script>

<style scoped>
.manufacturer-edit {
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
    margin-right: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
}

.save-button {
  background-color: darkblue;
  color: white;
  border: none;
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

.button:hover {
  opacity: 0.8;
}

.error-message {
  color: red;
  font-size: 18px;
  text-align: center;
}
</style>
