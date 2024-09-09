<template>
  <div class="bg-neutral-900">
    <HomeHero />
    <div class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="flex mt-8">
          <form @submit.prevent="searchFilter">
            <input v-model="searchInput" type="text" placeholder="Search..." class="max-w-md w-96 sm:w-72 focus:outline-none pl-4 py-2" />
            <button type="submit" class="rounded-l-none rounded-r-lg w-24 h-10 bg-indigo-500 hover:bg-indigo-600 text-white">Search</button>
          </form>
        </div>

        <Loading v-if="pending" />

        <!-- Movies -->
        <div id="movies-grid" v-else class="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4 py-5">
          <div v-for="(movie, idx) in movies.results" :key="idx" class="static mb-4">
            <div class="relative overflow-hidden flex flex-col group cursor-pointer" @click="redirectMovieDetail(movie.id)">
              <div class="absolute left-0 top-0 bg-indigo-600 bg-opacity-90 p-3 rounded-br-lg">
                <HomeReviewStars :rating="movie.vote_average" />
              </div>
              <img class="block w-full h-full" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" />
              <div class="absolute left-0 bottom-0 right-0 z-10 flex justify-center items-end bg-indigo-600 bg-opacity-90 opacity-0 group-hover:opacity-100 translate-y-full group-hover:-translate-y-0 transition duration-700">
                <p class="text-white font-semibold mx-8">
                  {{ movie.overview }}
                </p>
              </div>
            </div>

            <div class="text-center">
              <h1 class="title-font text-lg font-medium text-white mt-2">
                {{ movie.title.slice(0, 25) }}
                <span v-if="movie.title.length > 25">...</span>
              </h1>
              <h2 class="text-xs title-font font-medium text-gray-400">
                Released :
                {{
                  new Date(movie.release_date).toLocaleString("id", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
              </h2>
            </div>
          </div>
        </div>
        <!-- Movies -->
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const router = useRouter();

const searchInput = ref("");
const searchUrl = ref(`3/movie/now_playing?api_key=${config.API_KEY}&language=en-us&page=1`);

const { data: movies, pending, refresh, error } = await useFetch(() => searchUrl.value, { baseURL: config.API_BASE });

function searchFilter() {
  if (searchInput.value === "") {
    searchUrl.value = ref(`3/movie/now_playing?api_key=${config.API_KEY}&language=en-us&page=1`);
  } else {
    searchUrl.value = ref(`3/search/movie?api_key=${config.API_KEY}&language=en-US&page=1&query=${searchInput.value}`);
  }
  refresh();
}

function redirectMovieDetail(id) {
  router.push({ path: `/movies/${id}` });
}
</script>
