class AppEventBus {
  // 事件数组，保存和记录所有的应用事件
  events = []

  // 构造函数
  constructor () {
    this.events = this.events || []
  }

  /**
   * 监听事件.
   * @param String type  事件类型
   * @param Function func  监听事件的回调方法
   */
  on (type, func) {
    const event = this.events[type]
    if (!event) {
      this.events[type] = [func]
    } else {
      event.push(func)
    }
  }

  /**
   * 触发事件.
   * @param String type 触发事件的类型
   * @param  {...any} args 触发事件的参数
   */
  fire (type, ...args) {
    let event = this.events[type]
    if (event) {
      if (Array.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
          event[i].apply(this, args)
        }
      } else {
        event[0].apply(this, args)
      }
    }
  }
}
const eventbus = new AppEventBus()

export default eventbus
