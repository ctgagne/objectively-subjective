import axios from "axios";

export function getTracks() {
  return axios.get(
    "https://api.simplecast.com/podcasts/9117dd66-1b14-450d-9940-d914eb424107/episodes?limit=100&offset=0"
  );
}
