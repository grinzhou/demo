import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'

export const modal = {
  show() {
    $('#overlay').show()
    $('#overlay .btn-modal-close').on('click', () => {
      $('#overlay').hide()
    })
  },
  hide() {
    $('#overlay').hide()
  }
}