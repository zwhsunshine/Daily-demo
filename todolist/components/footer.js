Vue.component('myfooter',{
	template:`
		<footer class="footer">
            <span class="todo-count">
            	<strong>{{n}}</strong>
            	<span>条未选中</span>
            </span>
            <ul class="filters">
                <li v-for="(val,key) in farr">
                    <a 
                    	:href="val.hashMsg" 
                    	class="selected"
                    >{{val.txt}}</a>
                </li>
            </ul>
        </footer>
	`,
	props:['n'],   //未选中的个数
	data(){
		return {
			farr:[
				{
					hashMsg:'#/all',
					txt:'全部'
				},
				{
					hashMsg:'#/checked',
					txt:'选中'
				},
				{
					hashMsg:'#/unchecked',
					txt:'未选中'
				}
			]
		}
	}
})