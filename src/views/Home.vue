<template>
  <div class="home">
    <div class="main-section">
      <div class="home-text">
        <div class="title">The Objectively Subjective Podcast</div>
        <h1>
          A podcast where we <span class="highlight">objectively</span> give you
          our <span class="highlight">subjective </span><br /><u>Top 5 lists</u>
        </h1>
      </div>
      <img alt="OS logo" src="../assets/objectively-subjective.jpg" />
    </div>
    <div class="player">
      <div class="listen">
        <p>Listen to our most recent episode!</p>
      </div>
      <iframe
        height="150px"
        width="96%"
        frameborder="no"
        scrolling="no"
        seamless
        src="https://player.simplecast.com/b048daef-0db1-4dc0-869a-867c70b62139?dark=true"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.main-section {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  margin-top: -2.5rem;
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
  font-size: 72px;
  text-shadow: 0px 7px 4px rgba(0, 0, 0, 0.25);
  text-align: left;
  margin-top: 0;
  padding: 0 1rem;
}

.highlight {
  color: var(--light-text);
}

.home-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;
}
.home img {
  width: 650px;
  height: 650px;
}

.player {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
  margin-top: -2.5rem;
}

.player p {
  padding-left: 1rem;
  text-align: left;
}

iframe {
  padding: 0 1rem;
}
</style>
