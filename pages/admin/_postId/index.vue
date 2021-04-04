<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'
export default {
    layout: 'admin',
    middleware: ['check-auth','auth'],
    components: {
        AdminPostForm
    },
    asyncData(context){
      return context.app.$axios.$get('/posts/' + context.params.postId + '.json').then(data => {
        return {
          loadedPost : {...data, id: context.params.postId}
        }
      }).catch(e => {
        context.error(e)
      })
    },
    methods: {
      onSubmitted(editedData){
          this.$store.dispatch('editPosts', editedData).then(data => this.$router.push('/admin')).catch(e => console.log(e))
      }
    }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>