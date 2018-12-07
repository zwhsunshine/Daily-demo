function Operation(){



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
		this.rv = false;   //returnValue
		this.child = [];   //存放自己及子级的数据;
		this.karr = [];   //存放要移动到的文件夹中所有数据的title,用于判断title是否+副本
		this.arr = [];   //用于存放 当前页所有文件夹 的数据
		this.sarr = [];   //用于存放 选中文件夹 的数据
		//注：this.arr && this.sarr 中存放的是每个数据是个对象属于复合类型，是赋址的关系，因此修改这里面的数据，等同于修改data中的对应的数据

		return new OFn()

}

let a = new Operation();
console.log(a);
