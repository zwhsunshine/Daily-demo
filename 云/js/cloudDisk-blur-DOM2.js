

class CloudDisk{
	constructor(data){
		this.data = data;
		this.fol = document.getElementsByClassName('folders')[0];
		this.arr = [];
		this.items = this.fol.getElementsByClassName('file-item');
		this.fname = this.fol.getElementsByClassName('folder-name');
		this.editor = this.fol.getElementsByClassName('editor');
		this.fi = this.fol.getElementsByTagName('i');
		this.disX = this.disY = 0;
		this.frame = document.getElementById('frame');
		this.fdiv = document.getElementsByClassName('folddiv')[0];
		this.create = document.getElementById('create');
	}

	//初始化
	init(){
		//初始渲染数据，生成静态页面
		this.newArr();

		//框选
		this.select();

	}

	//渲染数据，生成静态文件
	render(arr){

		this.fol.innerHTML = '';
		arr.forEach((e)=>{
			let cdiv = document.createElement('div');
			cdiv.className = 'file-item';
			// cdiv.idNum = e.id;
			cdiv.innerHTML = `
				<img src="img/folder-b.png" alt="" />
				<span class="folder-name">${e.title}</span>
				<input type="text" class="editor" value="${e.title}" />
				<i></i>`;
			this.fol.appendChild(cdiv);
		})

		//渲染之后，在元素上添加点击事件
		this.event();
		
	}

	//判断
	newArr(idNum=-1){
		this.arr = [];
		for(let attr in data){
			if(data[attr].pid === idNum){
				this.arr.push(data[attr]);
			}
		}
		this.render(this.arr);
	}

	//双击、单击
	event(){
		let that = this;
		for(let i = 0; i < this.items.length; i++){

			//单击事件，选中
			this.items[i].addEventListener('click',function(ev){

				//大清洗，全部文件夹不选中
				for(let k=0; k<that.items.length; k++){
					that.dbselect(k);
				}

				//点击的当前文件夹选中
				that.click.call(that,i,ev);

				//每次点击选中之后，在span标签上添加点击事件，可以调用rename()重命名（重命名的前提是已经选中了文件夹）
				that.fname[i].addEventListener('click',that.re = that.rename.bind(that,i));
				
				//input focus状态

				//点击input的时候，阻止冒泡
				that.editor[i].addEventListener('click',function(ev){
					ev.cancelBubble = true;
				});

				//input失去焦点
				// if(! (ev.target.nodeName === 'input')){
				// 	that.editor[i].addEventListener('blur',that.b = that.blur.bind(that,i));
				// }
				// that.editor[i].addEventListener('blur',that.b = that.blur.bind(that,i));



				/*
					1. 在文件夹的父元素（并非文件夹）的区域中点击，取消文件夹选中状态
					2. 如果用DOM 2级写法addEventListener添加点击事件,写法如下：
						that.fol.addEventListener('click',that.fup.bind(that,i));
						此时有坑：添加移除必须是共用一个函数，不能传参，如果传参的话，绑定和解绑的时候不能一一对应。
						参考网址：https://blog.csdn.net/bingkingboy/article/details/50160221
				*/
				that.fol.onclick = that.fup.bind(that,i);

				//新建文件夹
				that.create.addEventListener('click',that.newFolder.bind(that,i);)

				//阻止默认行为
				that.prevent(ev);

			});

			//双击事件，进入下一级
			this.items[i].addEventListener('dblclick',function(ev){
				that.dblclick.call(that,this,i);
				that.prevent(ev);
			});
		}
	}

	//双击
	dblclick(e,i){
		// console.log(this.arr,this.arr[i].id)
		this.newArr(this.arr[i].id);
	}

	//单击 -> 文件夹选中状态
	click(i){

		this.arr[i].checked = true;
		this.items[i].classList.add('active');
		this.fi[i].className = 'checked';

	}

	//文件夹未选中状态
	dbselect(i){
		this.arr[i].checked = false;
		this.items[i].classList.remove('active');
		this.fi[i].className = '';
	}

	//失去焦点时 -> 文件夹未选中状态
	fup(i,ev){

		if( !(ev.target.nodeName === 'INPUT' || ev.target.className === 'folders') ){
			console.log(1);
			this.editor[i].onblur = this.blur.bind(this,i);
		}
		//当点击文件夹以外的大盒子的区域时，文件夹是未选中的状态，此时，触发的事件源是folders
		if(ev.target.className === 'folders'){

			//取消选中
			this.dbselect(i);

			//移除 显示文件夹名称的span标签上的点击事件 和 父盒子folders的鼠标抬起的事件
			this.fname[i].removeEventListener('click',this.re);

		}

	}

	//重命名
	rename(i,ev){

		//显示名字的p标签隐藏，输入名字的input框显示
		this.editor[i].style.display = 'block';
		this.editor[i].select();
		this.fname[i].style.display = 'none';

		//阻止冒泡
		// ev.cancelBubble = true;
	}

	//input失去焦点时 -> 修改后的title更新到数据里面，重新渲染数据
	blur(i){
		console.log(i);
		let v = this.editor[i].value;
		// this.editor[i].blur();
		this.arr[i].title = v;
		this.render(this.arr);
		this.fname[i].style.display = 'block';
		this.editor[i].style.display = 'none';
	}

	//框选
	select(){

		this.fol.addEventListener('mousedown',this.down.bind(this));

	}

	//鼠标按下
	down(ev){

		//当事件源触发的是父盒子folders（并非文件夹）的区域的时候，才会出现选框
		if( ev.target.className === 'folders' ){
			this.disX = ev.pageX - tools.offset(this.fdiv).l;
			this.disY = ev.pageY - tools.offset(this.fdiv).t;
			this.frame.style.display = 'block';
			document.addEventListener('mousemove',this.m = this.move.bind(this));
			document.addEventListener('mouseup',this.u = this.up.bind(this));
			
			//阻止默认行为 -> 防止框选的时候会出现系统默认是选中文字图片的效果
			this.prevent(ev);
		}

		
	}

	//鼠标移动
	move(ev){

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


		/*
			循环得到每个文件夹的上下左右的位置，用于和选框比较，
			以此来判断是否框选到文件夹，框选后文件夹为选中状态
		*/
		for(let i=0; i<this.items.length; i++){
			let l2 = this.items[i].offsetLeft,
				t2 = this.items[i].offsetTop,
				r2 = l2 + this.items[i].offsetWidth,
				b2 = t2 + this.items[i].offsetHeight;

			//当选框没有触碰到文件夹的时候，文件夹为未选中状态
			if( r < l2 || b < t2 || l > r2 || t > b2 ){

				//文件夹未选中状态
				this.dbselect(i);

				//移除 显示文件夹名称的span标签上的点击事件 和 父盒子folders的鼠标抬起的事件
				// this.fname[i].removeEventListener('click',this.re2);
				// this.fol.removeEventListener('mouseup',this.f2);

			}else{
				// console.log(i);
				// console.log('yes');

				//当选框 框选到文件夹的时候，触发点击事件，文件夹为选中状态
				this.click(i);

				//当事件源是folders的时候，文件夹为未选中状态。因为鼠标抬起的时候在文件夹以外的大盒子的区域。此时，文件夹取消选中状态
				// this.fname[i].addEventListener('click',this.re2 = this.rename.bind(this,i));
				// this.fol.addEventListener('mouseup',this.f2 = this.fup.bind(this,i));
				
			}
		}
		// this.prevent(ev);
	}
	up(){
		this.frame.style.display = 'none';
		this.frame.style.width = this.frame.style.height = 0;
		document.removeEventListener('mousemove',this.m);
		document.removeEventListener('mouseup',this.u);
	}

	//新建文件夹
	newFolder(i){
		console.log(i);
	}



	//阻止默认行为
	prevent(ev){
		ev.preventDefault();
	}


	//重置
	refresh(){

	}



}

new CloudDisk(data).init();

