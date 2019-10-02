var $=function(id){
	return document.getElementById(id);
};
var arrBG=[
	{link:'images/img_1.jpg'},
	{link:'images/img_2.jpg'},
	{link:'images/img_3.jpg'}
];
function controlTabs(e, idImg){
	var arrImg = document.getElementsByClassName('ourMagical_Img')[0].children;
	var tabs = document.getElementsByClassName('magical_tabs')[0];
	for(var i=0;i<arrImg.length;i++){
		if(arrImg[i].getAttribute('id')==idImg){
			$(idImg).style.display = "block";
			tabs.children[i].children[3].style.display = "block";
		}
		else{
			arrImg[i].style.display = 'none';
			tabs.children[i].children[3].style.display = "none";
		}
	}
	var arrtabs = document.getElementsByClassName('magical_tabs')[0].children;
	for(var i=0;i<arrtabs.length;i++){
		if(arrtabs[i].getAttribute('class')=='magical_tab magical_tabActive'){
			arrtabs[i].setAttribute('class', 'magical_tab');
		}
	}
	e.setAttribute('class', 'magical_tab magical_tabActive');
}
var arrImgslide = document.getElementsByClassName('slideImg');
function slideImg(){
	var axis = 0, arr2 =[];
	var timer = setInterval(transImg, 5);
	function transImg(){
		axis++;
		if(axis==101){
			clearInterval(timer);
		}
		else{
			for(var i=0;i<arrImgslide.length;i++){
				if(i==0){
					arrImgslide[0].style.position = 'static';
					arrImgslide[0].style.display = 'block';
					arrImgslide[0].style.transform = 'translateX('+(-axis)+'%)';
				}		
				else{
					if(i==1){
						arrImgslide[1].style.display = 'block';
						arrImgslide[1].style.position = 'absolute';
						arrImgslide[1].style.top = '40px';
						arrImgslide[1].style.right = '-100%'
						arrImgslide[1].style.transform = 'translateX('+(-axis)+'%)';
					}
					else{
						arrImgslide[i].style.display = 'none';

					}
				}	
			}	
		}
	}
	for(var i =0;i<arrImgslide.length;i++){
		arr2[i] = arrImgslide[i+1];
		if(i==arrImgslide.length-1){
			arr2[i] = arrImgslide[0];
		}
	}
	arrImgslide = arr2;
}
function loopSlide(){
	var loopslide = setInterval(slideImg, 3000);
}
function setCheckDate(e){
	var classDateCheck = document.getElementsByClassName('dateCheck');
	if(classDateCheck.length==1){
		var parentBoard = classDateCheck[0].parentNode;
		parentBoard.removeChild(parentBoard.children[1]);
	}
	var arrMonth = ['Jan', 'Feb','Mar', 'Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
	e.parentElement.style.position = 'relative';
	var boardDate = document.createElement('div');
	var attr = document.createAttribute('class');
	attr.value = 'dateCheck';
	boardDate.setAttributeNode(attr);
	boardDate.style.position = 'absolute';
	boardDate.style.right= '0';
	boardDate.style.display = 'grid';
	e.parentElement.appendChild(boardDate);
	//boardDate.addEventListener('mouseout', function(){boardDate.style.display = 'none'});
	//----------------
	var monthTabs = document.createElement('div');

	var attrMonthTabs = document.createAttribute('class');
	attrMonthTabs.value = 'monthTabs';
	monthTabs.setAttributeNode(attrMonthTabs);
	var month = document.createElement('h3');
	var signPrev = document.createElement('button');
	var attrIdPre = document.createAttribute('id');
	attrIdPre.value = 'prev';
	signPrev.setAttributeNode(attrIdPre);
	signPrev.onclick = function(){handleMonth(this)};
	signPrev.innerHTML = '<';
	signPrev.style.float = 'left';

	var signNext = document.createElement('button');
	var attrIdNex = document.createAttribute('id');
	attrIdNex.value = 'Next';
	signNext.setAttributeNode(attrIdNex);
	signNext.onclick = function(){handleMonth(this)};
	signNext.innerHTML = '>';
	signNext.style.float = 'right';
	//----------
	var tabName = e.parentElement.parentNode.parentNode.getAttribute('id');
	console.log(tabName);
	if(tabName== 'checkin'){
		month.innerHTML = $('monthCheckin').innerHTML;
	}
	if(tabName=='checkout'){
		month.innerHTML= $('monthCheckout').innerHTML;
	}
	//month.innerHTML = 'May';
	monthTabs.style.textAlign = 'center';
	month.style.background = 'red';
	month.style.padding = '.5em';
	month.style.color = 'white';
	month.style.borderRadius = '2px';
	monthTabs.appendChild(signNext);
	monthTabs.appendChild(signPrev);
	monthTabs.appendChild(month);
	boardDate.appendChild(monthTabs);
	var dateContain = document.createElement('div');
	var attrDate = document.createAttribute('class');
	attrDate.value = 'dateBlock'
	dateContain.setAttributeNode(attrDate);
	boardDate.appendChild(dateContain);
	for(var i=1; i<32;i++){
		var dateNode = document.createElement('button');
		var attrBtn = document.createAttribute('class');
		attrBtn.value = 'btnDate';
		dateNode.setAttributeNode(attrBtn);
		dateNode.innerHTML = i;
		dateNode.onclick = function(){handleDate(this)};
		dateContain.appendChild(dateNode);
	}
	//------------------function handle----------------
	function handleDate(e){
		var tabsDate = e.parentElement.parentNode.parentNode.parentNode;
		if(tabsDate.children[1].getAttribute('id') =='monthCheckin'){
			tabsDate.children[0].innerHTML = formatDate(e.innerHTML);
		}
		else{
			tabsDate.children[0].innerHTML = formatDate(e.innerHTML);
		}
	}
	function handleMonth(e){
		var tabName = e.parentElement.parentNode.parentNode.parentNode.children[1].getAttribute('id');
		console.log(tabName);
		for(var i=0;i<arrMonth.length;i++){
			if(e.getAttribute('id')=='prev'){
				if(arrMonth[i]==month.innerHTML){
					if(arrMonth[i-1]==undefined){
						month.innerHTML = arrMonth[arrMonth.length-1];
					}
					else{
						month.innerHTML = arrMonth[i-1];
					}
					if(tabName=='monthCheckin'){
						$('monthCheckin').innerHTML = month.innerHTML;
					}
					if(tabName=='monthCheckout'){
						$('monthCheckout').innerHTML = month.innerHTML;
					}
					break;

				}
			}
			else{
				if(arrMonth[i]==month.innerHTML){
					if(arrMonth[i+1]==undefined){
						month.innerHTML = arrMonth[0];
					}
					else{
						month.innerHTML = arrMonth[i+1];
					}
					if(tabName=='monthCheckin'){
						$('monthCheckin').innerHTML = month.innerHTML;
					}
					if(tabName=='monthCheckout'){
						$('monthCheckout').innerHTML = month.innerHTML;
					}
					break;

				}
			}
		}
	}
	function formatDate(str){
		if(str.length<2){
			str = '0' + str;
		}
		return str;
	}
}
function clickOut(e){
	var classSetdate = document.getElementsByClassName('setdate');
	var classDateCheck = document.getElementsByClassName('dateCheck');
	if(e.target.getAttribute('class')!=classSetdate[0].getAttribute('class')){
		classDateCheck[0].style.display = 'none';
		var parentBoard = classDateCheck[0].parentNode
		parentBoard.removeChild(parentBoard.children[1]);

	}
}
function numGuest(e){
	var guestAMount = e.parentNode.parentNode.children[1];
	var a = parseInt(guestAMount.innerHTML), k = 1;
	if(e.getAttribute('class')=='fas fa-caret-down'){
		k = -1 ;
		if(a==0){k=null};
	}
	
	if(guestAMount.innerHTML[0]=='0'){
		a = parseInt(guestAMount.innerHTML.substr(1));
	}
	if(a<9 || (a<11 && k<0)){
		guestAMount.innerHTML = '0'+ (a + k) ; 
	}
	else{
		guestAMount.innerHTML = a + k;
	}
}
window.onload = function(){
	var tabActive = document.getElementsByClassName('magical_tabs')[0];
	controlTabs(tabActive.children[1], 'magi_2');
	var img = $("slideImg");
	loopSlide();
	var bodyTag = document.getElementsByTagName('body');
	bodyTag[0].addEventListener('click', clickOut);
}
