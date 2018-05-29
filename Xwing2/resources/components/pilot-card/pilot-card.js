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
	diy.version = 1;
	diy.extensionName = 'Xwing2.seext';
	diy.faceStyle = FaceStyle.CARD_AND_MARKER;
	diy.transparentFaces = true;
	diy.variableSizedFaces = true;
	
	diy.frontTemplateKey = 'pilot-rebel-front-full';
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
	$Epithet = #xw2-pilot-epithet;
	$ShipType = #xw2-pilot-ship;
	$Affiliation = #xw2-pilot-affiliation;
	$Initiative = #xw2-pilot-initiative;
	$UniquePilot = #xw2-pilot-unique;
	$Droid = #xw2-pilot-droid;
	$Text = #xw2-pilot-text;
	$ChargeValue = #xw2-pilot-charge-value;
	$ChargeRegen = #xw2-pilot-charge-regen;
	$ForceValue = #xw2-pilot-force-value;
	$ForceRegen = #xw2-pilot-force-regen;

	$CustomShipName = #xw2-pilot-custom-ship-name;
	$CustomShipAbilityName = #xw2-pilot-custom-ship-ability-name;
	$CustomShipAbilityText = #xw2-pilot-custom-ship-ability-text;
	$CustomShipWeaponValue1 = #xw2-pilot-custom-ship-weapon-1-value;
	$CustomShipWeaponArc1 = #xw2-pilot-custom-ship-weapon-1-arc;
	$CustomShipWeaponValue2 = #xw2-pilot-custom-ship-weapon-2-value;
	$CustomShipWeaponArc2 = #xw2-pilot-custom-ship-weapon-2-arc;
	$CustomShipWeaponValue3 = #xw2-pilot-custom-ship-weapon-3-value;
	$CustomShipWeaponArc3 = #xw2-pilot-custom-ship-weapon-3-arc;
	$CustomShipAgility = #xw2-pilot-custom-ship-agility-value;
	$CustomShipHull = #xw2-pilot-custom-ship-hull-value;
	$CustomShipShield = #xw2-pilot-custom-ship-shield-value;
	$CustomShipShieldRegen = #xw2-pilot-custom-ship-shield-regen;
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
}

function createInterface( diy, editor ) {
	bindings = new Bindings( editor, diy );

	// Main Panel
	affiliationItems = [];
	affiliationItems.push(ListItem( 'custom', @xw2-affiliation-custom ));
	affiliationItems.push(ListItem( 'alliance', @xw2-affiliation-rebel ));
	affiliationItems.push(ListItem( 'empire', @xw2-affiliation-imperial ));
	affiliationItems.push(ListItem( 'scum', @xw2-affiliation-scum ));
	affiliationBox = comboBox( affiliationItems );
	bindings.add( 'Affiliation', affiliationBox, [0,1,2] );	

	shipItems = [];
	shipItems.push(ListItem( 'custom', @xw2-ship-custom-name ));
	shipItems.push(ListItem( 't65xwing', @xw2-ship-t65xwing-name ));
	
	shipBox = comboBox( shipItems );
	bindings.add( 'ShipType', shipBox, [0,2] );

	nameField = textField( 'X', 30 );
	
	epithetField = textField( 'X', 30 );
	bindings.add( 'Epithet', epithetField, [0] );
	
	initiativeItems = ['0', '1', '2', '3', '4', '5', '6', '\u25a0'];
	initiativeBox = comboBox( initiativeItems );
	bindings.add( 'Initiative', initiativeBox, [0,2] );

	uniqueCheckbox = checkBox( @xw2-unique );
	bindings.add( 'UniquePilot', uniqueCheckbox, [0,2] );
	
	droidCheckbox = checkBox( @xw2-droid );
	bindings.add( 'Droid', droidCheckbox, [0] );
	
	pilotTextArea = textArea( '', 6, 15, true );
	bindings.add( 'Text', pilotTextArea, [0] );
	
	symbolsTagTip = tipButton( @xw2-symbol-tooltip );
	headersTagTip = tipButton( @xw2-header-tooltip );
	shipsTagTip = tipButton( @xw2-ship-tooltip );

	chargeValueItems = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	chargeValueBox = comboBox( chargeValueItems );
	bindings.add( 'ChargeValue', chargeValueBox, [0] );
	
	chargeRegenCheckbox = checkBox( @xw2-regen );
	bindings.add( 'ChargeRegen', chargeRegenCheckbox, [0] );

	forceValueItems = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	forceValueBox = comboBox( forceValueItems );
	bindings.add( 'ForceValue', forceValueBox, [0] );
	
	forceRegenCheckbox = checkBox( @xw2-regen );
	bindings.add( 'ForceRegen', forceRegenCheckbox, [0] );
	
	pilotPanel = portraitPanel( diy, 0 );
	pilotPanel.panelTitle = @xw2-portrait-pilot;

	mainPanel = new Grid( '', '[min:pref][min:pref][min:pref][min:pref,grow]', '');
	mainPanel.setTitle( @xw2-info );
	mainPanel.place( @xw2-affiliation, '', affiliationBox, 'wmin 180, span 3, wrap' );	
	mainPanel.place( @xw2-ship, '', shipBox, 'wmin 180, span 3, wrap' );
	mainPanel.place( @xw2-pilotname, '', nameField, 'span, growx, wrap' );
	mainPanel.place( @xw2-epithet, '', epithetField, 'span, growx, wrap' );
	mainPanel.place( @xw2-initiative, '', initiativeBox, 'wmin 52' );
	mainPanel.place( uniqueCheckbox, '' );
	mainPanel.place( droidCheckbox, 'wrap' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( @xw2-pilottext, 'span, grow, wrap para' );
	mainPanel.place( pilotTextArea, 'span, grow, wrap para' );
	mainPanel.place( @xw2-charge-value, '', chargeValueBox, 'wmin 52', chargeRegenCheckbox,  'wrap' );
	mainPanel.place( @xw2-force-value, '', forceValueBox, 'wmin 52', forceRegenCheckbox,  'wrap' );
	mainPanel.place( symbolsTagTip, '', headersTagTip, '', shipsTagTip, 'span, grow, wrap para' );
	mainPanel.place( separator(), 'span, growx, wrap para' );
	mainPanel.place( pilotPanel, 'span, growx, wrap' );
	mainPanel.editorTabScrolling = true;

	// Custom Ship Panel	
	customShipNameField = textField( 'X', 30 );
	bindings.add( 'CustomShipName', customShipNameField, [0,2] );
	
	sizeItems = [];
	sizeItems.push(ListItem( 'small', @xw2-size-small ));
	sizeItems.push(ListItem( 'medium', @xw2-size-medium ));
	sizeItems.push(ListItem( 'large', @xw2-size-large ));
	customSizeBox = comboBox( sizeItems );
	bindings.add( 'CustomShipSize', customSizeBox, [0,2] );

	weaponValueItems = ['-', '1', '2', '3', '4', '5'];
	customWeaponValueBox1 = comboBox( weaponValueItems );
	bindings.add( 'CustomShipWeaponValue1', customWeaponValueBox1, [0,2] );
	customWeaponValueBox2 = comboBox( weaponValueItems );
	bindings.add( 'CustomShipWeaponValue2', customWeaponValueBox2, [0,2] );
	customWeaponValueBox3 = comboBox( weaponValueItems );
	bindings.add( 'CustomShipWeaponValue3', customWeaponValueBox3, [0,2] );

	weaponArcItems = [];
	weaponArcItems.push(ListItem( 'front', @xw2-arc-front ));
	weaponArcItems.push(ListItem( 'rear', @xw2-arc-rear ));
	weaponArcItems.push(ListItem( 'upper', @xw2-arc-fronthalf ));
	weaponArcItems.push(ListItem( 'lower', @xw2-arc-rearhalf ));
	weaponArcItems.push(ListItem( 'singleturret', @xw2-arc-singleturret ));
	weaponArcItems.push(ListItem( 'doubleturret', @xw2-arc-doubleturret ));
	weaponArcItems.push(ListItem( 'bullseye', @xw2-arc-bullseye ));
	customWeaponArcBox1 = comboBox( weaponArcItems );
	bindings.add( 'CustomShipWeaponArc1', customWeaponArcBox1, [0,2] );
	customWeaponArcBox2 = comboBox( weaponArcItems );
	bindings.add( 'CustomShipWeaponArc2', customWeaponArcBox2, [0,2] );
	customWeaponArcBox3 = comboBox( weaponArcItems );
	bindings.add( 'CustomShipWeaponArc3', customWeaponArcBox3, [0,2] );

	agilityItems = ['0', '1', '2', '3', '4', '5'];
	customAgilityBox = comboBox( agilityItems );
	bindings.add( 'CustomShipAgility', customAgilityBox, [0,2] );	
	
	hullItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
		'12', '13', '14', '15', '16', '17', '18', '19', '20'];
	customHullBox = comboBox( hullItems );
	bindings.add( 'CustomShipHull', customHullBox, [0,2] );	

	shieldItems = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
		'11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
	customShieldBox = comboBox( shieldItems );
	bindings.add( 'CustomShipShield', customShieldBox, [0,2] );

	customShieldRegenCheckbox = checkBox( @xw2-regen );
	bindings.add( 'CustomShipShieldRegen', customShieldRegenCheckbox, [0,2] );

	actionItems = [];
	actionItems.push(ListItem( '-', '-' ));
	actionItems.push(ListItem( 'focus', @xw2-action-focus ));
	actionItems.push(ListItem( 'lock', @xw2-action-lock ));
	actionItems.push(ListItem( 'roll', @xw2-action-roll ));
	actionItems.push(ListItem( 'boost', @xw2-action-boost ));
	actionItems.push(ListItem( 'evade', @xw2-action-evade ));
	actionItems.push(ListItem( 'cloak', @xw2-action-cloak ));
	actionItems.push(ListItem( 'slam', @xw2-action-slam ));
	actionItems.push(ListItem( 'rotate', @xw2-action-rotate ));
	actionItems.push(ListItem( 'reinforce', @xw2-action-reinforce ));
	actionItems.push(ListItem( 'coordinate', @xw2-action-coordinate ));
	actionItems.push(ListItem( 'reload', @xw2-action-reload ));
	actionItems.push(ListItem( 'jam', @xw2-action-jam ));
	customActionNameBox1 = comboBox( actionItems );
	bindings.add( 'CustomShipActionName1', customActionNameBox1, [0,2] );
	customActionRedBox1 = checkBox( @xw2-action-red );
	bindings.add( 'CustomShipActionRed1', customActionRedBox1, [0,2] );
	customActionLinkedBox1 = comboBox( actionItems );
	bindings.add( 'CustomShipActionLinked1', customActionLinkedBox1, [0,2] );
	customActionNameBox2 = comboBox( actionItems );
	bindings.add( 'CustomShipActionName2', customActionNameBox2, [0,2] );
	customActionRedBox2 = checkBox( @xw2-action-red );
	bindings.add( 'CustomShipActionRed2', customActionRedBox2, [0,2] );
	customActionLinkedBox2 = comboBox( actionItems );
	bindings.add( 'CustomShipActionLinked2', customActionLinkedBox2, [0,2] );
	customActionNameBox3 = comboBox( actionItems );
	bindings.add( 'CustomShipActionName3', customActionNameBox3, [0,2] );
	customActionRedBox3 = checkBox( @xw2-action-red );
	bindings.add( 'CustomShipActionRed3', customActionRedBox3, [0,2] );
	customActionLinkedBox3 = comboBox( actionItems );
	bindings.add( 'CustomShipActionLinked3', customActionLinkedBox3, [0,2] );
	customActionNameBox4 = comboBox( actionItems );
	bindings.add( 'CustomShipActionName4', customActionNameBox4, [0,2] );
	customActionRedBox4 = checkBox( @xw2-action-red );
	bindings.add( 'CustomShipActionRed4', customActionRedBox4, [0,2] );
	customActionLinkedBox4 = comboBox( actionItems );
	bindings.add( 'CustomShipActionLinked4', customActionLinkedBox4, [0,2] );
	customActionNameBox5 = comboBox( actionItems );
	bindings.add( 'CustomShipActionName5', customActionNameBox5, [0,2] );
	customActionRedBox5 = checkBox( @xw2-action-red );
	bindings.add( 'CustomShipActionRed5', customActionRedBox5, [0,2] );
	customActionLinkedBox5 = comboBox( actionItems );
	bindings.add( 'CustomShipActionLinked5', customActionLinkedBox5, [0,2] );

	customShipAbilityNameField = textField( 'X', 30 );
	bindings.add( 'CustomShipAbilityName', customShipAbilityNameField, [0] );

	customShipAbilityTextArea = textArea( '', 6, 15, true );
	bindings.add( 'CustomShipAbilityText', customShipAbilityTextArea, [0] );

	// same list as shipItems, but without alt versions of ships,
	// as it is only the ship icon that is interesting here.
	shipIconItems = [];
	shipIconItems.push(ListItem( 'custom', @xw2-ship-custom-name ));
	shipIconItems.push(ListItem( 't65xwing', @xw2-ship-t65xwing-name ));
	customShipIconBox = comboBox( shipItems );
	bindings.add( 'CustomShipIcon', customShipIconBox, [0,2] );

	customIconCardPanel = portraitPanel( diy, 1 );
	customIconCardPanel.panelTitle = @xw2-icon-card;	

	customIconMarkerPanel = portraitPanel( diy, 2 );
	customIconMarkerPanel.setParentPanel( customIconCardPanel );		
	customIconMarkerPanel.panelTitle = @xw2-icon-token;
	customPanel = new Grid( '', '[min:pref][min:pref][min:pref][min:pref,grow]', '');
	customPanel.setTitle( @xw2-custom-ship );
	customPanel.place( @xw2-ship, '', customShipNameField, 'span, growx, wrap' );
	customPanel.place( @xw2-size, '', customSizeBox, 'wmin 100, span 2, wrap' );
	customPanel.place( @xw2-agility-value, '', customAgilityBox, 'wmin 52' );
	customPanel.place( @xw2-hull-value, '', customHullBox, 'wmin 52, wrap' );
	customPanel.place( @xw2-shield-value, '', customShieldBox, 'wmin 52' );
	customPanel.place( customShieldRegenCheckbox, 'wmin 52, wrap para' );
	customPanel.place( separator(), 'span, growx, wrap para' );
	customPanel.place( @xw2-action-1, '', customActionNameBox1, 'wmin 120', customActionRedBox1, '' );
	customPanel.place( customActionLinkedBox1,  'wmin 120, wrap' );
	customPanel.place( @xw2-action-2, '', customActionNameBox2, 'wmin 120', customActionRedBox2, '' );
	customPanel.place( customActionLinkedBox2,  'wmin 120, wrap' );
	customPanel.place( @xw2-action-3, '', customActionNameBox3, 'wmin 120', customActionRedBox3, '' );
	customPanel.place( customActionLinkedBox3,  'wmin 120, wrap' );
	customPanel.place( @xw2-action-4, '', customActionNameBox4, 'wmin 120', customActionRedBox4, '' );
	customPanel.place( customActionLinkedBox4,  'wmin 120, wrap' );
	customPanel.place( @xw2-action-5, '', customActionNameBox5, 'wmin 120', customActionRedBox5, '' );
	customPanel.place( customActionLinkedBox5,  'wmin 120, wrap para' );
	customPanel.place( separator(), 'span, growx, wrap para' );
	customPanel.place( @xw2-ship-ability-name, '', customShipAbilityNameField, 'span, grow, wrap para' );
	customPanel.place( customShipAbilityTextArea, 'span, grow, wrap para' );
	customPanel.place( symbolsTagTip, '', headersTagTip, '', shipsTagTip, 'span, grow, wrap para' );
	customPanel.place( separator(), 'span, growx, wrap para' );
	customPanel.place( @xw2-icon, '', customShipIconBox, 'wmin 180, span 3, wrap para');
	customPanel.place( customIconCardPanel, 'span, growx, wrap' );
	customPanel.place( customIconMarkerPanel, 'span, growx, wrap' );
	customPanel.editorTabScrolling = true;

 	diy.setNameField( nameField );

	mainPanel.addToEditor( editor, @xw2-info, null, null, 0 );
	customPanel.addToEditor( editor, @xw2-custom-ship, null, null, 1 );
	bindings.bind();
}
	
function createFrontPainter( diy, sheet ) {

}

function createBackPainter( diy, sheet ) {

}

function paintFront( g, diy, sheet ) {

}

function paintBack( g, diy, sheet ) {

}

function onClear() {
	$Epithet = '';
	$ShipType = 't65xwing';
	$Affiliation = 'rebel';
	$Initiative = '1';
	$UniquePilot = 'no';
	$Droid = 'no';
	$Text = '';
	$ChargeValue = '-';
	$ChargeRegen = 'no';
	$ForceValue = '-';
	$ForceRegen = 'no';

	$CustomShipName = '';
	$CustomShipAbilityName = '';
	$CustomShipAbilityText = '';
	$CustomShipWeaponValue1 = '-';
	$CustomShipWeaponArc1 = 'front';
	$CustomShipWeaponValue2 = '-';
	$CustomShipWeaponArc2 = 'front';
	$CustomShipWeaponValue3 = '-';
	$CustomShipWeaponArc3 = 'front';
	$CustomShipAgility = '0';
	$CustomShipHull = '1';
	$CustomShipShield = '-';
	$CustomShipShieldRegen = 'no';
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
	$CustomShipIcon = 't65xwing';
}

// These can be used to perform special processing during open/save.
// For example, you can seamlessly upgrade from a previous version
// of the script.
function onRead( diy, ois ) {
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