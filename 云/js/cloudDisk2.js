class CloudDisk{
	constructor(){

		//获取元素
		this.head = document.getElementById('head');
		this.section = document.getElementById('section');
		this.fol = document.getElementsByClassName('folders')[0];
		this.fdiv = document.getElementsByClassName('folddiv')[0];
		this.frame = document.getElementById('frame');
		this.breadNav = document.getElementsByClassName('bread-nav')[0];
		this.treeMenu = document.getElementsByClassName('tree-menu')[0];
		this.fEmpty = document.getElementsByClassName('f-empty')[0];
		this.content = document.getElementsByClassName('content')[0];

		//按钮类
		this.removeBtn = document.getElementById('remove');
		this.renameBtn = document.getElementById('rename');
		this.del = document.getElementById('del');
		this.create = document.getElementById('create');
		this.checkedAll = document.getElementsByClassName('checkall')[0].children[0];
	
		//弹窗类
		this.mtree = document.getElementsByClassName('modal-tree')[0];
		this.tclose = this.mtree.getElementsByClassName('icon_close')[0];
		this.cancel = this.mtree.getElementsByClassName('cancel')[0];
		this.ok = this.mtree.getElementsByClassName('ok')[0];
		this.tip = document.getElementsByClassName('full-tip-box')[0];
		this.tipt = this.tip.getElementsByClassName('tip-text')[0];
		this.tan = document.getElementById('tanbox');
		this.close = this.tan.getElementsByClassName('close-ico')[0];
		this.conf = this.tan.getElementsByTagName('a');

		//计算高度
		this.section.style.height = window.innerHeight - this.head.offsetHeight + 'px';

		//获取动态元素赋初始值为null，下面代码中真正创建元素之后会赋值，用于获取动态元素
		this.items = this.spans = this.fi = this.span = this.timer = null;
		
		//赋初始值
		this.id = -1;
		this.disX = this.disY = this.kid = 0;
		this.temp = this.v = '';
		this.child = [];   //存放自己及子级的数据;
		this.karr = [];  //存放要移动到的文件夹中所有数据的title,用于判断title是否+副本
		this.arr = [];  //用于存放 当前页所有文件夹 的数据
		this.sarr = [];  //用于存放 选中文件夹 的数据
		//注：this.arr && this.sarr 中存放的是每个数据是个对象属于复合类型，是赋址的关系，因此修改这里面的数据，等同于修改data中的对应的数据

	}

	//初始化
	init(){

		let that = this;

		//初始渲染数据，生成静态页面
		this.render(0);

		//面包屑
		this.nav(0);

		//框选
		this.select();

		//全选
		this.checkedAll.addEventListener('click',function(ev){

			//全选按钮点击是否添加类名
			this.classList.toggle('checked');

			//循环数组that.arr，使得数组arr中的每一项的checked的值与全选按钮的选中状态保持一致，到达全选或全不选的效果
			that.arr.forEach((e,i)=>{
				e.checked = this.classList.contains('checked');
			})
			//根据当前的数据，重新渲染页面
			that.render(that.id);
		})

		//删除
		this.del.addEventListener('click',function(){
			that.delete();
		})

		//重命名
		this.renameBtn.addEventListener('click',function(){
			that.rename();
		})

		//渲染DOM树及点击事件
		this.treeMenu.innerHTML = this.content.innerHTML = this.tree(-1,-1);
		this.treeEvent();

		//移动到
		this.removeBtn.addEventListener('click',function(){
			that.remove();
		})

		//data中添加新属性num
		this.attr('num',[]);

		//新建文件夹
		this.create.addEventListener('click',function(){
			that.newFolder();
		})

	}

	//生成数据
	getChild(id){
		let arr = [],
			onOff = false;
		//遍历数据data，根据传入的参数id把对应的数据push到arr中
		for(let attr in data){
			if(data[attr].pid === id){
				arr.push(data[attr]);
				onOff = true;
			}
		}
		if(onOff){
			return arr;
		}else{
			return null;
		}
	}

	//渲染
	render(id){

		let that = this;

		//清空内容，下面会重新渲染
		this.fol.innerHTML = '';

		//清空选中数组的数据，以便下面会重新筛选checked的值为true的数据push到this.sarr
		this.sarr.length = 0;

		//生成数据
		this.arr = this.getChild(id);
		
		//当this.arr为null时，说明没有子级数据的时候，显示 “暂无文件”
		if(!this.arr){
			this.fEmpty.style.display = 'block';
		}

		//当this.arr为真的时候，说明有子级数据，循环数据，渲染页面
		else{

			// “暂无文件” 隐藏
			this.fEmpty.style.display = 'none';
			
			//循环数组，每一项为true，返回true，添加类名checked
			checkedAll.className = this.arr.every(e=>e.checked) ? 'checked' : '';

			this.arr.forEach((e,k)=>{

				//循环数组this.arr时，把checked值为true的项，放到数组this.sarr中
				if(e.checked){
					this.sarr.push(e);
				}

				//创建div
				let div = document.createElement('div');
				div.className = e.checked ? 'file-item active' : 'file-item';
				div.dataset.id = e.id;

				//创建img
				let img = new Image;
				img.src = 'img/folder-b.png';

				//创建span
				let span = document.createElement('span');
				span.className = 'folder-name';
				span.innerHTML = e.title;

				//创建input
				let input = document.createElement('input');
				input.className = 'editor';
				input.type = 'text';
				input.value = e.title;

				//创建i
				let i = document.createElement('i');
				i.className = e.checked ? 'checked' : '';

				//点击
				div.addEventListener('click',function(ev){
					that.click.call(that,e,id,ev);
				})

				//双击
				div.addEventListener('dblclick',function(ev){

					//循环数组，设置checked为false
					that.arr.forEach(e=>{e.checked = false});
					//双击
					that.dblclick.call(that,e,ev);
					//面包屑
					that.nav.call(that,e.id);

				})

				//input输入的时候，阻止冒泡
				input.addEventListener('click',function(ev){
					ev.cancelBubble = true;
				})

				//把元素添加到DOM中
				div.appendChild(img);
				div.appendChild(span);
				div.appendChild(input);
				div.appendChild(i);
				this.fol.appendChild(div);
				
			})

			/*
				注意：
				1. 获取动态创建的元素。如果在constructor中就获取这些元素，尽管getElement系列获取的是动态元素，依然是一个空的类数组，因为一开始的时候，页面上并未没有创建元素，因此获取不到；
				2. 此时，上面已经在DOM中创建元素了，在这里，获取这些元素后，在其他地方就可以引用啦~~~开森
			*/
			this.items = this.fol.getElementsByClassName('file-item');
			this.inputs = this.fol.getElementsByTagName('input');
			this.spans = this.fol.getElementsByTagName('span');
			this.fi = this.fol.getElementsByTagName('i');
		}

	}

	//单击
	click(e,id,ev){

		//上下两句同理，e的值是个对象，此时，两个数据中指向的是同一个地址，所以修改了e的checked就是修改了data中对应的数据
		e.checked = !e.checked;
		// data[e.id].checked = !data[e.id].checked;

		//渲染
		this.render(id);
		ev.preventDefault();

	}

	//双击
	dblclick(e,ev){
		data[e.id].checked = false;
		this.render(e.id);
		ev.preventDefault();
	}

	//父级数据
	parent(id){
		if( !data[id] || data[id].pid === -1){
			return data[data[id].pid];
		}
	}

	//所有父级数据
	parents(id){
		let now = data[id],
			parr = [];
		while(now){
			parr.unshift(now);
			now = data[now.pid];
		}
		return parr;
	}

	//所有子级数据
	getChildren(id){
		let arr = this.getChild(id);
		arr && arr.forEach(e=>{
			this.child.push(e);
			this.getChildren(e.id);
		})
	}

	//面包屑
	nav(id=0){
		//先清空内容
		this.breadNav.innerHTML = '';

		//数组arr中放入所有父级数据
		let arr = this.parents.call(this,id);

		//循环数据，渲染页面
		arr.forEach((e,i)=>{

			//循环i，不为最后一项时，创建a标签
			if( !(i === arr.length-1) ){
				let a = document.createElement('a');
				a.href = 'javascript:;';
				a.innerHTML = e.title;
				a.dataset.id = e.id;
				a.onclick = () => {
					this.render(e.id);
					this.nav(e.id);
				}
				this.breadNav.appendChild(a);
			}

			//i为最后一项时，创建span标签
			else{
				let span = document.createElement('span');
				span.innerHTML = e.title;
				span.dataset.id = e.id;
				this.breadNav.appendChild(span);
				this.span = span;
				this.id = this.span.dataset.id * 1;
			}

		})
	}

	//框选
	select(){
		let that = this;

		//在文件夹父盒子处鼠标按下
		this.fol.addEventListener('mousedown',this.down.bind(this));

	}

	//鼠标按下
	down(ev){

		//当事件源触发的是父盒子folders（并非文件夹）的区域的时候，才会出现选框
		if( ev.target.className === 'folders' ){

			//把选中的数据放到this.sarr中，当this.sarr的length不为0的时候，才会把数据data中的checked的值改为false，大清洗，然后渲染页面
			if(this.sarr.length){

				//把数据data中的checked的值改为false
				this.sarr.forEach((e,i)=>{
					data[e.id].checked = false;
				})

				//渲染页面
				// let id = this.span.dataset.id * 1;
				this.render(this.id);

			}

			//把this.sarr数组清空，供鼠标move的时候，把选中的信息push到this.sarr中
			this.sarr.length = 0;

			//选框的位置
			this.disX = ev.pageX - tools.offset(this.fdiv).l;
			this.disY = ev.pageY - tools.offset(this.fdiv).t;
			this.frame.style.display = 'block';
			document.addEventListener('mousemove',this.m = this.move.bind(this));
			document.addEventListener('mouseup',this.u = this.up.bind(this));
			
		}

	}

	//鼠标移动
	move(ev){

		//阻止默认行为 -> 不但阻止了选图片文字的行为，还是阻止了input的失焦行为，所以不能在down的时候阻止
		ev.preventDefault();

		//记录选框的宽高和上下左右的位置
		let epX = ev.pageX - tools.offset(this.fdiv).l;
		let epY = ev.pageY - tools.offset(this.fdiv).t;
		let l = Math.min(this.disX,epX),
			t = Math.min(this.disY,epY),
			r = l + this.frame.offsetWidth,
			b = t + this.frame.offsetHeight;
		this.frame.style.width = Math.abs(epX - this.disX) + 'px';
		this.frame.style.height = Math.abs(epY - this.disY) + 'px';
		this.frame.style.left = l + 'px';
		this.frame.style.top = t + 'px';

		//每次move都把this.sarr数组清空，为了重新收集选中的信息并push到this.sarr中
		this.sarr.length = 0;

		//循环items
		for(let i=0; i<this.items.length; i++){

			//框选中
			if(this.collision(this.frame,this.items[i])){

				//把当前选中的项push到sarr数组中
				this.sarr.push(data[this.items[i].dataset.id*1]);

				//添加类名
				this.items[i].classList.add('active');
				this.fi[i].classList.add('checked');

				//循环sarr数组，把对应的data中的checked的值改变,
				this.sarr.forEach(e=>{
					data[e.id].checked = true;
				})

			}
			//框没有选中
			else{
				this.items[i].classList.remove('active');
				this.fi[i].classList.remove('checked');
				// if(data[this.items[i].dataset.id].checked){
				// 	data[this.items[i].dataset.id].checked = false;
				// }
				
			}
		}

		//checkedAll全选按钮是否选中，取决于当前页面的文件夹是否全部选中
		//方法1：当前页面中的所有文件夹的数据中的checked的值是否都为true
		checkedAll.className = this.arr.every(e=>e.checked) ? 'checked' : '';
		
		//方法2：当前页面文件夹的数量和选中的数组的length是否相同
		// checkedAll.className = (this.items.length === this.sarr.length) ? 'checked' : '';	

	}

	//鼠标抬起
	up(){
		this.frame.style.display = 'none';
		this.frame.style.width = this.frame.style.height = 0;

		document.removeEventListener('mousemove',this.m);
		document.removeEventListener('mouseup',this.u);
	}

	//碰撞
	collision(obj1,obj2){
		let l1 = obj1.offsetLeft;
        let t1 = obj1.offsetTop;
        let b1 = t1 + obj1.offsetHeight;
        let r1 = l1 + obj1.offsetWidth;

        let l2 = obj2.offsetLeft;
        let t2 = obj2.offsetTop - this.fol.scrollTop;
        let b2 = t2 + obj2.offsetHeight;
        let r2 = l2 + obj2.offsetWidth;
        
        if(r1<l2 || b1 < t2 || l1 > r2 || t1 > b2){
            return false;
        }else{
            return true;
        }
	}

	//删除
	delete(){
		let that = this;

		//选中文件夹才可以进行删除操作
		if( this.sarr.length ){
			
			//弹窗显示
			this.tan.style.display = 'block';

			//点击删除按钮
			this.conf[0].onclick = function(){

				//循环选中的数据
				that.sarr.forEach(e=>{

					//把数组num中的对应的项删掉
					if('create' in e){
						delete data[that.id].num[e.create]
					}

					//把数据data中的对应的数据删除掉
					delete data[e.id];

				})

				//根据删除后的数据，进行渲染
				that.render(that.id);

				//弹窗关闭
				that.tan.style.display = 'none';
			}

			//点击关闭、取消按钮
			this.close.onclick = this.conf[1].onclick = function(){
				//弹窗关闭
				that.tan.style.display = 'none';
			}

		}
		//没有选中文件夹时，弹窗提示
		else{
			this.tips('请选择要删除的文件');
		}
		
	}

	//重命名
	rename(){
		let that = this;

		//选中了一项
		if( this.sarr.length === 1 ){

			//先过滤掉当前项，用于去判断修改后的名字是否其他文件夹的名字重复
			let arr = that.arr.filter(e=> e.id != that.sarr[0].id );

			//循环页面上文件夹，判断是否与选中的这一项匹配，如果匹配，对其进行重命名操作
			for(let i=0,len=this.items.length; i<len; i++){
				if(this.items[i].dataset.id == this.sarr[0].id){

					//span隐藏，input显示，并未选中
					this.spans[i].style.display = 'none';
					this.inputs[i].style.display = 'block';
					this.inputs[i].select();

					//修改前的文件夹名称
					let oldVal = this.inputs[i].value;

					//input失焦的时候
					this.inputs[i].onblur = function(){

						//修改后的文件夹名称
						let newVal = this.value.trim();

						//名称为空时
						if(!newVal){
							that.tips('文件名不能为空！');
							this.value = oldVal;
							this.select();
						}

						//名称重复，弹窗提示
						else if( arr.some( e => e.title == newVal ) ){
							that.tips('文件名不能重复！');
						}

						//修改名称，只需修改数据即可，在失焦的时候，会根据新的数据渲染页面
						else{
							that.sarr[0].title = newVal;
							//渲染DOM树及点击事件
							that.treeMenu.innerHTML = that.content.innerHTML = that.tree(-1,-1);
							that.treeEvent();
						}
						
					}
				}
			}

		}else if( this.sarr.length > 1 ){
			this.tips('选择的文件不能多于1个');
		}else{
			this.tips('请选择要重命名的文件');
		}
	}

	//渲染DOM树
	tree(id,num){

		//清空内容
		this.treeMenu.innerHTML = this.content.innerHTML = this.temp = '';

		//num用于在不同层级上设置padding-left值
		num++;

		//获取数据
		let arr = this.getChild(id);

		//temp拼接字符串
		this.temp += `<ul style="padding-left:${ num * 5 }px">`;
		
		//循环数据，把需要的DOM元素，拼接到temp
		arr.forEach(e=>{
			let ary = this.getChild(e.id);
			this.temp += `<li>
                        <div class="tree-title ${ary ? 'tree-ico' : ''} close" data-id="${e.id}">
                            <span><i></i>${e.title}</span>
                        </div>
                    </li>`;
	        if(ary){
	        	this.temp += this.tree(e.id,num);
	        }
		})
		this.temp += `</ul>`;

		this.trtitle = this.treeMenu.getElementsByClassName('tree-title');
		this.motitle = this.mtree.getElementsByClassName('tree-title');

		return this.temp;
	}

	//左侧DOM树的点击事件
	treeEvent(){

		let that = this;

		for(let i=0,len=this.trtitle.length; i<len; i++){

			//点击
			this.trtitle[i].onclick = function(){

				//数组arr存放获取的子级数据，根据 是否存在数组arr 和 arr的length，判断是否有子级
				let arr = that.getChild(this.dataset.id*1);

				//有子级，就添加显示隐藏效果
				if(arr && arr.length){
					//添加移除类名 && 显示隐藏子级
					this.parentNode.nextElementSibling.style.display = this.children[0].classList.toggle('open') ? 'none' : 'block';
				}

			}
		}

	}


	//移动到
	remove(){

		let that = this;

		//有选中文件时
		if( this.sarr.length ){

			//弹窗提示
			this.mtree.style.display = 'block';

			//循环title
			for(let i=0,len = this.motitle.length; i<len; i++){

				//每个title的加点击事件
				this.motitle[i].onclick = function(ev){
					
					//大清洗
					for(let k=0,klen = that.motitle.length; k<klen; k++){
						that.motitle[k].style.background = '';
					}

					//加背景颜色
					this.style.background = '#ccc';

					//this.kid把点击的id的值存起来，用于，点击ok按钮的时候，把要移动的数据放到这个id数据的下面
					that.kid = this.dataset.id * 1;

				}
			}

			//点击ok按钮
			this.ok.onclick = function(){

				//循环选中的数据
				that.sarr.forEach(e=>{

					//把当前选中的数据及子级的数据 push到数组child中
					that.child.push(e);
					that.getChildren(e.id);

				})

				/*
					判断数组child中的id是否与要移入的文件夹的id一致，
					不一致：说明移入的文件是符合逻辑的
				*/
				if( that.child.every(f=> f.id !== that.kid ) ){

					//循环选中的数据
					that.sarr.forEach(e=>{

						//先清空that.karr
						that.karr.length = 0;

						//that.sarr中存放要移动到的文件夹中的所有数据
						that.karr = that.getChild(that.kid);

						//移动到的文件夹中所有数据的title 与 选中数据中的title 有重名的时候
						if(that.karr.some(s=>s.title === e.title)){
							
							//过滤出来，创建一个新数组
							let n = that.karr.filter(m=>{
								let re = new RegExp( '^' + e.title + '(-副本)*$');
								return re.test(m.title);
							}).sort((a,b)=>{
								return a.title - b.title
							})

							//有待改进、删除时
							e.title = n[n.length-1].title + '-副本';
						}

						//把选中数据的pid改成需要移入的文件夹的id，再渲染数据即可
						data[e.id].pid = that.kid;

						//把checked值改为false取消选中
						data[e.id].checked = false;

					})

				}
				//一致：说明选中的文件要移入到自己的文件夹或者自己子级的文件夹，不符合逻辑
				else{
					that.tips('请移入到合法有效的文件夹')
				}

				//渲染当前页
				that.render(that.id);

				//渲染DOM树及点击事件
				that.treeMenu.innerHTML = that.content.innerHTML = that.tree(-1,-1);
				that.treeEvent();

				//点击关闭、取消按钮
				that.mtree.style.display = 'none';

			}

			//点击关闭、取消按钮，提示弹窗隐藏
			this.tclose.onclick = this.cancel.onclick = ()=>{
				this.mtree.style.display = 'none';
			}

		}

		//没有选中文件，弹窗提示
		else{
			this.tips('请选择要移动的文件!');
		}

	}


	//新建文件夹
	newFolder(){

		let that = this;

		this.fEmpty.style.display = 'none';

		//新建文件夹的编号
		this.v = '';

		//创建div
		let div = document.createElement('div');
		div.className = 'file-item';

		//创建img
		let img = new Image;
		img.src = 'img/folder-b.png';

		//创建input
		let input = document.createElement('input');
		input.className = 'editor';
		input.style.display = 'block';
		input.type = 'text';

		//当num对应的数组是为了存放新建文件夹的名称后面的编号的，没有值，说明是还只有一个名称为新建文件夹的数据
		if(!data[this.id].num.length){
			data[this.id].num[0] = 0;
		}
		//当num对应的数组中length不为0，说明有多个名称为新建文件夹的数据，此时需要对编号进行筛选赋值
		else{

			//循环num对应的数组，并且一直循环至length这一项，这样可以在数组的数字都满足条件的时候，继续添加新的编号
			for(let i=0,len = data[this.id].num.length; i<len+1; i++ ){
				
				/*
					判断数据的为undefined的有两种情况
						1. 这一项被删除了，此时查找到这一项得到undefined;
						2. 数组中的一直含有有效的数字，便一直循环至length这一项，因为数组中没有这一项，查找必然得到undefined
				*/
				if(data[this.id].num[i] === undefined){

					//此时，把值为undefined这一项改为当前的i值，并把i值赋给v，用于名称后面加上编号
					data[this.id].num[i] = i;
					this.v = i;
					break;  //此时的break略显重要，在循环至一个值为undefined的时候，拿到编号排序中最小的编号，要立即跳出循环，避免循环继续，取到的值不是最小的值
				}
			}
		}

		input.value = '新建文件夹'+this.v;

		//input失焦
		input.onblur = function(){
			let arr = that.getChild(that.id);
			let flag = arr && arr.some(e=>e.title == this.value);

			//当名字重复时，val还原回之前的名字，选中状态，弹窗提示
			if(flag){
				this.value = '新建文件夹'+that.v;
				this.select();
				that.tips('名称不能重复哦！');
				return;  //return必须写，不然还会继续执行下面的代码
			}

			//当名字为空时，val还原回之前的名字，选中状态，弹窗提示
			if(!this.value){
				this.value = '新建文件夹'+that.v;
				this.select();
				that.tips('名称不能为空哦！');
				return;  
			}

			//当名字已经修改了，不为新建文件夹+编号v的时候
			if( this.value !== '新建文件夹' + that.v ){

				//把num对应的数组中的这一项删除掉，使下次可以进行筛选赋值
				delete data[that.id].num[that.v];
				that.v = 'no';

				//虽然修改了名字 不为 新建文件夹+编号v，但是有可能为 新建文件夹+其他自定义的一个数字编号，此时，需要把这个编号放到数组中，供之后的循环判断筛选赋值
				if(/^新建文件夹(\d+)$/.test(this.value)){
					let n = this.value.match(/^新建文件夹(\d+)$/)[1]*1;
					data[this.id].num[n] = n;
					that.v = n;
				}

				

			}

			//新建文件夹对应的数据
			let cid = + new Date;
			data[cid] = {
				"id": cid,
		        "pid": that.id,
		        "title": this.value,
		        "type": "file",
		        "checked":false,
		        "num":[]
			}

			//如果v的值不为no，说明新建成功，并且名字为新建文件夹+编号，此时在对应的这个数据中加入新的属性create，用来记录新建文件夹的编号
			if( that.v !== 'no' ){
				data[cid].create = that.v;
			}

			//根据新的数据，重新渲染页面
			that.render(that.id);

			//渲染DOM树及点击事件
			that.treeMenu.innerHTML = that.content.innerHTML = that.tree(-1,-1);
			that.treeEvent();

		}

		//创建i
		let i = document.createElement('i');

		//input输入的时候，阻止冒泡
		input.addEventListener('click',function(ev){
			ev.cancelBubble = true;
		})

		//把元素添加到DOM中
		div.appendChild(img);
		div.appendChild(input);
		div.appendChild(i);
		this.fol.appendChild(div);

		input.select();


	}


	//批量添加属性
	attr(attr,val){
		for(let i in data){
			if(Array.isArray(val)){
				data[i][attr] = [];
			}else{
				data[i][attr] = val;
			}
			
		}
	}


	//小提示框显示
	tips(h){

		//提示框显示
		this.tip.style.opacity = 1;
		this.tip.style.top = '30px';
		this.tipt.innerHTML = h;

		//1500ms后 提示框隐藏
		this.timer = setTimeout(()=>{
			this.tip.style.opacity = 0;
			this.tip.style.top = '-40px';
			clearInterval(this.timer);
		},1500)
	}

}

new CloudDisk().init();


/*
	总结：
	1. 选中、框选  ->  数组sarr是用的同一个吗？
		1. 框选的时候用到了this.sarr，用于鼠标move把选中项的信息，存起来
		2. 点击选中的时候，没有用到this.sarr，此时的思路是：
			1) 每次点击把当前项的checked 在对应的data中的checked的值取反，以改变数据，用于后面的页面渲染
			2) 获取当前页面的面包屑中的id???????????，来渲染当前页面
			3) render方法中已经设置了checked的class的值，如下:
				checkedAll.className = arr.every(e=>e.checked) ? 'checked' : '';
		3. 点击选中的之后，不能取消选中

	2. 全部点击选中  ->  checked没有选中  --> 在获取这个布尔值的时候，包了中括号，导致return的返回值不是我们预想的值
		1. arr.every(e=>{e.checked})  //错误，使用return值的时候，简写成一行的时候，不能使用中括号
		2. arr.every(e=>e.checked)    //正确

	3. down的时候，并没有取消选中，而是在move的时候取消选中了，
		1. 是因为在move的时候，把数组this.sarr清空，在重新push当前页面数据，因此可以取消选中，
		2. 所以，需要在down的时候，就需要取消选中，把data中的对应的checked的值变为false，然后渲染

	4. render(id)   render(e.id)
		闭包把e.id存起来，供接下来的单击事件用id，形参去拿实参

	5. 新建文件夹名字相同的时候，弹窗提示了，却新建多个文件夹？
		在判断名字相同的语句中，没有写return，导致，继续执行了下mai面的代码
	
	6. 669行

	
*/


