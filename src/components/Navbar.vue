<template>
  <div class="nav">
    <div id="menu">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/episodes">Episodes</router-link>
        </li>
        <li>
          <a href="https://objectivelysubjective.bigcartel.com/">Shop</a>
        </li>
        <span class="menu-icons">
          <a href="https://www.facebook.com/objectivelysubjectivepodcast/">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                />
              </svg>
            </li>
          </a>
          <a href="https://twitter.com/objectivelysub">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                />
              </svg>
            </li>
          </a>
          <a href="http://www.instagram.com/objectivelysubjectivepodcast">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </li>
          </a>
        </span>
      </ul>
    </div>
    <div class="mobile-nav">
      <transition name="appear">
        <div
          class="circle"
          @click="$store.state.showSidebar = !$store.state.showSidebar"
          v-if="!$store.state.showSidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </div>
      </transition>
      <transition name="appear">
        <div
          class="hamburger"
          @click="$store.state.showSidebar = !$store.state.showSidebar"
          v-if="$store.state.showSidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </div>
      </transition>
    </div>
    <Sidebar />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    Sidebar
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  min-height: 150px;
  justify-content: center;
  width: 100vw;
  background-image: url("~@/assets/navbarsvg.svg");
  background-size: 100vw;
}

.nav ul {
  display: flex;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  list-style-type: none;
  max-height: 80%;
  margin: 0;
  padding: 0;
}

li {
  margin: 1rem;
  font-size: 1.2rem;
  align-self: center;
}

#menu {
  display: flex;
  width: 1440px;
  min-height: 150px;
  margin: 0;
  padding: 0;
  justify-items: center;
}

@media (max-width: 1500px) {
  #menu {
    width: 1350px;
  }
  .nav ul {
    max-height: 65%;
  }
}

@media (max-width: 1233px) {
  #menu {
    width: 1200px;
  }
  .nav ul {
    max-height: 45%;
  }
}

#menu a {
  cursor: pointer;
  font-weight: 900;
  color: var(--dark-text);
  text-decoration: none;
  margin: 0;
  transition: all 0.2s ease;
}
#menu a:hover {
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

#menu a.router-link-exact-active:hover {
  color: var(--primary-color);
}

#menu li svg {
  max-width: 40px;
  height: 40px;
}
.menu-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.menu-icons a:hover {
  fill: var(--primary-color);
}

.mobile-nav {
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  margin: -60px;
  width: 150px;
  height: 150px;
  background-color: var(--light-text);
  clip-path: circle();
  justify-content: center;
  z-index: 4;
}

.circle,
.hamburger {
  z-index: 6;
}

.mobile-nav svg {
  position: absolute;
  width: 40px;
  height: 40px;
}

@media (max-width: 1128px) {
  .nav {
    background-image: none;
    min-height: 100px;
  }
}

@media (max-width: 1128px) {
  #menu {
    display: none;
  }
  .mobile-nav {
    display: flex;
  }
}

.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.6s ease-out;
}

.appear-enter,
.appear-leave-to {
  opacity: 0;
}
</style>
