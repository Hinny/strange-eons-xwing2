useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );
useLibrary( 'markup' );

importClass( java.awt.BasicStroke );
importClass( java.awt.Stroke );
importClass( java.awt.RenderingHints );
importClass( java.awt.Graphics2D );

importClass( arkham.diy.ListItem );
importClass( arkham.component.DefaultPortrait );

// When the script is run directly from the editor, this will load
// the test-lib library, which does the setup tasks that the
// plug-in would have done if it was run. This lets us test and
// develop the plug-in without having to rebuild the plug-in bundle
// and start a new copy of Strange Eons every time we make a change.
if( sourcefile == 'Quickscript' ) {
	useLibrary( 'project:Xwing2/resources/test-lib.js' );
}
const Xwing2 = Eons.namedObjects.Xwing2;

portraits = [];

// Returns the number of portraits we will be using.
function getPortraitCount() {
	return portraits.length;
}

// Given an index from 0 to getPortraitCount()-1, this
// function must return the (index+1)th Portrait.
function getPortrait( index ) {
	if( index < 0 || index >= portraits.length ) {
		throw new Error( 'invalid portrait index: ' + index );
	}
	return portraits[ index ];
}


function create( diy ) {
	diy.version = 6;
	diy.extensionName = 'Xwing2.seext';
	diy.faceStyle = FaceStyle.CARD_AND_MARKER;
	diy.transparentFaces = true;
	diy.variableSizedFaces = true;
	
	diy.frontTemplateKey = 'pilot-rebel-front';
	diy.backTemplateKey = 'pilot-rebel-back';
	diy.setTemplateKey( 2, 'pilot-large-token' );
	
	// Card Art
	diy.customPortraitHandling = true;
	portraits[0] = new DefaultPortrait( diy, 'pilot' );
	portraits[0].setScaleUsesMinimum( false );
	portraits[0].facesToUpdate = 1;
	portraits[0].backgroundFilled = true;
	portraits[0].clipping = true;
	portraits[0].installDefault();
	
	// Ship Icon, Card
	portraits[1] = new DefaultPortrait( diy, 'ship-card' );
	portraits[1].setScaleUsesMinimum( true );
	portraits[1].facesToUpdate = 1;
	portraits[1].backgroundFilled = false;
	portraits[1].clipping = true;
	portraits[1].installDefault();
	
	// Ship Icon, Token
	portraits[2] = new DefaultPortrait( portraits[1], 'ship-marker' );
	portraits[2].setScaleUsesMinimum( true );
	portraits[2].facesToUpdate = 4;
	portraits[2].backgroundFilled = false;
	portraits[2].clipping = true;
	portraits[2].installDefault();

	
	// install the example pilot
	diy.name = #xw2-pilot-name;
	$ShipType = #xw2-pilot-ship;
	$Affiliation = #xw2-pilot-affiliation;
	$PilotSkill = #xw2-pilot-ps;
	$UniquePilot = #xw2-pilot-unique;
	$ElitePilotTalent = #xw2-pilot-elite;
	$Text = #xw2-pilot-text;
	$PointAdjuster = #xw2-pilot-adjuster;
	$AturiClusterAI = #xw2-pilot-ai;
	
	$CustomShipName = #xw2-pilot-custom-name;
	$CustomPwv = #xw2-pilot-custom-pwv;
	$CustomAgi = #xw2-pilot-custom-agi;
	$CustomHull = #xw2-pilot-custom-hull;
	$CustomShield = #xw2-pilot-custom-shield;
	$CustomArc = #xw2-pilot-custom-arc;
	$CustomSize = #xw2-pilot-custom-size;
	$CustomFocusAction = #xw2-pilot-custom-focus;
	$CustomLockAction = #xw2-pilot-custom-lock;
	$CustomRollAction = #xw2-pilot-custom-roll;
	$CustomBoostAction = #xw2-pilot-custom-boost;
	$CustomEvadeAction = #xw2-pilot-custom-evade;
	$CustomCloakAction = #xw2-pilot-custom-cloak;
	$CustomSlamAction = #xw2-pilot-custom-slam;
	$CustomArcAction = #xw2-pilot-custom-arc;
	$CustomCoordinateAction = #xw2-pilot-custom-coordinate;
	$CustomReinforceAction = #xw2-pilot-custom-reinforce;
	$CustomReloadAction = #xw2-pilot-custom-reload;
	$CustomUpgrade1 = #xw2-pilot-custom-upgrade-1;
	$CustomUpgrade2 = #xw2-pilot-custom-upgrade-2;
	$CustomUpgrade3 = #xw2-pilot-custom-upgrade-3;
	$CustomUpgrade4 = #xw2-pilot-custom-upgrade-4;
	$CustomUpgrade5 = #xw2-pilot-custom-upgrade-5;
	$CustomUpgrade6 = #xw2-pilot-custom-upgrade-6;
	$CustomUpgrade7 = #xw2-pilot-custom-upgrade-7;
	$CustomBaseCost = #xw2-pilot-custom-basecost;
	$CustomShipIcon = #xw2-pilot-custom-shipicon;
}

function createInterface( diy, editor ) {
	bindings = new Bindings( editor, diy );

	// Main Panel
	affiliationItems = [];
	affiliationItems[0] = ListItem( 'alliance', @xw2-affiliation-alliance );
	affiliationItems[1] = ListItem( 'resistance', @xw2-affiliation-resistance );
	affiliationItems[2] = ListItem( 'empire', @xw2-affiliation-empire );
	affiliationItems[3] = ListItem( 'firstorder', @xw2-affiliation-firstorder );
	affiliationItems[4] = ListItem( 'scum', @xw2-affiliation-scum );
	affiliationBox = comboBox( affiliationItems );
	bindings.add( 'Affiliation', affiliationBox, [0,1,2] );	

	shipItems = [];
	shipItems.push(ListItem( 'custom', @xw2-ship-custom-name ));
	shipItems.push(ListItem( 'xwing', @xw2-ship-xwing-name ));
	shipItems.push(ListItem( 't70xwing', @xw2-ship-t70xwing-name ));
	shipItems.push(ListItem( 'ywing', @xw2-ship-ywing-name ));
	shipItems.push(ListItem( 'awing', @xw2-ship-awing-name ));
	shipItems.push(ListItem( 'bwing', @xw2-ship-bwing-name ));
	shipItems.push(ListItem( 'ewing', @xw2-ship-ewing-name ));
	shipItems.push(ListItem( 'kwing', @xw2-ship-kwing-name ));
	shipItems.push(ListItem( 'headhunter', @xw2-ship-headhunter-name ));
	shipItems.push(ListItem( 'hwk290', @xw2-ship-hwk290-name ));
	shipItems.push(ListItem( 'arc170', @xw2-ship-arc170-name ));
	shipItems.push(ListItem( 'attackshuttle', @xw2-ship-attackshuttle-name ));
	shipItems.push(ListItem( 'auzituck', @xw2-ship-auzituck-name ));
	shipItems.push(ListItem( 'uwing', @xw2-ship-uwing-name ));
	shipItems.push(ListItem( 'yt1300', @xw2-ship-yt1300-name ));
	shipItems.push(ListItem( 'yt1300alt', @xw2-ship-yt1300alt-name ));
	shipItems.push(ListItem( 'yt2400', @xw2-ship-yt2400-name ));
	shipItems.push(ListItem( 'vcx100', @xw2-ship-vcx100-name ));
	shipItems.push(ListItem( 'sheatipede', @xw2-ship-sheatipede-name ));
	shipItems.push(ListItem( 'bsf17bomber', @xw2-ship-bsf17bomber-name ));
	shipItems.push(ListItem( 'tiefighter', @xw2-ship-tiefighter-name ));
	shipItems.push(ListItem( 'tiefofighter', @xw2-ship-tiefofighter-name ));
	shipItems.push(ListItem( 'tiesffighter', @xw2-ship-tiesffighter-name ));
	shipItems.push(ListItem( 'tieadvanced', @xw2-ship-tieadvanced-name ));
	shipItems.push(ListItem( 'tieprototype', @xw2-ship-tieprototype-name ));
	shipItems.push(ListItem( 'tieinterceptor', @xw2-ship-tieinterceptor-name ));
	shipItems.push(ListItem( 'tiebomber', @xw2-ship-tiebomber-name ));
	shipItems.push(ListItem( 'tiedefender', @xw2-ship-tiedefender-name ));
	shipItems.push(ListItem( 'tiephantom', @xw2-ship-tiephantom-name ));
	shipItems.push(ListItem( 'tiepunisher', @xw2-ship-tiepunisher-name ));
	shipItems.push(ListItem( 'tiestriker', @xw2-ship-tiestriker-name ));
	shipItems.push(ListItem( 'tieaggressor', @xw2-ship-tieaggressor-name ));
	shipItems.push(ListItem( 'lambdashuttle', @xw2-ship-lambdashuttle-name ));
	shipItems.push(ListItem( 'upsilonshuttle', @xw2-ship-upsilonshuttle-name ));
	shipItems.push(ListItem( 'vt49', @xw2-ship-vt49-name ));
	shipItems.push(ListItem( 'tiesilencer', @xw2-ship-tiesilencer-name ));
	shipItems.push(ListItem( 'starwing', @xw2-ship-starwing-name ));
	shipItems.push(ListItem( 'firespray31', @xw2-ship-firespray31-name ));
	shipItems.push(ListItem( 'ywingalt', @xw2-ship-ywingalt-name ));
	shipItems.push(ListItem( 'headhunteralt', @xw2-ship-headhunteralt-name ));
	shipItems.push(ListItem( 'hwk290alt', @xw2-ship-hwk290alt-name ));
	shipItems.push(ListItem( 'firespray31alt', @xw2-ship-firespray31alt-name ));
	shipItems.push(ListItem( 'm3a', @xw2-ship-m3a-name ));
	shipItems.push(ListItem( 'g1a', @xw2-ship-g1a-name ));
	shipItems.push(ListItem( 'quadjumper', @xw2-ship-quadjumper-name ));
	shipItems.push(ListItem( 'scurrg', @xw2-ship-scurrg-name ));
	shipItems.push(ListItem( 'kihraxz', @xw2-ship-kihraxz-name ));
	shipItems.push(ListItem( 'starviper', @xw2-ship-starviper-name ));
	shipItems.push(ListItem( 'protectorate', @xw2-ship-protectorate-name ));
	shipItems.push(ListItem( 'lancer', @xw2-ship-lancer-name ));
	shipItems.push(ListItem( 'aggressor', @xw2-ship-aggressor-name ));
	shipItems.push(ListItem( 'yv666', @xw2-ship-yv666-name ));
	shipItems.push(ListItem( 'jumpmaster', @xw2-ship-jumpmaster-name ));
	shipItems.push(ListItem( 'kimogila', @xw2-ship-kimogila-name ));
	
	shipBox = comboBox( shipItems );
	bindings.add( 'ShipType', shipBox, [0,2] );

	nameField = textField( 'X', 30 );
	
	psItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*'];
	psBox = comboBox( psItems );
	bindings.add( 'PilotSkill', psBox, [0,2] );

	uniqueCheckbox = checkBox( @xw2-unique );
	bindings.add( 'UniquePilot', uniqueCheckbox, [0,2] );
	
	eliteCheckbox = checkBox( @xw2-elite );
	bindings.add( 'ElitePilotTalent', eliteCheckbox, [0] );
	
	pilotTextArea = textArea( '', 6, 15, true );
	bindings.add( 'Text', pilotTextArea, [0] );
	
	symbolsTagTip = tipButton( @xw2-symbol-tooltip );
	headersTagTip = tipButton( @xw2-header-tooltip );
	shipsTagTip = tipButton( @xw2-ship-tooltip );

	pointAdjuster = spinner( -5, 15, 1, 0 );
	bindings.add( 'PointAdjuster', pointAdjuster, [0] );
	
	pointAdjusterTip = tipButton( @xw2-pointadjuster-tooltip );

	aiCheckbox = checkBox( @xw2-ai );
	bindings.add( 'AturiClusterAI', aiCheckbox, [2] );

	pilotPanel = portraitPanel( diy, 0 );
	pilotPanel.panelTitle = @xw2-portrait-pilot;

	mainPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	mainPanel.setTitle( @xw2-info );
	mainPanel.place( @xw2-affiliation, '', affiliationBox, 'growx' );	
	mainPanel.place( @xw2-ship, '', shipBox, 'growx,wrap' );
	mainPanel.place( @xw2-pilotname, '', nameField, 'span, growx, wrap' );
	mainPanel.place( @xw2-ps, '', psBox, 'wmin 52' );
	mainPanel.place( uniqueCheckbox, '' );
	mainPanel.place( eliteCheckbox, 'wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( @xw2-pilottext, 'span, grow, wrap para' );
	mainPanel.place( pilotTextArea, 'span, grow, wrap para' );
	mainPanel.place( symbolsTagTip, '', headersTagTip, '', shipsTagTip, 'span, grow, wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( @xw2-pointadjuster, 'span 2', pointAdjuster, '',  pointAdjusterTip, 'wrap para');
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( aiCheckbox, 'span, growx, wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( pilotPanel, 'span, growx, wrap' );
	mainPanel.editorTabScrolling = true;

	// Custom Ship Panel	
	customShipNameField = textField( 'X', 30 );
	bindings.add( 'CustomShipName', customShipNameField, [0,2] );
	
	sizeItems = [];
	sizeItems[0] = ListItem( 'small', @xw2-size-small );
	sizeItems[1] = ListItem( 'large', @xw2-size-large );
	customSizeBox = comboBox( sizeItems );
	bindings.add( 'CustomSize', customSizeBox, [0,2] );
	
	arcItems = [];
	arcItems[0] = ListItem( 'front', @xw2-arc-front );
	arcItems[1] = ListItem( 'rear', @xw2-arc-front-rear );
	arcItems[2] = ListItem( 'extended', @xw2-arc-extended-front );
	arcItems[3] = ListItem( 'turret', @xw2-arc-turret );
	arcItems[4] = ListItem( 'mobile', @xw2-arc-mobile );
	arcItems[5] = ListItem( 'bullseye', @xw2-arc-bullseye );
	customArcBox = comboBox( arcItems );
	bindings.add( 'CustomArc', customArcBox, [0,2] );

	pwvItems = ['-', '1', '2', '3', '4', '5'];
	customPwvBox = comboBox( pwvItems );
	bindings.add( 'CustomPwv', customPwvBox, [0,2] );

	agiItems = ['0', '1', '2', '3', '4', '5'];
	customAgiBox = comboBox( agiItems );
	bindings.add( 'CustomAgi', customAgiBox, [0,2] );	
	
	hullItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
		'12', '13', '14', '15', '16', '17', '18', '19', '20'];
	customHullBox = comboBox( hullItems );
	bindings.add( 'CustomHull', customHullBox, [0,2] );	

	shieldItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
		'11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
	customShieldBox = comboBox( shieldItems );
	bindings.add( 'CustomShield', customShieldBox, [0,2] );

	customFocusCheckbox = checkBox( @xw2-action-focus );
	bindings.add( 'CustomFocusAction', customFocusCheckbox, [0,2] );
	customLockCheckbox = checkBox( @xw2-action-lock );
	bindings.add( 'CustomLockAction', customLockCheckbox, [0,2] );
	customRollCheckbox = checkBox( @xw2-action-roll );
	bindings.add( 'CustomRollAction', customRollCheckbox, [0,2] );
	customBoostCheckbox = checkBox( @xw2-action-boost );
	bindings.add( 'CustomBoostAction', customBoostCheckbox, [0,2] );
	customEvadeCheckbox = checkBox( @xw2-action-evade );
	bindings.add( 'CustomEvadeAction', customEvadeCheckbox, [0,2] );
	customCloakCheckbox = checkBox( @xw2-action-cloak );
	bindings.add( 'CustomCloakAction', customCloakCheckbox, [0,2] );
	customSlamCheckbox = checkBox( @xw2-action-slam );
	bindings.add( 'CustomSlamAction', customSlamCheckbox, [0,2] );
	customArcCheckbox = checkBox( @xw2-action-arc );
	bindings.add( 'CustomArcAction', customArcCheckbox, [0,2] );
	customCoordinateCheckbox = checkBox( @xw2-action-coordinate );
	bindings.add( 'CustomCoordinateAction', customCoordinateCheckbox, [0,2] );
	customReinforceCheckbox = checkBox( @xw2-action-reinforce );
	bindings.add( 'CustomReinforceAction', customReinforceCheckbox, [0,2] );
	customReloadCheckbox = checkBox( @xw2-action-reload );
	bindings.add( 'CustomReloadAction', customReloadCheckbox, [0,2] );
	
	upgradeItems = [];
	upgradeItems[0] = ListItem( '-', '-' );
	upgradeItems[1] = ListItem( 'system', @xw2-upgrade-system );
	upgradeItems[2] = ListItem( 'cannon', @xw2-upgrade-cannon );
	upgradeItems[3] = ListItem( 'turret', @xw2-upgrade-turret );
	upgradeItems[4] = ListItem( 'torpedo', @xw2-upgrade-torpedo );
	upgradeItems[5] = ListItem( 'missile', @xw2-upgrade-missile );
	upgradeItems[6] = ListItem( 'bomb', @xw2-upgrade-bomb );
	upgradeItems[7] = ListItem( 'astromech', @xw2-upgrade-astromech );
	upgradeItems[8] = ListItem( 'salvaged', @xw2-upgrade-salvaged );
	upgradeItems[9] = ListItem( 'crew', @xw2-upgrade-crew );
	upgradeItems[10] = ListItem( 'illicit', @xw2-upgrade-illicit );
	upgradeItems[11] = ListItem( 'tech', @xw2-upgrade-tech );
		
	customUpgradeBox1 = comboBox( upgradeItems );
	bindings.add( 'CustomUpgrade1', customUpgradeBox1, [0] );
	customUpgradeBox2 = comboBox( upgradeItems );
	bindings.add( 'CustomUpgrade2', customUpgradeBox2, [0] );
	customUpgradeBox3 = comboBox( upgradeItems );
	bindings.add( 'CustomUpgrade3', customUpgradeBox3, [0] );
	customUpgradeBox4 = comboBox( upgradeItems );
	bindings.add( 'CustomUpgrade4', customUpgradeBox4, [0] );
	customUpgradeBox5 = comboBox( upgradeItems );
	bindings.add( 'CustomUpgrade5', customUpgradeBox5, [0] );
	customUpgradeBox6 = comboBox( upgradeItems );
	bindings.add( 'CustomUpgrade6', customUpgradeBox6, [0] );
	customUpgradeBox7 = comboBox( upgradeItems );
	bindings.add( 'CustomUpgrade7', customUpgradeBox7, [0] );
	
	customBaseCostBox = spinner( 1, 200, 1, 20 );
	bindings.add( 'CustomBaseCost', customBaseCostBox, [0] );
	
	// same list than upper, but without alt ship
	shipItems = [];
	shipItems.push(ListItem( 'custom', @xw2-ship-custom-name ));
	shipItems.push(ListItem( 'xwing', @xw2-ship-xwing-name ));
	shipItems.push(ListItem( 't70xwing', @xw2-ship-t70xwing-name ));
	shipItems.push(ListItem( 'ywing', @xw2-ship-ywing-name ));
	shipItems.push(ListItem( 'awing', @xw2-ship-awing-name ));
	shipItems.push(ListItem( 'bwing', @xw2-ship-bwing-name ));
	shipItems.push(ListItem( 'ewing', @xw2-ship-ewing-name ));
	shipItems.push(ListItem( 'kwing', @xw2-ship-kwing-name ));
	shipItems.push(ListItem( 'headhunter', @xw2-ship-headhunter-name ));
	shipItems.push(ListItem( 'hwk290', @xw2-ship-hwk290-name ));
	shipItems.push(ListItem( 'arc170', @xw2-ship-arc170-name ));
	shipItems.push(ListItem( 'attackshuttle', @xw2-ship-attackshuttle-name ));
	shipItems.push(ListItem( 'auzituck', @xw2-ship-auzituck-name ));
	shipItems.push(ListItem( 'uwing', @xw2-ship-uwing-name ));
	shipItems.push(ListItem( 'yt1300', @xw2-ship-yt1300-name ));
	shipItems.push(ListItem( 'yt2400', @xw2-ship-yt2400-name ));
	shipItems.push(ListItem( 'vcx100', @xw2-ship-vcx100-name ));
	shipItems.push(ListItem( 'sheatipede', @xw2-ship-sheatipede-name ));
	shipItems.push(ListItem( 'bsf17bomber', @xw2-ship-bsf17bomber-name ));
	shipItems.push(ListItem( 'tiefighter', @xw2-ship-tiefighter-name ));
	shipItems.push(ListItem( 'tiefofighter', @xw2-ship-tiefofighter-name ));
	shipItems.push(ListItem( 'tiesffighter', @xw2-ship-tiesffighter-name ));
	shipItems.push(ListItem( 'tieadvanced', @xw2-ship-tieadvanced-name ));
	shipItems.push(ListItem( 'tieprototype', @xw2-ship-tieprototype-name ));
	shipItems.push(ListItem( 'tieinterceptor', @xw2-ship-tieinterceptor-name ));
	shipItems.push(ListItem( 'tiebomber', @xw2-ship-tiebomber-name ));
	shipItems.push(ListItem( 'tiedefender', @xw2-ship-tiedefender-name ));
	shipItems.push(ListItem( 'tiephantom', @xw2-ship-tiephantom-name ));
	shipItems.push(ListItem( 'tiepunisher', @xw2-ship-tiepunisher-name ));
	shipItems.push(ListItem( 'tiestriker', @xw2-ship-tiestriker-name ));
	shipItems.push(ListItem( 'tieaggressor', @xw2-ship-tieaggressor-name ));
	shipItems.push(ListItem( 'lambdashuttle', @xw2-ship-lambdashuttle-name ));
	shipItems.push(ListItem( 'upsilonshuttle', @xw2-ship-upsilonshuttle-name ));
	shipItems.push(ListItem( 'vt49', @xw2-ship-vt49-name ));
	shipItems.push(ListItem( 'tiesilencer', @xw2-ship-tiesilencer-name ));
	shipItems.push(ListItem( 'starwing', @xw2-ship-starwing-name ));
	shipItems.push(ListItem( 'firespray31', @xw2-ship-firespray31-name ));
	shipItems.push(ListItem( 'm3a', @xw2-ship-m3a-name ));
	shipItems.push(ListItem( 'g1a', @xw2-ship-g1a-name ));
	shipItems.push(ListItem( 'quadjumper', @xw2-ship-quadjumper-name ));
	shipItems.push(ListItem( 'scurrg', @xw2-ship-scurrg-name ));
	shipItems.push(ListItem( 'kihraxz', @xw2-ship-kihraxz-name ));
	shipItems.push(ListItem( 'starviper', @xw2-ship-starviper-name ));
	shipItems.push(ListItem( 'protectorate', @xw2-ship-protectorate-name ));
	shipItems.push(ListItem( 'lancer', @xw2-ship-lancer-name ));
	shipItems.push(ListItem( 'aggressor', @xw2-ship-aggressor-name ));
	shipItems.push(ListItem( 'yv666', @xw2-ship-yv666-name ));
	shipItems.push(ListItem( 'jumpmaster', @xw2-ship-jumpmaster-name ));
	shipItems.push(ListItem( 'kimogila', @xw2-ship-kimogila-name ));

	customShipIconBox = comboBox( shipItems );
	bindings.add( 'CustomShipIcon', customShipIconBox, [0,2] );
	
	customIconCardPanel = portraitPanel( diy, 1 );
	customIconCardPanel.panelTitle = @xw2-icon-card;	
	
	customIconMarkerPanel = portraitPanel( diy, 2 );
	customIconMarkerPanel.setParentPanel( customIconCardPanel );		
	customIconMarkerPanel.panelTitle = @xw2-icon-token;
		
	customPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	customPanel.setTitle( @xw2-custom );
	customPanel.place( @xw2-ship, '', customShipNameField, 'span 3, growx, wrap' );
	customPanel.place( @xw2-size, '', customSizeBox, 'wmin 100, span 2, wrap' );
	customPanel.place( @xw2-arc, '', customArcBox, 'wmin 100, span 2, wrap' );
	customPanel.place( @xw2-pwv, '', customPwvBox, 'wmin 52' );
	customPanel.place( @xw2-agi, '', customAgiBox, 'wmin 52, wrap' );
	customPanel.place( @xw2-hull, '', customHullBox, 'wmin 52' );
	customPanel.place( @xw2-shield, '', customShieldBox, 'wmin 52, wrap para' );
	customPanel.place( separator(), 'span, growx, wrap para' );
	customPanel.place( @xw2-actions, 'wrap' );
	customPanel.place( customFocusCheckbox, '', customLockCheckbox, '', customRollCheckbox, 'wrap' );
	customPanel.place( customBoostCheckbox, '', customEvadeCheckbox, '', customCloakCheckbox, 'wrap' );
	customPanel.place( customSlamCheckbox,  '', customArcCheckbox, '', customCoordinateCheckbox, 'wrap' );
	customPanel.place( customReinforceCheckbox, '', customReloadCheckbox,  'wrap para' );
	customPanel.place( separator(), 'span, growx, wrap para' );
	customPanel.place( @xw2-upgrades, 'wrap' );
	customPanel.place( customUpgradeBox1, 'wmin 100', customUpgradeBox2, 'wmin 100', customUpgradeBox3, 'wmin 100, wrap' );
	customPanel.place( customUpgradeBox4, 'wmin 100', customUpgradeBox5, 'wmin 100', customUpgradeBox6, 'wmin 100, wrap' );
	customPanel.place( customUpgradeBox7, 'wmin 100, wrap para' );
	customPanel.place( separator(), 'span, growx, wrap para' );
	customPanel.place( @xw2-basecost, 'span 2', customBaseCostBox, 'wmin 100, wrap para' );
	customPanel.place( separator(), 'span, growx, wrap para' );
	customPanel.place( @xw2-icon, 'span 2', customShipIconBox, 'wmin 100, wrap para');
	customPanel.place( customIconCardPanel, 'span, growx, wrap' );
	customPanel.place( customIconMarkerPanel, 'span, growx, wrap' );
	customPanel.editorTabScrolling = true;

 	diy.setNameField( nameField );

	function actionFunction( actionEvent ) {
		try {
			if( shipBox.getSelectedItem() != 'custom' ) {
				customShipNameField.setEnabled(false);
				customSizeBox.setEnabled(false);
				customArcBox.setEnabled(false);
				customPwvBox.setEnabled(false);
				customAgiBox.setEnabled(false);
				customHullBox.setEnabled(false);
				customShieldBox.setEnabled(false);
				customFocusCheckbox.setEnabled(false);
				customLockCheckbox.setEnabled(false);
				customRollCheckbox.setEnabled(false);
				customBoostCheckbox.setEnabled(false);
				customEvadeCheckbox.setEnabled(false);
				customCloakCheckbox.setEnabled(false);
				customSlamCheckbox.setEnabled(false);
				customArcCheckbox.setEnabled(false);
				customCoordinateCheckbox.setEnabled(false);
				customReinforceCheckbox.setEnabled(false);
				customReloadCheckbox.setEnabled(false);
				customUpgradeBox1.setEnabled(false);
				customUpgradeBox2.setEnabled(false);
				customUpgradeBox3.setEnabled(false);
				customUpgradeBox4.setEnabled(false);
				customUpgradeBox5.setEnabled(false);
				customUpgradeBox6.setEnabled(false);
				customUpgradeBox7.setEnabled(false);
				customBaseCostBox.setEnabled(false);
				customShipIconBox.setEnabled(false);
				customIconCardPanel.setVisible(false);
				customIconMarkerPanel.setVisible(false);
			} else {
				customShipNameField.setEnabled(true);
				customSizeBox.setEnabled(true);
				customArcBox.setEnabled(true);
				customPwvBox.setEnabled(true);
				customAgiBox.setEnabled(true);
				customHullBox.setEnabled(true);
				customShieldBox.setEnabled(true);
				customFocusCheckbox.setEnabled(true);
				customLockCheckbox.setEnabled(true);
				customRollCheckbox.setEnabled(true);
				customBoostCheckbox.setEnabled(true);
				customEvadeCheckbox.setEnabled(true);
				customCloakCheckbox.setEnabled(true);
				customSlamCheckbox.setEnabled(true);
				customCoordinateCheckbox.setEnabled(true);
				customReinforceCheckbox.setEnabled(true);
				customReloadCheckbox.setEnabled(true);
				customArcCheckbox.setEnabled(true);
				customUpgradeBox1.setEnabled(true);
				customUpgradeBox2.setEnabled(true);
				customUpgradeBox3.setEnabled(true);
				customUpgradeBox4.setEnabled(true);
				customUpgradeBox5.setEnabled(true);
				customUpgradeBox6.setEnabled(true);
				customUpgradeBox7.setEnabled(true);
				customBaseCostBox.setEnabled(true);
				customShipIconBox.setEnabled(true);
				if( customShipIconBox.getSelectedItem() != 'custom' ){
					customIconCardPanel.setVisible(false);
					customIconMarkerPanel.setVisible(false);
				} else {
					customIconCardPanel.setVisible(true);
					customIconMarkerPanel.setVisible(true);
				}
			}
		} catch( ex ) {
			Error.handleUncaught( ex );
		}
	}

	mainPanel.addToEditor( editor, @xw_info, null, null, 0 );
	customPanel.addToEditor( editor, @xw2-custom, null, null, 1 );
	editor.addFieldPopulationListener( actionFunction );
	bindings.bind();
	
	// Add an action listener
	shipBox.addActionListener( actionFunction );
	customShipIconBox.addActionListener( actionFunction );
}
	
function createFrontPainter( diy, sheet ) {

	//============== Ship Token ==============
	if( sheet.sheetIndex == 2 ) {
		tokenNameBox = Xwing2.headingBox( sheet, 6.8 );
		return;
	}
	
	//============== Front Sheet ==============
	nameBox = Xwing2.headingBox( sheet, 10 );
	shiptypeBox = Xwing2.headingBox( sheet, 12.5 );
	
	abilityTextBox = Xwing2.abilityBox( sheet, 8 );
	flavorTextBox = Xwing2.flavorBox( sheet, 8 );

	legalBox = markupBox( sheet );
	legalBox.defaultStyle = new TextStyle(
			FAMILY, 'Arial',
			COLOR, Color(151/255,151/255,151/255),
			SIZE,   4
		);
	legalBox.markupText = '\u00a9LFL \u00a9FFG';
}

function createBackPainter( diy, sheet ) {

}

function paintFront( g, diy, sheet ) {
	
	//============== Ship Token ==============
	if( sheet.sheetIndex == 2 ) {
		if( $ShipType == 'custom' ) {
			tokenSize = $CustomSize;
		} else {
			tokenSize = getShipStat( $ShipType, 'size' );
		}
		if( tokenSize == 'small' ) {
			tokenWidth = 402;
			tokenHeight = 472;
			cutoutSize = 140;
		} else {
			tokenWidth = 850;
			tokenHeight = 945;
			cutoutSize = 190;
		}
		dashedStroke = BasicStroke(5, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 0, [15], 0);
		normalStroke = BasicStroke(5);
		thinStroke = BasicStroke(4);
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

		// Draw star-field background
		imageTemplate = 'pilot-' + tokenSize + '-token-template';
		sheet.paintImage( g, imageTemplate, 0, 0 );

		// Draw shaded fire arc area
		fireArcArea = ImageUtils.create( tokenWidth, tokenHeight, true );
		gTemp = fireArcArea.createGraphics();
		gTemp.setPaint( Xwing2.getColor( Xwing2.getPrimaryFaction( $Affiliation ) ) );
		if( tokenSize == 'small' ) {
			gTemp.fillPolygon( [0, Math.round(tokenWidth/2), tokenWidth], [-3, Math.round(tokenHeight/2)-3, -3], 3 );
			if(	( $ShipType == 'custom' && $CustomArc == 'rear' ) ||
				( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'rear' ) ) {
				gTemp.fillPolygon( [0, Math.round(tokenWidth/2), tokenWidth], [tokenHeight+3, Math.round(tokenHeight/2)+3, tokenHeight+3], 3 );
			} else if(
				( $ShipType == 'custom' && $CustomArc == 'extended' ) ||
				( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'extended' ) ) {
				gTemp.fillPolygon( [0, 0, tokenWidth, tokenWidth], [0, Math.round(tokenHeight/2), Math.round(tokenHeight/2), 0], 4 );
			}
		} else {
			gTemp.fillPolygon( [0, Math.round(tokenWidth/2), tokenWidth], [-3, Math.round(tokenHeight/2)+17, -3], 3 );
			if( ( $ShipType == 'custom' && $CustomArc == 'rear' ) ||
				( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'rear' ) ) {
					gTemp.fillPolygon( [0, Math.round(tokenWidth/2), tokenWidth], [tokenHeight+3, Math.round(tokenHeight/2)-17, tokenHeight+3], 3 );
			} else if( 
				( $ShipType == 'custom' && $CustomArc == 'extended' ) ||
				( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'extended' ) ) {
					gTemp.fillPolygon( [0, 0, tokenWidth, tokenWidth], [0, Math.round(tokenHeight/2), Math.round(tokenHeight/2), 0], 4 );
			}
		}
		fireArcArea = createTranslucentImage( fireArcArea, 0.10);
		g.drawImage( fireArcArea, 0, 0, null );

		// Draw turret circle
		if(	( $ShipType == 'custom' && $CustomArc == 'turret' ) ||
			( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'turret' ) ) {
			g.setPaint( Xwing2.getColor( Xwing2.getPrimaryFaction( $Affiliation ) ) );
			g.setStroke(thinStroke);
			if( tokenSize == 'small' ) {
				diameter = 270;
				g.drawArc( Math.round( (tokenWidth-diameter) /2 ), Math.round( (tokenHeight-diameter) /2 ), diameter, diameter, 111, 322 );
				diameter = 226;
				g.drawArc( Math.round( (tokenWidth-diameter) /2 ), Math.round( (tokenHeight-diameter) /2 ), diameter, diameter, 112, 325 );
				g.drawPolyline( [ 154, 146, 207, 169, 161 ], [ 109, 87, 104, 152, 130 ], 5 );
				g.drawPolyline( [ 228, 224, 239, 242 ], [ 126, 125, 106, 107 ], 4 );
			} else {
				diameter = 370;
				g.drawArc( Math.round( (tokenWidth-diameter) /2 ), Math.round( (tokenHeight-diameter) /2 ), diameter, diameter, 7, 322 );
				diameter = 316;
				g.drawArc( Math.round( (tokenWidth-diameter) /2 ), Math.round( (tokenHeight-diameter) /2 ), diameter, diameter, 8, 325 );
				g.drawPolyline( [ 581, 544, 595, 646, 609 ], [ 453, 453, 532, 453, 453 ], 5 );
				g.drawPolyline( [ 564.5, 567, 584, 582 ], [ 547, 542, 566, 569 ], 4 );
			}
		}
		
		// Draw stat panel
		sheet.paintImage( g, 'pilot-' + Xwing2.getPrimaryFaction( $Affiliation ) + '-' + tokenSize + '-panel-template', 0, tokenHeight-230);

		// Draw the Primary Weapon Value
		if( $ShipType == 'custom' ) {
			pwv = $CustomPwv;
		} else {
			pwv = getShipStat( $ShipType, 'pwv' );
		}
		sheet.drawOutlinedTitle( g, pwv, R( tokenSize + '-token-pwv' ), Xwing2.numberFont,
			14, 1, Xwing2.getColor('attack'), Color.BLACK, sheet.ALIGN_CENTER, true);

		// Draw the Agility Value
		if( $ShipType == 'custom' ) {
			agi = $CustomAgi;
		} else {
			agi = getShipStat( $ShipType, 'agi' );
		}
		sheet.drawOutlinedTitle( g, agi, R( tokenSize + '-token-agi' ), Xwing2.numberFont,
			14, 1, Xwing2.getColor('agility'), Color.BLACK, sheet.ALIGN_CENTER, true);

		// Draw the Hull Value
		if( $ShipType == 'custom' ) {
			hull = $CustomHull;
		} else {
			hull = getShipStat( $ShipType, 'hull' );
		}
		sheet.drawOutlinedTitle( g, hull, R( tokenSize + '-token-hull' ), Xwing2.numberFont,
			14, 1, Xwing2.getColor('hull'), Color.BLACK, sheet.ALIGN_CENTER, true);

		// Draw the Shield Value
		if( $ShipType == 'custom' ) {
			shield = $CustomShield;
		} else {
			shield = getShipStat( $ShipType, 'shield' );
		}
		sheet.drawOutlinedTitle( g, shield, R( tokenSize + '-token-shield' ), Xwing2.numberFont,
			14, 1, Xwing2.getColor('shield'), Color.BLACK, sheet.ALIGN_CENTER, true);

		// Draw Heroes of the Aturi Cluster AI guides
		if( $$AturiClusterAI.yesNo ) {
			g.setStroke(thinStroke);
			g.setPaint( Xwing2.getColor( 'shield' ) );
			if( tokenSize == 'small' ) {
	            $shortLineLength = 214;
	            $longLineLength = 252;
			} else {
	            $shortLineLength = 500;
	            $longLineLength = 600;
			}
			g.drawLine( 
				Math.round(tokenWidth/2 + $shortLineLength * Math.cos( java.lang.Math.toRadians( 22.5 ) ) ),
				Math.round(tokenHeight/2 - $shortLineLength * Math.sin( java.lang.Math.toRadians( 22.5 ) )),
				Math.round(tokenWidth/2 + $shortLineLength * Math.cos( java.lang.Math.toRadians( 202.5 ) ) ),
				Math.round(tokenHeight/2 - $shortLineLength * Math.sin( java.lang.Math.toRadians( 202.5 ) )) );
			g.drawLine(
				Math.round(tokenWidth/2 + $longLineLength * Math.cos( java.lang.Math.toRadians( 67.5 ) ) ),
				Math.round(tokenHeight/2 - $longLineLength * Math.sin( java.lang.Math.toRadians( 67.5 ) )),
				Math.round(tokenWidth/2 + $longLineLength * Math.cos( java.lang.Math.toRadians( 247.5 ) ) ),
				Math.round(tokenHeight/2 - $longLineLength * Math.sin( java.lang.Math.toRadians( 247.5 ) )) );
			g.drawLine(
				Math.round(tokenWidth/2 + $longLineLength * Math.cos( java.lang.Math.toRadians( 112.5 ) ) ),
				Math.round(tokenHeight/2 - $longLineLength * Math.sin( java.lang.Math.toRadians( 112.5 ) )),
				Math.round(tokenWidth/2 + $longLineLength * Math.cos( java.lang.Math.toRadians( 292.5 ) ) ),
				Math.round(tokenHeight/2 - $longLineLength * Math.sin( java.lang.Math.toRadians( 292.5 ) )) );
			g.drawLine(
				Math.round(tokenWidth/2 + $shortLineLength * Math.cos( java.lang.Math.toRadians( 157.5 ) ) ),
				Math.round(tokenHeight/2 - $shortLineLength * Math.sin( java.lang.Math.toRadians( 157.5 ) )),
				Math.round(tokenWidth/2 + $shortLineLength * Math.cos( java.lang.Math.toRadians( 337.5 ) ) ),
				Math.round(tokenHeight/2 - $shortLineLength * Math.sin( java.lang.Math.toRadians( 337.5 ) )) );

		}
		// Draw fire arc lines
		g.setPaint( Xwing2.getColor( Xwing2.getPrimaryFaction( $Affiliation ) ) );
		if( tokenSize == 'small' ) {
			g.setStroke(normalStroke);
			g.drawLine( 0, -3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)-3 );
			g.drawLine( tokenWidth, -3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)-3 );
			if( ( $ShipType == 'custom' && $CustomArc == 'rear' ) || ( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'rear' ) ) {
				g.setStroke(dashedStroke);
				g.drawLine( 0, tokenHeight+3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)+3 );
				g.drawLine( tokenWidth, tokenHeight+3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)+3 );
			} else if( ( $ShipType == 'custom' && $CustomArc == 'extended' ) || ( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'extended' ) ) {
				g.setStroke(dashedStroke);
				g.drawLine( 0, Math.round(tokenHeight/2), tokenWidth, Math.round(tokenHeight/2) );
			} else if( ( $ShipType == 'custom' && $CustomArc == 'mobile' ) || ( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'mobile' ) ) {
				g.setStroke(normalStroke);
				g.drawLine( 0, tokenHeight+3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)+3 );
				g.drawLine( tokenWidth, tokenHeight+3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)+3 );
			} else if( ( $ShipType == 'custom' && $CustomArc == 'bullseye' ) || ( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'bullseye' ) ) {
				g.setStroke(dashedStroke);
				$offset = Math.round(tokenWidth/4);
				g.drawLine( 0 + $offset, 0, 0 + $offset, 0 + $offset );
				g.drawLine( tokenWidth - $offset, 0, tokenWidth - $offset, 0 + $offset );
			}
		} else {
			g.setStroke(normalStroke);
			g.drawLine( 0, -3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)+17 );
			g.drawLine( tokenWidth, -3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)+17 );
			if( ( $ShipType == 'custom' && $CustomArc == 'rear' ) || ( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'rear' ) ) {
				g.setStroke(dashedStroke);
				g.drawLine( 0, tokenHeight+3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)-17 );
				g.drawLine( tokenWidth, tokenHeight+3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)-17 );
			} else if( ( $ShipType == 'custom' && $CustomArc == 'extended' ) || ( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'extended' ) ) {
				g.setStroke(dashedStroke);
				g.drawLine( 0, Math.round(tokenHeight/2), tokenWidth, Math.round(tokenHeight/2) );
			} else if( ( $ShipType == 'custom' && $CustomArc == 'mobile' ) || ( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'mobile' ) ) {
				g.setStroke(normalStroke);
				g.drawLine( 0, tokenHeight+3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)-17 );
				g.drawLine( tokenWidth, tokenHeight+3, Math.round(tokenWidth/2), Math.round(tokenHeight/2)-17 );
			} else if( ( $ShipType == 'custom' && $CustomArc == 'bullseye' ) || ( $ShipType != 'custom' &&  getShipStat( $ShipType, 'arc' ) == 'bullseye' ) ) {
				g.setStroke(dashedStroke);
				$offset = Math.round(tokenWidth/4);
				g.drawLine( 0 + $offset, 0, 0 + $offset, 0 + $offset );
				g.drawLine( tokenWidth - $offset, 0, tokenWidth - $offset, 0 + $offset );
			}
		}
		
		// Draw the name
		if( $$UniquePilot.yesNo ) {
			nameString = '<uni>' + diy.name;
		} else {
			nameString = diy.name;
		}
		//nameString = nameString.replace( 'Squadron', 'Sq.' );
		tokenNameBox.markupText = nameString;
		tokenNameBox.drawAsSingleLine( g, R( tokenSize + '-token-name' ) );
		
		// Draw the Pilot Skill
		if( $PilotSkill == '*' ) {
			pilotSkillFontSize = 30;
			pilotSkillRegion = R( tokenSize + '-token-ps', 0, 22 );
		} else {
			pilotSkillFontSize = 18;
			pilotSkillRegion = R( tokenSize + '-token-ps', 0, 0 );
		}
		sheet.drawOutlinedTitle( g, $PilotSkill, pilotSkillRegion, Xwing2.numberFont,
			pilotSkillFontSize, 2, Xwing2.getColor('skill'), Color.BLACK, sheet.ALIGN_CENTER, true);


		//Draw central cutout circle
		g.setPaint( Color.WHITE );
		g.fillOval( Math.round( (tokenWidth - cutoutSize)/2 ), Math.round( (tokenHeight - cutoutSize)/2 ), cutoutSize, cutoutSize );

		// Draw the ship icon
		target = sheet.getRenderTarget();
		if( $ShipType == 'custom' && $CustomShipIcon == 'custom' ) {
			if( tokenSize == 'large' ) {
				portraits[2].paint( g, target );
			} else {
				iconImage = portraits[2].getImage();
				iconScale = portraits[2].getScale() * 0.67;
				AT = java.awt.geom.AffineTransform;
				tokenTransform = AT.getTranslateInstance(
					62 - (iconImage.width*iconScale)/2 + portraits[2].getPanX(),
					210 - (iconImage.height*iconScale)/2 + portraits[2].getPanY() );
				tokenTransform.concatenate( AT.getScaleInstance( iconScale, iconScale ) );

				g.drawImage( iconImage, tokenTransform, null );
			}
		} else {
			if( tokenSize == 'large' ){
				fontSize = 64;
				region = R( 'large-token-icon' );
			} else {
				fontSize = 32;
				region = R( 'small-token-icon' );
			}
			if( $ShipType == 'custom' ) {
				shipIcon = $CustomShipIcon;
			} else {
				shipIcon = getShipStat( $ShipType, 'icon' );
			}

			g.setPaint( Color.WHITE );
			sheet.drawTitle(g, Xwing2.textToShipChar( shipIcon ), region, Xwing2.shipFont, fontSize, sheet.ALIGN_CENTER);
	 	}

		// Draw Actions
		actions = [];
		if( $ShipType == 'custom' ) {
			if( $$CustomFocusAction.yesNo ) { actions.push( 'focus' ); }
			if( $$CustomLockAction.yesNo ) { actions.push( 'lock' ); }
			if( $$CustomRollAction.yesNo ) { actions.push( 'roll' ); }
			if( $$CustomBoostAction.yesNo ) { actions.push( 'boost' ); }
			if( $$CustomEvadeAction.yesNo ) { actions.push( 'evade' ); }
			if( $$CustomCloakAction.yesNo ) { actions.push( 'cloak' ); }
			if( $$CustomSlamAction.yesNo ) { actions.push( 'slam' ); }
			if( $$CustomArcAction.yesNo ) { actions.push( 'arc' ); }
			if( $$CustomCoordinateAction.yesNo ) { actions.push( 'coordinate' ); }
			if( $$CustomReinforceAction.yesNo ) { actions.push( 'reinforce' ); }
			if( $$CustomReloadAction.yesNo ) { actions.push( 'reload' ); }
		} else {
			actions = getShipStat( $ShipType, 'actions' ).split( ',' );		
		}
	
		for( let i = 0; i < actions.length; ++i ) {
			// Get a nice distribution of the actions
			if( tokenSize == 'large' ) {
				x = 724;
				y = ( 353 - 25 * actions.length ) + ( 140 + 50 * actions.length ) / (actions.length + 1) * ( actions.length - i );
			} else {
				x = 287;
				y = 290 - 60 * ( i + 1 );
			}
			sheet.drawOutlinedTitle( g, Xwing2.textToIconChar( actions[i] ),  Region( x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 15, 1, Xwing2.getColor('agility'), Color.BLACK, sheet.ALIGN_CENTER, true);
		}		

		return;
	}
	
	//============== Front Sheet ==============
	
	//Draw template
	imageTemplate =  'pilot-' + Xwing2.getPrimaryFaction( $Affiliation ) + '-front-template';
	sheet.paintImage( g, imageTemplate, 0, 0);
	
	if( $Affiliation == 'resistance' || $Affiliation == 'empire' || $Affiliation == 'firstorder' ) {
		imageTemplate = 'pilot-' + $Affiliation + '-front-template';
		sheet.paintImage( g, imageTemplate, 0, 0);	
	}
	
	
	//Draw portrait
	target = sheet.getRenderTarget();
	portraits[0].paint( g, target );

	// Draw the name
	if( $$UniquePilot.yesNo ) {
		nameBox.markupText = '<uni>' + diy.name;
	} else {
		nameBox.markupText = diy.name;
	}
	nameBox.drawAsSingleLine( g, R('name') );
	
	// Draw the ship type name
	if( $ShipType == 'custom' ) {	
		shiptypeBox.markupText = $CustomShipName;
	} else {
		shiptypeBox.markupText = getShipStat( $ShipType, 'type' );
	}
	shiptypeBox.drawAsSingleLine( g, R('shiptype') );

	// Draw the ship icon
	if( $ShipType == 'custom' && $CustomShipIcon == 'custom'  ) {	
		portraits[1].paint( g, target );
	} else {
		if( $ShipType == 'custom' ) {
			shipIcon = $CustomShipIcon;
		} else {
			shipIcon = getShipStat( $ShipType, 'icon' );
		}
		g.setPaint( Color.WHITE );
		sheet.drawTitle(g, Xwing2.textToShipChar( shipIcon ), R( 'icon' ), Xwing2.shipFont, 16, sheet.ALIGN_CENTER);
  	}
  
	// Draw the Pilot Skill
	if( $PilotSkill == '*' ) {
		pilotSkillFontSize = 30;
		pilotSkillRegion = R('ps', 0, 20);
	} else {
		pilotSkillFontSize = 18;
		pilotSkillRegion = R('ps', 0, 0);
	}

	sheet.drawOutlinedTitle( g, $PilotSkill, pilotSkillRegion, Xwing2.numberFont, pilotSkillFontSize, 2, Xwing2.getColor('skill'), Color.BLACK, sheet.ALIGN_CENTER, true);

	// Draw the Primary Weapon Symbol
	if( $ShipType == 'custom' ) {
		sheet.paintImage( g, 'attack-' + $CustomArc + '-template', 'attack-' + $CustomArc + '-region' );
	} else {
		sheet.paintImage( g, 'attack-' + getShipStat( $ShipType, 'arc' ) + '-template', 'attack-' + getShipStat( $ShipType, 'arc' ) + '-region' );
	}

	// Draw the Primary Weapon Value
	if( $ShipType == 'custom' ) {
		pwv = $CustomPwv;
	} else {
		pwv = getShipStat( $ShipType, 'pwv' );
	}
	sheet.drawOutlinedTitle( g, pwv, R( 'pwv' ), Xwing2.numberFont, 14, 1, Xwing2.getColor('attack'), Color.BLACK, sheet.ALIGN_CENTER, true);

	// Draw the Agility Value
	if( $ShipType == 'custom' ) {
		agi = $CustomAgi;
	} else {
		agi = getShipStat( $ShipType, 'agi' );
	}
	sheet.drawOutlinedTitle( g, agi, R( 'agi' ), Xwing2.numberFont, 14, 1, Xwing2.getColor('agility'), Color.BLACK, sheet.ALIGN_CENTER, true);

	// Draw the Hull Value
	if( $ShipType == 'custom' ) {
		hull = $CustomHull;
	} else {
		hull = getShipStat( $ShipType, 'hull' );
	}
	sheet.drawOutlinedTitle( g, hull, R( 'hull' ), Xwing2.numberFont, 14, 1, Xwing2.getColor('hull'), Color.BLACK, sheet.ALIGN_CENTER, true);

	// Draw the Shield Value
	if( $ShipType == 'custom' ) {
		shield = $CustomShield;
	} else {
		shield = getShipStat( $ShipType, 'shield' );
	}
	sheet.drawOutlinedTitle( g, shield, R( 'shield' ), Xwing2.numberFont, 14, 1, Xwing2.getColor('shield'), Color.BLACK, sheet.ALIGN_CENTER, true);

	// Draw the Squad Point Cost
	uniquePilotCost = 0;
	if( $$UniquePilot.yesNo ) { uniquePilotCost = 1; }
	if( $ShipType == 'custom' ) {
		baseCost = $CustomBaseCost;
	} else {
		baseCost = getShipStat( $ShipType, 'basecost' );
	}
	if( $PilotSkill == '*' ){
		pilotSkillCost = 0;
	} else {
		pilotSkillCost = parseInt( $PilotSkill );
	}
	totalCost = parseInt( baseCost ) + pilotSkillCost + parseInt( $PointAdjuster ) + uniquePilotCost;
	sheet.drawOutlinedTitle( g, totalCost.toString(), R( 'cost' ), Xwing2.numberFont, 10, 0.5, Color.BLACK, Color.WHITE, sheet.ALIGN_CENTER, true);
	
	// Draw the Pilot Ability/Flavour Text
	if( $$UniquePilot.yesNo ) {
		abilityTextBox.markupText = $Text;
		abilityTextBox.draw( g, R('text') );
	} else {
		flavorTextBox.markupText = $Text;
		flavorTextBox.draw( g, R('text') );
	}

	// Draw Action Bar
	actions = [];
	if( $ShipType == 'custom' ) {
		if( $$CustomFocusAction.yesNo ) { actions.push( 'focus' ); }
		if( $$CustomLockAction.yesNo ) { actions.push( 'lock' ); }
		if( $$CustomRollAction.yesNo ) { actions.push( 'roll' ); }
		if( $$CustomBoostAction.yesNo ) { actions.push( 'boost' ); }
		if( $$CustomEvadeAction.yesNo ) { actions.push( 'evade' ); }
		if( $$CustomCloakAction.yesNo ) { actions.push( 'cloak' ); }
		if( $$CustomSlamAction.yesNo ) { actions.push( 'slam' ); }
		if( $$CustomArcAction.yesNo ) { actions.push( 'arc' ); }
		if( $$CustomCoordinateAction.yesNo ) { actions.push( 'coordinate' ); }
		if( $$CustomReinforceAction.yesNo ) { actions.push( 'reinforce' ); }
		if( $$CustomReloadAction.yesNo ) { actions.push( 'reload' ); }
	} else {
		actions = getShipStat( $ShipType, 'actions' ).split( ',' );		
	}	
	for( let i = 0; i < actions.length; ++i ) {
		// Get a nice distribution of the actions
		x = 202 + Math.round( 472 / (actions.length + 1) * ( i + 1 ) );
		y = 780;
		g.setPaint( Color.BLACK );
		sheet.drawTitle(g, Xwing2.textToIconChar( actions[i] ), Region( x.toString() + ',' + y.toString() + ',100,100'), Xwing2.iconFont, 15, sheet.ALIGN_CENTER);
	}

	// Draw Upgrade Bar
	upgrades = [];
	if( $ShipType == 'custom' ) {
		if( $CustomUpgrade7 != '-') { upgrades.push( $CustomUpgrade7 ); }
		if( $CustomUpgrade6 != '-') { upgrades.push( $CustomUpgrade6 ); }
		if( $CustomUpgrade5 != '-') { upgrades.push( $CustomUpgrade5 ); }
		if( $CustomUpgrade4 != '-') { upgrades.push( $CustomUpgrade4 ); }
		if( $CustomUpgrade3 != '-') { upgrades.push( $CustomUpgrade3 ); }
		if( $CustomUpgrade2 != '-') { upgrades.push( $CustomUpgrade2 ); }
		if( $CustomUpgrade1 != '-') { upgrades.push( $CustomUpgrade1 ); }
	} else {
		temp = getShipStat( $ShipType, 'upgrades' ).split( ',' );
		for( let i = 0; i < temp.length; i++ ) {
			if( temp[i] != '-') { upgrades.push( temp[i] ); }
		}
	}
	if( $$ElitePilotTalent.yesNo && (upgrades.length<7) ) {	upgrades.push( 'elite' ); }
	for( let i=0; i<upgrades.length; ++i ) {
		// Get a nice distribution of the upgrades
		if( upgrades.length == 7) {
			x = 450 - 51 * ( i );
		} else {
			x = 450 - 55 * ( i );
		}
		y = 951;
		g.setPaint( Color.BLACK );
		g.fillOval( x+2, y+2, 45, 45 );
		sheet.drawOutlinedTitle( g, Xwing2.textToIconChar( upgrades[i] ), Region( x.toString() + ',' + y.toString() + ',50,50'), Xwing2.iconFont, 15, 1, Color.WHITE, Color.BLACK, sheet.ALIGN_CENTER, true);
	}

	// Draw Legal text
	legalBox.drawAsSingleLine( g, R( 'legal' ) );
}

function paintBack( g, diy, sheet ) {
	imageTemplate = 'pilot-' + Xwing2.getPrimaryFaction( $Affiliation ) + '-back-template';
	sheet.paintImage( g, imageTemplate, 0, 0);	
	if( $Affiliation == 'resistance' || $Affiliation == 'firstorder' ) {
		imageTemplate = 'pilot-' + $Affiliation + '-back-template';
		sheet.paintImage( g, imageTemplate, 0, 0);	
	}
}

function onClear() {
	$ShipType = 'custom';
	$Affiliation = 'alliance';
	$PilotSkill = '0';
	$UniquePilot = 'no';
	$ElitePilotTalent = 'no';
	$Text = '';
	$PointAdjuster = '0';	
	$AturiClusterAI = 'no';	
	$CustomShipName = '';
	$CustomPwv = '0';
	$CustomAgi = '0';
	$CustomHull = '1';
	$CustomShield = '0';
	$CustomArc = 'front';
	$CustomSize = 'small';
	$CustomFocusAction = 'no';
	$CustomLockAction = 'no';
	$CustomRollAction = 'no';
	$CustomBoostAction = 'no';
	$CustomEvadeAction = 'no';
	$CustomCloakAction = 'no';
	$CustomSlamAction = 'no';
	$CustomArcAction = 'no';
	$CustomCoordinateAction = 'no';
	$CustomReinforceAction = 'no';
	$CustomReloadAction = 'no';
	$CustomUpgrade1 = '-';
	$CustomUpgrade2 = '-';
	$CustomUpgrade3 = '-';
	$CustomUpgrade4 = '-';
	$CustomUpgrade5 = '-';
	$CustomUpgrade6 = '-';
	$CustomUpgrade7 = '-';
	$CustomBaseCost = '1';
	$CustomShipIcon = 'custom';	
}

// These can be used to perform special processing during open/save.
// For example, you can seamlessly upgrade from a previous version
// of the script.
function onRead( diy, ois ) {
	if( diy.version < 2 ) {
		diy.frontTemplateKey = 'pilot-rebel-front';
		diy.backTemplateKey = 'pilot-rebel-back';
		diy.setTemplateKey( 2, 'pilot-large-token' );
		if( $CustomPwv == '0' ) {
			$CustomPwv = '-';
		}
		diy.version = 2;
	}
	if( diy.version < 3 ) {
		if( $Affiliation == 'rebel' ) {
			$Affiliation = 'alliance';
		} else if( $Affiliation == 'imperial' ) {
			$Affiliation = 'empire';
		}
		if( $CustomUpgrade1 == 'none' ) { $CustomUpgrade1 = '-'; }
		if( $CustomUpgrade2 == 'none' ) { $CustomUpgrade2 = '-'; }
		if( $CustomUpgrade3 == 'none' ) { $CustomUpgrade3 = '-'; }
		if( $CustomUpgrade4 == 'none' ) { $CustomUpgrade4 = '-'; }
		if( $CustomUpgrade5 == 'none' ) { $CustomUpgrade5 = '-'; }
		if( $CustomUpgrade6 == 'none' ) { $CustomUpgrade6 = '-'; }
		if( $CustomUpgrade7 == 'none' ) { $CustomUpgrade7 = '-'; }
		diy.version = 3;
	}
	if( diy.version < 4 ) {
		$CustomArcAction = 'no';
		$AturiClusterAI = 'no';
		diy.version = 4;
	}
	if( diy.version < 5 ) {
		$CustomCoordinateAction = 'no';
		$CustomReinforceAction = 'no';
		diy.version = 5;
	}
	if( diy.version < 6 ) {
		$CustomReloadAction = 'no';
		diy.version = 6;
	}

	
	portraits[0] = ois.readObject();
	portraits[1] = ois.readObject();
	portraits[2] = ois.readObject();
}

function onWrite( diy, oos ) {
	oos.writeObject( portraits[0] );
	oos.writeObject( portraits[1] );
	oos.writeObject( portraits[2] );
}

/**
 * createTexturedImage( source, texture )
 * Create a new image whose shape (based on translucency) comes
 * from <tt>source</tt>, and whose surface is painted using a
 * texture. The value of <tt>texture</tt> can be an image, a
 * <tt>Color</tt> (in which case the texture is a solid colour),
 * or a <tt>Paint</tt>.
 */
function createTexturedImage( source, texture ) {
	g = null;
	// if texture is a kind of Paint or colour, create a texture image
	// using the paint
	if( texture instanceof java.awt.Paint ) {
		solidTexture = ImageUtils.create( source.width, source.height, true );
		try {
			g = solidTexture.createGraphics();
			g.setPaint( texture );
			g.fillRect( 0, 0, source.width, source.height );
			texture = solidTexture;
		} finally {
			if( g ) g.dispose();
			g = null;
		}
	}
	dest = ImageUtils.create( source.width, source.height, true );
	try {
		g = dest.createGraphics();
		g.drawImage( source, 0, 0, null );
		g.setComposite( java.awt.AlphaComposite.SrcIn );
		g.drawImage( texture, 0, 0, null );
	} finally {
		if( g ) g.dispose();
	}
	return dest;
}

/**
 * createTranslucentImage( source, opacity )
 * Create a copy of the source image with an opacity change.
 * This is similar to setting the layer opacity in software
 * like Photoshop.
 */
function createTranslucentImage( source, opacity ) {
	if( opacity >= 1 ) return source;
	im = ImageUtils.create( source.width, source.height, true );
	if( opacity <= 0 ) return im;

	g = im.createGraphics();
	try {
		g.composite = java.awt.AlphaComposite.SrcOver.derive( opacity );
		g.drawImage( source, 0, 0, null );
	} finally {
		g.dispose();
	}
	return im;
}

function getShipStat( shipId, stat ) {
	key = 'xw2-ship-' + shipId + '-' + stat;
	if( !Language.getGame().isKeyDefined( key ) ) {
		throw new Error( 'shiptype or stat not defined: ' + shipId + stat );
	}
	return Language.game.get( key );
}


/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name, without the
 * 'pilot-' prefix or '-region' suffix.
 */
function R( nametag, x, y ) {
	value = $('pilot-' + nametag + '-region');
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	if( x == null ) {
		x = 0;
	}
	if( y == null ) {
		y = 0;
	}
	temp = value.split(',');
	temp[0] = parseInt(temp[0]) + parseInt(x);
	temp[1] = parseInt(temp[1]) + parseInt(y);
	temp[0] = temp[0].toString();
	temp[1] = temp[1].toString();
	value = temp[0] + ',' + temp[1]	+ ',' + temp[2]	+ ',' + temp[3];
	//return value;
	return new Region( value );
}


// This will cause a test component to be created when you run the script
// from a script editor. It doesn't do anything when the script is run
// other ways (e.g., when you choose to create the component by selecting
// it in the New Game Component dialog).
testDIYScript( 'XW2' );