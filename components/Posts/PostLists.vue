<template>
    <section class="featured-posts">
        <PostPreview v-for="post of posts" :key="post.id" :id="post.id" :isAdmin="isAdmin" :title="post.title" :thumbnail="post.thumbnail" :previewText="post.previewText"/>
    </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview.vue'
export default {
    name: 'PostLists',
    components: {PostPreview},
    data() {
        return {}
    },
    props: {
        isAdmin: {
            type: Boolean,
            default: false
        },
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>