// 这里直接使用的是jsx的语法。  // 样式和语法和合在一直 ，语法和新api的区别，来使用babel来解析
import '@/assets/style/footer.styl'

export default {
  data () {
    return {
      author: 'Geoge'
    }
  },
  // 这里直接使用render 函数来实现虚拟的dom渲染
  // 其它template最终也是形成render--与react的render保持一致
  render () {
    return (
      <div class='footer'>
        <span>Written By {this.author} -----</span>
        <span>你在干什么呀。asdfasdfasdfas</span>
        <div>
                  你是用来测试的
        </div>
      </div>
    )
  }
}
