import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueSidebarMenu);
Vue.config.productionTip = false;
// https://github.com/euvl/vue-js-modal
import VModal from "vue-js-modal";
Vue.use(VModal, { dynamic: true });
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import Multiselect from "vue-multiselect";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
Vue.use(Notifications, { velocity });
Vue.component("multiselect", Multiselect);
Vue.use(require('vue-moment'));

// ---------------------------------------------- VUE LAZY LOAD ------------------------------------------------
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: "../assets/img/error.png",
    loading: "../assets/img/loader_gif.gif",
    attempt: 1,
});
// ------------------------------------------ END VUE LAZY LOAD -------------------------------------------------
// ---------------------------VUEX DATA STORE - SHARING DATA BETWEEN COMPONENTS ! - VUEX MAGASIN DE DATA - PARTAGER DES DATAS ENTRE LES COMPONENTS -----------------------------------------------
/* INFORMATION : HOW TO USE IN COMPONENTS - COMMENT UTILISER CA DANS LES COMPONENTS  : 
SET USER ( WHEN YOU LOG IN): this.$store.commit('setUser', response.data)
GET USER : this.User = this.$store.getters.user
DELETE USER (WHEN YOU LOG OUT ): this.$store.commit('deleteUser') 
*/
Vue.use(Vuex);
const anonymous = { _id: "anonymous", nom: "anonymous", prenom: "anonymous", phone: "", email: "anonymous@anonymous.fr", password: "", img: "", filenames: [] };
const store = new Vuex.Store({
    state: {
        user: anonymous,
        logged: false,
    },
    mutations: {
        setUser(state, user) {
            localStorage.setItem("user", JSON.stringify(user));
            state.user = JSON.parse(localStorage.getItem("user"));
            state.logged = true;
        },
        deleteUser(state, user) {
            console.log("USER LOCALSTORAGE SESSION DELETED");
            localStorage.removeItem("user");
            state.logged = false;
            state.user = anonymous;
        },
    },
    getters: {
        user: (state) => {
            return state.user;
        },
    },
});
// ---------------------------------------------- END VUEX DATA STORE - SHARING DATA BETWEEN COMPONENTS !-------------------------------------
// ---------------------------------------------- MOUNTING APP  --------------------------------------------------
new Vue({
    router,
    render: (h) => h(App),
    store: store,
}).$mount("#app");