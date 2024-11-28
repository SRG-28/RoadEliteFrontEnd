<template>
  <div v-if="designer" class="designer-edit">
    <h1 class="title">Edit Designer: {{ designer.name }}</h1>
    <form @submit.prevent="updateDesigner" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="designer.name" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="designer.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="nationality">Nationality</label>
        <input id="nationality" type="text" v-model="designer.nationality" required />
      </div>
      <div class="form-group">
        <label for="born_year">Born Year</label>
        <input id="born_year" type="number" v-model="designer.born_year" required />
      </div>
      <div class="form-group">
        <label for="image">Image URL</label>
        <input id="image" type="text" v-model="designer.image" required />
      </div>
      <div class="form-actions">
        <button type="submit" class="save-button" :disabled="isUpdating">Save Changes</button>
        <br /><br />
        <br>
        <router-link to="/designerList" class="back-button">Back to List</router-link>
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
      designer: null,
      isUpdating: false,
      updateMessage: '',
    };
  },
  created() {
    this.fetchDesigner();
  },
  methods: {
    fetchDesigner() {
      const designerId = this.$route.params.id;
      fetch(`https://supercar24.netlify.app/.netlify/functions/designerFind/${designerId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            this.designer = data[0];
          } else {
            console.error('No designer found');
          }
        })
        .catch((error) => {
          console.error('Error fetching designer:', error);
        });
    },
    updateDesigner() {
      if (this.isUpdating) return;

      this.isUpdating = true;
      const designerId = this.$route.params.id;
      fetch(`https://supercar24.netlify.app/.netlify/functions/designerUpdate/${designerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.designer),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error updating the designer');
          }
          return response.text();
        })
        .then((data) => {
          if (data === 'OK') {
            this.updateMessage = 'Designer updated successfully';
            this.isUpdating = false;
            this.$router.push({ path: '/designerList', query: { message: this.updateMessage } });
          } else {
            throw new Error('Unexpected response from server');
          }
        })
        .catch((error) => {
          console.error('Error updating designer:', error);
          this.isUpdating = false;
          this.updateMessage = 'Failed to update designer';
        });
    },
  },
};
</script>

<style scoped>
.designer-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: darkblue;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
}

button,
.router-link {
  padding: 10px 20px;
  border-radius: 5px;
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

button:hover,
.router-link:hover {
  opacity: 0.8;
}

.form-actions {
  text-align: center;
}
</style>
