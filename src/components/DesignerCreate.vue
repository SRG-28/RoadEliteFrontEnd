<template>
  <div class="designer-create">
    <h1 class="title">Create New Designer</h1>
    <form @submit.prevent="createDesigner" class="form">
      <div class="form-group">
        <label>Designer Name</label>
        <input v-model="newDesigner.name" type="text" required />
      </div>
      <div class="form-group">
        <label>Nationality</label>
        <input v-model="newDesigner.nationality" type="text" required />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="newDesigner.description" required></textarea>
      </div>
      <div class="form-group">
        <label>Born Year</label>
        <input v-model="newDesigner.born_year" type="number" required />
      </div>
      <button type="submit" class="button save-button">Create Designer</button><br /><br />
      <router-link to="/designerList" class="button back-button">Cancel creation</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDesigner: {
        name: "",
        nationality: "",
        description: "",
        born_year: null,
        image: "", 
      },
    };
  },
  methods: {
    async createDesigner() {
      try {
      
        if (!this.newDesigner.image) {
          this.newDesigner.image = "designers/designerNew.jpg";
        }

   
        const { name, nationality, description, born_year } = this.newDesigner;
        if (!name || !nationality || !description || !born_year) {
          alert("Please fill in all required fields");
          return;
        }

     
        const response = await fetch(
          "https://supercar24.netlify.app/.netlify/functions/designerInsert",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.newDesigner),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create designer");
        }

        const result = await response.json();
        alert("Designer created successfully");
        this.$router.push("/designerList");
      } catch (error) {
        console.error("Error creating designer:", error);
        alert("There was an error creating the designer. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.designer-create {
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
