

// 注册一个全局自定义指令 `v-focus`
// Vue.directive('focus', {
// 	// 当被绑定的元素插入到 DOM 中时……
// 	inserted: function (el) {
// 	// 聚焦元素
// 	el.focus()
// }


new Vue({
	el:'#app',
	data:{
		inputVal:'',
		arr:getStorage('data'),
		num:0
	},
	methods:{
		submit(){
			if(!this.inputVal){
				alert('请输入内容！');
				return;
			}
			this.arr.push({
				txt:this.inputVal,
				checked:false,
				focus:false,
				d:'none',
				
			});
			this.inputVal = '';
		},
		del(i){
			this.arr.splice(i,1);
		},
		// edit(i){
		// 	this.arr[i].focus = true;
		// 	this.arr[i].d = 'block';
			
		// },
		// blur(i){
		// 	// this.arr[i].txt = this.inputVal;
		// 	this.arr[i].focus = false;
		// 	this.arr[i].d = 'none';
			
		// },
		all(){
			this.arr = this.arr.filter(e=>e);
		},
		selection(){
			console.log(1);
			this.arr = this.arr.filter(e=>e.checked);
			console.log(this.arr);
		},
		unchecked(){
			this.arr = this.arr.filter(e=>!e.checked);
		}
	},
	computed:{
		select:{
			get(){
				this.num = this.arr.filter(e=>!e.checked).length;
				return this.num
			}
		}
		
	},
	watch:{
		arr:{
			handler(v){
				localStorage.setItem('data',JSON.stringify(v));
			},
			deep:true
		}
	}
})

function getStorage(name){
	let data = localStorage.getItem(name) || '[{"txt":"This is the first to do.","checked":true,"focus":true,"d":"none"}]';
	return JSON.parse(data);
}



