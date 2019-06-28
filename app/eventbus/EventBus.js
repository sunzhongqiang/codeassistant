const EventEmitter = require('events')
class AppEventBus extends EventEmitter {
  /**
   * 触发事件.
   * @param String type 触发事件的类型
   * @param  {...any} args 触发事件的参数
   */
  fire (type, ...args) {
    console.log('fire', type, ...args)
    this.emit(type, ...args)
  }

  on (event, action) {
    console.log('on', event, action)
    super.on(event, action)
  }
}
const eventbus = new AppEventBus()

export default eventbus
