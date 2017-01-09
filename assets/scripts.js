function markToGrade(grade) {
	table = {
		22 : 'A1',
		21 : 'A2',
		20 : 'A3',
		19 : 'A4',
		18 : 'A5',
		17 : 'B1',
		16 : 'B2',
		15 : 'B3',
		14 : 'C1',
		13 : 'C2',
		12 : 'C3',
		11 : 'D1',
		10 : 'D2',
		9  : 'D3',
		8  : 'E1',
		7  : 'E2',
		6  : 'E3',
		5  : 'F1',
		4  : 'F2',
		3  : 'F3',
		2  : 'G1',
		1  : 'G2',
		0  : 'G3',
	};
	
	if (grade in table) {
		return table[grade];
	} else {
		return null;
	}
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

var Modules = {
	workspace : {},
	modCount  : 0,
	
	init : function() {
		var modules = document.getElementsByClassName('module'),
		total       = document.getElementById('total');
		
		for (i=0; i < modules.length; i++) {
			Modules.addModule(modules[i]);
		}
		
		Modules.total = {
			'mElement' : total.getElementsByClassName('marks')[0],
			'gElement' : total.getElementsByClassName('grade')[0],
			'pElement' : total.getElementsByClassName('percent')[0],
		};
		
		Modules.updateTotal();
	},
	
	addModule : function(modElement) {
		var module = {
			'mElement' : modElement.getElementsByClassName('marks')[0],
			'gElement' : modElement.getElementsByClassName('grade')[0],
			'pElement' : modElement.getElementsByClassName('percent')[0],
		};
		
		module.marks   = parseInt(module.mElement.value) || 0;
		module.percent = parseInt(module.pElement.value) || 0;
		
		Modules.workspace[modElement.id] = module;
		
		modElement.onkeyup = Modules.onInputChange;
		modElement.onclick = Modules.onInputChange;
		
		Modules.modCount++;
	},
	
	updateTotal : function() {
		var totalMarks = 0,
		totalPercent   = 0;
		
		for (var moduleId in Modules.workspace) {
			if (!Modules.workspace.hasOwnProperty(moduleId)) {
				continue;
			}
			
			var module = Modules.workspace[moduleId];
			
			totalMarks   += module.marks * (module.percent / 100);
			totalPercent += module.percent;
		}
		
		totalMarks = Math.round(totalMarks);
		
		Modules.total.mElement.value = totalMarks;
		Modules.total.gElement.value = markToGrade(totalMarks);
		Modules.total.pElement.value = totalPercent;
	},
	
	onInputChange : function(e) {
		if (e.target.tagName != 'INPUT') {
			return;
		}
		
		var input = e.target,
		module    = Modules.workspace[this.id];
		
		switch (input.className) {
			case 'marks':
				var marks = parseInt(e.target.value),
				grade     = markToGrade(marks);
				
				module.marks = marks;
				module.gElement.value = grade;
			break;
			
			case 'grade':
				var grade = e.target.value,
				marks     = gradeToMark(grade);
				
				module.marks = marks;
				module.mElement.value = marks;
			break;
			
			case 'percent':
				module.percent = parseInt(e.target.value);
			break;
		}
		
		Modules.updateTotal();
	},
};

Modules.init();
