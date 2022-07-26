let data = [
    { text: '台灣銀行', value: '台灣銀行' },
    { text: '郵局', value: '郵局' },
    { text: '台北富邦', value: '台北富邦' },
    { text: '玉山銀行', value: '玉山銀行' },
    { text: '合作金庫', value: '合作金庫' },
    { text: '合作金庫數位', value: '合作金庫數位' },
    { text: '中國信託', value: '中國信託' },
    { text: '彰化銀行', value: '彰化銀行' },

    { text: '代存', value: '代存' },
    { text: '吃飯帳戶', value: '吃飯帳戶' },
]



let app = Vue.createApp({
    data(){
        let pnl_account = true;
        let pnl_bank = false;
        let bank_list = [];

        let userName = "";
        let password = "";
        let account_one = "";
        let money_one = "";

        let account_two = "";
        let money_two = "";

        let account_three = "";
        let money_three = "";

        return{
            pnl_account,
            pnl_bank,
            bank_list : data,
            userName,
            password,
            account_one,
            money_one,
            account_two,
            money_two,
            account_three,
            money_three
        }
    },
    methods: {
        checkAccount(){
            axios.post(`${ip}/checkUser`,{"userName" : this.userName , "password" : this.password})
            .then(res => {
                if(res.data.message == "OK"){
                    this.pnl_account = false;
                    this.pnl_bank = true;
                }else{
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },

        AddUser(){
            if(this.account_one == '' && this.account_two == '' && this.account_three == ''){
                alert('最少要選擇一個銀行')
                return;
            }

            axios.post(`${ip}/addUser`,{"userName" : this.userName , "password" : this.password 
            , "account_one":this.account_one , "money_one" : this.money_one
            , "account_two":this.account_two , "money_two" : this.money_two
            , "account_three":this.account_three , "money_three" : this.money_three})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err); 
            })
        }
    }
})

app.mount('.limiter');