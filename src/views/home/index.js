// 引入router
// import router from '../../router';

// 引入html模板, 会被作为字符串引入
import template from './index.html'
import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'
import { modal, throttle } from '../../utils'

// 引入css, 会生成<style>块插入到<head>头中
import '../../assets/css/rest.css'
import '../../assets/css/main.css'
import './style.css'

// 导出类
export default class {
  mount(container) {
    document.title = 'Homepage'
    container.innerHTML = template

    $('#homeBtnPlay').on('click', () => {
      modal.show()
    })



    $(window, document).on('scroll', throttle(onWindowScroll, 600))
  }
}

const setActivePage = (activePageIndex = 1) => {
  // const docHeight = pageHeight * $('.page-section').length
  const pageHeight = $('.page-section').innerHeight()

  $('html,body').animate(
    { scrollTop: pageHeight * (activePageIndex - 1) },
    600,
    () => {
      $('.page-section').removeClass('active')
      $('.page-section')
        .eq(activePageIndex - 1)
        .addClass('active')
    }
  )

  switch (activePageIndex) {
    case 1:
      $('.page1 .stop').removeClass('stop')
      break

    case 2:
      $('.page1 .illustration').children().addClass('stop')
      $('.page1 .content-box').addClass('stop')
      break

    case 3:
      $('.page1 .stop').removeClass('stop')
      break
  }
}

let beforeScrollTop = $(window).scrollTop() || 0
const onWindowScroll = () => {
  const windowScollTop = $(window).scrollTop() || 0
  const pageHeight = $('.page-section').innerHeight()
  const delta =
    beforeScrollTop === windowScollTop
      ? false
      : beforeScrollTop > windowScollTop ? 'up' : 'down'
  // const step = windowScollTop - beforeScrollTop

  if (windowScollTop === pageHeight) {
    // $('.page1 .content-box').css({
    //   left: '10%',
    //   opacity: 1
    // })

    // $('.page1 .girl').css({
    //   left: '30%',
    //   opacity: 1
    // })

    $('.page1 .illustration').children().addClass('stop')
    $('.page1 .content-box').addClass('stop')
  }

  // const item_1_offset = Math.abs($('.page1 .content-box').offset().left)
  // const item_2_offset = Math.abs($('.page1 .girl').offset().left)

  if (delta === 'down') {
    // if (windowScollTop > pageHeight * 0.3 && windowScollTop < pageHeight) {
    //   $('.page1 .content-box').css(
    //     {
    //       left: item_1_offset < 200 ? item_1_offset + step * 0.5 : '10%',
    //       opacity: windowScollTop * 0.05
    //     },
    //     100
    //   )

    //   $('.page1 .girl').css(
    //     {
    //       left: item_2_offset > 500 ? item_2_offset - step * 0.5 : '30%',
    //       opacity: windowScollTop * 0.05
    //     },
    //     100
    //   )
    // }

    if (
      windowScollTop > pageHeight * 0.5 &&
      windowScollTop < pageHeight * 1.1 &&
      windowScollTop !== pageHeight &&
      !$('.page-section.active').hasClass('page1')
    ) {
      setActivePage(2)
    } else if (
      windowScollTop > pageHeight * 1.3 &&
      !$('.page-section.active').hasClass('page2')
    ) {
      setActivePage(3)
    }
  } else if (delta === 'up') {
    // if (
    //   windowScollTop < pageHeight * 0.5 &&
    //   windowScollTop > pageHeight * 1.25
    // ) {
    //   $('.page1 .content-box').css(
    //     {
    //       left: 0,
    //       opacity: 0
    //     },
    //     100
    //   )

    //   $('.page1 .girl').css(
    //     {
    //       left: '50%',
    //       opacity: 0
    //     },
    //     100
    //   )
    // }

    if (windowScollTop < pageHeight * 0.75) {
      setActivePage(1)
    } else if (
      windowScollTop < pageHeight * 1.6 &&
      windowScollTop > pageHeight * 0.9 &&
      windowScollTop !== pageHeight
    ) {
      setActivePage(2)
    }
  }

  beforeScrollTop = $(window).scrollTop()
}
