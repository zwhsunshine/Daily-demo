
new Vue({
	el:'#app',
	data:{
		arr:[
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
		],
		hashVal:null,   //哈希值
		filters:[]    //筛选后的数据
	},
	methods:{
		add(v){
			this.arr.push({
				id:Date.now(),
				txt:v,
				checked:false
			});
		},
		del(id){
			this.arr = this.arr.filter(e=> e.id != id );
		},
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
		getStorage(arr,name){
			let data = window.locaStorage.getItem(name);
			window.locaStorage.setItem(name,)
		}
		
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
			handler(){
				this.hashFn();
			},
			deep:true
		}
	},
	computed:{
		all:{
			get(){
				if(!this.arr.length){
					return false;
				}
				return this.arr.every(e=>e.checked);
			},
			set(newValue){
				this.arr.forEach(e=>e.checked == newValue);
			}
		},
		num(){
			return this.arr.filter(e=>!e.checked).length
		}
	}

})

/*
解析：
	1. hashFn()
		放到computed中，onhashchange的时候，没有继续调用，
		1. computed中的方法，在调用的时候，不用加()，否则会报错，因为监听到数据变化会自动调用
		2. methods中的方法，在调用的时候，加()，在

*/









