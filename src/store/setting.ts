import { observable } from 'mobx'
import {getSetting} from "@/api";

const settingStore = observable({
  is_show_read: false,
  is_show_queue: false,
  refresh() {
    getSetting().then(res => {
      this.is_show_queue = res.data.is_show_queue
      this.is_show_read = res.data.is_show_read
    })
  }
})

export default settingStore