<template>
    <div class="posts-page">
        <PostLists :posts="loadedPost"/>
    </div>
</template>
<script>
export default {
    name: 'Posts',
    computed : {
        loadedPost(){
        return this.$store.getters.loadedPost
        }
    }
}
</script>
<style scoped>
.posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>