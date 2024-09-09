<script setup>
const config = useRuntimeConfig();
const route = useRoute();

// Scroll to top
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

const movie = ref([]);

onMounted(async () => {
  const fetchData = await fetch(`${config.API_BASE}/3/movie/${route.params.movieid}?api_key=${config.API_KEY}&language=en-US`);
  console.log(fetchData);
  const json = await fetchData.json();

  movie.value = {
    adult: json.adult,
    poster_path: json.poster_path,
    title: json.title,
    overview: json.overview,
    tagline: json.tagline,
    genres: json.genres,
    release_date: new Date(json.release_date).toLocaleString("id", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    revenue: json.revenue.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    }),
  };
});
</script>

<template>
  <div class="bg-neutral-900 min-h-screen">
    <Head>
      <Title>{{ movie.title }}</Title>
      <Meta name="description" :content="movie.overview" />
    </Head>

    <div class="py-12">
      <Loading v-if="!movie.title" />

      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row movie-info">
          <div class="basis-1/2 grid justify-items-center">
            <div>
              <span v-for="genre in movie.genres" :key="genre" class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest mr-2">{{ genre.name }}</span>
            </div>
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" class="mt-4 max-h-fit" />
          </div>

          <div class="basis-1/2 movie-content text-white">
            <h1 class="font-bold text-4xl italic">{{ movie.title }}</h1>

            <hr class="mt-4" />
            <p class="mt-4 text-base"><span class="underline">Tagline:</span> "{{ movie.tagline }}"</p>
            <p class="mt-4 text-base">
              <span class="underline">Released:</span>
              {{ movie.release_date }}
            </p>
            <p class="mt-4 text-base"><span>Duration:</span> {{ movie.runtime }} minutes</p>
            <p class="mt-4 text-base">
              <span class="underline">Revenue:</span>
              {{ movie.revenue }}
            </p>
            <p class="mt-4 text-base"><span class="underline">Overview:</span> {{ movie.overview }} minutes</p>
            <hr class="mt-4 mb-6" />

            <div class="float-right">
              <NuxtLink class="py-3 px-6 mt-12 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" :to="{ name: 'index' }"> Back </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
