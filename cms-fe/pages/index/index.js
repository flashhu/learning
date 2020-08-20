import { Base64 } from 'js-base64'

Page({
  onGetToken() {
    // code
    wx.login({
      success: (res) => {
        if(res.code) {
          wx.request({
            url: 'http://localhost:8080/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success: (res) => {
              console.log(res)
              const code = res.statusCode.toString()
              if(code.startsWith('2')) {
                wx.setStorageSync('token', res.data.token)
              }
            }
          })
        }
      }
    })
  },
  onVerifyToken() {
    wx.request({
      url: 'http://localhost:8080/v1/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetLatest() {
    wx.request({
      url: 'http://localhost:8080/v1/classic/latest',
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          wx.setStorageSync('flow_index', res.data.index)
        }
      }
    })
  },
  onLike() {
    wx.request({
      url: 'http://localhost:8080/v1/like',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onDislike() {
    wx.request({
      url: 'http://localhost:8080/v1/like/cancel',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  }, 
  onGetNext() {
    wx.request({
      url: `http://localhost:8080/v1/classic/${wx.getStorageSync('flow_index')}/next`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          wx.setStorageSync('flow_index', res.data.index)
        }
      }
    })
  },
  onGetOne() {
    wx.request({
      url: `http://localhost:8080/v1/classic/100/1`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetPrev() {
    wx.request({
      url: `http://localhost:8080/v1/classic/${wx.getStorageSync('flow_index')}/prev`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          wx.setStorageSync('flow_index', res.data.index)
        }
      }
    })
  },
  onGetClassicFavor() {
    wx.request({
      url: `http://localhost:8080/v1/classic/100/1/favor`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetMyFavorList() {
    wx.request({
      url: `http://localhost:8080/v1/classic/favor`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetHotBook() {
    wx.request({
      url: `http://localhost:8080/v1/book/hot`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetDetail() {
    wx.request({
      url: `http://localhost:8080/v1/book/1120/detail`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onSearch() {
    wx.request({
      url: `http://localhost:8080/v1/book/search`,
      method: 'GET',
      data: {
        q: '我'
      },
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetFavorBookNum() {
    wx.request({
      url: `http://localhost:8080/v1/book/favor/count`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetBookFavor() {
    wx.request({
      url: `http://localhost:8080/v1/book/1120/favor`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onAddComment() {
    wx.request({
      url: `http://localhost:8080/v1/book/add/comment`,
      method: 'POST',
      data: {
        content: '整挺好',
        book_id: 1120
      },
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetComment() {
    wx.request({
      url: `http://localhost:8080/v1/book/1120/comment`,
      method: 'GET',
      header: {
        // basic auth
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },

  _encode() {
    const token =  wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
  }
})