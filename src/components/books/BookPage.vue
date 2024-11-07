<script setup>
import {useRoute} from "vue-router";
import {onMounted} from "vue";

const route = useRoute()
const book = JSON.parse(route.query.bookData);

onMounted(_ => console.log(book))

</script>

<template>

</template>

<style scoped>

</style>