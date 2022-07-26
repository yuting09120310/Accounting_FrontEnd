new Vue({
    el:"#content",

    data:{
        user : getCookieByName('user'),
        userId : getCookieByName('userId'),
        Token : getCookieByName('Token'),
        
        resRecord : [],
        resBank:[]
    },

    methods: {
        //解決menu無法關閉開啟的問題
        RWDSelectBar(){
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
              $('.sidebar .collapse').collapse('hide');
            };
          },
          
        //登出帳號
        delCookie(){
            document.cookie = "Token=";
            document.cookie = "user=";
            document.cookie = "userId=";
        },

        //銀行篩選條件
        filterHandler(item){
            axios.get(`${ip}/record/${this.userId}/${item}`,{headers:{Authorization: `Bearer ${this.Token}`}})
            .then(res => {
                console.log(res)
                this.resRecord = res.data.data.reverse(),
                this.resBank = res.data.allBank
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },

    mounted() {
        if(this.userId != undefined && this.userId.length != 0){ 
            axios.get(`${ip}/record/${this.userId}`,{headers:{Authorization: `Bearer ${this.Token}`}})
            .then(res => {
                console.log(res)
                this.resRecord = res.data.data.reverse(),
                this.resBank = res.data.allBank
            })
            .catch(err => {
                console.error(err); 
            })
        }else{
            alert("尚未登入");
            document.location.href = "./login.html"
        }
    },
})

