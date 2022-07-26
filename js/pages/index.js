new Vue({
    el:"#content",

    components: {
        apexchart: VueApexCharts,
    },

    data:{
        user : getCookieByName('user'),
        userId : getCookieByName('userId'),
        Token : getCookieByName('Token'),

        bank : [],

        series: [],
        chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: [],
            responsive: [{
              breakpoint: 450,
              options: {
                chart: {
                  width: 250
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
        },

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
        }
    },
    mounted() {
        if(this.userId != undefined && this.userId.length != 0){ 
            axios.get(`${ip}/bank/${this.userId}`,{headers:{Authorization: `Bearer ${this.Token}`}})
            .then(res => {
                console.log(res)
                this.bank = res.data.data

                this.bank.forEach(element => {
                    this.chartOptions.labels.push(element.bank)
                    this.series.push(element.money)
                });
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

