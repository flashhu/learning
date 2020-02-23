$('.m-info').on('click', '.u-btn', (e) => {
  let city = $(e.currentTarget).prev().val();

  //live weather
  $.ajax({
    url:`https://free-api.heweather.com/s6/weather/now?location=${city}&key=eb33dbe3cb9942619130dd85e05056d6`,
    type:'get',
    success:function (data) {
      console.log('weather', data);

      let tmp = data.HeWeather6[0].now.tmp;
      let nowTmp = `${tmp}°`;
      let weather = data.HeWeather6[0].now.cond_txt;
      let locTime = data.HeWeather6[0].update.loc;
      locHour = parseInt(locTime[11]+locTime[12]);
      let isDayTime = locHour >= 18 ? false : true;
      let img = isDayTime ? 
                data.HeWeather6[0].now.cond_code + ".png":
                data.HeWeather6[0].now.cond_code + "n.png"
      let temp = `<p>${nowTmp}</p>
                  <h3>${weather}</h3>
                  <img src="./img/${img}" alt="weather">`
      
      let hum = data.HeWeather6[0].now.hum + "%";
      let wind = data.HeWeather6[0].now.wind_dir +
                 data.HeWeather6[0].now.wind_sc +
                 "级";
      let detail = `<i class="iconfont">&#xe750;${hum}</i>
                    <i class="iconfont">&#xe6c2;${wind}</i>`;

      $('.u-tem').html(temp);
      $('.u-detail').html(detail);
    },
    error:function (err) {
      console.log(err);
    }
  });
  // 3-10 days forecast
  $.ajax({
    url:`https://free-api.heweather.net/s6/weather/forecast?location=${city}&key=eb33dbe3cb9942619130dd85e05056d6`,
    type:'get',
    success:function (data) { 
      console.log('forecast', data);
      let forecast = data.HeWeather6[0].daily_forecast;
      let fortable = `<table class="u-form">
                        <tr><td>预报</td></tr>
                        <tr class="u-today">
                          <td>今天</td><td>${forecast[0].cond_txt_d}</td><td>${forecast[0].tmp_min}°-${forecast[0].tmp_max}°</td><td>${forecast[0].wind_dir}</td><td>${forecast[0].wind_sc}级</td>
                        </tr>
                        <tr class="u-tomorw">
                          <td>明天</td><td>${forecast[1].cond_txt_d}</td><td>${forecast[1].tmp_min}°-${forecast[1].tmp_max}°</td><td>${forecast[1].wind_dir}</td><td>${forecast[1].wind_sc}级</td>
                        </tr>
                        <tr class="u-dyafter">
                          <td>后天</td><td>${forecast[2].cond_txt_d}</td><td>${forecast[2].tmp_min}°-${forecast[2].tmp_max}°</td><td>${forecast[2].wind_dir}</td><td>${forecast[2].wind_sc}级</td>
                        </tr>
                      </table>`;

      $('.u-forecast').html(fortable);
    },
    error:function (err) {
      console.log(err);
    }
  });
  //live air quality
  $.ajax({
    url:`https://free-api.heweather.net/s6/air/now?location=${city}&key=eb33dbe3cb9942619130dd85e05056d6`,
    type:'get',
    success:function (data) { 
      console.log('air', data);
      let air = data.HeWeather6[0].air_now_city;
      let qlty = air.aqi + " " + air.qlty;
      let iTag = `<i class="iconfont">&#xe75e;${qlty}</i>`;

      $('.u-detail').append(iTag);
    },
    error:function (err) {
      console.log(err);
    }
  }); 
  //hourly forecast
  $.ajax({
    url:`https://free-api.heweather.com/s6/weather/hourly?location=${city}&key=eb33dbe3cb9942619130dd85e05056d6`,
    type:'get',
    success:function (data) { 
      console.log('hourly', data);
      let locHour = 0;
      let hourTmp = [];
      //change hourTmp ...
      //let chart = ....
    },
    error:function (err) {
      console.log(err);
    }
  }); 
  //highcharts
  let chart = Highcharts.chart('container', {
    title: {
      text: '24小时预报',
      align: 'left',
      style: {
        fontSize: '16px'
      }
    },
    xAxis:{
      labels: {
        formatter:function(){
          return this.value+"时";
        }
      },
      title: null
    },
    yAxis: {
      labels: {
        formatter:function(){
          return this.value+"°";
        }
      },
      title: null
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 0
      }
    },
    series: [{
      name: '温度',
      data: [12, 13, 15, 16, 24, 28, 26, 23, 12, 13, 15, 16, 24, 28, 26, 23, 12, 13, 15, 16, 24, 28, 26, 23],
      showInLegend: false
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    },
    credits:{
      enabled: false 
    }
  });
})