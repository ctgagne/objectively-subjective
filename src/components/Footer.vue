<template>
  <div class="footer-container">
    <div class="podcast-buttons">
      <div class="spotify-button">
        <a
          href="https://open.spotify.com/show/2uu2Xzjdc3Ur2jnwnfhEgF?si=C4sw7sN-SDWSNtynKSqwbQ"
          ><button class="spotify">
            <svg
              class="spotify-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
              />
            </svg>
            <span>Follow on Spotify</span>
          </button></a
        >
      </div>
      <div class="apple">
        <a
          href="https://podcasts.apple.com/us/podcast/objectively-subjective/id1500505183?mt=2&app=podcast"
          style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2020-07-29T00:00:00Z&kind=podcast&bubble=podcasts) no-repeat;width:165px;height:40px;"
        ></a>
      </div>
      <div class="google">
        <a
          href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkcy5zaW1wbGVjYXN0LmNvbS95SVhnTExBRg%3D%3D"
          ><img src="@/assets/EN_Google_Podcasts_Badge_2x.png"
        /></a>
      </div>
    </div>
    <div class="copyright">
      <p>©2020 Objectively Subjective Podcast</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-container {
  position: absolute;
  bottom: 0;
  width: 100vw;
  min-height: 65px;
  padding: auto;
  margin-top: 1rem;
  color: var(--dark-text);
  box-shadow: 0px -0.5px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.google,
.apple {
  margin-left: 1rem;
}

.apple:hover,
.google:hover {
  opacity: 0.8;
}

button.spotify {
  cursor: pointer;
  width: max-content;
  background-color: whitesmoke;
  border: none;
  border-radius: 0.5rem;
  height: 40px;
  margin-bottom: 4px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: var(--dark-text);
  fill: var(--dark-text);
  display: inline-flex;
  vertical-align: middle;
}

button.spotify:hover {
  opacity: 0.8;
}

.spotify span {
  padding-top: 6px;
}

button svg {
  width: 25px;
  padding-right: 5px;
}

a {
  color: inherit;
  text-decoration: none;
  margin: 0;
  padding: 0;
}
.podcast-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
}
.copyright p {
  padding: 0 0 0.5rem;
  margin: 0;
}
.google img {
  height: 40px;
}

@media (max-width: 320px) {
  .google,
  .apple {
    margin-left: 0;
  }
}
</style>
