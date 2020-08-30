/* eslint-disable no-console */
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

import { petalImages } from './petal'

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

  const destoryPage1Ani = () => {
    $('.page1 .stop').removeClass('stop')
    if (aniTimer !== null) {
      clearInterval(aniTimer)
      aniTimer = null
      $('.page1 #page1Stage .petal-obj').remove()
    }
  }

  switch (activePageIndex) {
    case 1:
      destoryPage1Ani()
      break

    case 2:
      if (aniTimer === null) petalAnimation()

      $('.page1 .illustration')
        .children()
        .addClass('stop')
      $('.page1 .content-box').addClass('stop')
      break

    case 3:
      destoryPage1Ani()
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

  if (windowScollTop === pageHeight) {
    setActivePage(2)
  }

  if (delta === 'down') {
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

let aniTimer = null
const petalAnimation = () => {
  const snowflakeURl = Object.keys(petalImages).map(key => petalImages[key])
  const container = $('.page1 .container')
  const visualWidth = container.width()
  const visualHeight = container.height()

  function animateCreator() {
    const $stage = $('#page1Stage')

    function getImagesName() {
      return snowflakeURl[[Math.floor(Math.random() * 11)]]
    }

    function createSnowBox() {
      const url = getImagesName()
      const sign = parseInt(Math.random() * 100) % 2 === 1

      return $('<span class="petal-obj" />')
        .css({
          display: 'block',
          width: 42,
          height: 42,
          position: 'absolute',
          zIndex: sign ? 6 : 4,
          top: '-50px',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(' + url + ')'
        })
        .addClass('rolling')
    }
    // 开始飘花
    aniTimer = setInterval(() => {
      // 运动的轨迹
      const startPositionLeft = Math.random() * visualWidth - 100,
        startOpacity = 1,
        endPositionTop = visualHeight + 100,
        endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
        duration = visualHeight * 10 + Math.random() * 500

      // 随机透明度，不小于0.5
      let randomStart = Math.random()
      randomStart = randomStart < 0.5 ? startOpacity : randomStart
      // 创建一个雪花
      const $flake = createSnowBox()
      // 设计起点位置
      $flake.css({
        left: startPositionLeft,
        opacity: randomStart
      })
      // 加入到容器
      $stage.append($flake)
      // 开始执行动画
      $flake.animate(
        {
          top: endPositionTop,
          left: endPositionLeft
        },
        parseInt(duration * 0.8),
        () => {
          $(this).remove()
        }
      )
    }, 250)
  }

  animateCreator()
}
