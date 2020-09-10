<template>
  <div class="episode-guide">
    <div class="wrapper">
      <div class="player">
        <div class="player__top">
          <div class="player-cover">
            <img alt="OS logo" src="@/assets/objectively-subjective.jpg" />
          </div>
          <div class="player-controls">
            <a
              :href="currentTrack.href"
              target="_blank"
              class="player-controls__item"
            >
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <g fill="currentcolor" fill-rule="evenodd">
                  <path d="M0 48h48V0H0v48zm3.2-3.2h41.6V3.2H3.2v41.6z" />
                  <path
                    d="M9.6 9.6v28.8h28.8zM36.137 29.965L18.035 11.863 20.298 9.6 38.4 27.702zM36.137 20.914l-9.05-9.05 2.262-2.265 9.05 9.052z"
                  />
                </g>
              </svg>
            </a>
            <div class="player-controls__item" @click="prevTrack">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
              </svg>
            </div>
            <div class="player-controls__item" @click="nextTrack">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
              </svg>
            </div>
            <div class="player-controls__item -xl" @click="play">
              <svg
                class="icon-play"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                v-if="!isTimerPlaying"
              >
                <path
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM7 6l8 4-8 4V6z"
                />
              </svg>
              <svg
                class="icon-play"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                v-else
              >
                <path
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM7 6h2v8H7V6zm4 0h2v8h-2V6z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="progress" ref="progress">
          <div class="progress__top">
            <div class="album-info" v-if="currentTrack">
              <div class="album-info__name">
                Episode {{ currentTrack.number }}
              </div>
              <div class="album-info__track">
                {{ currentTrack.title }}
              </div>
            </div>
            <div class="progress__duration">{{ duration }}</div>
          </div>
          <div class="progress__bar" @click="clickProgress">
            <div class="progress__current" :style="{ width: barWidth }"></div>
          </div>
          <div class="progress__time">{{ currentTime }}</div>
        </div>
      </div>
    </div>
    <!-- Podcast List -->
    <div class="podcast-list-container">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
          d="M16 17a3 3 0 0 1-3 3h-2a3 3 0 0 1 0-6h2a3 3 0 0 1 1 .17V1l6-1v4l-4 .67V17zM0 3h12v2H0V3zm0 4h12v2H0V7zm0 4h12v2H0v-2zm0 4h6v2H0v-2z"
        />
      </svg> -->
      <h3>Episode Guide</h3>
      <ul class="podcast-list">
        <li
          v-for="(track, index) in tracks"
          :key="index"
          @click="
            chooseTrack(index);
            play();
            toggle(index);
          "
          :class="{ active: index == activeIndex }"
        >
          <div class="track-info">
            Episode {{ track.number }} | {{ track.title }}
            <span class="publish-date">
              {{ track.updated_at }}
            </span>
          </div>
          <div class="track-synop">
            {{ track.description }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTracks } from "@/services/track-service.js";
export default {
  data() {
    return {
      activeIndex: 0,
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    toggle(index) {
      this.activeIndex = index;
    },
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durhour = parseInt(this.audio.duration / 3600);
      let durmin = parseInt((this.audio.duration - durhour * 3600) / 60);
      let dursec = Math.floor(this.audio.duration % 60);
      let curhour = parseInt(this.audio.currentTime / 3600);
      let curmin = parseInt((this.audio.currentTime - curhour * 3600) / 60);
      let cursec = Math.floor(this.audio.currentTime % 60);
      if (durhour < 10) {
        durhour = "0" + durhour;
      }
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curhour < 10) {
        curhour = "0" + curhour;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durhour + ":" + durmin + ":" + dursec;
      this.currentTime = curhour + ":" + curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
        this.activeIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
        this.activeIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
        this.activeIndex++;
      } else {
        this.currentTrackIndex = 0;
        this.activeIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    chooseTrack(index) {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      this.currentTrack = this.tracks[index];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.enclosure_url;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    }
  },
  async created() {
    this.tracks = (await getTracks()).data.collection;
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.enclosure_url;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };
  }
};
</script>

<style scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: var(--dark-text);
  fill: var(--dark-text);
}
.wrapper {
  max-width: 500px;
  display: flex;
  justify-content: center;
  max-height: 550px;
  min-height: 500px;
  margin: 1rem -2rem 1rem 1rem;
  z-index: 2;
  padding: 1rem;
  padding-left: 3rem;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .wrapper {
    flex-wrap: wrap;
    flex-direction: column;
    margin: -3rem 1rem 0;
    padding: 0;
    justify-self: center;
  }
}
.player {
  background: var(--component-color);
  width: 380px;
  min-height: 480px;
  box-shadow: 0px 15px 35px -5px rgba(12, 12, 12, 0.75);
  border-radius: 15px;
  padding: 30px;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player {
    width: 95%;
    padding: 10px;
    margin-top: 75px;
    min-height: initial;
    padding-bottom: 30px;
    max-width: 400px;
  }
}

@media screen and (max-width: 320px), (max-height: 500px) {
  .wrapper {
    padding: 0;
    margin: 0 auto;
    margin-top: -3rem;
    width: 95%;
  }
  .player {
    width: 85%;
    padding: 20px;
    margin-bottom: 5px;

    margin-top: 75px;
    min-height: initial;
    padding-bottom: 30px;
    max-width: 400px;
  }
}
.player__top {
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 4;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player__top {
    flex-wrap: wrap;
  }
}
.player-cover {
  width: 300px;
  height: 300px;
  margin-left: -70px;
  flex-shrink: 0;
  position: relative;
  object-fit: cover;
  overflow: hidden;
  place-content: center;
  z-index: 2;
  border-radius: 15px;
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.5);
}

.player-cover img {
  width: 100%;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-cover {
    margin: -70px auto 25px auto;
    margin-bottom: 25px;
    width: 230px;
    height: 230px;
    object-fit: cover;
    overflow: hidden;
    place-content: center;
  }
  .player-cover img {
    height: 100%;
  }
}
.player-cover__item {
  display: none;
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
  left: 0;
  top: 0;
}
.player-cover__item:before {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.1);
  display: block;
  z-index: 1;
  position: absolute;
  top: 30px;
  transform: scale(0.9);
  filter: blur(1px);
  opacity: 0.9;
  border-radius: 15px;
}
.player-cover__item:after {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.3);
  display: block;
  z-index: 2;
  position: absolute;
  border-radius: 15px;
}
.player-cover__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.player-controls {
  flex: 0;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls {
    flex-direction: row;
    padding-left: 20px;
    width: 100%;
    flex: unset;
  }
}
.player-controls__item {
  display: inline-flex;
  font-size: 30px;
  padding: 5px;
  margin-bottom: 10px;
  color: inherit;
  cursor: pointer;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease-in-out;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item {
    font-size: 26px;
    padding: auto;
    margin-right: 10px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-bottom: 0;
  }
}
.player-controls__item::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--light-text);
  transform: scale(0.5);
  opacity: 0;
  box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
  transition: all 0.3s ease-in-out;
  transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
}
@media screen and (min-width: 500px) {
  .player-controls__item:hover,
  .player-controls__item.icon:hover {
    color: #3423e1;
  }
  .player-controls__item:hover::before {
    opacity: 1;
    transform: scale(1.3);
  }
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item:active {
    color: #3423e1;
  }
  .player-controls__item:active::before {
    opacity: 1;
    transform: scale(1.3);
  }
}
.player-controls__item .icon {
  position: relative;
  z-index: 2;
}

.player-controls__item .icon-play {
  position: relative;
  z-index: 2;
}

.player-controls__item svg.icon {
  width: 100%;
  height: 100%;
}

.player-controls__item svg.icon-play {
  width: 100px;
  height: 100px;
  overflow: visible;
}
.player-controls__item.-xl {
  margin-bottom: 0;
  filter: drop-shadow(0 11px 6px rgba(12, 12, 12, 0.6));
  color: #fff;
  width: 110px;
  height: 110px;
  display: flex;
  padding: 4px;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item.-xl {
    margin-left: 1rem;
    font-size: 75px;
    margin-right: auto;
  }
}
.player-controls__item.-xl:before {
  display: none;
}
.player-controls__item.-favorite.active {
  color: red;
}
.progress {
  width: 100%;
  margin-top: -15px;
}
.progress__top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 1rem;
}
.progress__duration {
  color: var(--dark-text);
  font-weight: 700;
  font-size: 20px;
  opacity: 0.9;
}
.progress__time {
  margin-top: 2px;
  color: var(--dark-text);
  font-weight: 700;
  font-size: 16px;
  opacity: 0.7;
}
.progress__bar {
  height: 6px;
  width: 100%;
  cursor: pointer;
  background-color: var(--dark-text);
  display: inline-block;
  border-radius: 10px;
}
.progress__current {
  height: inherit;
  width: 0%;
  background-color: var(--light-text);
  border-radius: 10px;
}
.album-info {
  color: var(--dark-text);
  flex: 1;
  padding-right: 60px;
  user-select: none;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .album-info {
    padding-right: 30px;
  }
}
.album-info__name {
  font-size: 21px;
  opacity: 0.7;
  margin-bottom: 12px;
  line-height: 1.3em;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .album-info__name {
    font-size: 18px;
    margin-bottom: 9px;
  }
}
.album-info__track {
  font-weight: 400;
  font-size: 20px;
  font-weight: bold;

  line-height: 1.3em;
  min-height: 52px;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .album-info__track {
    font-size: 18px;
    min-height: 50px;
  }
}

.scale-out-enter-active {
  transition: all 0.35s ease-in-out;
}
.scale-out-leave-active {
  transition: all 0.35s ease-in-out;
}
.scale-out-enter {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}
.scale-out-leave-to {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}
.scale-in-enter-active {
  transition: all 0.35s ease-in-out;
}
.scale-in-leave-active {
  transition: all 0.35s ease-in-out;
}
.scale-in-enter {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}
.scale-in-leave-to {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}

.episode-guide {
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px;
  margin: 0 auto;
  justify-content: center;
  padding-top: 200px;
  padding-bottom: 88px;
  min-height: 100%;
}

@media screen and (max-width: 320px) {
  .episode-guide {
    padding-bottom: 120px;
  }
}

.podcast-list-container {
  box-sizing: border-box;
  background-color: var(--primary-color);
  max-width: 55%;
  min-width: 320px;
  height: 600px;
  padding: 1rem;
  box-shadow: 0px 15px 35px -5px rgba(12, 12, 12, 0.75);
  border-radius: 2rem;
}

@media (max-width: 857px) {
  .podcast-list-container {
    margin: 0 auto;
    margin-bottom: 88px;
  }
  .podcast-list-container h3 {
    display: none;
  }
}

.podcast-list {
  list-style-type: none;
  overflow: scroll;
  padding: 0 1rem;
  margin: 0;
  padding-right: 0;
  height: 550px;
}

.podcast-list :first-child {
  margin-top: 0;
}

.podcast-list::-webkit-scrollbar {
  width: 1em;
  border-radius: 2rem;
}

.podcast-list::-webkit-scrollbar-corner {
  display: none;
}

.podcast-list::-webkit-scrollbar-thumb {
  background-color: var(--light-text);
  outline: none;
}

.podcast-list li {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  color: var(--light-text);
}

.track-synop {
  text-align: left;
  padding-top: 0.5rem;
  font-weight: 300;
}

.track-info {
  display: flex;
  font-size: 1.4rem;
  justify-content: space-between;
  text-align: left;
  border-bottom: 1px solid var(--light-text);
}

.track-info .publish-date {
  font-size: 1rem;
  align-self: flex-end;
}

.podcast-list li:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.podcast-list .active {
  background-color: rgba(0, 0, 0, 0.7);
}

.podcast-list-container h3 {
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  margin: 0;
  padding-left: 1.5rem;
  text-align: left;
}
</style>
