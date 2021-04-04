import Vuex from 'vuex'
import Cookie from 'js-cookie'
const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPost: [],
            token : null
        },
        mutations: {
            setPosts(state, posts){
                state.loadedPost = posts
            },
            addPosts(state, posts){
                state.loadedPost.push(posts)
            },
            editPosts(state, editedPost){
                const id = state.loadedPost.findIndex(post => post.id === editedPost.id)
                state.loadedPost[id] = editedPost
            },
            setToken(state, token){
                state.token = token
            },
            clearToken(state) {
                state.token = null
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get('/posts.json').then(data => {
                    const postArray = []
                    for (const key in data) {
                        postArray.push({...data[key], id: key})
                    }
                    console.log(data, 'ypo');
                    vuexContext.commit('setPosts', postArray)
                }).catch(e => {
                    console.log(e);
                })
              },
            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts)
            },
            addPosts(vuexContext, posts){
                return this.$axios.$post('/posts.json'+ '?auth=' + vuexContext.state.token, {...posts, updateData: new Date()}).then(data => {
                    vuexContext.commit('addPosts', {...posts, id: data.name})
                }).catch(e => console.log(e))
                
            },
            editPosts(vuexContext, posts){
                return this.$axios.$put('/posts/' + posts.id + '.json?auth=' + vuexContext.state.token, {...posts, updateData: new Date()}).then(data => {
                    vuexContext.commit('editPosts', posts)
                }).catch(e => console.log(e))
                
            },
            authenticateUser(vuexContext, authData){
                let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIkey
                if(!authData.isLogin){
                    authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIkey
                    }
                return this.$axios
                    .$post(authUrl, {
                      email: authData.email,
                      password: authData.password,
                      returnSecureToken: true
                    })
                    .then(result => {
                      vuexContext.commit("setToken", result.idToken);
                      localStorage.setItem("token", result.idToken);
                      localStorage.setItem(
                        "tokenExpiresIn",
                        new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
                      );
                      Cookie.set("token", result.idToken);
                      Cookie.set(
                        "tokenExpiresIn",
                        new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
                      );
                      return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Authenticated'})
                    })
                    .catch(e => console.log(e));
            },
            setLogoutTimer(vuexContext, duration){
                setTimeout(() => {
                    vuexContext.commit('clearToken')
                }, duration)
            },
            initAuth(vuexContext, req){
                let token
                let expired
                if(req){
                    if(!req.headers.cookie){
                        return
                    }
                    const jwt = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
                    if(!jwt){
                        return
                    }
                    token = jwt.split('=')[1]
                    expired = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokenExpiresIn=')).split('=')[1]
                }else {
                    token = localStorage.getItem('token')
                    expired = localStorage.getItem('tokenExpiresIn')
    
                    if(new Date().getTime() > +expired || !token){
                        vuexContext.dispatch('logout')
                        return
                    }
                }
                vuexContext.commit('setToken', token)
            },
            logout(vuexContext){
                vuexContext.commit('clearToken')
                Cookie.remove('token')
                Cookie.remove('tokenExpiresIn')
                localStorage.removeItem('token')
                localStorage.removeItem('tokenExpiresIn')
            }
        },
        getters: {
            loadedPost(state){
                return state.loadedPost
            },
            isAuthenticated(state){
                return state.token !== null
            }
        }
    })
}

export default createStore
