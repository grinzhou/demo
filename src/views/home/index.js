// 引入router
// import router from '../../router';

// 引入html模板, 会被作为字符串引入
import template from './index.html'
import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'
import { modal } from '../../utils'

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
    // container.querySelector('.nav-btn').addEventListener('click', evt => {
    //   console.log(evt.target.getAttribute('data-index'))
    //   // goPage()
    // })
  }
}
