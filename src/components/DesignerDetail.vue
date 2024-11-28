<template>
    <div v-if="designer" class="designer-detail">
        <h1 class="title">{{ designer.name }}</h1>
        <img :src="'/' + designer.image" alt="Designer Image" class="designer-image" />
        <p>{{ designer.description }}</p>
        <p><strong>Nationality:</strong> {{ designer.nationality }}</p>
        <p><strong>Born Year:</strong> {{ designer.born_year }}</p>
        <router-link :to="`/designeredit/${designer.id}`" class="button edit-button">Edit Designer</router-link>
        <button @click="confirmDelete" class="button delete-button">Delete Designer</button>
        <router-link to="/designerList" class="button back-button">Back to List</router-link>
    </div>
    <div v-else>
        <p v-if="error">{{ error }}</p>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            designer: null,
            error: null
        };
    },
    created() {
        this.fetchDesigner();
    },
    methods: {
        fetchDesigner() {
            const designerId = this.$route.params.id;
            fetch(`https://supercar24.netlify.app/.netlify/functions/designerFind/${designerId}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        this.designer = data[0]; // Asignamos el primer elemento de la respuesta
                    } else {
                        this.error = "Designer not found.";
                    }
                })
                .catch(error => {
                    this.error = 'Error fetching designer: ' + error.message;
                    console.error('Error fetching designer:', error);
                });
        },
        confirmDelete() {
            if (confirm('Are you sure you want to delete this designer?')) {
                this.deleteDesigner();
            }
        },
        deleteDesigner() {
            const designerId = this.$route.params.id;
            fetch(`https://supercar24.netlify.app/.netlify/functions/designerDelete/${designerId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) throw new Error('Error deleting designer');
                alert('Designer deleted successfully');
                this.$router.push('/designerList'); // Redirige a la lista de diseñadores
            })
            .catch(error => {
                this.error = 'Error deleting designer: ' + error.message;
                console.error('Error deleting the designer:', error);
            });
        }
    }
};
</script>

<style scoped>
.designer-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.designer-image {
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
