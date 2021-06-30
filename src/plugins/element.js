import Vue from 'vue'
//导入表单控件
//导入信息提示控件
import {Form,FormItem,Input,Button,Message} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$message = Message