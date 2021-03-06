<template>
  <div class="home">
    <div class="main-section">
      <div class="home-text">
        <div class="title">The Objectively Subjective Podcast</div>
        <h1>
          A podcast where we <span class="highlight">objectively</span> give you
          our <span class="highlight">subjective </span><br /><u>Top 5 lists</u>
        </h1>
        <div class="buttons">
          <a
            href="https://podcasts.apple.com/us/podcast/objectively-subjective/id1500505183?mt=2&app=podcast"
            ><div class="button-1">Subscribe</div></a
          >
          <router-link to="/episodes"
            ><div class="button">Episode Guide</div></router-link
          >
        </div>
        <div class="listen">
          <p>Or listen to our most recent episode below!</p>
        </div>
      </div>
      <div class="image-container">
        <img alt="OS logo" src="@/assets/objectively-subjective.jpg" />
      </div>
    </div>
    <div class="player">
      <iframe
        height="150px"
        width="95%"
        frameborder="no"
        scrolling="no"
        seamless
        src="https://player.simplecast.com/f7581cc8-e208-4283-af57-607d212ed27c?dark=true"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { getTracks } from "@/services/track-service.js";
export default {
  name: "Home",
  data() {
    return {
      tracks: [],
      premierTrack: "",
      sourceTrack:
        "https://player.simplecast.com/" + this.premierTrack + "?dark=true"
    };
  },
  async created() {
    this.tracks = (await getTracks()).data.collection;
  }
};
</script>

<style scoped>
.home {
  padding-top: 150px;
  padding-bottom: 88px;
  min-height: 100%;
}

@media (max-width: 900px) {
  .home {
    padding-bottom: 100px;
  }
}
.main-section {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
}
.title {
  font-weight: bold;
  font-style: italic;
  font-size: 2rem;
  text-align: left;
  padding-left: 1rem;
}

h1 {
  font-family: "Titan One", Arial, Helvetica, sans-serif;
  font-size: 4.5rem;
  text-shadow: 0px 7px 4px rgba(0, 0, 0, 0.25);
  text-align: left;
  margin-top: 0;
  padding: 0 1rem;
}

.highlight {
  color: var(--light-text);
}

.buttons {
  display: flex;
}

.button,
.button-1 {
  cursor: pointer;
  width: max-content;
  padding: 0.5rem 1rem;
  font-weight: 900;
  font-size: 1.5rem;
  margin-top: -1rem;
  margin-left: 1rem;
  background-color: var(--dark-background);
  color: var(--dark-text);
  border: 1px solid var(--dark-text);
  border-radius: 1rem;
  box-shadow: -3px 7px 4px rgba(0, 0, 0, 0.25);
  transition: all 300ms ease;
}

.button-1 {
  background-color: var(--dark-text);
  color: var(--light-text);
  border: 1px solid var(--dark-text);
}

a {
  text-decoration: none;
}
.listen {
  text-align: left;
  padding-left: 1.3rem;
}

.button:hover,
.button-1:hover {
  transform: translateX(5px) translateY(-5px);
  box-shadow: -5px 14px 8px rgba(0, 0, 0, 0.7);
}

.home-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  padding-top: 2rem;
  padding-left: 1rem;
  z-index: 1;
}
.home img {
  width: 650px;
  height: 650px;
  margin-left: -3rem;
  padding-right: 0.5rem;
}

.player {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
}

.player p {
  padding-left: 1rem;
  text-align: left;
}

iframe {
  padding: 0 1rem;
}

@media (max-width: 1370px) {
  .home img {
    margin-left: -7rem;
  }
}

@media (max-width: 1243px) {
  .home img {
    margin-left: -10rem;
  }
}

@media (max-width: 1197px) {
  .home img {
    margin-left: -10rem;
  }
  .player {
    margin-top: auto;
  }
}

@media (max-width: 1061px) {
  .main-section {
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
  }
  .home img {
    margin: auto;
  }
  .home-text {
    margin: 0 auto;
    padding: 1rem;
  }
  .title {
    font-size: 1.5rem;
  }
  h1 {
    font-size: 3rem;
  }
  .player p {
    margin-top: -0.5rem;
  }
}

@media (max-width: 570px) {
  .home img {
    margin: auto;
    max-width: 350px;
    max-height: 350px;
  }
  .home {
    padding-bottom: 150px;
    min-height: 100%;
  }
  .buttons {
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  }
  .listen {
    padding-left: 1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .button,
  .button-1 {
    width: 70vw;
    margin: 0 auto;
  }

  .button {
    margin-top: 0.5rem;
  }
  h1 {
    font-size: 2.8rem;
  }
  .title {
    font-size: 1rem;
  }
  .player {
    padding: 1rem 0;
  }
  iframe {
    margin: 0 auto;
    padding: 0;
  }
}

@media (max-width: 320px) {
  .home img {
    margin: auto;
    max-width: 275px;
    max-height: 275px;
    padding: 0;
  }
  .home-text {
    padding: 0;
  }
  .home {
    padding-bottom: 200px;
  }
}
</style>
