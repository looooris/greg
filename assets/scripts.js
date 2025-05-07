function markToGrade(mark) {
	if (mark == "22"){
		return 'A1'
	} else  if (mark  >= 21){
		return 'A2'
	} else if (mark >= 20){
		return 'A3'
	} else if (mark  >= 19){
		return 'A4'
	} else if (mark  >= 18){
		return 'A5'
	} else if (mark  >= 17){
		return 'B1'
	} else if (mark  >= 16){
		return 'B2'
	} else if (mark  >= 15){
		return 'B3'
	} else if (mark  >= 14){
		return 'C1'
	} else if (mark  >= 13){
		return 'C2'
	} else if (mark  >= 12){
		return 'C3'
	} else if (mark  >= 11){
		return 'D1'
	} else if (mark  >= 10){
		return 'D2'
	} else if (mark  >= 9){
		return 'D3'
	} else if (mark  >= 8){
		return 'E1'
	} else if (mark  >= 7){
		return 'E2'
	} else if (mark  >= 6){
		return 'E3'
	} else if (mark  >= 5){
		return 'F1'
	} else if (mark  >= 4){
		return 'F2'
	} else if (mark  >= 3){
		return 'F3'
	} else if (mark  >= 2){
		return 'G1'
	} else if (mark  >= 1){
		return 'G2'
	} else { return 'G3'}

}

function gradeToMark(mark) {
	mark = mark.toUpperCase();
	
	table = {
		'A1' : 22,
		'A2' : 21,
		'A3' : 20,
		'A4' : 19,
		'A5' : 18,
		'B1' : 17,
		'B2' : 16,
		'B3' : 15,
		'C1' : 14,
		'C2' : 13,
		'C3' : 12,
		'D1' : 11,
		'D2' : 10,
		'D3' : 9,
		'E1' : 8,
		'E2' : 7,
		'E3' : 6,
		'F1' : 5,
		'F2' : 4,
		'F3' : 3,
		'G1' : 2,
		'G2' : 1,
		'G3' : 0,
	};
	
	if (mark in table) {
		return table[mark];
	} else {
		return null;
	}
}

function percentToGrade(percent) {
	if (percent >= 89.5){
		return 'A1'
	} else if (percent >= 84.5){
		return 'A2'
	} else if (percent >= 79.5){
		return 'A3'
	} else if (percent >= 74.5){
		return 'A4'
	} else if (percent >= 69.5){
		return 'A5'
	} else if (percent >= 65.5){
		return 'B1'
	} else if (percent >= 62.5){
		return 'B2'
	} else if (percent >= 59.5){
		return 'B3'
	} else if (percent >= 55.5){
		return 'C1'
	} else if (percent >= 52.5){
		return 'C2'
	} else if (percent >= 49.5){
		return 'C3'
	} else if (percent >= 45.5){
		return 'D1'
	} else if (percent >= 42.5){
		return 'D2'
	} else if (percent >= 39.5){
		return 'D3'
	} else if (percent >= 36.5){
		return 'E1'
	} else if (percent >= 34.5){
		return 'E2'
	} else if (percent >= 29.5){
		return 'E3'
	} else if (percent >= 24.5){
		return 'F1'
	} else if (percent >= 19.5){
		return 'F2'
	} else if (percent >= 14.5){
		return 'F3'
	}else if (percent >= 9.5){
		return 'G1'
	} else if (percent >= 4.5){
		return 'G2'
	} else {
		return 'G3'
	}  
}

var Modules = {
	workspace : {},
	modCount  : 0,
	
	init : function() {
		Modules.workspaceElement = document.getElementById('workspace');
		Modules.totalElement     = document.getElementById('total');
		Modules.errorMessage = document.getElementById('error');
		Modules.disclaimer = document.getElementById('disclaimer')
		
		Modules.total = {
			'mElement' : Modules.totalElement.getElementsByClassName('marks')[0],
			'gElement' : Modules.totalElement.getElementsByClassName('grade')[0],
			'wElement' : Modules.totalElement.getElementsByClassName('weight')[0],
		};
		
		Modules.addModule();
		Modules.addModule();
		
		var button     = document.getElementById('add');
		button.onclick = Modules.addModule;
	},
	
	addModule : function(modElement) {
		var modElement = document.createElement('div');
		modElement.id  = 'mod-' + Modules.modCount;
		Modules.modCount++;
		modElement.innerHTML = '<h4>Module</h4><label>Percent: <input class=percent type=number max=22 min=0></label><label>Marks: <input class=marks type=number max=22 min=0></label><label>Grade: <input class=grade></label><label>Weight: <input class=weight type=number value=50></label><button class=remove style=width:100%>Remove module</button>';
		
		Modules.workspaceElement.insertBefore(modElement, Modules.totalElement);
		
		var module = {
			'pElement' : modElement.getElementsByClassName('percent')[0],
			'mElement' : modElement.getElementsByClassName('marks')[0],
			'gElement' : modElement.getElementsByClassName('grade')[0],
			'wElement' : modElement.getElementsByClassName('weight')[0],
		};

		
		
		module.marks   = parseFloat(module.mElement.value) || 0;
		module.weight = parseInt(module.wElement.value) || 0;
		module.percent = parseInt(module.pElement.value) || 0;
		
		Modules.workspace[modElement.id] = module;
		
		modElement.onkeyup = Modules.onInputChange;
		modElement.onclick = Modules.onInputChange;

		var removebutton = modElement.getElementsByClassName('remove')[0];
		removebutton.onclick = function() {
			if (Modules.modCount > 1){
				delete Modules.workspace[modElement.id];
				modElement.remove(); 
				Modules.updateTotal(); 
				Modules.modCount--;
			} else {
				Modules.errorMessage.innerHTML = 'You can\'t remove your last module!'
			}
	
		};

		
		Modules.updateTotal();
	},
	
	updateTotal : function() {
		Modules.errorMessage.innerHTML = ''
		Modules.disclaimer.innerHTML = ''
		var totalMarks = 0,
		totalweight   = 0;
		
		for (var moduleId in Modules.workspace) {
			if (!Modules.workspace.hasOwnProperty(moduleId)) {
				continue;
			}
			
			var module = Modules.workspace[moduleId];
			
			totalMarks  += module.marks * (module.weight / 100);
			totalweight += module.weight;
		}

		if (totalweight != 100){
			Modules.errorMessage.innerHTML = 'Your total weight doesn\'t add up to 100% - are you sure it\'s correct?'
		} 
	
		if ([9, 12, 15, 18].includes(Math.round(totalMarks)) && Math.round(totalMarks) > totalMarks){
			Modules.disclaimer.innerHTML = 'You are within 0.5 marks of the next degree classification. This could potentially be rounded up.'

		};

		if (totalMarks > 22){
			Modules.errorMessage.innerHTML = 'You\'ve got more than 22 marks! I\'d like to think you\'re that cracked, but you\'ve probably got something wrong.'
		}

		
		Modules.total.mElement.value = totalMarks;
		Modules.total.gElement.value = markToGrade(totalMarks);
		Modules.total.wElement.value = totalweight;
	},
	
	onInputChange : function(e) {
		if (e.target.tagName != 'INPUT') {
			return;
		}
		
		var input = e.target,
		module    = Modules.workspace[this.id];
		
		switch (input.className) {
			case 'marks':
				var marks = parseFloat(e.target.value),
				grade     = markToGrade(marks);
				
				module.marks = marks;
				module.percent = 0;
				module.gElement.value = grade;
				module.pElement.value = null;
			break;
			
			case 'grade':
				var grade = e.target.value,
				marks     = gradeToMark(grade);
				
				module.marks = marks;
				module.percent = 0;
				module.mElement.value = marks;
				module.pElement.value = null;
			break;

			case 'percent':
				var percent = e.target.value,
				grade = percentToGrade(percent);
				marks = gradeToMark(grade);

				module.grade = grade;
				module.marks = marks;
				module.mElement.value = marks;
				module.gElement.value = grade;
			break;
			
			case 'weight':
				module.weight = parseInt(e.target.value);
			break;
			
		}
		
		Modules.updateTotal();
	},
};

Modules.init();
