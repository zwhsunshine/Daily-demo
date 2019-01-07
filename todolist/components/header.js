
Vue.component('myheader',{
	template:`
		<header class="header">
            <h1>todos</h1>
            <input 
            	@keyup.13="submit" 
            	v-model="val"
            	class="new-todo" placeholder="请输入内容" value="" />
        </header>
	`,
	data(){
		return {
			val:''
		}
	},
	methods:{
		submit(){
			if(this.val){
				this.$emit('addfn',this.val);
				this.val='';
			}else{
				alert('Please enter the content');
			}
		}
	}
})




