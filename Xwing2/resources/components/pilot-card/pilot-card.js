useLibrary('diy');
useLibrary('ui');
useLibrary('imageutils');
useLibrary('markup');

importPackage(ca.cgjennings.graphics.filters);

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
	portraits[1] = new DefaultPortrait(diy,'ship-icon-card');
	portraits[1].setScaleUsesMinimum(true);
	portraits[1].facesToUpdate = 1;
	portraits[1].backgroundFilled = false;
	portraits[1].clipping = true;
	portraits[1].installDefault();
	
	// Ship Icon,Token
	portraits[2] = new DefaultPortrait(portraits[1],'ship-icon-token');
	portraits[2].setScaleUsesMinimum(true);
	portraits[2].facesToUpdate = 4;
	portraits[2].backgroundFilled = false;
	portraits[2].clipping = true;
	portraits[2].installDefault();
	image = ImageUtils.create(65, 65, true);
	g = image.createGraphics();
	portraits[2].setClipStencil(image);
	
	// Upper Panel
	portraits[3] = new DefaultPortrait(diy,'faction-upper-panel');
	portraits[3].setScaleUsesMinimum(false);
	portraits[3].facesToUpdate = 1;
	portraits[3].backgroundFilled = false;
	portraits[3].clipping = true;
	portraits[3].installDefault();
	image = createUpperPanelImage();
	image = invertAlpha(image);
	portraits[3].setClipStencil(image);

	// Lower Panel
	portraits[4] = new DefaultPortrait(diy,'faction-lower-panel');
	portraits[4].setScaleUsesMinimum(false);
	portraits[4].facesToUpdate = 1;
	portraits[4].backgroundFilled = false;
	portraits[4].clipping = true;
	portraits[4].installDefault();
	image = createLowerPanelImage();
	image = invertAlpha(image);
	portraits[4].setClipStencil(image);
	
	// Faction Background Back
	portraits[5] = new DefaultPortrait(diy,'faction-background');
	portraits[5].setScaleUsesMinimum(false);
	portraits[5].facesToUpdate = 2;
	portraits[5].backgroundFilled = false;
	portraits[5].clipping = true;
	portraits[5].installDefault();
	image = ImageUtils.create(739, 1040, true);
	g = image.createGraphics();
	portraits[5].setClipStencil(image);

	// Faction Symbol Front
	portraits[6] = new DefaultPortrait(diy,'faction-symbol-front');
	portraits[6].setScaleUsesMinimum(false);
	portraits[6].facesToUpdate = 1;
	portraits[6].backgroundFilled = false;
	portraits[6].clipping = true;
	portraits[6].installDefault();
	
	// Faction Symbol Back
	portraits[7] = new DefaultPortrait(portraits[6],'faction-symbol-back');
	portraits[7].setScaleUsesMinimum(false);
	portraits[7].facesToUpdate = 2;
	portraits[7].backgroundFilled = false;
	portraits[7].clipping = true;
	portraits[7].installDefault();
	image = ImageUtils.create(500, 500, true);
	g = image.createGraphics();
	portraits[7].setClipStencil(image);
	
	// Faction Symbol Outline
	portraits[8] = new DefaultPortrait(diy,'faction-symbol-outline');
	portraits[8].setScaleUsesMinimum(false);
	portraits[8].facesToUpdate = 1;
	portraits[8].backgroundFilled = false;
	portraits[8].clipping = true;
	portraits[8].installDefault();

		
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
	
	$CustomFactionMainTint = #xw2-pilot-custom-faction-main-tint;
	$CustomFactionFireArcTint = #xw2-pilot-custom-faction-fire-arc-tint;
	$CustomFactionDarkEdges = #xw2-pilot-custom-faction-dark-edges;
}

function createInterface(diy,editor) {
	bindings = new Bindings(editor,diy);

	// Main Panel
	mainHelpButton = helpButton("http://github.com/Hinny/strange-eons-xwing2/wiki/Creating-Pilot-Cards");
	
	factionItems = [];
	factionItems.push(ListItem('custom',@xw2-faction-custom));
	factionItems.push(ListItem('rebel',@xw2-faction-rebel));
	factionItems.push(ListItem('imperial',@xw2-faction-imperial));
	factionItems.push(ListItem('scum',@xw2-faction-scum));
	factionBox = comboBox(factionItems);
	bindings.add('Faction',factionBox,[0,1,2]);	

	shipItems = [];
	shipItems.push(ListItem('custom',@xw2-ship-custom-name));
	shipItems.push(ListItem('bwing',@xw2-ship-bwing-name));
	shipItems.push(ListItem('arc170',@xw2-ship-arc170-name));
	shipItems.push(ListItem('attackshuttle',@xw2-ship-attackshuttle-name));
	shipItems.push(ListItem('auzituck',@xw2-ship-auzituck-name));
	shipItems.push(ListItem('ywing',@xw2-ship-ywing-name));
	shipItems.push(ListItem('kwing',@xw2-ship-kwing-name));
	shipItems.push(ListItem('ewing',@xw2-ship-ewing-name));
	shipItems.push(ListItem('hwk290',@xw2-ship-hwk290-name));
	shipItems.push(ListItem('yt1300',@xw2-ship-yt1300-name));
	shipItems.push(ListItem('awing',@xw2-ship-awing-name));
	shipItems.push(ListItem('sheatipede',@xw2-ship-sheatipede-name));
	shipItems.push(ListItem('t65xwing',@xw2-ship-t65xwing-name));
	shipItems.push(ListItem('uwing',@xw2-ship-uwing-name));
	shipItems.push(ListItem('vcx100',@xw2-ship-vcx100-name));
	shipItems.push(ListItem('yt2400',@xw2-ship-yt2400-name));
	shipItems.push(ListItem('z95',@xw2-ship-z95-name));
	shipItems.push(ListItem('starwing',@xw2-ship-starwing-name));
	shipItems.push(ListItem('lambda',@xw2-ship-lambda-name));
	shipItems.push(ListItem('tieadvancedv1',@xw2-ship-tieadvancedv1-name));
	shipItems.push(ListItem('tieadvancedx1',@xw2-ship-tieadvancedx1-name));
	shipItems.push(ListItem('tiereaper',@xw2-ship-tiereaper-name));
	shipItems.push(ListItem('tiedefender',@xw2-ship-tiedefender-name));
	shipItems.push(ListItem('tieaggressor',@xw2-ship-tieaggressor-name));
	shipItems.push(ListItem('tiepunisher',@xw2-ship-tiepunisher-name));
	shipItems.push(ListItem('tieinterceptor',@xw2-ship-tieinterceptor-name));
	shipItems.push(ListItem('tielnfighter',@xw2-ship-tielnfighter-name));
	shipItems.push(ListItem('tiephantom',@xw2-ship-tiephantom-name));
	shipItems.push(ListItem('tiebomber',@xw2-ship-tiebomber-name));
	shipItems.push(ListItem('tiestriker',@xw2-ship-tiestriker-name));
	shipItems.push(ListItem('vt49',@xw2-ship-vt49-name));
	shipItems.push(ListItem('aggressor',@xw2-ship-aggressor-name));
	shipItems.push(ListItem('customyt1300',@xw2-ship-customyt1300-name));
	shipItems.push(ListItem('escapecraft',@xw2-ship-escapecraft-name));
	shipItems.push(ListItem('fangfighter',@xw2-ship-fangfighter-name));
	shipItems.push(ListItem('firespray',@xw2-ship-firespray-name));
	shipItems.push(ListItem('g1a',@xw2-ship-g1a-name));
	shipItems.push(ListItem('jumpmaster',@xw2-ship-jumpmaster-name));
	shipItems.push(ListItem('kihraxz',@xw2-ship-kihraxz-name));
	shipItems.push(ListItem('lancer',@xw2-ship-lancer-name));
	shipItems.push(ListItem('kimogila',@xw2-ship-kimogila-name));
	shipItems.push(ListItem('m3a',@xw2-ship-m3a-name));
	shipItems.push(ListItem('spacetug',@xw2-ship-spacetug-name));
	shipItems.push(ListItem('scurrg',@xw2-ship-scurrg-name));
	shipItems.push(ListItem('starviper',@xw2-ship-starviper-name));
	shipItems.push(ListItem('yv666',@xw2-ship-yv666-name));
	
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
	
	chargeValueItems = ['-','1','2','3','4','5','6'];
	chargeValueBox = comboBox(chargeValueItems);
	bindings.add('ChargeValue',chargeValueBox,[0]);
	
	chargeRecurringCheckbox = checkBox(@xw2-recurring);
	bindings.add('ChargeRecurring',chargeRecurringCheckbox,[0]);

	forceValueItems = ['-','1','2','3'];
	forceValueBox = comboBox(forceValueItems);
	bindings.add('ForceValue',forceValueBox,[0]);
	
	pilotPanel = portraitPanel(diy,0);
	pilotPanel.panelTitle = @xw2-portrait-pilot;

	mainPanel = new Grid('','[min:pref][min:pref][min:pref][min:pref,grow]','');
	mainPanel.setTitle(@xw2-info);
	mainPanel.place(mainHelpButton,'wrap para');
	mainPanel.place(@xw2-faction,'',factionBox,'wmin 250,span 3,wrap');	
	mainPanel.place(@xw2-ship-model,'',shipBox,'wmin 250,span 3,wrap');
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

	// same list as shipItemBox
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
	
	customFactionMainTintPanel = tintPanel();
	customFactionMainTintPanel.getBorder().setTitle(@xw2-color-main);
	customFactionMainTintPanel.setPresets(
		@xw2-faction-rebel, getFactionStat('rebel', 'main-tint'),
		@xw2-faction-imperial, getFactionStat('imperial', 'main-tint'),
		@xw2-faction-scum, getFactionStat('scum', 'main-tint')
	);
	bindings.add( 'CustomFactionMainTint', customFactionMainTintPanel, [0, 2] );

	customFactionFireArcTintPanel = tintPanel();
	customFactionFireArcTintPanel.getBorder().setTitle(@xw2-color-fire-arcs);
	customFactionFireArcTintPanel.setPresets(
		@xw2-faction-rebel, getFactionStat('rebel', 'fire-arc-tint'),
		@xw2-faction-imperial, getFactionStat('imperial', 'fire-arc-tint'),
		@xw2-faction-scum, getFactionStat('scum', 'fire-arc-tint')
	);
	bindings.add( 'CustomFactionFireArcTint', customFactionFireArcTintPanel, [0, 2] );

	custonFactionDarkEdgesCheckbox = checkBox(@xw2-faction-dark-edges);
	bindings.add('CustomFactionDarkEdges',custonFactionDarkEdgesCheckbox,[1]);

	customFactionUpperPanel = portraitPanel(diy,3);
	customFactionUpperPanel.panelTitle = @xw2-faction-upper-panel;
		
	customFactionLowerPanel = portraitPanel(diy,4);
	customFactionLowerPanel.panelTitle = @xw2-faction-lower-panel;
	
	customFactionBackgroundPanel = portraitPanel(diy,5);
	customFactionBackgroundPanel.panelTitle = @xw2-faction-background;
	
	customFactionSymbolFrontPanel = portraitPanel(diy,6);
	customFactionSymbolFrontPanel.panelTitle = @xw2-faction-symbol-front;

	customFactionSymbolBackPanel = portraitPanel(diy,7);
	customFactionSymbolBackPanel.setParentPanel(customFactionSymbolFrontPanel);		
	customFactionSymbolBackPanel.panelTitle = @xw2-faction-symbol-back;

	customFactionSymbolOutlinePanel = portraitPanel(diy,8);
	customFactionSymbolOutlinePanel.panelTitle = @xw2-faction-symbol-outline;

	customFactionPanel = new Grid('','[min:pref][min:pref][min:pref][min:pref][min:pref][min:pref,grow]','');
	customFactionPanel.setTitle(@xw2-custom-faction);
	customFactionPanel.place(customFactionHelpButton,'wrap para');
	customFactionPanel.place(customFactionMainTintPanel,'wrap para');
	customFactionPanel.place(customFactionFireArcTintPanel,'wrap para');
	customFactionPanel.place(custonFactionDarkEdgesCheckbox,'wrap para');
	customFactionPanel.place(customFactionUpperPanel,'span,growx,wrap');
	customFactionPanel.place(customFactionLowerPanel,'span,growx,wrap');
	customFactionPanel.place(customFactionBackgroundPanel,'span,growx,wrap');
	customFactionPanel.place(customFactionSymbolFrontPanel,'span,growx,wrap');
	customFactionPanel.place(customFactionSymbolBackPanel,'span,growx,wrap');
	customFactionPanel.place(customFactionSymbolOutlinePanel,'span,growx,wrap');
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
				customFactionMainTintPanel.setVisible(false);
				customFactionFireArcTintPanel.setVisible(false);
				customFactionUpperPanel.setVisible(false);
				customFactionLowerPanel.setVisible(false);
				customFactionSymbolOutlinePanel.setVisible(false);
				customFactionSymbolFrontPanel.setVisible(false);
				customFactionSymbolBackPanel.setVisible(false);
				customFactionBackgroundPanel.setVisible(false);
			} else {
				customFactionMainTintPanel.setVisible(true);
				customFactionFireArcTintPanel.setVisible(true);
				customFactionUpperPanel.setVisible(true);
				customFactionLowerPanel.setVisible(true);
				customFactionSymbolOutlinePanel.setVisible(true);
				customFactionSymbolFrontPanel.setVisible(true);
				customFactionSymbolBackPanel.setVisible(true);
				customFactionBackgroundPanel.setVisible(true);
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
	copyRightBox = Xwing2.copyRightBox(sheet,4.5);
	tokenNameBox = Xwing2.headingBox(sheet, 8.8);
}

function createBackPainter(diy, sheet) {

}

function paintFront(g, diy, sheet) {
	if (sheet.sheetIndex == 0) {
		textBoxSize = getTextBoxSize();
		mainColor = getMainColor();
		actionsInActionBar = getActionsInActionBar();
		paintFrontFaceFrame(g, sheet, textBoxSize, actionsInActionBar, mainColor);
		paintFrontFaceInfo(g, diy, sheet, textBoxSize);
	} else {
		mainColor = getMainColor();
		fireArcColor = getFireArcColor();
		paintToken(g, diy, sheet, mainColor, fireArcColor);
	}
}

function paintBack(g, diy, sheet) {
	target = sheet.getRenderTarget();
	
	imageTemplate = 'pilot-blank-template';
	sheet.paintImage(g, imageTemplate,0,0);
	
	if ($Faction == 'custom') {
		portraits[5].paint(g, target);		
	} else {
		imageTemplate = 'pilot-' + $Faction + '-back-template';
		sheet.paintImage(g, imageTemplate,0,0);
	}
	
	if ($Faction == 'custom') {
		backLineArt = ImageUtils.create(370, 520, true);
		gTemp = backLineArt.createGraphics();
		gTemp.setStroke(BasicStroke(1.5));
		gTemp.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		
		gTemp.setPaint(Color.WHITE);
		gTemp.drawLine(64, 0, 64, 520);
		gTemp.drawLine(92, 0, 92, 60);
		gTemp.drawLine(92, 60, 37, 116);
		gTemp.drawLine(37, 116, 37, 520);
		gTemp.drawLine(227, 0, 227, 118);
		gTemp.drawLine(227, 118, 224, 119);
		gTemp.drawLine(258, 0, 258, 105);
		gTemp.drawLine(258, 105, 314, 161);
		gTemp.drawLine(314, 161, 314, 247);
		gTemp.drawLine(284, 171, 284, 255);
		gTemp.drawArc(370-852/2, 520-852/2, 852, 852, 110, 180-110);
		gTemp.drawArc(370-788/2, 520-788/2, 788, 788, 90, 180-90);
		gTemp.drawArc(370-718/2, 520-718/2, 718, 718, 104, 180-104);
		gTemp.drawArc(370-556/2, 520-556/2, 556, 556, 90, 180-90);
		
		gTemp.setPaint(Color.BLACK);
		gTemp.drawLine(62, 0, 62, 520);
		gTemp.drawLine(90, 0, 90, 59);
		gTemp.drawLine(90, 59, 35, 115);
		gTemp.drawLine(35, 115, 35, 520);
		gTemp.drawLine(225, 0, 225, 117);
		gTemp.drawLine(225, 117, 222, 118);
		gTemp.drawLine(256, 0, 256, 106);
		gTemp.drawLine(256, 106, 312, 162);
		gTemp.drawLine(312, 162, 312, 246);
		gTemp.drawLine(286, 169, 286, 253);
		gTemp.drawLine(286, 168, 283, 169);
		gTemp.drawArc(370-854/2, 520-854/2, 854, 854, 110, 180-110);
		gTemp.drawArc(370-792/2, 520-792/2, 792, 792, 90, 180-90);
		gTemp.drawArc(370-722/2, 520-722/2, 722, 722, 104, 180-104);
		gTemp.drawArc(370-560/2, 520-560/2, 560, 560, 90, 180-90);
		
		backLineArt = createTranslucentImage(backLineArt, 0.5);
	
		backLineArtFlipHorz = turnAndFlip(backLineArt, TurnAndFlipFilter.TURN_0_FLIP_HORZ);
		backLineArtFlipVert = turnAndFlip(backLineArt, TurnAndFlipFilter.TURN_0_FLIP_VERT);
		backLineArtFlipBoth = turnAndFlip(backLineArt, TurnAndFlipFilter.TURN_0_FLIP_BOTH);
		
		g.drawImage(backLineArt, 0, 0, null);
		g.drawImage(backLineArtFlipHorz, 370, 0, null);
		g.drawImage(backLineArtFlipVert, 0, 520, null);
		g.drawImage(backLineArtFlipBoth, 370, 520, null);
		
		// Draw Faction Symbol
		portraits[7].paint(g, target);
		
		// Draw Dark Edges
		if ($$CustomFactionDarkEdges.yesNo) {
			imageTemplate = 'pilot-dark-edges-template';
			sheet.paintImage(g, imageTemplate,0,0);
		}
	}
}

function paintFrontFaceFrame(g, sheet, textBoxSize, actionsInActionBar, mainColor) {
	target = sheet.getRenderTarget();
		
	imageTemplate = 'pilot-blank-template';
	sheet.paintImage(g, imageTemplate,0,0);

	//Draw portrait
	portraits[0].paint(g, target);
		
	if (textBoxSize == 'full') {
		xMod = 0;
	} else {
		xMod = 83; // Adjustment for reduced text area
	}
	
	// Draw Text Area
	g.setPaint(Xwing2.getColor('white'));
	g.fillPolygon([0,585-xMod,605-xMod,605-xMod,585-xMod,0], [450,450,470,782,802,802], 6);
	
	// Tint the Text Area
	textArea = ImageUtils.create(739, 1040, true);
	gTemp = textArea.createGraphics();
	gTemp.setPaint(Xwing2.getColor('white'));
	gTemp.fillPolygon([0,585-xMod,605-xMod,605-xMod,585-xMod,0], [450,450,470,782,802,802], 6);
	radialPaint = new java.awt.RadialGradientPaint(302.2 -xMod / 2, 626, 400, [0.4, 1.0], [Xwing2.getColor('white'), mainColor]);
	textArea = createTexturedImage(textArea, radialPaint);
	textArea = createTranslucentImage(textArea, 0.2);
	g.drawImage(textArea, 0, 0, null);
	
	// Draw faction symbol outline in text area background
	factionSymbol = ImageUtils.create(330, 330, true);
	gTemp = factionSymbol.createGraphics();
	if ($Faction == 'custom') {
		portraits[8].paint(gTemp,target);
	} else {
		imageTemplate = 'pilot-' + $Faction + '-faction-symbol-template';
		sheet.paintImage(gTemp, imageTemplate,0,0);
	}
	factionSymbol = createTexturedImage(factionSymbol, mainColor);
	factionSymbol = createTranslucentImage(factionSymbol, 0.12);
	g.drawImage(factionSymbol, 140-(xMod/2), 466, null);
	
	// Gradient art in between the line art
	gradiantArt = ImageUtils.create(18, 105, true);
	gTemp = gradiantArt.createGraphics();
	gTemp.setPaint(Xwing2.getColor('white'));
	gTemp.fillRect(0,0,18,105);
	gradientPaint = new java.awt.GradientPaint(0, 0, Color(24 / 255, 20 / 255, 21 / 255), 0, 250, mainColor);
	gradiantArt = createTexturedImage(gradiantArt, gradientPaint);
	g.drawImage(gradiantArt, 609-xMod, 678, null);
	
	gradiantArt = ImageUtils.create(18, 209, true);
	gTemp = gradiantArt.createGraphics();
	gTemp.setPaint(Xwing2.getColor('white'));
	gTemp.fillRect(0,0,18,209);
	gradientPaint = new java.awt.GradientPaint(0, 50, Color(24 / 255, 20 / 255, 21 / 255), 0, 380, mainColor);
	gradiantArt = createTexturedImage(gradiantArt, gradientPaint);
	g.drawImage(gradiantArt, 609-xMod, 470, null);
	
	// Draw Line Art
	g.setPaint(mainColor);
	g.setStroke(BasicStroke(2));
	g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

	g.drawPolyline([0, 171, 193, 546, 568, 739], [419, 419, 397, 397, 419, 419], 6);
	g.drawPolyline([0, 127, 139, 600, 612, 739], [977, 977, 965, 965, 977, 977], 6);
	g.drawPolyline([0, 586-xMod, 608-xMod, 608-xMod, 586-xMod, 0], [447, 447, 469, 783, 805, 805], 6);
	g.drawPolyline([739, 650-xMod, 628-xMod, 628-xMod, 650-xMod, 739], [447, 447, 469, 918, 940, 940], 6);	
		
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
	
	switch (actionsInActionBar) {
		case 0: yDistanceBetween = 0; break;
		case 1: yDistanceBetween = 0; break;
		case 2: yDistanceBetween = 245; break;
		case 3: yDistanceBetween = 164; break;
		case 4: yDistanceBetween = 123; break;
		case 5: yDistanceBetween = 100; break;
	}
	yCenterPoint = 694;
	for (let i = 1; i < actionsInActionBar; ++i) {
		y = yCenterPoint + yDistanceBetween * (i - 1/2) - yDistanceBetween * (actionsInActionBar - 1) / 2;
		g.drawLine(628-xMod, y, 1040, y);
	}
	
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
	
	// Draw upper and lower panel backgrounds
	g.setPaint(Color(80 / 255, 80 / 255, 80 / 255));
	g.fillPolygon([0, 95, 114, 114, 138, 601, 625, 625, 644, 739, 739, 624, 615, 124, 115, 0],
		[439, 439, 420, 352, 328, 328, 352, 420, 439, 439, 318, 318, 309, 309, 318, 318], 16);
	g.fillPolygon([0, 99, 111, 111, 138, 601, 628, 628, 640, 739, 739, 0],
		[958, 958, 970, 990, 1011, 1011, 990, 970, 958, 958, 1040, 1040], 12);

	// Draw upper panel drop shadow
	dropShadow = ImageUtils.create(742, 127, true);
	gTemp = dropShadow.createGraphics();
	gTemp.setPaint(Color(30 / 255, 30 / 255, 30 / 255));
	gTemp.fillPolygon([0, 95, 110, 110, 138, 607, 635, 635, 650, 742, 742, 619, 614, 127, 118, 0],
		[123, 123, 108, 40, 12, 12, 40, 108, 123, 123, 9, 9, 0, 0, 9, 9], 16);
	blur = new BlurFilter(1,3);
	blur.filter(dropShadow,dropShadow);
	g.drawImage(dropShadow, 0, 312, null);
	
	// Draw upper panel
	if ($Faction == 'custom') {
		panel = ImageUtils.create(739, 127, true);
		gTemp = panel.createGraphics();
		portraits[3].paint(gTemp, target);
		mask = createUpperPanelImage();
		panel = applyAlphaMaskToImage(panel, mask);
		g.drawImage(panel, 0, 309, null);
	} else {
		imageTemplate = 'pilot-' + $Faction + '-upper-panel-template';
		sheet.paintImage(g, imageTemplate,0,309);
	}

	// Draw lower panel drop shadow
	dropShadow = ImageUtils.create(742, 82, true);
	gTemp = dropShadow.createGraphics();
	gTemp.setPaint(Color(30 / 255, 30 / 255, 30 / 255));
	gTemp.fillPolygon([0, 99, 107, 107, 139, 606, 638, 638, 646, 742, 742, 0],
		[7, 7, 15, 35, 60, 60, 35, 15, 7, 7, 82, 82], 12);
	blur = new BlurFilter(1,3);
	blur.filter(dropShadow,dropShadow);
	g.drawImage(dropShadow, 0, 961, null);
		
	// Draw lower panel
	if ($Faction == 'custom') {
		panel = ImageUtils.create(739, 82, true);
		gTemp = panel.createGraphics();
		portraits[4].paint(gTemp, target);
		mask = createLowerPanelImage();
		panel = applyAlphaMaskToImage(panel, mask);
		g.drawImage(panel, 0, 958, null);
	} else {
		imageTemplate = 'pilot-' + $Faction + '-lower-panel-template';
		sheet.paintImage(g, imageTemplate,0,965);
	}
	// Draw panel line art
	// TODO: Make 3D fx
	g.setPaint(Color(0 / 255, 0 / 255, 0 / 255));
	g.setStroke(BasicStroke(1.0));
	g.drawLine(0, 331, 125, 331);
	g.drawLine(0, 416, 107, 416);
	g.drawLine(739, 331, 614, 331);
	g.drawLine(739, 416, 632, 416);
	g.drawPolyline([162, 168, 571, 577], [309, 315, 315, 309], 4);
	g.drawPolyline([0, 208, 218], [1030, 1030, 1040], 3);
	g.drawPolyline([739, 531, 521], [1030, 1030, 1040], 3);
	
	imageTemplate = 'pilot-initiative-background-template';
	sheet.paintImage(g, imageTemplate,19,317);

	imageTemplate = 'pilot-icon-background-template';
	sheet.paintImage(g, imageTemplate,19,965);
	
	// Draw faction symbol
	if ($Faction == 'custom') {
		portraits[6].paint(g,target);
	}
	
	// Draw Copy Right Text
	copyRightBox.markupText = "\u00a9LFL \u00a9FFG";
	copyRightBox.drawAsSingleLine(g, R('copy-right'));
}

function paintFrontFaceInfo(g, diy, sheet, textBoxSize) {
	target = sheet.getRenderTarget();

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
		initRect = R('initiative-square-border', 0, 0);
		g.setPaint(Color.BLACK);
		g.fillRect(initRect.getX(), initRect.getY(), initRect.getWidth(), initRect.getHeight());
		initRect = R('initiative-square', 0, 0);
		g.setPaint(Xwing2.getColor('initiative'));
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
	if (textBoxSize == 'full') {
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
	if (textBoxSize == 'full') {
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
			y = y2 + 9;
			sheet.drawTitle(g, Xwing2.textToIconChar('recurring'), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 13.5, sheet.ALIGN_CENTER);
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
	if (textBoxSize == 'full') {
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
		if ($$Droid.yesNo) {
			if (actions[i][0] == 'focus') {
				actions[i][0] = 'calculate';
			}
			if (actions[i][2] == 'focus') {
				actions[i][2] = 'calculate';
			}
		}
		
		y = yCenterPoint + yDistanceBetween * i - yDistanceBetween * (actions.length - 1) / 2;
		if (actions[i][2] != '-') {
			x = xCenterPoint - 50;
			g.setPaint(Xwing2.getColor('white'));
			sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][0]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.actionFont, 12, sheet.ALIGN_CENTER);
			x = xCenterPoint;
			sheet.drawTitle(g, Xwing2.textToIconChar('linked'), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.actionFont, 12, sheet.ALIGN_CENTER);
			x = xCenterPoint + 50;
			g.setPaint(Xwing2.getColor('red'));
			sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][2]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.actionFont, 12, sheet.ALIGN_CENTER);		
		} else {
			x = xCenterPoint;
			if (actions[i][1] == 'yes' || actions[i][1] == '1') {
				g.setPaint(Xwing2.getColor('red'));
			} else {
				g.setPaint(Xwing2.getColor('white'));
			}
			sheet.drawTitle(g, Xwing2.textToIconChar(actions[i][0]), Region(x.toString() + ',' + y.toString() + ',100,100'), Xwing2.actionFont, 12, sheet.ALIGN_CENTER);
		}
	}
}

function paintToken(g, diy, sheet, mainColor, fireArcColor) {
	target = sheet.getRenderTarget();
	
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
	gTemp.setPaint(fireArcColor);
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
	g.setPaint(fireArcColor);
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
	g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
	g.setStroke(BasicStroke(2));
	
	if (tokenSize == 'small') {
		g.setPaint(color.BLACK);
		g.fillPolygon([0, 62, 90, 90, 74, 0], [294, 294, 322, 366, 384, 384], 6);
		g.fillPolygon([402, 340, 312, 312, 328, 402], [294, 294, 322, 366, 384, 384], 6);
		g.fillPolygon([90, 312, 328, 74], [366, 366, 384, 384], 4);
		g.fillPolygon([0, 402, 402, 380, 22, 0], [384, 384, 419, 445, 445, 419], 6);
		
		// Gradient art in between the line art
		gradiantArt = ImageUtils.create(109, 18, true);
		gTemp = gradiantArt.createGraphics();
		gTemp.setPaint(Xwing2.getColor('white'));
		gTemp.fillRect(0,0,109,18);
		gradientPaint = new java.awt.GradientPaint(0, 9, Color(0 / 255, 0 / 255, 0 / 255), 209, 9, mainColor);
		gradiantArt = createTexturedImage(gradiantArt, gradientPaint);
		g.drawImage(gradiantArt, 94, 366, null);
		gradiantArt = ImageUtils.create(109, 18, true);
		gTemp = gradiantArt.createGraphics();
		gTemp.setPaint(Xwing2.getColor('white'));
		gTemp.fillRect(0,0,109,18);
		gradientPaint = new java.awt.GradientPaint(-100, 9, mainColor, 109, 9, Color(0 / 255, 0 / 255, 0 / 255));
		gradiantArt = createTexturedImage(gradiantArt, gradientPaint);
		g.drawImage(gradiantArt, 203, 366, null);
		
		g.setPaint(mainColor);
		g.drawPolyline([0, 62, 90, 90, 74, 0], [294, 294, 322, 366, 384, 384], 6);
		g.drawPolyline([402, 340, 312, 312, 328, 402], [294, 294, 322, 366, 384, 384], 6);
		g.drawPolyline([90, 312, 328, 74], [366, 366, 384, 384], 4);
		g.drawPolyline([0, 402], [384, 384], 2); g.drawPolyline([402, 380, 22, 0], [419, 445, 445, 419], 4);
		g.drawLine(95, 366, 95, 384);
		g.drawLine(135, 366, 135, 384);
		g.drawLine(189, 366, 190, 384);
		g.drawLine(225, 366, 225, 384);		
		g.drawLine(307, 366, 307, 384);
		g.drawOval(147, 370, 1, 10);
		g.drawOval(279, 370, 1, 10);
		
		g.setPaint(Color(190 / 255, 190 / 255, 190 / 255));
		g.setStroke(BasicStroke(1.6));
		for (i = 0; i < 35; i++) {
			xRel = i*6.0;
			if (i == 2 || i == 4 || i == 10 || i == 18 || i == 29) {
				g.drawLine(99 + xRel, 373, 99 + xRel, 377);
			} else {
				g.drawLine(99 + xRel, 375, 99 + xRel, 375);
			}
		}
	} else if (tokenSize == 'medium'){
		g.setPaint(color.BLACK);
		g.fillPolygon([0, 66, 94, 94, 66, 0], [531, 531, 559, 605, 636, 636], 6);
		g.fillPolygon([638, 572, 544, 544, 572, 638], [531, 531, 559, 605, 636, 636], 6);
		g.fillPolygon([94, 544, 560, 78], [605, 605, 623, 623], 4);
		g.fillPolygon([0, 66, 78, 560, 572, 638, 638, 544, 522, 116, 94, 0], [636, 636, 623, 623, 636, 636, 656, 656, 682, 682, 656, 656], 12);

		// Gradient art in between the line art
		gradiantArt = ImageUtils.create(150, 18, true);
		gTemp = gradiantArt.createGraphics();
		gTemp.setPaint(Xwing2.getColor('white'));
		gTemp.fillRect(0,0,150,18);
		gradientPaint = new java.awt.GradientPaint(0, 9, Color(0 / 255, 0 / 255, 0 / 255), 230, 9, mainColor);
		gradiantArt = createTexturedImage(gradiantArt, gradientPaint);
		g.drawImage(gradiantArt, 94, 605, null);
		gradiantArt = ImageUtils.create(300, 18, true);
		gTemp = gradiantArt.createGraphics();
		gTemp.setPaint(Xwing2.getColor('white'));
		gTemp.fillRect(0,0,300,18);
		gradientPaint = new java.awt.GradientPaint(-240, 9, mainColor, 220, 9, Color(0 / 255, 0 / 255, 0 / 255));
		gradiantArt = createTexturedImage(gradiantArt, gradientPaint);
		g.drawImage(gradiantArt, 203, 605, null);
		
		g.setPaint(mainColor);
		g.drawPolyline([0, 66, 94, 94, 66, 0], [531, 531, 559, 605, 636, 636], 6);
		g.drawPolyline([638, 572, 544, 544, 572, 638], [531, 531, 559, 605, 636, 636], 6);
		g.drawPolyline([94, 544, 560, 78], [605, 605, 623, 623], 4);
		g.drawPolyline([0, 66, 78, 560, 572, 638], [636, 636, 623, 623, 636, 636], 6);
		g.drawPolyline([0, 94, 116, 522, 544, 638], [656, 656, 682, 682, 656, 656], 6);
		g.drawLine(99, 606, 99, 622);
		g.drawLine(118, 606, 118, 622);
		g.drawLine(160, 606, 160, 622);
		g.drawLine(214, 606, 214, 622);
		g.drawLine(250, 606, 250, 622);
		g.drawLine(334, 606, 334, 622);
		g.drawLine(472, 606, 472, 622);
		g.drawLine(539, 606, 539, 622);

		g.drawOval(172, 609, 1, 10);
		g.drawOval(304, 609, 1, 10);
		g.drawOval(454, 609, 1, 10);
		
		g.setPaint(Color(190 / 255, 190 / 255, 190 / 255));
		g.setStroke(BasicStroke(1.6));
		for (i = 0; i < 74; i++) {
			xRel = i*6.0;
			if (i == 6 || i == 8 || i == 14 || i == 22 || i == 33 || i == 47 || i == 66) {
				g.drawLine(100 + xRel, 611, 100 + xRel, 617);
			} else {
				g.drawLine(100 + xRel, 614, 100 + xRel, 614);
			}
		}
	} else { // tokenSize == 'large'
		g.setPaint(color.BLACK);
		g.fillPolygon([0, 66, 94, 94, 66, 0], [767, 767, 795, 841, 872, 872], 6);
		g.fillPolygon([850, 784, 756, 756, 784, 850], [767, 767, 795, 841, 872, 872], 6);
		g.fillPolygon([216, 634, 650, 200], [841, 841, 859, 859], 4);
		g.fillPolygon([78, 94, 114, 130], [859, 841, 841, 859], 4);
		g.fillPolygon([772, 756, 736, 720], [859, 841, 841, 859], 4);
		g.fillPolygon([0, 66, 78, 772, 784, 850, 850, 650, 628, 222, 200, 0], [872, 872, 859, 859, 872, 872, 892, 892, 918, 918, 892, 892], 12);

		// Gradient art in between the line art
		gradiantArt = ImageUtils.create(150, 18, true);
		gTemp = gradiantArt.createGraphics();
		gTemp.setPaint(Xwing2.getColor('white'));
		gTemp.fillRect(0,0,150,18);
		gradientPaint = new java.awt.GradientPaint(0, 9, Color(0 / 255, 0 / 255, 0 / 255), 230, 9, mainColor);
		gradiantArt = createTexturedImage(gradiantArt, gradientPaint);
		g.drawImage(gradiantArt, 200, 841, null);
		gradiantArt = ImageUtils.create(300, 18, true);
		gTemp = gradiantArt.createGraphics();
		gTemp.setPaint(Xwing2.getColor('white'));
		gTemp.fillRect(0,0,300,18);
		gradientPaint = new java.awt.GradientPaint(-240, 9, mainColor, 220, 9, Color(0 / 255, 0 / 255, 0 / 255));
		gradiantArt = createTexturedImage(gradiantArt, gradientPaint);
		g.drawImage(gradiantArt, 309, 841, null);
		
		g.setPaint(mainColor);
		g.drawPolyline([0, 66, 94, 94, 66, 0], [767, 767, 795, 841, 872, 872], 6);
		g.drawPolyline([850, 784, 756, 756, 784, 850], [767, 767, 795, 841, 872, 872], 6);
		g.drawPolygon([216, 634, 650, 200], [841, 841, 859, 859], 4);
		g.drawPolygon([78, 94, 114, 130], [859, 841, 841, 859], 4);
		g.drawPolygon([772, 756, 736, 720], [859, 841, 841, 859], 4);
		g.drawPolyline([0, 66, 78, 772, 784, 850], [872, 872, 859, 859, 872, 872], 6);
		g.drawPolyline([0, 200, 222, 628, 650, 850], [892, 892, 918, 918, 892, 892], 6);
		
		g.drawLine(224, 842, 224, 858);
		g.drawLine(266, 842, 266, 858);
		g.drawLine(320, 842, 320, 858);
		g.drawLine(356, 842, 356, 858);
		g.drawLine(440, 842, 440, 858);
		g.drawLine(578, 842, 578, 858);
		g.drawLine(626, 842, 626, 858);

		g.drawOval(278, 845, 1, 10);
		g.drawOval(410, 845, 1, 10);
		g.drawOval(560, 845, 1, 10);
		
		g.setPaint(Color(190 / 255, 190 / 255, 190 / 255));
		g.setStroke(BasicStroke(1.6));
		for (i = 0; i < 66; i++) {
			xRel = i*6.0;
			if (i == 2 || i == 4 || i == 10 || i == 18 || i == 29 || i == 43 || i == 62) {
				g.drawLine(230 + xRel, 847, 230 + xRel, 853);
			} else {
				g.drawLine(230 + xRel, 850, 230 + xRel, 850);
			}
		}
	}

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
		if (tokenSize == 'small') {
			$ship-icon-token-portrait-clip-region = $pilot-small-token-icon-region;
		} else if (tokenSize == 'medium'){
			$ship-icon-token-portrait-clip-region = $pilot-medium-token-icon-region;
		} else { // tokenSize == 'large'
			$ship-icon-token-portrait-clip-region = $pilot-large-token-icon-region;
		}
		portraits[2].paint(g, target);
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

function splitHSB(HSBString) {
	HSB = HSBString.split(',');
	HSB[0] = HSB[0] / 360;
	return HSB;
}

function getMainColor() {
	if ($Faction == 'custom') {
		HSB = splitHSB($CustomFactionMainTint);
	} else {
		HSB = splitHSB(getFactionStat($Faction, 'main-tint'));
	}
	RGB = Color.HSBtoRGB(HSB[0], HSB[1], HSB[2]);
	mainColor = new Color(RGB);
	
	return mainColor;
}

function getFireArcColor() {
	if ($Faction == 'custom') {
		HSB = splitHSB($CustomFactionFireArcTint);
	} else {
		HSB = splitHSB(getFactionStat($Faction, 'fire-arc-tint'));
	}
	RGB = Color.HSBtoRGB(HSB[0], HSB[1], HSB[2]);
	fireArcColor = new Color(RGB);
	
	return fireArcColor;
}

function getTextBoxSize() {
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
		textBoxSize = 'reduced';
	} else {
		textBoxSize = 'full';
	}
	
	return textBoxSize;
}
	
function getActionsInActionBar() {
	actionsInActionBar = 0;
	if ($ShipModel == 'custom') {
		if ($CustomShipActionName1 != '-') {actionsInActionBar++;}
		if ($CustomShipActionName2 != '-') {actionsInActionBar++;}
		if ($CustomShipActionName3 != '-') {actionsInActionBar++;}
		if ($CustomShipActionName4 != '-') {actionsInActionBar++;}
		if ($CustomShipActionName5 != '-') {actionsInActionBar++;}
	} else {
		if (getShipStat($ShipModel, 'action-1-name') != '-') {actionsInActionBar++;}
		if (getShipStat($ShipModel, 'action-2-name') != '-') {actionsInActionBar++;}
		if (getShipStat($ShipModel, 'action-3-name') != '-') {actionsInActionBar++;}
		if (getShipStat($ShipModel, 'action-4-name') != '-') {actionsInActionBar++;}
		if (getShipStat($ShipModel, 'action-5-name') != '-') {actionsInActionBar++;}
	}	
	
	return actionsInActionBar;
}

function onClear() {
	$Epithet = '';
	$ShipModel = 'custom';
	$Faction = 'custom';
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
	
	$CustomFactionMainTint = '0.0, 0.0, 0.0';
	$CustomFactionFireArcTint = '0.0, 0.0, 0.0';
	$CustomFactionDarkEdges = 'no';
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
	portraits[5] = ois.readObject();
	portraits[6] = ois.readObject();
	portraits[7] = ois.readObject();
	portraits[8] = ois.readObject();
}

function onWrite(diy,oos) {
	oos.writeObject(portraits[0]);
	oos.writeObject(portraits[1]);
	oos.writeObject(portraits[2]);
	oos.writeObject(portraits[3]);
	oos.writeObject(portraits[4]);
	oos.writeObject(portraits[5]);
	oos.writeObject(portraits[6]);
	oos.writeObject(portraits[7]);
	oos.writeObject(portraits[8]);
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

function applyAlphaMaskToImage(image, mask) {
    width = image.getWidth();
    height = image.getHeight();

    imagePixels = image.getRGB(0, 0, width, height, null, 0, width);
    maskPixels = mask.getRGB(0, 0, width, height, null, 0, width);

    for (i = 0; i < imagePixels.length; i++) {
        color = imagePixels[i] & 0x00ffffff; // Mask preexisting alpha
        alphaFromImage = imagePixels[i] & 0xff000000; // Mask color
        alphaFromMask = maskPixels[i] & 0xff000000;
        
        if (alphaFromImage < alphaFromMask) {
        	alpha = alphaFromMask;
        } else {
        	alpha = alphaFromImage;
        }
                
        imagePixels[i] = color | alpha;
    }
    image.setRGB(0, 0, width, height, imagePixels, 0, width);
    return image;
}

function invertAlpha(image) {
	invert = new AlphaInversionFilter();
	invert.filter(image,image);
    return image;
}

function turnAndFlip(image, orientation) {
	// Examples of orientation: TURN_90_LEFT, TURN_180, TURN_0_FLIP_HORZ, TURN_0_FLIP_VERT
	
	invert = new TurnAndFlipFilter(orientation);
	// TurnAndFlipFilter does not support in-place filtering (the source and destination images must be different).
	// Thus, we must create a copy
	filteredImage = ImageUtils.copy(image);
	invert.filter(image,filteredImage);

	return filteredImage;
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

function createUpperPanelImage() {
	image = ImageUtils.create(739, 127, true);
	g = image.createGraphics();
	g.setPaint(Color(0 / 255, 0 / 255, 0 / 255));

	g.fillPolygon([0, 92, 107, 107, 135, 604, 632, 632, 647, 739, 739, 624, 615, 124, 115, 0],
		[123, 123, 108, 40, 12, 12, 40, 108, 123, 123, 9, 9, 0, 0, 9, 9], 16);
    return image;
}

function createLowerPanelImage() {
	image = ImageUtils.create(739, 82, true);
	g = image.createGraphics();
	g.setPaint(Color(0 / 255, 0 / 255, 0 / 255));

	g.fillPolygon([0, 96, 104, 104, 136, 603, 635, 635, 643, 739, 739, 0],
		[7, 7, 15, 35, 60, 60, 35, 15, 7, 7, 82, 82], 12);
    return image;
}

// This will cause a test component to be created when you run the script
// from a script editor. It doesn't do anything when the script is run
// other ways (e.g.,when you choose to create the component by selecting
// it in the New Game Component dialog).
testDIYScript('XW2');