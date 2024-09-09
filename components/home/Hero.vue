<script setup></script>

<template>
  <div class="bg-[url('/assets/imgs/cinema.jpg')] bg-cover w-full h-full">
    <div class="bg-black bg-opacity-60 text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-32 lg:px-8 z-20">
      <h2 class="text-5xl font-extrabold text-white sm:text-5xl mt-16">
        Now <span class="text-indigo-500">Airing</span>
      </h2>
      <p class="text-2xl mt-4 max-w-md mx-auto text-gray-400">Get complete information about currently airing movies</p>
      <div class="lg:mt-0 lg:flex-shrink-0">
        <div class="mt-8 inline-flex rounded-md shadow">
          <a href="#movies-grid" type="button" class="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">See List</a>
        </div>
      </div>
    </div>
  </div>
</template>
