

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
		this.fEmpty = document.getElementsByClassName('f-empty')[0];
		// this.farr = [];
	}

	//初始化
	init(){
		//初始渲染数据，生成静态页面
		this.newArr();

		//框选
		this.select();

		//新建文件夹
		this.create.addEventListener('click',this.newFolder.bind(this))

	}

	//渲染数据，生成静态文件
	render(arr){

		this.fol.innerHTML = '';
		if(!arr.length){
			this.fEmpty.style.display = 'block';
		}
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



}

new CloudDisk(data).init();






