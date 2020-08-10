<template>
  <div id="app">
    <Navbar />
    <transition name="view">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700&family=Titan+One&display=swap");
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0c0e0d;
  margin: 0 auto;
}

:root {
  --light-text: #ccc9a8;
  --dark-text: #0c0e0d;
  --light-background: #ccc9a8;
  --dark-background: #cf6f33;
  --primary-color: #cf6f33;
  --component-color: #669358;
  --component-background: #c4791033;
  --accent-dark: #6e3b3b;
}
body {
  background-color: #cf6f33;
  margin: 0 auto;
  max-width: 100%;
  overflow-x: hidden;
}

#app {
  position: relative;
  min-height: 100vh;
}

.view-enter-active,
.view-leave-active {
  transition: all 0.3s ease-out;
}

.view-enter-to,
.view-leave {
  transition-delay: 0.5s;
}

.view-enter,
.view-leave-to {
  opacity: 0;
}
</style>
