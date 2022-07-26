new Vue({
    el:"#content",

    data:{
        user : getCookieByName('user'),
        userId : getCookieByName('userId'),
        Token : getCookieByName('Token'),

        bank : [],

        type:[
            "飲食",
            "交通",
            "娛樂",
            "購物",
            "個人",
            "醫療",
            "家庭",
            "生活",
            "學習",
            "其他"
        ],

        // 已選擇的
        selected:{
            userId : getCookieByName('userId'),
            user : getCookieByName('user'),
            inputMoney:"",
            selectBank:"",
            selectType:"飲食",
            inputRemark:"",
        }
        

    },
    methods: {
        RWDSelectBar(){
          $("body").toggleClass("sidebar-toggled");
          $(".sidebar").toggleClass("toggled");
          if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
          };
        },

        delCookie(){
          document.cookie = "Token=";
          document.cookie = "user=";
          document.cookie = "userId=";
        },

        sendHandler(){
            if(this.selected.selectType.length != 0 && this.selected.inputMoney.length != 0 && this.selected.selectBank.length != 0){
                axios.post(`${ip}/pay`, this.selected)
                .then(res => {
                    alert(`當前餘額剩下${res.data.data[0].money}元`)
                    this.selected.inputMoney = "";
                    this.selected.selectBank = "",
                    this.selected.inputRemark = ""
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        }
    },
    mounted() {
        if(this.userId != undefined && this.userId.length != 0){ 
            axios.get(`${ip}/bank/${this.userId}`,{headers:{Authorization: `Bearer ${this.Token}`}})
            .then(res => {
                this.bank = res.data.data
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

