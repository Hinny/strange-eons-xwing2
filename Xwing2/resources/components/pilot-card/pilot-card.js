useLibrary('diy');
useLibrary('ui');
useLibrary('imageutils');
useLibrary('markup');

importClass(java.awt.BasicStroke);
importClass(java.awt.Stroke);
importClass(java.awt.RenderingHints);
importClass(java.awt.Graphics2D);

importClass(arkham.diy.ListItem);
importClass(arkham.component.DefaultPortrait);

// When the script is run directly from the editor,this will load
// the test-lib library,which does the setup tasks that the
// plug-in would have done if it was run. This lets us test and
// develop the plug-in without having to rebuild the plug-in bundle
// and start a new copy of Strange Eons every time we make a change.
if (sourcefile == 'Quickscript') {
	useLibrary('project:Xwing2/resources/test-lib.js');
}
const Xwing2 = Eons.namedObjects.Xwing2;

portraits = [];

// Returns the number of portraits we will be using.
function getPortraitCount() {
	return portraits.length;
}

// Given an index from 0 to getPortraitCount()-1,this
// function must return the (index+1)th Portrait.
function getPortrait(index) {
	if (index < 0 || index >= portraits.length) {
		throw new Error('invalid portrait index: ' + index);
	}
	return portraits[ index ];
}

function create(diy) {
	diy.version = 1;
	diy.extensionName = 'Xwing2.seext';
	diy.faceStyle = FaceStyle.CARD_AND_MARKER;
	diy.transparentFaces = true;
	diy.variableSizedFaces = true;
	
	diy.frontTemplateKey = 'pilot-blank';
	diy.backTemplateKey = 'pilot-blank';
	diy.setTemplateKey(2,'pilot-large-token');
	
	// Card Art
	diy.customPortraitHandling = true;
	portraits[0] = new DefaultPortrait(diy,'pilot');
	portraits[0].setScaleUsesMinimum(false);
	portraits[0].facesToUpdate = 1;
	portraits[0].backgroundFilled = true;
	portraits[0].clipping = true;
	portraits[0].installDefault();
	
	// Ship Icon,Card
	portraits[1] = new DefaultPortrait(diy,'ship-card');
	portraits[1].setScaleUsesMinimum(true);
	portraits[1].facesToUpdate = 1;
	portraits[1].backgroundFilled = false;
	portraits[1].clipping = true;
	portraits[1].installDefault();
	
	// Ship Icon,Token
	portraits[2] = new DefaultPortrait(portraits[1],'ship-token');
	portraits[2].setScaleUsesMinimum(true);
	portraits[2].facesToUpdate = 4;
	portraits[2].backgroundFilled = false;
	portraits[2].clipping = true;
	portraits[2].installDefault();
	
	// Faction Symbol
	portraits[3] = new DefaultPortrait(diy,'faction-symbol');
	portraits[3].setScaleUsesMinimum(true);
	portraits[3].facesToUpdate = 7;
	portraits[3].backgroundFilled = false;
	portraits[3].clipping = true;
	portraits[3].installDefault();
	
	// Faction Texture
	portraits[4] = new DefaultPortrait(diy,'faction-texture');
	portraits[4].setScaleUsesMinimum(true);
	portraits[4].facesToUpdate = 7;
	portraits[4].backgroundFilled = false;
	portraits[4].clipping = true;
	portraits[4].installDefault();
	
	// install the example pilot
	diy.name = #xw2-pilot-name;
	$Epithet = #xw2-pilot-epithet;
	$ShipModel = #xw2-pilot-ship-model;
	$Faction = #xw2-pilot-faction;
	$Initiative = #xw2-pilot-initiative;
	$UniquePilot = #xw2-pilot-unique;
	$Droid = #xw2-pilot-droid;
	$Text = #xw2-pilot-text;
	$ChargeValue = #xw2-pilot-charge-value;
	$ChargeRecurring = #xw2-pilot-charge-recurring;
	$ForceValue = #xw2-pilot-force-value;

	$CustomShipModel = #xw2-pilot-custom-ship-model;
	$CustomShipAbilityName = #xw2-pilot-custom-ship-ability-name;
	$CustomShipAbilityText = #xw2-pilot-custom-ship-ability-text;
	$CustomShipAttackValue1 = #xw2-pilot-custom-ship-attack-1-value;
	$CustomShipAttackArc1 = #xw2-pilot-custom-ship-attack-1-arc;
	$CustomShipAttackValue2 = #xw2-pilot-custom-ship-attack-2-value;
	$CustomShipAttackArc2 = #xw2-pilot-custom-ship-attack-2-arc;
	$CustomShipAttackValue3 = #xw2-pilot-custom-ship-attack-3-value;
	$CustomShipAttackArc3 = #xw2-pilot-custom-ship-attack-3-arc;
	$CustomShipAgility = #xw2-pilot-custom-ship-agility-value;
	$CustomShipHull = #xw2-pilot-custom-ship-hull-value;
	$CustomShipShield = #xw2-pilot-custom-ship-shield-value;
	$CustomShipSize = #xw2-pilot-custom-ship-size;
	$CustomShipActionName1 = #xw2-pilot-custom-ship-action-1-name;
	$CustomShipActionRed1 = #xw2-pilot-custom-ship-action-1-red;
	$CustomShipActionLinked1 = #xw2-pilot-custom-ship-action-1-linked;
	$CustomShipActionName2 = #xw2-pilot-custom-ship-action-2-name;
	$CustomShipActionRed2 = #xw2-pilot-custom-ship-action-2-red;
	$CustomShipActionLinked2 = #xw2-pilot-custom-ship-action-2-linked;
	$CustomShipActionName3 = #xw2-pilot-custom-ship-action-3-name;
	$CustomShipActionRed3 = #xw2-pilot-custom-ship-action-3-red;
	$CustomShipActionLinked3 = #xw2-pilot-custom-ship-action-3-linked;
	$CustomShipActionName4 = #xw2-pilot-custom-ship-action-4-name;
	$CustomShipActionRed4 = #xw2-pilot-custom-ship-action-4-red;
	$CustomShipActionLinked4 = #xw2-pilot-custom-ship-action-4-linked;
	$CustomShipActionName5 = #xw2-pilot-custom-ship-action-5-name;
	$CustomShipActionRed5 = #xw2-pilot-custom-ship-action-5-red;
	$CustomShipActionLinked5 = #xw2-pilot-custom-ship-action-5-linked;
	$CustomShipIcon = #xw2-pilot-custom-ship-icon;
	
	$CustomFactionColorRed1 = #xw2-pilot-custom-faction-color-1-red;
	$CustomFactionColorGreen1 = #xw2-pilot-custom-faction-color-1-green;
	$CustomFactionColorBlue1 = #xw2-pilot-custom-faction-color-1-blue;
	$CustomFactionColorRed2 = #xw2-pilot-custom-faction-color-2-red;
	$CustomFactionColorGreen2 = #xw2-pilot-custom-faction-color-2-green;
	$CustomFactionColorBlue2 = #xw2-pilot-custom-faction-color-2-blue;
	$CustomFactionColorRed3 = #xw2-pilot-custom-faction-color-3-red;
	$CustomFactionColorGreen3 = #xw2-pilot-custom-faction-color-3-green;
	$CustomFactionColorBlue3 = #xw2-pilot-custom-faction-color-3-blue;
}

function createInterface(diy,editor) {
	bindings = new Bindings(editor,diy);

	// Main Panel
	mainHelpButton = helpButton("http://github.com/Hinny/strange-eons-xwing2/wiki/Creating-Pilot-Cards");
	//slider( [min], [max], [initialValue], [valueLabelPairs], [listener] )
	
	factionItems = [];
	factionItems.push(ListItem('custom',@xw2-faction-custom));
	factionItems.push(ListItem('rebel',@xw2-faction-rebel));
	factionItems.push(ListItem('imperial',@xw2-faction-imperial));
	factionItems.push(ListItem('scum',@xw2-faction-scum));
	factionItems.push(ListItem('luke','Luke'));
	factionItems.push(ListItem('redsquad','RedSquad'));
	factionItems.push(ListItem('redhighres','RedHighRes'));
	factionItems.push(ListItem('dutch','Dutch'));
	factionItems.push(ListItem('howlrunner','Howlrunner'));
	factionItems.push(ListItem('feroph','Feroph'));
	factionItems.push(ListItem('terroch','Terroch'));
	factionItems.push(ListItem('lando','Lando'));
	factionBox = comboBox(factionItems);
	bindings.add('Faction',factionBox,[0,1,2]);	

	shipItems = [];
	shipItems.push(ListItem('custom',@xw2-ship-custom-name));
	shipItems.push(ListItem('t65xwing',@xw2-ship-t65xwing-name));
	shipItems.push(ListItem('tielnfighter',@xw2-ship-tielnfighter-name));
	shipItems.push(ListItem('fangfighter',@xw2-ship-fangfighter-name));
	
	shipBox = comboBox(shipItems);
	bindings.add('ShipModel',shipBox,[0,2]);

	nameField = textField('X',30);
	
	epithetField = textField('X',30);
	bindings.add('Epithet',epithetField,[0]);
	
	initiativeItems = ['0','1','2','3','4','5','6','\u25a0'];
	initiativeBox = comboBox(initiativeItems);
	bindings.add('Initiative',initiativeBox,[0,2]);

	uniqueCheckbox = checkBox(@xw2-unique);
	bindings.add('UniquePilot',uniqueCheckbox,[0,2]);
	
	droidCheckbox = checkBox(@xw2-droid);
	bindings.add('Droid',droidCheckbox,[0]);
	
	pilotTextArea = textArea('',6,15,true);
	bindings.add('Text',pilotTextArea,[0]);
	
	chargeValueItems = ['-','1','2','3','4','5','6','7','8','9'];
	chargeValueBox = comboBox(chargeValueItems);
	bindings.add('ChargeValue',chargeValueBox,[0]);
	
	chargeRecurringCheckbox = checkBox(@xw2-recurring);
	bindings.add('ChargeRecurring',chargeRecurringCheckbox,[0]);

	forceValueItems = ['-','1','2','3','4','5'];
	forceValueBox = comboBox(forceValueItems);
	bindings.add('ForceValue',forceValueBox,[0]);
	
	pilotPanel = portraitPanel(diy,0);
	pilotPanel.panelTitle = @xw2-portrait-pilot;

	mainPanel = new Grid('','[min:pref][min:pref][min:pref][min:pref,grow]','');
	mainPanel.setTitle(@xw2-info);
	mainPanel.place(mainHelpButton,'wrap para');
	mainPanel.place(@xw2-faction,'',factionBox,'wmin 180,span 3,wrap');	
	mainPanel.place(@xw2-ship-model,'',shipBox,'wmin 180,span 3,wrap');
	mainPanel.place(@xw2-pilotname,'',nameField,'span,growx,wrap');
	mainPanel.place(@xw2-epithet,'',epithetField,'span,growx,wrap');
	mainPanel.place(@xw2-initiative,'',initiativeBox,'wmin 52');
	mainPanel.place(uniqueCheckbox,'');
	mainPanel.place(droidCheckbox,'wrap');
	mainPanel.place(separator(),'span,growx,wrap para');
	mainPanel.place(@xw2-pilottext,'span,grow,wrap para');
	mainPanel.place(pilotTextArea,'span,grow,wrap para');
	mainPanel.place(@xw2-charge-value,'',chargeValueBox,'wmin 52',chargeRecurringCheckbox,'wrap');
	mainPanel.place(@xw2-force-value,'',forceValueBox,'wmin 52, wrap');
	mainPanel.place(separator(),'span,growx,wrap para');
	mainPanel.place(pilotPanel,'span,growx,wrap');
	mainPanel.editorTabScrolling = true;

	// Custom Ship Panel
	customShipHelpButton = helpButton("http://github.com/Hinny/strange-eons-xwing2/wiki/Creating-Pilot-Cards#creating-custom-ships");
	
	customShipModelField = textField('X',30);
	bindings.add('CustomShipModel',customShipModelField,[0,2]);
	
	sizeItems = [];
	sizeItems.push(ListItem('small',@xw2-size-small));
	sizeItems.push(ListItem('medium',@xw2-size-medium));
	sizeItems.push(ListItem('large',@xw2-size-large));
	customSizeBox = comboBox(sizeItems);
	bindings.add('CustomShipSize',customSizeBox,[0,2]);

	attackValueItems = ['-','1','2','3','4','5'];
	customAttackValueBox1 = comboBox(attackValueItems);
	bindings.add('CustomShipAttackValue1',customAttackValueBox1,[0,2]);
	customAttackValueBox2 = comboBox(attackValueItems);
	bindings.add('CustomShipAttackValue2',customAttackValueBox2,[0,2]);
	customAttackValueBox3 = comboBox(attackValueItems);
	bindings.add('CustomShipAttackValue3',customAttackValueBox3,[0,2]);

	attackArcItems = [];
	attackArcItems.push(ListItem('front',@xw2-arc-front));
	attackArcItems.push(ListItem('rear',@xw2-arc-rear));
	attackArcItems.push(ListItem('leftside',@xw2-arc-leftside));
	attackArcItems.push(ListItem('rightside',@xw2-arc-rightside));
	attackArcItems.push(ListItem('fullfront',@xw2-arc-fullfront));
	attackArcItems.push(ListItem('fullrear',@xw2-arc-fullrear));
	attackArcItems.push(ListItem('singleturret',@xw2-arc-singleturret));
	attackArcItems.push(ListItem('doubleturret',@xw2-arc-doubleturret));
	attackArcItems.push(ListItem('bullseye',@xw2-arc-bullseye));
	customAttackArcBox1 = comboBox(attackArcItems);
	bindings.add('CustomShipAttackArc1',customAttackArcBox1,[0,2]);
	customAttackArcBox2 = comboBox(attackArcItems);
	bindings.add('CustomShipAttackArc2',customAttackArcBox2,[0,2]);
	customAttackArcBox3 = comboBox(attackArcItems);
	bindings.add('CustomShipAttackArc3',customAttackArcBox3,[0,2]);

	agilityItems = ['0','1','2','3','4','5'];
	customAgilityBox = comboBox(agilityItems);
	bindings.add('CustomShipAgility',customAgilityBox,[0,2]);	
	
	hullItems = ['1','2','3','4','5','6','7','8','9','10','11',
		'12','13','14','15','16','17','18','19','20'];
	customHullBox = comboBox(hullItems);
	bindings.add('CustomShipHull',customHullBox,[0,2]);	

	shieldItems = ['-','1','2','3','4','5','6','7','8','9','10',
		'11','12','13','14','15','16','17','18','19','20'];
	customShieldBox = comboBox(shieldItems);
	bindings.add('CustomShipShield',customShieldBox,[0,2]);

	actionItems = [];
	actionItems.push(ListItem('-','-'));
	actionItems.push(ListItem('focus',@xw2-action-focus));
	actionItems.push(ListItem('evade',@xw2-action-evade));
	actionItems.push(ListItem('lock',@xw2-action-lock));
	actionItems.push(ListItem('barrelroll',@xw2-action-barrelroll));
	actionItems.push(ListItem('boost',@xw2-action-boost));
	actionItems.push(ListItem('cloak',@xw2-action-cloak));
	actionItems.push(ListItem('slam',@xw2-action-slam));
	actionItems.push(ListItem('rotate',@xw2-action-rotate));
	actionItems.push(ListItem('reinforce',@xw2-action-reinforce));
	actionItems.push(ListItem('coordinate',@xw2-action-coordinate));
	actionItems.push(ListItem('reload',@xw2-action-reload));
	actionItems.push(ListItem('jam',@xw2-action-jam));
	customActionNameBox1 = comboBox(actionItems);
	bindings.add('CustomShipActionName1',customActionNameBox1,[0,2]);
	customActionRedCheckBox1 = checkBox(@xw2-action-red);
	bindings.add('CustomShipActionRed1',customActionRedCheckBox1,[0,2]);
	customActionLinkedBox1 = comboBox(actionItems);
	bindings.add('CustomShipActionLinked1',customActionLinkedBox1,[0,2]);
	customActionNameBox2 = comboBox(actionItems);
	bindings.add('CustomShipActionName2',customActionNameBox2,[0,2]);
	customActionRedCheckBox2 = checkBox(@xw2-action-red);
	bindings.add('CustomShipActionRed2',customActionRedCheckBox2,[0,2]);
	customActionLinkedBox2 = comboBox(actionItems);
	bindings.add('CustomShipActionLinked2',customActionLinkedBox2,[0,2]);
	customActionNameBox3 = comboBox(actionItems);
	bindings.add('CustomShipActionName3',customActionNameBox3,[0,2]);
	customActionRedCheckBox3 = checkBox(@xw2-action-red);
	bindings.add('CustomShipActionRed3',customActionRedCheckBox3,[0,2]);
	customActionLinkedBox3 = comboBox(actionItems);
	bindings.add('CustomShipActionLinked3',customActionLinkedBox3,[0,2]);
	customActionNameBox4 = comboBox(actionItems);
	bindings.add('CustomShipActionName4',customActionNameBox4,[0,2]);
	customActionRedCheckBox4 = checkBox(@xw2-action-red);
	bindings.add('CustomShipActionRed4',customActionRedCheckBox4,[0,2]);
	customActionLinkedBox4 = comboBox(actionItems);
	bindings.add('CustomShipActionLinked4',customActionLinkedBox4,[0,2]);
	customActionNameBox5 = comboBox(actionItems);
	bindings.add('CustomShipActionName5',customActionNameBox5,[0,2]);
	customActionRedCheckBox5 = checkBox(@xw2-action-red);
	bindings.add('CustomShipActionRed5',customActionRedCheckBox5,[0,2]);
	customActionLinkedBox5 = comboBox(actionItems);
	bindings.add('CustomShipActionLinked5',customActionLinkedBox5,[0,2]);

	customShipAbilityNameField = textField('X',30);
	bindings.add('CustomShipAbilityName',customShipAbilityNameField,[0]);

	customShipAbilityTextArea = textArea('',6,15,true);
	bindings.add('CustomShipAbilityText',customShipAbilityTextArea,[0]);

	// same list as shipItems,but without alt versions of ships,
	// as it is only the ship icon that is interesting here.
	shipIconItems = [];
	shipIconItems.push(ListItem('custom',@xw2-ship-custom-name));
	shipIconItems.push(ListItem('t65xwing',@xw2-ship-t65xwing-name));
	shipIconItems.push(ListItem('tielnfighter',@xw2-ship-tielnfighter-name));
	shipIconItems.push(ListItem('fangfighter',@xw2-ship-fangfighter-name));
	customShipIconBox = comboBox(shipItems);
	bindings.add('CustomShipIcon',customShipIconBox,[0,2]);

	customShipIconCardPanel = portraitPanel(diy,1);
	customShipIconCardPanel.panelTitle = @xw2-icon-card;

	customShipIconMarkerPanel = portraitPanel(diy,2);
	customShipIconMarkerPanel.setParentPanel(customShipIconCardPanel);		
	customShipIconMarkerPanel.panelTitle = @xw2-icon-token;
	
	customShipPanel = new Grid('','[min:pref][min:pref][min:pref][min:pref,grow]','');
	customShipPanel.setTitle(@xw2-custom-ship);
	customShipPanel.place(customShipHelpButton,'wrap para');
	customShipPanel.place(@xw2-ship-model,'',customShipModelField,'span,growx,wrap');
	customShipPanel.place(@xw2-size,'',customSizeBox,'wmin 100,span 2,wrap para');
	customShipPanel.place(@xw2-agility-value,'',customAgilityBox,'wmin 52');
	customShipPanel.place(@xw2-hull-value,'',customHullBox,'wmin 52,wrap');
	customShipPanel.place(@xw2-shield-value,'',customShieldBox,'wmin 52,span 2,wrap para');
	customShipPanel.place(@xw2-attack-1,'',customAttackArcBox1, 'wmin 120',customAttackValueBox1,'wmin 52,wrap');
	customShipPanel.place(@xw2-attack-2,'',customAttackArcBox2, 'wmin 120',customAttackValueBox2,'wmin 52,wrap');
	customShipPanel.place(@xw2-attack-3,'',customAttackArcBox3, 'wmin 120',customAttackValueBox3,'wmin 52,wrap para');
	customShipPanel.place(separator(),'span,growx,wrap para');
	customShipPanel.place(@xw2-action-1,'',customActionNameBox1,'wmin 120',customActionRedCheckBox1,'');
	customShipPanel.place(customActionLinkedBox1, 'wmin 120,wrap');
	customShipPanel.place(@xw2-action-2,'',customActionNameBox2,'wmin 120',customActionRedCheckBox2,'');
	customShipPanel.place(customActionLinkedBox2, 'wmin 120,wrap');
	customShipPanel.place(@xw2-action-3,'',customActionNameBox3,'wmin 120',customActionRedCheckBox3,'');
	customShipPanel.place(customActionLinkedBox3, 'wmin 120,wrap');
	customShipPanel.place(@xw2-action-4,'',customActionNameBox4,'wmin 120',customActionRedCheckBox4,'');
	customShipPanel.place(customActionLinkedBox4, 'wmin 120,wrap');
	customShipPanel.place(@xw2-action-5,'',customActionNameBox5,'wmin 120',customActionRedCheckBox5,'');
	customShipPanel.place(customActionLinkedBox5, 'wmin 120,wrap para');
	customShipPanel.place(separator(),'span,growx,wrap para');
	customShipPanel.place(@xw2-ship-ability-name,'',customShipAbilityNameField,'span,grow,wrap para');
	customShipPanel.place(customShipAbilityTextArea,'span,grow,wrap para');
	customShipPanel.place(separator(),'span,growx,wrap para');
	customShipPanel.place(@xw2-icon,'',customShipIconBox,'wmin 180,span 3,wrap para');
	customShipPanel.place(customShipIconCardPanel,'span,growx,wrap');
	customShipPanel.place(customShipIconMarkerPanel,'span,growx,wrap');
	customShipPanel.editorTabScrolling = true;

	customFactionHelpButton = helpButton("http://github.com/Hinny/strange-eons-xwing2/wiki/Creating-Pilot-Cards#creating-custom-faction");

	customFactionColor1RedBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorRed1', customFactionColor1RedBox, [0, 1, 2] );
	customFactionColor1GreenBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorGreen1', customFactionColor1GreenBox, [0, 1, 2] );
	customFactionColor1BlueBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorBlue1', customFactionColor1BlueBox, [0, 1, 2] );

	customFactionColor2RedBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorRed2', customFactionColor2RedBox, [0, 1, 2] );
	customFactionColor2GreenBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorGreen2', customFactionColor2GreenBox, [0, 1, 2] );
	customFactionColor2BlueBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorBlue2', customFactionColor2BlueBox, [0, 1, 2] );

	customFactionColor3RedBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorRed3', customFactionColor3RedBox, [0, 1, 2] );
	customFactionColor3GreenBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorGreen3', customFactionColor3GreenBox, [0, 1, 2] );
	customFactionColor3BlueBox = spinner(0, 255, 1, 255);
	bindings.add( 'CustomFactionColorBlue3', customFactionColor3BlueBox, [0, 1, 2] );

	customFactionSymbolPanel = portraitPanel(diy,3);
	customFactionSymbolPanel.panelTitle = @xw2-faction-symbol;
	
	customFactionTexturePanel = portraitPanel(diy,4);
	customFactionTexturePanel.panelTitle = @xw2-faction-texture;

	customFactionPanel = new Grid('','[min:pref][min:pref][min:pref][min:pref][min:pref][min:pref,grow]','');
	customFactionPanel.setTitle(@xw2-custom-faction);
	customFactionPanel.place(customFactionHelpButton,'wrap para');
	customFactionPanel.place(separator(),'span,growx,wrap para');
	customFactionPanel.place(@xw2-color-1, 'span, wrap');
	customFactionPanel.place(@xw2-red, '', customFactionColor1RedBox, 'wmin 50');
	customFactionPanel.place(@xw2-green, '', customFactionColor1GreenBox, 'wmin 50');
	customFactionPanel.place(@xw2-blue, '', customFactionColor1BlueBox, 'wmin 50, wrap para');
	customFactionPanel.place(separator(),'span,growx,wrap para');
	customFactionPanel.place(@xw2-color-2, 'span, wrap');
	customFactionPanel.place(@xw2-red, '', customFactionColor2RedBox, 'wmin 50');
	customFactionPanel.place(@xw2-green, '', customFactionColor2GreenBox, 'wmin 50');
	customFactionPanel.place(@xw2-blue, '', customFactionColor2BlueBox, 'wmin 50, wrap para');
	customFactionPanel.place(separator(),'span,growx,wrap para');
	customFactionPanel.place(@xw2-color-3, 'span, wrap');
	customFactionPanel.place(@xw2-red, '', customFactionColor3RedBox, 'wmin 50');
	customFactionPanel.place(@xw2-green, '', customFactionColor3GreenBox, 'wmin 50');
	customFactionPanel.place(@xw2-blue, '', customFactionColor3BlueBox, 'wmin 50, wrap para');
	customFactionPanel.place(separator(),'span,growx,wrap para');
	customFactionPanel.place(customFactionSymbolPanel,'span,growx,wrap');
	customFactionPanel.place(customFactionTexturePanel,'span,growx,wrap');
	customFactionPanel.editorTabScrolling = true;

 	diy.setNameField(nameField);

	function actionFunction(actionEvent) {
		try {
			if (!uniqueCheckbox.isSelected()) {
				epithetField.setEnabled(false);
			} else {
				epithetField.setEnabled(true);
			}
			if (shipBox.getSelectedItem() != 'custom') {
				customShipModelField.setEnabled(false);
				customSizeBox.setEnabled(false);
				customAttackValueBox1.setEnabled(false);
				customAttackValueBox2.setEnabled(false);
				customAttackValueBox3.setEnabled(false);
				customAttackArcBox1.setEnabled(false);
				customAttackArcBox2.setEnabled(false);
				customAttackArcBox3.setEnabled(false);
				customAgilityBox.setEnabled(false);
				customHullBox.setEnabled(false);
				customShieldBox.setEnabled(false);
				customActionNameBox1.setEnabled(false);
				customActionRedCheckBox1.setEnabled(false);
				customActionLinkedBox1.setEnabled(false);
				customActionNameBox2.setEnabled(false);
				customActionRedCheckBox2.setEnabled(false);
				customActionLinkedBox2.setEnabled(false);
				customActionNameBox3.setEnabled(false);
				customActionRedCheckBox3.setEnabled(false);
				customActionLinkedBox3.setEnabled(false);
				customActionNameBox4.setEnabled(false);
				customActionRedCheckBox4.setEnabled(false);
				customActionLinkedBox4.setEnabled(false);
				customActionNameBox5.setEnabled(false);
				customActionRedCheckBox5.setEnabled(false);
				customActionLinkedBox5.setEnabled(false);
				customShipAbilityNameField.setEnabled(false);
				customShipAbilityTextArea.setVisible(false);
				customShipIconBox.setEnabled(false);
				customShipIconCardPanel.setVisible(false);
				customShipIconMarkerPanel.setVisible(false);
			} else {
				customShipModelField.setEnabled(true);
				customSizeBox.setEnabled(true);
				customAttackValueBox1.setEnabled(true);
				customAttackValueBox2.setEnabled(true);
				customAttackValueBox3.setEnabled(true);
				customAttackArcBox1.setEnabled(true);
				customAttackArcBox2.setEnabled(true);
				customAttackArcBox3.setEnabled(true);
				customAgilityBox.setEnabled(true);
				customHullBox.setEnabled(true);
				customShieldBox.setEnabled(true);
				customActionNameBox1.setEnabled(true);
				customActionNameBox2.setEnabled(true);
				customActionNameBox3.setEnabled(true);
				customActionNameBox4.setEnabled(true);
				customActionNameBox5.setEnabled(true);
				if (customActionNameBox1.getSelectedItem() == '-'){
					customActionRedCheckBox1.setEnabled(false);
					customActionLinkedBox1.setEnabled(false);
				} else {
					customActionLinkedBox1.setEnabled(true);
					if (customActionLinkedBox1.getSelectedItem() != '-') {
						customActionRedCheckBox1.setEnabled(false);
					} else {
						customActionRedCheckBox1.setEnabled(true);
					}
					if (customActionRedCheckBox1.isSelected()){
						customActionLinkedBox1.setEnabled(false);
					} else {
						customActionLinkedBox1.setEnabled(true);
					}
				}
				if (customActionNameBox2.getSelectedItem() == '-'){
					customActionRedCheckBox2.setEnabled(false);
					customActionLinkedBox2.setEnabled(false);
				} else {
					customActionLinkedBox2.setEnabled(true);
					if (customActionLinkedBox2.getSelectedItem() != '-') {
						customActionRedCheckBox2.setEnabled(false);
					} else {
						customActionRedCheckBox2.setEnabled(true);
					}
					if (customActionRedCheckBox2.isSelected()){
						customActionLinkedBox2.setEnabled(false);
					} else {
						customActionLinkedBox2.setEnabled(true);
					}
				}
				if (customActionNameBox3.getSelectedItem() == '-'){
					customActionRedCheckBox3.setEnabled(false);
					customActionLinkedBox3.setEnabled(false);
				} else {
					customActionLinkedBox3.setEnabled(true);
					if (customActionLinkedBox3.getSelectedItem() != '-') {
						customActionRedCheckBox3.setEnabled(false);
					} else {
						customActionRedCheckBox3.setEnabled(true);
					}
					if (customActionRedCheckBox3.isSelected()){
						customActionLinkedBox3.setEnabled(false);
					} else {
						customActionLinkedBox3.setEnabled(true);
					}
				}
				if (customActionNameBox4.getSelectedItem() == '-'){
					customActionRedCheckBox4.setEnabled(false);
					customActionLinkedBox4.setEnabled(false);
				} else {
					customActionLinkedBox4.setEnabled(true);
					if (customActionLinkedBox4.getSelectedItem() != '-') {
						customActionRedCheckBox4.setEnabled(false);
					} else {
						customActionRedCheckBox4.setEnabled(true);
					}
					if (customActionRedCheckBox4.isSelected()){
						customActionLinkedBox4.setEnabled(false);
					} else {
						customActionLinkedBox4.setEnabled(true);
					}
				}
				if (customActionNameBox5.getSelectedItem() == '-'){
					customActionRedCheckBox5.setEnabled(false);
					customActionLinkedBox5.setEnabled(false);
				} else {
					customActionLinkedBox5.setEnabled(true);
					if (customActionLinkedBox5.getSelectedItem() != '-') {
						customActionRedCheckBox5.setEnabled(false);
					} else {
						customActionRedCheckBox5.setEnabled(true);
					}
					if (customActionRedCheckBox5.isSelected()){
						customActionLinkedBox5.setEnabled(false);
					} else {
						customActionLinkedBox5.setEnabled(true);
					}
				}
				customShipAbilityNameField.setEnabled(true);
				customShipAbilityTextArea.setVisible(true);
				customShipIconBox.setEnabled(true);				
				if (customShipIconBox.getSelectedItem() != 'custom'){
					customShipIconCardPanel.setVisible(false);
					customShipIconMarkerPanel.setVisible(false);
				} else {
					customShipIconCardPanel.setVisible(true);
					customShipIconMarkerPanel.setVisible(true);
				}
			}
			if (factionBox.getSelectedItem() != 'custom') {
				customFactionColor1RedBox.setEnabled(false);
				customFactionColor1GreenBox.setEnabled(false);
				customFactionColor1BlueBox.setEnabled(false);
				customFactionColor2RedBox.setEnabled(false);
				customFactionColor2GreenBox.setEnabled(false);
				customFactionColor2BlueBox.setEnabled(false);
				customFactionColor3RedBox.setEnabled(false);
				customFactionColor3GreenBox.setEnabled(false);
				customFactionColor3BlueBox.setEnabled(false);
				customFactionSymbolPanel.setVisible(false);
				customFactionTexturePanel.setVisible(false);
			} else {
				customFactionColor1RedBox.setEnabled(true);
				customFactionColor1GreenBox.setEnabled(true);
				customFactionColor1BlueBox.setEnabled(true);
				customFactionColor2RedBox.setEnabled(true);
				customFactionColor2GreenBox.setEnabled(true);
				customFactionColor2BlueBox.setEnabled(true);
				customFactionColor3RedBox.setEnabled(true);
				customFactionColor3GreenBox.setEnabled(true);
				customFactionColor3BlueBox.setEnabled(true);
				customFactionSymbolPanel.setVisible(true);
				customFactionTexturePanel.setVisible(true);
			}
		} catch(ex) {
			Error.handleUncaught(ex);
		}
	}

	mainPanel.addToEditor(editor, @xw2-info, null, null, 0);
	customShipPanel.addToEditor(editor, @xw2-custom-ship, null, null, 1);
	customFactionPanel.addToEditor(editor, @xw2-custom-faction, null, null, 2);
	editor.addFieldPopulationListener(actionFunction);
	bindings.bind();
	
	// Add action listeners
	shipBox.addActionListener(actionFunction);
	factionBox.addActionListener(actionFunction);
	uniqueCheckbox.addActionListener(actionFunction);
	customActionNameBox1.addActionListener(actionFunction);
	customActionRedCheckBox1.addActionListener(actionFunction);
	customActionLinkedBox1.addActionListener(actionFunction);
	customActionNameBox2.addActionListener(actionFunction);
	customActionRedCheckBox2.addActionListener(actionFunction);
	customActionLinkedBox2.addActionListener(actionFunction);
	customActionNameBox3.addActionListener(actionFunction);
	customActionRedCheckBox3.addActionListener(actionFunction);
	customActionLinkedBox3.addActionListener(actionFunction);
	customActionNameBox4.addActionListener(actionFunction);
	customActionRedCheckBox4.addActionListener(actionFunction);
	customActionLinkedBox4.addActionListener(actionFunction);
	customActionNameBox5.addActionListener(actionFunction);
	customActionRedCheckBox5.addActionListener(actionFunction);
	customActionLinkedBox5.addActionListener(actionFunction);
	customShipIconBox.addActionListener(actionFunction);
}
	
function createFrontPainter(diy,sheet) {
	nameBox = Xwing2.headingBox(sheet,11);
	epithetBox = Xwing2.epithetBox(sheet,7.5);
	shipModelBox = Xwing2.headingBox(sheet,7.5);
	fullAbilityTextBox = Xwing2.abilityBox(sheet, 9);
	fullAbilityTextBox = Xwing2.abilityBox(sheet, 8.8);
	reducedAbilityTextBox = Xwing2.abilityBox(sheet, 8);
	
	tokenNameBox = Xwing2.headingBox(sheet,10);
}

function createBackPainter(diy, sheet) {

}

function paintFront(g,diy,sheet) {
	if (sheet.sheetIndex == 0) {
		paintCardFrontFace(g, diy, sheet);
	} else {
		paintToken(g, diy, sheet);
	}	
}

function paintBack(g,diy,sheet) {
	imageTemplate = 'pilot-blank-template';
	sheet.paintImage(g, imageTemplate,0,0);

	imageTemplate = 'pilot-' + $Faction + '-back-template';
	sheet.paintImage(g, imageTemplate,0,0);
}

function paintCardFrontFace(g,diy,sheet) {
	imageTemplate = 'pilot-blank-template';
	sheet.paintImage(g, imageTemplate,0,0);
	target = sheet.getRenderTarget();
		
	//Draw portrait
	portraits[0].paint(g, target);
	
	//Draw template
	if ($ShipModel == 'custom') {
		hasLinkedAction =
			$CustomShipActionLinked1 != '-' ||
			$CustomShipActionLinked2 != '-' ||
			$CustomShipActionLinked3 != '-'	||
			$CustomShipActionLinked4 != '-' ||
			$CustomShipActionLinked5 != '-';
	} else {
		hasLinkedAction =
			getShipStat($ShipModel,'action-1-linked') != '-' ||
			getShipStat($ShipModel,'action-2-linked') != '-' ||
			getShipStat($ShipModel,'action-3-linked') != '-' ||
			getShipStat($ShipModel,'action-4-linked') != '-' ||
			getShipStat($ShipModel,'action-5-linked') != '-';
	}
	if (hasLinkedAction) {
		textBoxStyle = 'reduced';
	} else {
		textBoxStyle = 'full';
	}
	// TODO: Remove extra dev templates
	if ($Faction == 'rebel' || $Faction == 'imperial' || $Faction == 'scum'){
		imageTemplate =  'pilot-' + $Faction + '-front-' + textBoxStyle + '-template';
		sheet.paintImage(g, imageTemplate, 0, 0);
		// Draw template
		paintFrontFaceFrame(g, diy, sheet, textBoxStyle);
	} else if ($Faction == 'custom') {
		paintFrontFaceFrame(g, diy, sheet, textBoxStyle);
	} else {
		imageTemplate =  'dev-' + $Faction + '-template';
		sheet.paintImage(g, imageTemplate, 0, 0);
	}
	
	// Draw the name
	if ($$UniquePilot.yesNo) {
		nameBox.markupText = '<uni>' + diy.name;
	} else {
		nameBox.markupText = diy.name;
	}
	nameBox.drawAsSingleLine(g, R('name'));
	
	// Draw the epithet
	if ($$UniquePilot.yesNo) {
		epithetBox.markupText = $Epithet;
	} else {
		epithetBox.markupText = "";
	}
	epithetBox.drawAsSingleLine(g, R('epithet'));

	// Draw the ship model
	if ($ShipModel == 'custom') {
		shipModelBox.markupText = $CustomShipModel;
	} else {
		shipModelBox.markupText = getShipStat($ShipModel,'model');
	}
	shipModelBox.drawAsSingleLine(g, R('shipmodel'));
	
	// Draw the ship icon
	if ($ShipModel == 'custom' && $CustomShipIcon == 'custom') {	
		portraits[1].paint(g,target);
	} else {
		if ( $ShipModel == 'custom' ) {
			shipIcon = $CustomShipIcon;
		} else {
			shipIcon = getShipStat($ShipModel, 'icon');
		}
		g.setPaint(Color.WHITE);
		sheet.drawTitle(g, Xwing2.textToShipChar(shipIcon), R('icon'), Xwing2.shipFont, 18, sheet.ALIGN_CENTER);
  	}
  	
	// Draw Initiative
	if ($Initiative == '\u25a0') {
		g.setPaint(Xwing2.getColor('initiative'));
		initRect = R('initiative-square', 0, 0);
		g.fillRect(initRect.getX(), initRect.getY(), initRect.getWidth(), initRect.getHeight());
	} else {
		sheet.drawOutlinedTitle( g, $Initiative, R('initiative', 0, 0), Xwing2.numberFont, 18, 2, Xwing2.getColor('initiative'), Color.BLACK, sheet.ALIGN_CENTER, true);
	}
  	
  	// Draw the Pilot Ability/Flavour Text and Ship ability
	if ($$UniquePilot.yesNo) {
		text = $Text;
	} else {
		text = '<flavour>' + $Text + '</flavour>';
	}
	if ($ShipModel == 'custom' && $CustomShipAbilityName != '' && $CustomShipAbilityText != '') {
		text = text + '\n<div>\n<width regular><b><i>' + Xwing2.smallCaps($CustomShipAbilityName) + ': </i></b></width>'+ $CustomShipAbilityText;
	} else if ($ShipModel != 'custom' && getShipStat($ShipModel, 'ability-name') != '') {
		text = text + '\n<div>\n<width regular><b><i>' + Xwing2.smallCaps('' + getShipStat($ShipModel, 'ability-name')) + ': </i></b></width>'+ getShipStat($ShipModel, 'ability-text');
	}
	if (textBoxStyle == 'full') {
		fullAbilityTextBox.markupText = text;
		fullAbilityTextBox.draw(g, R('full-text'));
	} else {
		reducedAbilityTextBox.markupText = text;
		reducedAbilityTextBox.draw(g, R('reduced-text'));
	}
	
	// Draw Stat Bar
	stats = [];
	if ($ShipModel == 'custom') {
		if ($CustomShipAttackValue1 != '-') {stats.push([$CustomShipAttackArc1, $CustomShipAttackValue1, 0]);}
		if ($CustomShipAttackValue2 != '-') {stats.push([$CustomShipAttackArc2, $CustomShipAttackValue2, 0]);}
		if ($CustomShipAttackValue3 != '-') {stats.push([$CustomShipAttackArc3, $CustomShipAttackValue3, 0]);}
		stats.push(['agility', $CustomShipAgility, 0]);
		stats.push(['hull', $CustomShipHull, 0]);
		if ($CustomShipShield != '-') {stats.push(['shield', $CustomShipShield, 0]);}
	} else {
		if (getShipStat($ShipModel, 'attack-1-value') != '-') {stats.push([getShipStat($ShipModel,'attack-1-arc'), getShipStat($ShipModel,'attack-1-value'), 0]);}
		if (getShipStat($ShipModel, 'attack-2-value') != '-') {stats.push([getShipStat($ShipModel,'attack-2-arc'), getShipStat($ShipModel,'attack-2-value'), 0]);}
		if (getShipStat($ShipModel, 'attack-3-value') != '-') {stats.push([getShipStat($ShipModel,'attack-2-arc'), getShipStat($ShipModel,'attack-3-value'), 0]);}
		stats.push(['agility', getShipStat($ShipModel,'agility-value'), 0]);
		stats.push(['hull', getShipStat($ShipModel,'hull-value'), 0]);
		if (getShipStat($ShipModel, 'shield-value') != '-') {stats.push(['shield', getShipStat($ShipModel,'shield-value'), 0]);}
	}
	if ($ChargeValue != '-') {stats.push( ['charge', $ChargeValue, $ChargeRecurring]);}
	if ($ForceValue != '-') {stats.push( ['force', $ForceValue, 1]);}
	if (textBoxStyle == 'full') {
		xCenterPoint = 268;
		switch (stats.length) {
			case 2: xDistanceBetween = 132; break;
			case 3: xDistanceBetween = 132; break;
			case 4: xDistanceBetween = 110; break;
			case 5: xDistanceBetween = 110; break;
			case 6: xDistanceBetween = 90; break;
			case 7: xDistanceBetween = 82; break;
			default: throw new Error('Stat bar too crowded! Please reduce the number of stats');
		}
	} else {
		xCenterPoint = 231;
		switch (stats.length) {
			case 2: xDistanceBetween = 132; break;
			case 3: xDistanceBetween = 130; break;
			case 4: xDistanceBetween = 110; break;
			case 5: xDistanceBetween = 100; break;
			case 6: xDistanceBetween = 85; break;
			default: throw new Error('Stat bar too crowded! Please reduce the number of stats');
		}
	}
	y1 = 814;
	y2 = 865;
	for (let i = 0; i < stats.length; ++i) {
		xi = xCenterPoint + xDistanceBetween * i - xDistanceBetween * (stats.length - 1) / 2;
		color = Xwing2.getColor(stats[i][0]);
		g.setPaint(color);
		sheet.drawTitle(g, Xwing2.textToIconChar(stats[i][0]), Region(xi.toString() + ',' + y1.toString() + ',100,100'), Xwing2.iconFont, 10, sheet.ALIGN_CENTER);
		sheet.drawTitle(g, stats[i][1], Region(xi.toString() + ',' + y2.toString() + ',100,100'), Xwing2.numberFont, 13.5, sheet.ALIGN_CENTER);
		if (stats[i][2] == '1') {
			x = xi + 28;
			//y = y2 - 18;
			y = y2;
			sheet.drawTitle(g, Xwing2.textToIconChar('recurring'), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 10, sheet.ALIGN_CENTER);
		}
		dotList = Xwing2.calculateDottedCircle(stats[i][0], false);
		for each (dot in dotList) {
			x = xi + dot[0];
			y = y1 - 3 + dot[1];
			dotColor = new Color(color.getRed() / 255, color.getGreen() / 255, color.getBlue() / 255, dot[2]);
			g.setPaint(dotColor);
			// draw small vector circle (using x-wing font)
			sheet.drawTitle(g, 'u', Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 5, sheet.ALIGN_CENTER);
		}
	}
	
	// Draw Action Bar
	actions = [];
	if ($ShipModel == 'custom') {
		if ($CustomShipActionName1 != '-') {actions.push([$CustomShipActionName1, $CustomShipActionRed1, $CustomShipActionLinked1]);}
		if ($CustomShipActionName2 != '-') {actions.push([$CustomShipActionName2, $CustomShipActionRed2, $CustomShipActionLinked2]);}
		if ($CustomShipActionName3 != '-') {actions.push([$CustomShipActionName3, $CustomShipActionRed3, $CustomShipActionLinked3]);}
		if ($CustomShipActionName4 != '-') {actions.push([$CustomShipActionName4, $CustomShipActionRed4, $CustomShipActionLinked4]);}
		if ($CustomShipActionName5 != '-') {actions.push([$CustomShipActionName5, $CustomShipActionRed5, $CustomShipActionLinked5]);}
	} else {
		if (getShipStat($ShipModel, 'action-1-name') != '-') {
			actions.push([	getShipStat($ShipModel,'action-1-name'), 
							getShipStat($ShipModel,'action-1-red'),
							getShipStat($ShipModel,'action-1-linked')]);
		}
		if (getShipStat($ShipModel, 'action-2-name') != '-') {
			actions.push([	getShipStat($ShipModel,'action-2-name'), 
							getShipStat($ShipModel,'action-2-red'),
							getShipStat($ShipModel,'action-2-linked')]);
		}
		if (getShipStat($ShipModel, 'action-3-name') != '-') {
			actions.push([	getShipStat($ShipModel,'action-3-name'), 
							getShipStat($ShipModel,'action-3-red'),
							getShipStat($ShipModel,'action-3-linked')]);
		}
		if (getShipStat($ShipModel, 'action-4-name') != '-') {
			actions.push([	getShipStat($ShipModel,'action-4-name'), 
							getShipStat($ShipModel,'action-4-red'),
							getShipStat($ShipModel,'action-4-linked')]);
		}
		if (getShipStat($ShipModel, 'action-5-name') != '-') {
			actions.push([	getShipStat($ShipModel,'action-5-name'), 
							getShipStat($ShipModel,'action-5-red'),
							getShipStat($ShipModel,'action-5-linked')]);
		}
	}
	yCenterPoint = 650;
	if (textBoxStyle == 'full') {
		xCenterPoint = 635;
	} else {
		xCenterPoint = 590;
	}
	switch (actions.length) {
		case 0: yDistanceBetween = 0; break;
		case 1: yDistanceBetween = 0; break;
		case 2: yDistanceBetween = 245; break;
		case 3: yDistanceBetween = 164; break;
		case 4: yDistanceBetween = 123; break;
		case 5: yDistanceBetween = 100; break;
	}	
	for (let i = 0; i < actions.length; ++i) {
		y = yCenterPoint + yDistanceBetween * i - yDistanceBetween * (actions.length - 1) / 2;
		if (actions[i][2] != '-') {
			x = xCenterPoint - 50;
			g.setPaint(Xwing2.getColor('white'));
			sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][0]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.actionFont, 12, sheet.ALIGN_CENTER);
			//sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][0]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 12, sheet.ALIGN_CENTER);
			x = xCenterPoint;
			sheet.drawTitle(g, Xwing2.textToIconChar('linked'), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.actionFont, 12, sheet.ALIGN_CENTER);
			//sheet.drawTitle(g, Xwing2.textToIconChar('linked'), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 12, sheet.ALIGN_CENTER);
			x = xCenterPoint + 50;
			g.setPaint(Xwing2.getColor('red'));
			sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][2]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.actionFont, 12, sheet.ALIGN_CENTER);		
			//sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][2]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 12, sheet.ALIGN_CENTER);		
		} else {
			x = xCenterPoint;
			if (actions[i][1] == 'yes' || actions[i][1] == '1') {
				g.setPaint(Xwing2.getColor('red'));
			} else {
				g.setPaint(Xwing2.getColor('white'));
			}
			sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][0]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.actionFont, 12, sheet.ALIGN_CENTER);
			//sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][0]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 12, sheet.ALIGN_CENTER);
		}
	}	
}

function paintToken(g,diy,sheet) {
	if ($ShipModel == 'custom') {
		tokenSize = $CustomShipSize;
	} else {
		tokenSize = getShipStat($ShipModel, 'size');
	}
	if (tokenSize == 'small') {
		tokenWidth = 402;
		tokenHeight = 472;
		cutoutSize = 140;
		bullsEyeYAdjustment = 112;
		//bullsEyeYAdjustment = 139;
	} else if (tokenSize == 'medium'){
		tokenWidth = 638;
		tokenHeight = 709;
		cutoutSize = 190;
		bullsEyeYAdjustment = 106;
		//bullsEyeYAdjustment = 131;
	} else { // tokenSize == 'large'
		tokenWidth = 850;
		tokenHeight = 945;
		cutoutSize = 190;
		bullsEyeYAdjustment = 106;
		//bullsEyeYAdjustment = 131;
	}
	bullsEyeXAdjustment = 95;
	//bullsEyeXAdjustment = 118;

	g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

	// Draw star-field background
	imageTemplate = 'pilot-' + tokenSize + '-token-template';
	sheet.paintImage(g, imageTemplate, 0, 0);

	// Draw shaded fire arc area
	fireArcArea = ImageUtils.create(tokenWidth, tokenHeight, true);
	gTemp = fireArcArea.createGraphics();
	gTemp.setPaint(Xwing2.getColor($Faction));
	fireArcs = [];
	if ($ShipModel == 'custom') {
		if ($CustomShipAttackValue1 != '-') {fireArcs.push($CustomShipAttackArc1);}
		if ($CustomShipAttackValue2 != '-') {fireArcs.push($CustomShipAttackArc2);}
		if ($CustomShipAttackValue3 != '-') {fireArcs.push($CustomShipAttackArc3);}
	} else {
		if (getShipStat($ShipModel, 'attack-1-value') != '-') {fireArcs.push(getShipStat($ShipModel,'attack-1-arc'));}
		if (getShipStat($ShipModel, 'attack-2-value') != '-') {fireArcs.push(getShipStat($ShipModel,'attack-2-arc'));}
		if (getShipStat($ShipModel, 'attack-3-value') != '-') {fireArcs.push(getShipStat($ShipModel,'attack-2-arc'));}
	}
	for (let i = 0; i < fireArcs.length; ++i) {
		switch (fireArcs[i]) {
			case 'front': {gTemp.fillPolygon([0, Math.round(tokenWidth/2), tokenWidth], [0, Math.round(tokenHeight/2), 0], 3);} break;
			case 'rear': {gTemp.fillPolygon([0, Math.round(tokenWidth/2), tokenWidth], [tokenHeight, Math.round(tokenHeight/2), tokenHeight], 3);} break;
			case 'leftside': {gTemp.fillPolygon([0, Math.round(tokenWidth/2), 0], [0, Math.round(tokenHeight/2), tokenHeight], 3);} break;
			case 'rightside': {gTemp.fillPolygon([tokenWidth, Math.round(tokenWidth/2), tokenWidth], [0, Math.round(tokenHeight/2), tokenHeight], 3);} break;
			case 'fullfront': {gTemp.fillPolygon([0, 0, tokenWidth, tokenWidth], [0, Math.round(tokenHeight/2), Math.round(tokenHeight/2), 0], 4);} break;
			case 'fullrear': {gTemp.fillPolygon([0, 0, tokenWidth, tokenWidth], [tokenHeight, Math.round(tokenHeight/2), Math.round(tokenHeight/2), tokenHeight], 4);} break;
			case 'singleturret': {/*No visible fireArc*/} break;
			case 'doubleturret': {/*No visible fireArc*/} break;
			case 'bullseye': {
				gTemp.fillPolygon([Math.round(tokenWidth/2)-bullsEyeXAdjustment, Math.round(tokenWidth/2)+bullsEyeXAdjustment,
					Math.round(tokenWidth/2)+bullsEyeXAdjustment, Math.round(tokenWidth/2), Math.round(tokenWidth/2)-bullsEyeXAdjustment],
					[0, 0, Math.round(tokenHeight/2)-bullsEyeYAdjustment, Math.round(tokenHeight/2), Math.round(tokenHeight/2)-bullsEyeYAdjustment], 5);
			} break;
			default: throw new Error('Arc not defined: ' + fireArcs[i]);
		}
	}
	fireArcArea = createTranslucentImage(fireArcArea, 0.30);
	g.drawImage(fireArcArea, 0, 0, null);

	// Draw non-fire arc lines
	lengthOfHalfDivider = 20;
	g.setPaint(Color.WHITE);
	g.setStroke(BasicStroke(3));
	g.drawLine(0, 0, tokenWidth, tokenHeight);
	g.drawLine(0, tokenHeight, tokenWidth, 0);
	g.drawLine(Math.round(tokenWidth/2), 0, Math.round(tokenWidth/2), lengthOfHalfDivider);
	g.drawLine(Math.round(tokenWidth/2), tokenHeight, Math.round(tokenWidth/2), tokenHeight-lengthOfHalfDivider);
	g.drawLine(0, Math.round(tokenHeight/2), lengthOfHalfDivider, Math.round(tokenHeight/2));
	g.drawLine(tokenWidth, Math.round(tokenHeight/2), tokenWidth-lengthOfHalfDivider, Math.round(tokenHeight/2));
	g.drawLine(Math.round(tokenWidth/2), Math.round((tokenHeight - cutoutSize)/2), Math.round(tokenWidth/2), Math.round((tokenHeight - cutoutSize)/2)-lengthOfHalfDivider);
	g.drawLine(Math.round(tokenWidth/2), Math.round((tokenHeight + cutoutSize)/2), Math.round(tokenWidth/2), Math.round((tokenHeight + cutoutSize)/2)+lengthOfHalfDivider);
	g.drawLine(Math.round((tokenWidth - cutoutSize)/2), Math.round(tokenHeight/2), Math.round((tokenWidth - cutoutSize)/2)-lengthOfHalfDivider, Math.round(tokenHeight/2));
	g.drawLine(Math.round((tokenWidth + cutoutSize)/2), Math.round(tokenHeight/2), Math.round((tokenWidth + cutoutSize)/2)+lengthOfHalfDivider, Math.round(tokenHeight/2));
	g.drawLine(Math.round(tokenWidth/2)-bullsEyeXAdjustment, 0, Math.round(tokenWidth/2)-bullsEyeXAdjustment, Math.round(tokenHeight/2)-bullsEyeYAdjustment);
	g.drawLine(Math.round(tokenWidth/2)+bullsEyeXAdjustment, 0, Math.round(tokenWidth/2)+bullsEyeXAdjustment, Math.round(tokenHeight/2)-bullsEyeYAdjustment);
	g.drawLine(Math.round(tokenWidth/2), Math.round(tokenHeight/2), Math.round(tokenWidth/2)-bullsEyeXAdjustment, Math.round(tokenHeight/2)-bullsEyeYAdjustment);
	g.drawLine(Math.round(tokenWidth/2), Math.round(tokenHeight/2), Math.round(tokenWidth/2)+bullsEyeXAdjustment, Math.round(tokenHeight/2)-bullsEyeYAdjustment);
		
	// Draw fire arc lines
	g.setPaint(Xwing2.getColor($Faction));
	g.setStroke(BasicStroke(3));
	for (let i = 0; i < fireArcs.length; ++i) {
		switch (fireArcs[i]) {
			case 'fullfront': {
				g.drawLine(0, Math.round(tokenHeight/2), tokenWidth, Math.round(tokenHeight/2));
			} //fall through
			case 'front': {
				g.drawLine(0, 0, Math.round(tokenWidth/2), Math.round(tokenHeight/2));
				g.drawLine(tokenWidth, 0, Math.round(tokenWidth/2), Math.round(tokenHeight/2));
			} //fall through
			case 'bullseye': {
				g.drawLine(Math.round(tokenWidth/2)-bullsEyeXAdjustment, 0, Math.round(tokenWidth/2)-bullsEyeXAdjustment, Math.round(tokenHeight/2)-bullsEyeYAdjustment);
				g.drawLine(Math.round(tokenWidth/2)+bullsEyeXAdjustment, 0, Math.round(tokenWidth/2)+bullsEyeXAdjustment, Math.round(tokenHeight/2)-bullsEyeYAdjustment);
				g.drawLine(Math.round(tokenWidth/2), Math.round(tokenHeight/2), Math.round(tokenWidth/2)-bullsEyeXAdjustment, Math.round(tokenHeight/2)-bullsEyeYAdjustment);
				g.drawLine(Math.round(tokenWidth/2), Math.round(tokenHeight/2), Math.round(tokenWidth/2)+bullsEyeXAdjustment, Math.round(tokenHeight/2)-bullsEyeYAdjustment);
			} break;
			case 'fullrear': {
				g.drawLine(0, Math.round(tokenHeight/2), Math.round(tokenWidth/2), Math.round(tokenHeight/2));
			} //fall through
			case 'rear': {
				g.drawLine(0, tokenHeight, Math.round(tokenWidth/2), Math.round(tokenHeight/2));
				g.drawLine(tokenWidth, tokenHeight, Math.round(tokenWidth/2), Math.round(tokenHeight/2));
			} break;
			case 'leftside': {
				g.drawLine(0, 0, Math.round(tokenWidth/2), Math.round(tokenHeight/2));
				g.drawLine(0, tokenHeight, Math.round(tokenWidth/2), Math.round(tokenHeight/2));
			} break;
			case 'rightside': {
				g.drawLine(tokenWidth, tokenHeight, Math.round(tokenWidth/2), Math.round(tokenHeight/2));
				g.drawLine(tokenWidth, 0, Math.round(tokenWidth/2), Math.round(tokenHeight/2));
			} break;
			case 'singleturret': {/*No visible fireArc*/} break;
			case 'doubleturret': {/*No visible fireArc*/} break;
			default: throw new Error('Arc not defined: ' + fireArcs[i]);
		}
	}

	// Draw frame
	// TODO

	// Draw Pilot Name
	if ($$UniquePilot.yesNo) {
		tokenNameBox.markupText = '<uni>' + diy.name;
	} else {
		tokenNameBox.markupText = diy.name;
	}
	tokenNameBox.drawAsSingleLine(g, R(tokenSize + '-token-name'));

	// Draw Initiative
	if ($Initiative == '\u25a0') {
		g.setPaint(Xwing2.getColor('initiative'));
		initRect = R('initiative-square', 0, 0);
		g.fillRect(initRect.getX(), initRect.getY(), initRect.getWidth(), initRect.getHeight());
	} else {
		sheet.drawOutlinedTitle(g, $Initiative, R(tokenSize + '-token-initiative', 0, 0), Xwing2.numberFont, 18, 2, Xwing2.getColor('initiative'), Color.BLACK, sheet.ALIGN_CENTER, true);
	}

	// Draw Ship Icon
	if ($ShipModel == 'custom' && $CustomShipIcon == 'custom') {
		iconRect = R(tokenSize + '-token-icon');
		iconImage = portraits[2].getImage();
		iconScale = portraits[2].getScale();
		AT = java.awt.geom.AffineTransform;
		tokenTransform = AT.getTranslateInstance(
			38 + iconRect.getX() - (iconImage.width*iconScale)/2 + portraits[2].getPanX(),
			32 + iconRect.getY() - (iconImage.height*iconScale)/2 + portraits[2].getPanY());
		tokenTransform.concatenate(AT.getScaleInstance(iconScale, iconScale));
		g.drawImage( iconImage, tokenTransform, null );
	} else {
		if ( $ShipModel == 'custom' ) {
			shipIcon = $CustomShipIcon;
		} else {
			shipIcon = getShipStat($ShipModel, 'icon');
		}
		g.setPaint(Color.WHITE);
		sheet.drawTitle(g, Xwing2.textToShipChar(shipIcon), R(tokenSize + '-token-icon'), Xwing2.shipFont, 24, sheet.ALIGN_CENTER);
  	}
	
	//Draw central cutout circle
	g.setPaint(Color.WHITE);
	g.fillOval(Math.round((tokenWidth - cutoutSize)/2), Math.round((tokenHeight - cutoutSize)/2), cutoutSize, cutoutSize );
}

function paintFrontFaceFrame(g, diy, sheet, textBoxStyle) {
	if (textBoxStyle == 'full') {
		xMod = 0;
	} else {
		xMod = 83; // Adjustment for reduced text area
	}
	
	if ( $Faction == 'custom' ) {
		color1 = new Color($CustomFactionColorRed1 / 255, $CustomFactionColorGreen1 / 255, $CustomFactionColorBlue1 / 255);
		color2 = new Color($CustomFactionColorRed2 / 255, $CustomFactionColorGreen2 / 255, $CustomFactionColorBlue2 / 255);
		color3 = new Color($CustomFactionColorRed3 / 255, $CustomFactionColorGreen3 / 255, $CustomFactionColorBlue3 / 255);
	} else {
		color1 = new Color(
			Number(getFactionStat($Faction, 'color-1-red')) / 255,
			Number(getFactionStat($Faction, 'color-1-green')) / 255,
			Number(getFactionStat($Faction, 'color-1-blue')) / 255);
		color2 = new Color(
			Number(getFactionStat($Faction, 'color-2-red')) / 255,
			Number(getFactionStat($Faction, 'color-2-green')) / 255,
			Number(getFactionStat($Faction, 'color-2-blue')) / 255);
		color3 = new Color(
			Number(getFactionStat($Faction, 'color-3-red')) / 255,
			Number(getFactionStat($Faction, 'color-3-green')) / 255,
			Number(getFactionStat($Faction, 'color-3-blue')) / 255);
	}
		
	// Draw Text Area
	g.setPaint(Xwing2.getColor('white'));
	g.fillPolygon([0,585-xMod,605-xMod,605-xMod,585-xMod,0], [450,450,470,782,802,802], 6);
	
	// Tint the Text Area
	textArea = ImageUtils.create(739, 1040, true);
	gTemp = textArea.createGraphics();
	//TODO: Gradient tint...
	gTemp.setPaint(color1);
	gTemp.fillPolygon([0,585-xMod,605-xMod,605-xMod,585-xMod,0], [450,450,470,782,802,802], 6);
	textArea = createTranslucentImage(textArea, 0.10);
	g.drawImage(textArea, 0, 0, null);
	
	//TODO: Gradient art in between the line art
	
	// Draw Line Art
	g.setPaint(color1);
	g.setStroke(BasicStroke(2));
	g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

	g.drawLine(0, 447, 585-xMod, 447);
	g.drawLine(586-xMod, 447, 607-xMod, 468);
	g.drawLine(608-xMod, 469, 608-xMod, 783);
	g.drawLine(607-xMod, 784, 586-xMod, 805);
	g.drawLine(585-xMod, 805, 0, 805);
	
	g.drawLine(651-xMod, 447, 1040, 447);
	g.drawLine(629-xMod, 468, 650-xMod, 447);
	g.drawLine(628-xMod, 469, 628-xMod, 918);
	g.drawLine(629-xMod, 919, 650-xMod, 940);
	g.drawLine(651-xMod, 940, 1040, 940);
	
	g.drawLine(608-xMod, 469, 628-xMod, 469);
	g.drawLine(608-xMod, 506, 628-xMod, 506);
	g.drawLine(608-xMod, 615, 628-xMod, 615);
	g.drawLine(608-xMod, 680, 628-xMod, 680);
	g.drawLine(608-xMod, 709, 628-xMod, 709);
	g.drawLine(608-xMod, 751, 628-xMod, 751);
	g.drawLine(608-xMod, 783, 628-xMod, 783);
	
	g.drawOval(612-xMod, 521, 12, 1);
	g.drawOval(612-xMod, 638, 12, 1);
	g.drawOval(612-xMod, 740, 12, 1);
	
	g.setPaint(Color(190 / 255, 190 / 255, 190 / 255));
	g.setStroke(BasicStroke(1.6));
	for (i = 0; i < 66; i++) {
		yRel = i*4.7;
		if (i == 3 || i == 23 || i == 36 || i == 47 || i == 55 || i == 61 || i == 63) {
			g.drawLine(615-xMod, 474 + yRel, 621-xMod, 474 + yRel);
		} else {
			g.drawLine(618-xMod, 474 + yRel, 618-xMod, 474 + yRel);
		}
	}	
	
}

function onClear() {
	$Epithet = '';
	$ShipModel = 'custom';
	$Faction = 'rebel';
	$Initiative = '1';
	$UniquePilot = 'no';
	$Droid = 'no';
	$Text = '';
	$ChargeValue = '-';
	$ChargeRecurring = 'no';
	$ForceValue = '-';

	$CustomShipModel = '';
	$CustomShipAbilityName = '';
	$CustomShipAbilityText = '';
	$CustomShipAttackValue1 = '-';
	$CustomShipAttackArc1 = 'front';
	$CustomShipAttackValue2 = '-';
	$CustomShipAttackArc2 = 'front';
	$CustomShipAttackValue3 = '-';
	$CustomShipAttackArc3 = 'front';
	$CustomShipAgility = '0';
	$CustomShipHull = '1';
	$CustomShipShield = '-';
	$CustomShipSize = 'small';
	$CustomShipActionName1 = '-';
	$CustomShipActionRed1 = 'no';
	$CustomShipActionLinked1 = '-';
	$CustomShipActionName2 = '-';
	$CustomShipActionRed2 = 'no';
	$CustomShipActionLinked2 = '-';
	$CustomShipActionName3 = '-';
	$CustomShipActionRed3 = 'no';
	$CustomShipActionLinked3 = '-';
	$CustomShipActionName4 = '-';
	$CustomShipActionRed4 = 'no';
	$CustomShipActionLinked4 = '-';
	$CustomShipActionName5 = '-';
	$CustomShipActionRed5 = 'no';
	$CustomShipActionLinked5 = '-';
	$CustomShipIcon = 'custom';
	
	$CustomFactionColorRed1 = '255';
	$CustomFactionColorGreen1 = '255';
	$CustomFactionColorBlue1 = '255';
	$CustomFactionColorRed2 = '255';
	$CustomFactionColorGreen2 = '255';
	$CustomFactionColorBlue2 = '255';
	$CustomFactionColorRed3 = '255';
	$CustomFactionColorGreen3 = '255';
	$CustomFactionColorBlue3 = '255';
}

// These can be used to perform special processing during open/save.
// For example,you can seamlessly upgrade from a previous version
// of the script.
function onRead(diy,ois) {
	portraits[0] = ois.readObject();
	portraits[1] = ois.readObject();
	portraits[2] = ois.readObject();
	portraits[3] = ois.readObject();
	portraits[4] = ois.readObject();
}

function onWrite(diy,oos) {
	oos.writeObject(portraits[0]);
	oos.writeObject(portraits[1]);
	oos.writeObject(portraits[2]);
	oos.writeObject(portraits[3]);
	oos.writeObject(portraits[4]);
}

/**
 * createTexturedImage(source, texture)
 * Create a new image whose shape (based on translucency) comes
 * from <tt>source</tt>,and whose surface is painted using a
 * texture. The value of <tt>texture</tt> can be an image,a
 * <tt>Color</tt> (in which case the texture is a solid colour),
 * or a <tt>Paint</tt>.
 */
function createTexturedImage(source, texture) {
	g = null;
	// if texture is a kind of Paint or colour,create a texture image
	// using the paint
	if (texture instanceof java.awt.Paint) {
		solidTexture = ImageUtils.create(source.width,source.height,true);
		try {
			g = solidTexture.createGraphics();
			g.setPaint(texture);
			g.fillRect(0,0,source.width,source.height);
			texture = solidTexture;
		} finally {
			if (g) g.dispose();
			g = null;
		}
	}
	dest = ImageUtils.create(source.width,source.height,true);
	try {
		g = dest.createGraphics();
		g.drawImage(source,0,0,null);
		g.setComposite(java.awt.AlphaComposite.SrcIn);
		g.drawImage(texture,0,0,null);
	} finally {
		if (g) g.dispose();
	}
	return dest;
}

/**
 * createTranslucentImage(source, opacity)
 * Create a copy of the source image with an opacity change.
 * This is similar to setting the layer opacity in software
 * like Photoshop.
 */
function createTranslucentImage(source, opacity) {
	if (opacity >= 1) return source;
	im = ImageUtils.create(source.width,source.height,true);
	if (opacity <= 0) return im;

	g = im.createGraphics();
	try {
		g.composite = java.awt.AlphaComposite.SrcOver.derive(opacity);
		g.drawImage(source,0,0,null);
	} finally {
		g.dispose();
	}
	return im;
}

function getShipStat(shipId, stat) {
	key = 'xw2-ship-' + shipId + '-' + stat;
	if (!Language.getGame().isKeyDefined(key)) {
		throw new Error('shiptype or stat not defined: ' + shipId + stat);
	}
	javaString = Language.game.get(key);
	javaScriptString = String(javaString).valueOf();
	return javaScriptString;
}

function getFactionStat(factionId, stat) {
	key = 'xw2-faction-' + factionId + '-' + stat;
	if (!Language.getGame().isKeyDefined(key)) {
		throw new Error('faction or stat not defined: ' + factionId + stat);
	}
	javaString = Language.game.get(key);
	javaScriptString = String(javaString).valueOf();
	return javaScriptString;
}

/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name,without the
 * 'pilot-' prefix or '-region' suffix.
 */
function R(nametag,x,y) {
	value = $('pilot-' + nametag + '-region');
	if (value == null) {
		throw new Error('region not defined: ' + nametag);
	}
	if (x == null) {
		x = 0;
	}
	if (y == null) {
		y = 0;
	}
	temp = value.split(',');
	temp[0] = parseInt(temp[0]) + parseInt(x);
	temp[1] = parseInt(temp[1]) + parseInt(y);
	temp[0] = temp[0].toString();
	temp[1] = temp[1].toString();
	value = temp[0] + ',' + temp[1]	+ ',' + temp[2]	+ ',' + temp[3];
	//return value;
	return new Region(value);
}


// This will cause a test component to be created when you run the script
// from a script editor. It doesn't do anything when the script is run
// other ways (e.g.,when you choose to create the component by selecting
// it in the New Game Component dialog).
testDIYScript('XW2');