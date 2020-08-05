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
              :href="currentTrack.url"
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
              <div class="album-info__track">{{ currentTrack.name }}</div>
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
            Episode {{ track.number }} | {{ track.name }}
            <span class="publish-date">
              {{ track.date }}
            </span>
          </div>
          <div class="track-synop">
            {{ track.synop }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
      tracks: [
        {
          name: "Top 5 Marvel Heroes",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/5d6e6eda-eaee-4a3e-bc55-eb56ba98b0ba/23-top-5-marvel-heroes_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-marvel-heroes",
          favorited: false,
          number: "23",
          synop:
            "This week we dive in to our favorite heroes from the Marvel Universe. EXCELSIOR!",
          date: "Aug 5, 2020"
        },
        {
          name: "Top 5 Fast Food Chains",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/3ecc67bc-fafa-465b-b39a-f2be91ef8ac7/22-top-fast-food-chains_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-fast-food-chains",
          favorited: false,
          number: "22",
          synop:
            "Listen to us discuss our favorite greasy, tummy troubling, fast food chains!",
          date: "Jul 29, 2020"
        },
        {
          name: "Top 5 DC Heroes (ft. Dustin Elkins)",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/b048daef-0db1-4dc0-869a-867c70b62139/21-top-5-dc-heroes-ft-dustin-elkins_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-dc-heroes-ft-dustin-elkins",
          favorited: false,
          number: "21",
          synop:
            "Listen this week as we are joined by Dustin Elkins, aka sonicdoom_ from Twitch, to talk about our favorite dogooders or sometimes dogooders from the DC Universe!",
          date: "Jul 22, 2020"
        },
        {
          name: "Top 5 Godzillas (ft. Milo Jansen)",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/9bb2bb33-501f-49d6-b5f3-d2dd758c2408/20-top-5-godzillas-featuring-milo-jansen_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-godzillas-ft-milo-jansen",
          favorited: false,
          number: "20",
          synop:
            "Listen this week as Paul asks his son, Milo, all about his favorite versions of Godzilla!",
          date: "Jul 15, 2020"
        },
        {
          name: "Top 5 Marvel Villains",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/b048daef-0db1-4dc0-869a-867c70b62139/21-top-5-dc-heroes-ft-dustin-elkins_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-marvel-villains",
          favorited: false,
          number: "19",
          synop:
            "Listen this week as we FINALLY complete our Villains Month from April with our top baddies from the Marvel Universe!",
          date: "Jul 8, 2020"
        },
        {
          name: "Top 5 Childhood Toys",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/8c880c82-7890-4a8b-a7ea-eb3d8afe38ad/18-top-5-childhood-toys_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-childhood-toys",
          favorited: false,
          number: "18",
          synop:
            "Listen to our almost 2 hour long toy commercial of all our favorite childhood playthings!",
          date: "Jul 1, 2020"
        },
        {
          name: "Top 5 Sodas",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/a117dd5c-a7ee-4cb8-a8e8-b134bc27a259/17-top-5-sodas_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-sodas",
          favorited: false,
          number: "17",
          synop: "Listen to us talk about our favorite bubbly beverages!",
          date: "Jun 24, 2020"
        },
        {
          name: "Top 5 Candy Bars",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/61181ae6-db37-4f2a-9772-1b37b4e5ed6a/16-top-5-candy-bars_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-candy-bars",
          favorited: false,
          number: "16",
          synop: "Listen to us talk about our favorite chocolatey confections!",
          date: "Jun 17, 2020"
        },
        {
          name: "Top 5 Cereals",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/5040f55f-f64f-4710-baba-8933b133120d/15-top-5-cereals_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-cereals",
          favorited: false,
          number: "15",
          synop:
            "Listen as we go back to Saturday mornings, watching cartoons, and we tell you what our favorite cereals of all time are!",
          date: "Jun 10, 2020"
        },
        {
          name: "Top 10 Cartoon Theme Songs (Part 2)",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/81493a73-1212-42d0-92ac-5a399f573800/14-top-10-animated-theme-songs-part-2_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-10-cartoon-theme-songs-part-2",
          favorited: false,
          number: "14",
          synop:
            "The finale of our two part list about of favorite cartoon theme songs! Come listen to see what will be our number 1!",
          date: "Jun 3, 2020"
        },
        {
          name: "Top 10 Cartoon Theme Songs (Part 1)",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/d635926d-86c2-4a60-8532-5ed9f86b7d3c/13-top-10-cartoon-theme-songs-part-1_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-10-cartoon-theme-songs-part-1",
          favorited: false,
          number: "13",
          synop:
            "A list so big we couldn't do it all in one episode! Listen to us dive into our Top 10 cartoon themes starting with our 10 through 6!",
          date: "May 27, 2020"
        },
        {
          name: "Top 5 TV Theme Songs (Live Action)",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/4999ea1f-6420-406c-91a9-dcd4896ba214/12-top-5-tv-theme-songs-live-action_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-tv-theme-songs-live-action",
          favorited: false,
          number: "12",
          synop:
            "Listen as we tackle our first music related list! Will your favorite theme make our list?!",
          date: "May 20, 2020"
        },
        {
          name: "Top 5 Fictional Weapons",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/89bd62a1-a220-4f4b-bf67-372c7ceb03e7/11-top-5-fictional-weapons_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-fictional-weapons",
          favorited: false,
          number: "11",
          synop:
            "Listen to us talk about our top 5 weapons from all of fictional history, and also go on long tired ramblings.",
          date: "May 13, 2020"
        },
        {
          name: "Top 5 Disney Sidekicks (ft. Stephanie Jansen)",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/54be1ea8-29d4-4bf0-b4cf-4fc247943312/10-top-5-disney-sidekicks_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-disney-sidekicks-ft-stephanie-jansen",
          favorited: false,
          number: "10",
          synop:
            "In a very special episode, Paul brought his wife, Stephanie, in to do a special episode together for their anniversary! So in Blake's absence, here are Paul and Stephanie's favorite Disney Sidekicks!",
          date: "Apr 29, 2020"
        },
        {
          name: "Top 5 DC Villains",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/442caaea-f78e-461f-b0ce-37c678596ea0/9-top-5-dc-villains_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-dc-villains",
          favorited: false,
          number: "9",
          synop:
            "This is our first episode not done in the same room. Come enjoy our first quarantined episode about our favorite villains from the DC Universe!",
          date: "Apr 22, 2020"
        },
        {
          name: "Top 5 Disney Villains (Fan Pick)",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/c5898305-8b3a-4c8e-9777-c5eb1007c5e4/8-top-5-disney-villains_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-disney-villains",
          favorited: false,
          number: "8",
          synop:
            "It's time for our second ever Fan Pick episode! Disney Villains won this month's themed poll. See which villain from the magical world of Disney is our favorite!",
          date: "Apr 15, 2020"
        },
        {
          name: "Top 5 Video Game Villains",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/43f6197f-9905-4c42-8698-4aa90a23ed3c/7-top-5-video-game-villains_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-video-game-villains",
          favorited: false,
          number: "7",
          synop:
            "This is our first episode of our Villains series we are running in April 2020! Listen to find out which video game baddie is our favorite!",
          date: "Apr 8, 2020"
        },
        {
          name: "Top 5 Wrestling Finishers",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/d26099b7-2379-4e35-af17-1bd336592d2e/6-top-5-wrestling-finishers_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-wrestling-finishers",
          favorited: false,
          number: "6",
          synop:
            "With the empty arena Wrestlemania approaching, we have decided we would should take a dive into the Wrestling category in this week's list!",
          date: "Apr 1, 2020"
        },
        {
          name: "Top 5 Nintendo Characters (Fan Pick)",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/4a650f08-ff67-4faf-9814-bd51eb8f7531/5-top-5-nintendo-characters-fan-pick_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-nintendo-characters-fan-pick",
          favorited: false,
          number: "5",
          synop:
            "This is our first ever Fan Pick episode! This week we will be doing the poll winner Top 5 Nintendo Characters!",
          date: "Mar 25, 2020"
        },
        {
          name: "Top 5 Voice Actors",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/8765503b-c963-4924-905a-98fdc5d0cfa1/4-top-5-voice-actors_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-voice-actors",
          favorited: false,
          number: "4",
          synop:
            "Voice Actors are a massive part of the film & TV industry, and an often overlooked part. We wanted to give them well deserved attention with this week's list!",
          date: "Mar 18, 2020"
        },
        {
          name: "Top 5 Pixar Movies",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/09fd760b-df2d-4c64-8bd9-b966d210e755/3-top-5-pixar_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-pixar-movies",
          favorited: false,
          number: "3",
          synop:
            "Pixar is releasing two movies in 2020, Onward and Soul. With Onward's release upcoming, we decided what better time than now to do this list!",
          date: "Mar 11, 2020"
        },
        {
          name: "Top 5 Movies That Are Bad or Bombed",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/e19f6386-df2b-4082-8cb8-e05663d37fa5/2-top-5-movies-that-bombed_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-movies-that-are-bad-or-bombed",
          favorited: false,
          number: "2",
          synop:
            "This episode is brought about by the unexpected box office disappointment Harley Quinn: Birds of Prey. We dive into into our favorite stinkers and failures.",
          date: "Mar 4, 2020"
        },
        {
          name: "Top 5 Video Game Movies",
          artist: "Objectively Subjective",
          source:
            "https://pdcn.co/e/cdn.simplecast.com/audio/9117dd/9117dd66-1b14-450d-9940-d914eb424107/31c119e0-ce7c-422c-bea8-86a3fd9fa533/top5videogamemovies_tc.mp3",
          url:
            "https://objectively-subjective.simplecast.com/episodes/top-5-video-game-movies",
          favorited: false,
          number: "1",
          synop:
            "With Sonic the Hedgehog releasing in theaters recently, we thought this would be a great topic for our first ever episode!",
          date: "Feb 26, 2020"
        }
      ],
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
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
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
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
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

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement("link");
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image";
      document.head.appendChild(link);
    }
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
  }
}
.player {
  background: var(--component-color);
  width: 410px;
  min-height: 480px;
  box-shadow: 0px 15px 35px -5px rgba(12, 12, 12, 0.75);
  border-radius: 15px;
  padding: 30px;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player {
    width: 95%;
    padding: 20px;
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
    margin-top: -70px;
    margin-bottom: 25px;
    width: 290px;
    height: 230px;
    margin-left: auto;
    margin-right: 25px;
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
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls {
    flex-direction: row;
    padding-left: 0;
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
    margin-left: auto;
    font-size: 75px;
    margin-right: 0;
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
  padding-top: 3rem;
  justify-content: center;
  padding-bottom: 88px;
  min-height: 100%;
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
  .wrapper {
    margin: 0 1rem;
    margin: -3rem 0 0 1rem;
    padding: 0;
    justify-self: center;
  }
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
