let d = [
			{
				id:0,
				txt:'aaaaaa',
				checked:true
			},
			{
				id:1,
				txt:'bbbbbb',
				checked:false
			},
			{
				id:2,
				txt:'cccccc',
				checked:false
			}
		];
new Vue({
	el:'#app',
	data:{
		arr:getStorage('data'),
		hashVal:null,   //哈希值
		filters:[]    //筛选后的数据
	},
	methods:{

		//添加
		add(v){
			this.arr.push({
				id:Date.now(),
				txt:v,
				checked:false
			});
		},

		//删除
		del(id){
			this.arr = this.arr.filter(e=> e.id != id );
		},

		//通过hash过滤数据
		hashFn(){
			this.hashVal = window.location.hash.substring(1);
			this.filters = this.arr.filter(e=>{
				switch (this.hashVal){
					case '/all':
						return e;
						break;
					case '/checked':
						return e.checked;
						break;
					case '/unchecked':
						return !e.checked;
						break;
				}
			})
		},

		//编辑
		edit(i){
			this.editele = document.getElementsByClassName('edit');
			this.editele[i].style.display = 'block';
		}
		
	},
	mounted(){
		this.edit
	},
	created(){
		this.hashVal = window.location.hash;
		if( !this.hashVal ){
			window.location.hash = '/all'
		}
		this.hashFn();
		window.onhashchange = ()=>{
			this.hashFn();
		}
	},

	//监听：
	watch:{

		//每当arr发生变化的时候，就执行hashFn()
		arr:{
			handler(v){
				window.localStorage.setItem('data',JSON.stringify(v));
				this.hashFn();
			},
			deep:true
		}
	},
	computed:{

		//全选
		all:{
			get(){
				if(!this.arr.length){
					return false;
				}
				return this.arr.every(e=>e.checked);
			},
			set(newValue){
				this.arr.forEach(e=>e.checked = newValue);
			}
		},

		//未选中的个数
		num(){
			return this.arr.filter(e=>!e.checked).length
		}

	}

})

function getStorage(name){
	let data = window.localStorage.getItem(name) || '[{"id":0,"txt":"aaaaaa","checked":true},{"id":1,"txt":"bbbbbb","checked":false},{"id":2,"txt":"cccccc","checked":false}]';
	return JSON.parse(data);
}

/*
解析：
	1. hashFn()
		放到computed中，onhashchange的时候，没有继续调用，
		1. computed中的方法，在调用的时候，不用加()，否则会报错，因为监听到数据变化会自动调用
		2. methods中的方法，在调用的时候，加()

*/









