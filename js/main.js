toastr.options = {
    "preventDuplicates": true,
    "preventOpenDuplicates": true
};

const app = new Vue({
    el: "#app",
    data: {
        profileName: '',
        profileData: '',
        profileFollowers: '',
        profileRepos: '',
        gitSearch: '',
        gitResponse: '',
        myProfile: '',
        myFollowers: '',
    },
    watch: {
        profileName: (newValue)=>{
            app.getGithubProfile(newValue)
            app.getFollowers(newValue)
            app.getRepos(newValue)
        },
        gitSearch: (newValue)=>{
            app.searchInGit(newValue)
        }
    },
    methods: {
        searchInGit: function(param) {
            axios.get(`https://api.github.com/search/code`, {
                q: param
            }).then(res=>{
                this.gitResponse = res.data;
                toastr.success("Pesquisa encontrada", "Sucesso");
            }).catch(err=>{
                switch(err.response.status) {
                    case 404:
                        toastr.error("Usuário não encontrado", 'Erro');
                        break;
                    case 403:
                        toastr.error("Limite de requisições excedido", 'Erro');
                        break;
                }
            })
        },
        getGithubProfile: function (profileName){
            axios.get(`https://api.github.com/users/${profileName}`).then(res=>{
                this.profileData = res.data;
                toastr.success("Pesquisa encontrada", "Sucesso");
            }).catch(err=>{
                switch(err.response.status) {
                    case 404:
                        toastr.error("Usuário não encontrado", 'Erro');
                        break;
                    case 403:
                        toastr.error("Limite de requisições excedido", 'Erro');
                        break;
                }
            })
        },
        getFollowers: function(profileName){
            axios.get(`https://api.github.com/users/${profileName}/followers`).then(res=>{
                this.profileFollowers = res.data;
                toastr.success("Pesquisa encontrada", "Sucesso");
            }).catch(err=>{
                switch(err.response.status) {
                    case 404:
                        toastr.error("Usuário não encontrado", 'Erro');
                        break;
                    case 403:
                        toastr.error("Limite de requisições excedido", 'Erro');
                        break;
                }
            })
        },
        getRepos: function(profileName) {
            axios.get(`https://api.github.com/users/${profileName}/repos`).then(res=>{
                this.profileRepos = res.data;
                toastr.success("Pesquisa encontrada", "Sucesso");
            }).catch(err=>{
                switch(err.response.status) {
                    case 404:
                        toastr.error("Usuário não encontrado", 'Erro');
                        break;
                    case 403:
                        toastr.error("Limite de requisições excedido", 'Erro');
                        break;
                }
            })
        }
    },
    created: function() {
        axios.get('https://api.github.com/users/yzPeedro').then(res=>{
            this.myProfile = res.data;
        }).catch(err=>{
            switch(err.response.status) {
                case 404:
                    toastr.error("Usuário não encontrado", 'Erro');
                    break;
                case 403:
                    toastr.error("Limite de requisições excedido", 'Erro');
                    break;
            }
        });

        axios.get('https://api.github.com/users/yzPeedro/followers').then(res=>{
            this.myFollowers = res.data;
        }).catch(err=>{
            switch(err.response.status) {
                case 404:
                    toastr.error("Usuário não encontrado", 'Erro');
                    break;
                case 403:
                    toastr.error("Limite de requisições excedido", 'Erro');
                    break;
            }
        });
    }
});