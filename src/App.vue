<template>
  <div id="app" class="container">
    <div class="logo-container">
      <br /><img src="/logo.png" alt="Logo" class="logo" />
    </div>
    <div class="row menu">
      <router-link class="button button-primary" to="/">Supercars</router-link>
      <router-link class="button button-primary" to="/designerList">Designers</router-link>
      <router-link class="button button-primary" to="/manufacturelist">Manufacturers</router-link>
    </div>
    <router-view></router-view>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Location</h3>
          <p>Paseo de las Flores, San Francisco, Heredia, Costa Rica</p>
        </div>
        <div class="footer-section">
          <h3>Social networks</h3>
          <ul class="social-list">
            <li><a href="https://www.instagramRoadElite.com">www.instagramRoadElite.com</a></li><br/>
            <li><a href="https://www.facebookRoadElite.com">www.facebookRoadElite.com</a></li><br/>
            <li><a href="https://www.tikTokRoadElite.com">www.tikTokRoadElite.com</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <p>Phone: +(506) 2567-8940</p>
          <p>Email: contacto@roadElite.com</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.container {
  background-color: black; 
  color: white; 
  min-height: 100vh;
}

.logo-container {
  text-align: center; 
}

.logo {
  width: 400px; 
  height: auto; 
}

.menu {
  margin-top: 10px; 
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button {
  padding: 10px 20px;
  font-size: 18px;
  color: white; 
  background-color: #b22222; 
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.button:hover {
  background-color: #8b0000; 
}

.button-primary {
  background-color: #b22222; 
}

h1, h2, h3 {
  color: #8b0000; 
}

.footer {
  background-color: #333; 
  color: white;
  padding: 20px; 
  margin-top: 20px; 
  text-align: center; 
}

.footer-content {
  display: flex;
  justify-content: space-around; 
}

.footer-section {
  flex: 1; 
  padding: 10px; 
}

.footer-section h3 {
  color: #b22222; 
}

.footer-section a {
  color: white; 
  text-decoration: none; 
}

.footer-section a:hover {
  text-decoration: underline; 
}

.social-list {
  list-style-type: none; 
}

footer {
  color: gray; 
}
</style>

