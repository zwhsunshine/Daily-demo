
Vue.component('list',{
	template:`
            <ul class="todo-list">
                <li v-for="(val,key) in ary" :class="{completed:val.checked}">
                    <div class="view">
                        <input 
                            v-model="val.checked" 
                            class="toggle" 
                            type="checkbox" 
                        />
                        <label>{{val.txt}}</label>
                        <button 
                            @click="des(val.id)"
                            class="destroy"
                        ></button>
                    </div>
                    <input class="edit" />
                </li>
            </ul>
	`,
    props:['ary'],
    methods:{
        des(id){
            this.$emit('delfn',id);
        }
    }
})


