<template>
  <div>
    <div class="about">
      <div class="about-heading">
        <h3>About the Podcast</h3>
      </div>
      <div class="about-content">
        <div class="profile-picture">
          <img src="@/assets/objectiveprofile.jpg" />
        </div>
        <div class="about-story">
          <h1>
            Two dudes who wanted to do something good for the world, but instead
            made a podcast because they had no clue what they were doing. Turns
            out giving your Top 5 lists on pointless topics adds nothing to
            society. At least they're funny...kind of.
          </h1>
          <iframe
            src="//banners.itunes.apple.com/banner.html?partnerId=&aId=&bt=catalog&t=catalog_black&id=1500505183&c=us&l=en-US&w=300&h=250&store=podcast"
            frameborder="0"
            style="overflow-x:hidden;overflow-y:hidden;width:300px;height:250px;border:0px"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.about {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  max-width: 1440px;
  margin-bottom: 88px;
}
.about-heading {
  display: flex;
  justify-content: center;
}
.profile-picture img {
  max-height: 650px;
  max-width: 650px;
}
.about-content {
  display: flex;
}
.about-story {
  display: flex;
  flex-direction: column;
}
.about-story h1 {
  font-family: "Titan One", Arial, Helvetica, sans-serif;
  font-size: 2rem;
  text-shadow: 0px 7px 4px rgba(0, 0, 0, 0.25);
  text-align: left;
  margin-top: 0;
  padding: 0 1rem;
  max-width: 25ch;
}
.about-story iframe {
  place-self: center;
}
</style>
