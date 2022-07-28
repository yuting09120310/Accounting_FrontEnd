let app = Vue.createApp({
    data(){
        let username;
        let password;


        return{
            username,password
        }
    },
    methods: {
        loginHandlr(){
            axios.post(`${ip}/login`,{"username": this.username,"password": this.password})
            .then(res => {
                document.cookie = "Token=" + res.data.token;
                document.cookie = "user=" + res.data.data[0].user;
                document.cookie = "userId=" + res.data.data[0].userId;

                if(res.data.data == "noData"){
                    alert("帳號密碼錯誤");
                }else{
                    document.location.href = "./index.html"
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },

    }
})

app.mount('.limiter');