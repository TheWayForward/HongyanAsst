const devicesId = "644250210";
const api_key = "fhAS54e5X8HL5wcaB6ZW74oA3vo=";
var timer;

Page({
  data: {
    //initalize as Tian'an Men
    latitude: 39.129574,
    longitude: 116.482548,
    markers:[
      {
        id: 1,
        latitude: 39.129574,
        longitude: 116.482548,
        name: 'my_gps'
      }
    ]
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: "getting location"
    })
    this.getDatapoints().then(datapoints => {
      this.update(datapoints)
      wx.hideLoading()
    }).catch((error) => {
      wx.hideLoading()
      console.error(error)
    })
  },

  onLoad: function () {
    timer = setInterval(() => {
      this.getDatapoints().then(datapoints => {
      })
    }, 30000)

    wx.showLoading({
      title: 'loading'
    })

    this.getDatapoints().then((datapoints) => {
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
      console.error(err)
      clearInterval(timer)
    })
  },

  getDatapoints: function () {
    var that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Latitude,Logitude&limit=15`,
        header: {
          'content-type': 'application/json',
          'api-key': api_key
        },
        success: (res) => {
          const status = res.statusCode
          const response = res.data
          var longitude = response.data.datastreams[0].datapoints;
          var latitude = response.data.datastreams[1].datapoints;
          var current_lo = Number(longitude[longitude.length - 1].value);
          var current_la = Number(latitude[latitude.length - 1].value);
          console.log(current_lo,current_la);
          that.setData({
            longitude: current_lo,
            latitude: current_la,
            markers:[
              {
                id: 1,
                longitude: current_lo,
                latitude: current_la,
                name: "my_gps_working"
              }
            ]
          })
          console.log(that.data.latitude);
          console.log(that.data.longitude);
          if (status !== 200) 
          {
            reject(res.data)
            return ;
          }
          if (response.errno !== 0) 
          {
            reject(response.error)
            return ;
          }
          if (response.data.datastreams.length === 0) 
          {
            reject("No data yet.")
          }
          //succeed promise resolved
          resolve({
            longitude: response.data.datastreams[0].datapoints.reverse(),
            latitude: response.data.datastreams[1].datapoints.reverse()
          })
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  
  onReady: function(e){
    this.mapCtx = wx.createMapContext('myMap');
  },

  onUnload: function(){
    clearInterval(timer);
  }

})
