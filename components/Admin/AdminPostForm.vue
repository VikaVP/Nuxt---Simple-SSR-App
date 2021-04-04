<template>
    <section class="new-post-form">
        <form @submit.prevent="onSave">
            <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
            <AppControlInput v-model="editedPost.title">Title</AppControlInput>                    
            <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>            
            <AppControlInput
                control-type="textarea"
                v-model="editedPost.previewText">Content</AppControlInput>                
            <AppButton type="submit">Save</AppButton>                    
            <AppButton
                type="button"
                style="margin-left: 10px"
                btn-style="cancel"
                @click="onCancel">Cancel</AppButton>
        </form>
    </section>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput.vue'
import AppButton from '@/components/UI/AppButton.vue'
export default {
    name: 'AdminPostForm',
    data(){
        return {
            editedPost: this.post ? {...this.post} : {
                author: '',
                title: '',
                thumbnail : '',
                previewText: ''
            }
        }
    },
    components: {
        AppControlInput, AppButton
    },
    methods: {
        onSave(){
            console.log(this.editedPost);
            this.$emit('submit', this.editedPost)
        },
        onCancel(){
            this.$router.push('/admin')
        }
    },
    props: {
        post: {
            type: Object,
            required: false
        }
    }
}
</script>
