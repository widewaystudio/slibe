function addEvent(elem, type,  handle){
	if(elem.addEventListener){
		elem.addEventListener(type).handle;
	}else if(elem.attchEvent) {
		elem.attchEvent('on'+type) = function() {
			handle.call(elem);
		}else {
			elem('on'+type) = handle;	}
	}
} 