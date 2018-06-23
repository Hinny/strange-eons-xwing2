/*
 * namedobj.js
 *
 * This script is normally called from the main plug-in script.
 * It defines an object to contain fonts and other shared resources,
 * and then registers it as a named object. A named object is an
 * object that can be created in one script, and used from another
 * script that is run at a later time.
 */

useLibrary('fontutils');
useLibrary('imageutils');
useLibrary('markup');

importClass(resources.ResourceKit);

// Note that anything that we put in 'this' while inside this function will
// be available from our named object later.
function Xwing2Object() {
	this.GAME_CODE = 'XW2';
	
	const base = '/';
	this.base = base;

	// Register the fonts needed for our cards, and store the family names
    var bank_gothic = new Array('fonts/bank-gothic-md-bt.ttf');
    var kimberly = new Array('fonts/kimberley-bl.ttf');
    var eurostile = new Array('fonts/eurostile.ttf, eurostile-bold.ttf');
    var xwing = new Array('fonts/xwing-miniatures.ttf');
    var xwingships = new Array('fonts/xwing-miniatures-ships.ttf');
    		
	this.headingFamily = FontUtils.registerFontFamilyFromResources.apply(this, bank_gothic);
	this.numberFamily = FontUtils.registerFontFamilyFromResources.apply(this, kimberly);
	this.abilityFamily = FontUtils.registerFontFamilyFromResources.apply(this, eurostile);
	this.iconFamily = FontUtils.registerFontFamilyFromResources.apply(this, xwing);
	this.shipFamily = FontUtils.registerFontFamilyFromResources.apply(this, xwingships);	
	
	// The font we use for stats like initiative and Upgrade bar; when you draw text
	// using one of the sheet's text drawing methods, you need to create
	// a Font object for it; when you draw text in a markup box, you
	// set the font's family name (e.g., 'Arial'), style, and size using
	// TextStyles (see the definition of titleBox, for example).
	this.iconFont = new Font(this.iconFamily, Font.PLAIN, 7);
	this.shipFont = new Font(this.shipFamily, Font.PLAIN, 7);
	this.numberFont = new Font(this.numberFamily, Font.PLAIN, 7);
	
	
	//
	// Define some helper functions for creating markup boxes
	//
		
	/**
	 * headingBox(sheet, size)
	 * Creates a new markup box for title areas.
	 *
	 * sheet : the sheet to create the box for
	 * size : font size
	 */
	this.headingBox = function titleBox(sheet, size) {
		var box = markupBox(sheet);
		
		box.defaultStyle = new TextStyle(
			FAMILY,		this.headingFamily,
			COLOR,		Color.WHITE,
			SIZE,		size,
			WIDTH,		WIDTH_SEMICONDENSED,
			TRACKING,	-0.1
		);
		
		iconStyle = new TextStyle(
			FAMILY,		this.iconFamily,
			SIZE,		size,
			COLOR,		Color.WHITE,
			WEIGHT,		WEIGHT_REGULAR,
			WIDTH,		WIDTH_REGULAR,
			POSTURE,	POSTURE_REGULAR
		);
		box.setStyleForTag('icon',iconStyle);
		box.setReplacementForTag('uni', '<icon>u</icon> ');
		box.setReplacementForTag('epic', '<icon>)</icon>');
		//box.setReplacementForTag('epic', '<icon><u+0029></icon>');
		
		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		
		//box.lineTightness = -0.5;
		//box.tightnessLimit = -0.5;
		//box.lineTightness = 1.5;
		//box.tightnessLimit = 1.5;
		
		box.textFitting = box.FIT_SCALE_TEXT;
		
		return box;
	};
	
	this.epithetBox = function bodyBox(sheet, size) {
		var box = markupBox(sheet);

		box.defaultStyle = new TextStyle(
			FAMILY,		this.abilityFamily,
			SIZE,		size,
			COLOR,		Color(180/255,180/255,180/255),
			WEIGHT,		WEIGHT_EXTRABOLD,
			WIDTH,		WIDTH_CONDENSED,
			POSTURE,	POSTURE_OBLIQUE
		);

		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER;
		box.lineTightness = 1.5;	
		box.textFitting= box.FIT_SCALE_TEXT;

		return box;		
	};
	
	this.abilityBox = function bodyBox(sheet, size) {
		var box = markupBox(sheet);

		box.defaultStyle = new TextStyle(
			FAMILY,		this.abilityFamily,
			SIZE,		size,
			COLOR,		Color(0,0,0),
			WEIGHT,		WEIGHT_LIGHT,
			WIDTH,		WIDTH_SEMI_CONDENSED,
			POSTURE,	POSTURE_REGULAR
		);
		
		iconStyle = new TextStyle(
			FAMILY,		this.iconFamily,
			SIZE,		size,
			COLOR,		Color(0,0,0),
			WEIGHT,		WEIGHT_REGULAR,
			WIDTH,		WIDTH_REGULAR,
			POSTURE,	POSTURE_REGULAR
		);
		
		shipStyle = new TextStyle(
			FAMILY,		this.shipFamily,
			SIZE,		size,
			COLOR,		Color(0,0,0),
			WEIGHT,		WEIGHT_REGULAR,
			WIDTH,		WIDTH_REGULAR,
			POSTURE,	POSTURE_REGULAR
		);
		
		flavourStyle = new TextStyle(
			FAMILY,		this.abilityFamily,
			SIZE,		size,
			COLOR,		Color(125/255,125/255,125/255),
			WEIGHT,		WEIGHT_LIGHT,
			WIDTH,		WIDTH_CONDENSED,
			POSTURE,	POSTURE_OBLIQUE
		);
		
		strikeStyle = new TextStyle(
			FAMILY,			this.abilityFamily,
			SIZE,			size / 2,
			COLOR,			Color(125/255,125/255,125/255),
			WEIGHT,			WEIGHT_LIGHT,
			STRIKETHROUGH,	STRIKETHROUGH_ON,
			WIDTH,			WIDTH_REGULAR,
			POSTURE,		POSTURE_REGULAR
		);

		box.setStyleForTag('icon',iconStyle);
		box.setStyleForTag('ship',shipStyle);
		box.setStyleForTag('flavour',flavourStyle);
		box.setStyleForTag('strike',strikeStyle);

		box.setReplacementForTag( 'div', '<strike>---------------------------------------------------------------------------------------------------------------------------</strike>');
		box.setReplacementForTag('attack', '<width regular><b>' + this.smallCaps(#xw2-cardtext-attack) + '</b></width>');
		box.setReplacementForTag('attackfocus', '<width regular><b>' + this.smallCaps(#xw2-cardtext-attack)
			+ ' (' + '<icon>' + this.textToIconChar('focus') + '</icon>' + ')</b></width>');
		box.setReplacementForTag('attacklock', '<width regular><b>' + this.smallCaps(#xw2-cardtext-attack)
			+ ' (' + '<icon>' + this.textToIconChar('lock') + '</icon>' + ')</b></width>');
		box.setReplacementForTag('attack:', '<width regular><b>' + this.smallCaps(#xw2-cardtext-attack) + ':</b></width>');
		box.setReplacementForTag('attackfocus:', '<width regular><b>' + this.smallCaps(#xw2-cardtext-attack)
			+ ' (' + '<icon>' + this.textToIconChar('focus') + '</icon>' + '):</b></width>');
		box.setReplacementForTag('attacklock:', '<width regular><b>' + this.smallCaps(#xw2-cardtext-attack)
			+ ' (' + '<icon>' + this.textToIconChar('lock') + '</icon>' + '):</b></width>');
		box.setReplacementForTag('action:', '<width regular><b>' + this.smallCaps(#xw2-cardtext-action) + ':</b></width>');
		box.setReplacementForTag('setup:', '<width regular><b>' + this.smallCaps(#xw2-cardtext-setup) + ':</b></width>');
		
		box.setReplacementForTag('focus', '<icon>' + this.textToIconChar('focus') + '</icon>');
		box.setReplacementForTag('evade', '<icon>' + this.textToIconChar('evade') + '</icon>');
		box.setReplacementForTag('boost', '<icon>' + this.textToIconChar('boost') + '</icon>');
		box.setReplacementForTag('barrelroll', '<icon>' + this.textToIconChar('barrelroll') + '</icon>');
		box.setReplacementForTag('lock', '<icon>' + this.textToIconChar('lock') + '</icon>');
		box.setReplacementForTag('cloak', '<icon>' + this.textToIconChar('cloak') + '</icon>');
		box.setReplacementForTag('slam', '<icon>' + this.textToIconChar('slam') + '</icon>');
		box.setReplacementForTag('rotate', '<icon>' + this.textToIconChar('rotate') + '</icon>');
		box.setReplacementForTag('calculate', '<icon>' + this.textToIconChar('calculate') + '</icon>');
		box.setReplacementForTag('reinforce', '<icon>' + this.textToIconChar('reinforce') + '</icon>');
		box.setReplacementForTag('recover', '<icon>' + this.textToIconChar('recover') + '</icon>');
		box.setReplacementForTag('coordinate', '<icon>' + this.textToIconChar('coordinate') + '</icon>');
		box.setReplacementForTag('jam', '<icon>' + this.textToIconChar('jam') + '</icon>');
		box.setReplacementForTag('reload', '<icon>' + this.textToIconChar('reload') + '</icon>');
		box.setReplacementForTag('hit', '<icon>' + this.textToIconChar('hit') + '</icon>');
		box.setReplacementForTag('damage', '<icon>' + this.textToIconChar('damage') + '</icon>');
		box.setReplacementForTag('critical', '<icon>' + this.textToIconChar('critical') + '</icon>');
		box.setReplacementForTag('crit', '<icon>' + this.textToIconChar('crit') + '</icon>');
		box.setReplacementForTag('charge', '<icon>' + this.textToIconChar('charge') + '</icon>');
		box.setReplacementForTag('force', '<icon>' + this.textToIconChar('force') + '</icon>');
		box.setReplacementForTag('straight', '<icon>' + this.textToIconChar('straight') + '</icon>');
		box.setReplacementForTag('leftturn', '<icon>' + this.textToIconChar('leftturn') + '</icon>');
		box.setReplacementForTag('rightturn', '<icon>' + this.textToIconChar('rightturn') + '</icon>');
		box.setReplacementForTag('leftbank', '<icon>' + this.textToIconChar('leftbank') + '</icon>');
		box.setReplacementForTag('rightbank', '<icon>' + this.textToIconChar('rightbank') + '</icon>');
		box.setReplacementForTag('leftsegnorsloop', '<icon>' + this.textToIconChar('leftsegnorsloop') + '</icon>');
		box.setReplacementForTag('rightsegnorsloop', '<icon>' + this.textToIconChar('rightsegnorsloop') + '</icon>');
		box.setReplacementForTag('leftallonroll', '<icon>' + this.textToIconChar('leftallonroll') + '</icon>');
		box.setReplacementForTag('rightallonroll', '<icon>' + this.textToIconChar('rightallonroll') + '</icon>');
		box.setReplacementForTag('koiogranturn', '<icon>' + this.textToIconChar('koiogranturn') + '</icon>');
		box.setReplacementForTag('stationary', '<icon>' + this.textToIconChar('stationary') + '</icon>');
		box.setReplacementForTag('reversestraight', '<icon>' + this.textToIconChar('reversestraight') + '</icon>');
		box.setReplacementForTag('rightreversebank', '<icon>' + this.textToIconChar('rightreversebank') + '</icon>');
		box.setReplacementForTag('leftreversebank', '<icon>' + this.textToIconChar('leftreversebank') + '</icon>');
		box.setReplacementForTag('front', '<icon>' + this.textToIconChar('front') + '</icon>');
		box.setReplacementForTag('rear', '<icon>' + this.textToIconChar('rear') + '</icon>');
		box.setReplacementForTag('bullseye', '<icon>' + this.textToIconChar('bullseye') + '</icon>');
		box.setReplacementForTag('singleturret', '<icon>' + this.textToIconChar('singleturret') + '</icon>');
		box.setReplacementForTag('doubleturret', '<icon>' + this.textToIconChar('doubleturret') + '</icon>');
		box.setReplacementForTag('fronthalf', '<icon>' + this.textToIconChar('fronthalf') + '</icon>');
		box.setReplacementForTag('agility', '<icon>' + this.textToIconChar('agility') + '</icon>');
		box.setReplacementForTag('shield', '<icon>' + this.textToIconChar('shield') + '</icon>');
		box.setReplacementForTag('hull', '<icon>' + this.textToIconChar('hull') + '</icon>');
		box.setReplacementForTag('astromech', '<icon>' + this.textToIconChar('astromech') + '</icon>');
		box.setReplacementForTag('device', '<icon>' + this.textToIconChar('device') + '</icon>');
		box.setReplacementForTag('cannon', '<icon>' + this.textToIconChar('cannon') + '</icon>');
		box.setReplacementForTag('crew', '<icon>' + this.textToIconChar('crew') + '</icon>');
		box.setReplacementForTag('gunner', '<icon>' + this.textToIconChar('gunner') + '</icon>');
		box.setReplacementForTag('missile', '<icon>' + this.textToIconChar('missile') + '</icon>');
		box.setReplacementForTag('system', '<icon>' + this.textToIconChar('system') + '</icon>');
		box.setReplacementForTag('team', '<icon>' + this.textToIconChar('team') + '</icon>');
		box.setReplacementForTag('talent', '<icon>' + this.textToIconChar('talent') + '</icon>');
		box.setReplacementForTag('torpedo', '<icon>' + this.textToIconChar('torpedo') + '</icon>');
		box.setReplacementForTag('turret', '<icon>' + this.textToIconChar('turret') + '</icon>');
		box.setReplacementForTag('hardpoint', '<icon>' + this.textToIconChar('hardpoint') + '</icon>');
		box.setReplacementForTag('cargo', '<icon>' + this.textToIconChar('cargo') + '</icon>');
		box.setReplacementForTag('illicit', '<icon>' + this.textToIconChar('illicit') + '</icon>');
		box.setReplacementForTag('tech', '<icon>' + this.textToIconChar('tech') + '</icon>');
		box.setReplacementForTag('modification', '<icon>' + this.textToIconChar('modification') + '</icon>');
		box.setReplacementForTag('mod', '<icon>' + this.textToIconChar('mod') + '</icon>');
		box.setReplacementForTag('title', '<icon>' + this.textToIconChar('title') + '</icon>');
		box.setReplacementForTag('configuration', '<icon>' + this.textToIconChar('configuration') + '</icon>');
		box.setReplacementForTag('config', '<icon>' + this.textToIconChar('config') + '</icon>');
		
		box.setReplacementForTag('awing', '<ship>' + this.textToShipChar('awing') + '</ship>');
		box.setReplacementForTag('bwing', '<ship>' + this.textToShipChar('bwing') + '</ship>');
		box.setReplacementForTag('vt49', '<ship>' + this.textToShipChar('vt49') + '</ship>');
		box.setReplacementForTag('ewing', '<ship>' + this.textToShipChar('ewing') + '</ship>');
		box.setReplacementForTag('firespray', '<ship>' + this.textToShipChar('firespray') + '</ship>');
		box.setReplacementForTag('hwk290', '<ship>' + this.textToShipChar('hwk290') + '</ship>');
		box.setReplacementForTag('attackshuttle', '<ship>' + this.textToShipChar('attackshuttle') + '</ship>');
		box.setReplacementForTag('aggressor', '<ship>' + this.textToShipChar('aggressor') + '</ship>');
		box.setReplacementForTag('kwing', '<ship>' + this.textToShipChar('kwing') + '</ship>');
		box.setReplacementForTag('lambda', '<ship>' + this.textToShipChar('lambda') + '</ship>');
		box.setReplacementForTag('yt1300', '<ship>' + this.textToShipChar('yt1300') + '</ship>');
		box.setReplacementForTag('yt2400', '<ship>' + this.textToShipChar('yt2400') + '</ship>');
		box.setReplacementForTag('vcx100', '<ship>' + this.textToShipChar('vcx100') + '</ship>');
		box.setReplacementForTag('arc170', '<ship>' + this.textToShipChar('arc170') + '</ship>');
		box.setReplacementForTag('kihraxz', '<ship>' + this.textToShipChar('kihraxz') + '</ship>');
		box.setReplacementForTag('m3a', '<ship>' + this.textToShipChar('m3a') + '</ship>');
		box.setReplacementForTag('g1a', '<ship>' + this.textToShipChar('g1a') + '</ship>');
		box.setReplacementForTag('yv666', '<ship>' + this.textToShipChar('yv666') + '</ship>');
		box.setReplacementForTag('lancer', '<ship>' + this.textToShipChar('lancer') + '</ship>');
		box.setReplacementForTag('fangfighter', '<ship>' + this.textToShipChar('fangfighter') + '</ship>');
		box.setReplacementForTag('starviper', '<ship>' + this.textToShipChar('starviper') + '</ship>');
		box.setReplacementForTag('jumpmaster', '<ship>' + this.textToShipChar('jumpmaster') + '</ship>');
		box.setReplacementForTag('t65xwing', '<ship>' + this.textToShipChar('t65xwing') + '</ship>');
		box.setReplacementForTag('xwing', '<ship>' + this.textToShipChar('xwing') + '</ship>');
		box.setReplacementForTag('t70xwing', '<ship>' + this.textToShipChar('t70xwing') + '</ship>');
		box.setReplacementForTag('ywing', '<ship>' + this.textToShipChar('ywing') + '</ship>');
		box.setReplacementForTag('z95', '<ship>' + this.textToShipChar('z95') + '</ship>');
		box.setReplacementForTag('tieadvancedx1', '<ship>' + this.textToShipChar('tieadvancedx1') + '</ship>');
		box.setReplacementForTag('tieadvancedv1', '<ship>' + this.textToShipChar('tieadvancedv1') + '</ship>');
		box.setReplacementForTag('tiebomber', '<ship>' + this.textToShipChar('tiebomber') + '</ship>');
		box.setReplacementForTag('tiedefender', '<ship>' + this.textToShipChar('tiedefender') + '</ship>');
		box.setReplacementForTag('tielnfighter', '<ship>' + this.textToShipChar('tielnfighter') + '</ship>');
		box.setReplacementForTag('tiefighter', '<ship>' + this.textToShipChar('tiefighter') + '</ship>');
		box.setReplacementForTag('tiefofighter', '<ship>' + this.textToShipChar('tiefofighter') + '</ship>');
		box.setReplacementForTag('tiesffighter', '<ship>' + this.textToShipChar('tiesffighter') + '</ship>');
		box.setReplacementForTag('tieinterceptor', '<ship>' + this.textToShipChar('tieinterceptor') + '</ship>');
		box.setReplacementForTag('tiepunisher', '<ship>' + this.textToShipChar('tiepunisher') + '</ship>');
		box.setReplacementForTag('tiephantom', '<ship>' + this.textToShipChar('tiephantom') + '</ship>');
		box.setReplacementForTag('upsilonshuttle', '<ship>' + this.textToShipChar('upsilonshuttle') + '</ship>');
		box.setReplacementForTag('quadjumper', '<ship>' + this.textToShipChar('quadjumper') + '</ship>');
		box.setReplacementForTag('tiestriker', '<ship>' + this.textToShipChar('tiestriker') + '</ship>');
		box.setReplacementForTag('uwing', '<ship>' + this.textToShipChar('uwing') + '</ship>');
		box.setReplacementForTag('tieaggressor', '<ship>' + this.textToShipChar('tieaggressor') + '</ship>');
		box.setReplacementForTag('scurrg', '<ship>' + this.textToShipChar('scurrg') + '</ship>');
		box.setReplacementForTag('auzituck', '<ship>' + this.textToShipChar('auzituck') + '</ship>');
		box.setReplacementForTag('sheatipede', '<ship>' + this.textToShipChar('sheatipede') + '</ship>');
		box.setReplacementForTag('starwing', '<ship>' + this.textToShipChar('starwing') + '</ship>');
		box.setReplacementForTag('gunboat', '<ship>' + this.textToShipChar('gunboat') + '</ship>');
		box.setReplacementForTag('kimogila', '<ship>' + this.textToShipChar('kimogila') + '</ship>');
		box.setReplacementForTag('tiesilencer', '<ship>' + this.textToShipChar('tiesilencer') + '</ship>');
		box.setReplacementForTag('bsf17bomber', '<ship>' + this.textToShipChar('bsf17bomber') + '</ship>');
		
		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER;
		box.lineTightness = 1.0;	
		box.textFitting= box.FIT_SCALE_TEXT;

		return box;		
	};
	
	/**
	 * attributeValue(sheet, size)
	 * Creates a new markup box for title areas.
	 *
	 * sheet : the sheet to create the box for
	 * size : font size
	 */
	this.attributeValue = function numberBox(sheet, color, size) {
		var box = markupBox(sheet);
		
		box.defaultStyle = new TextStyle(
			FAMILY, this.numberFamily,
			COLOR, color,
			SIZE,   size
		);
	
		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER;
		
		box.lineTightness = 4;
		box.textFitting = box.FIT_SCALE_TEXT;
		
		return box;
	};

	this.getColor = function getColor(keyword) {
		if(keyword == 'rebel') {
			color = Color(239/255,12/255,45/255);
		} else if (keyword == 'imperial') {
			color = Color(154/255,216/255,30/255);
		} else if (keyword == 'scum') {
			color = Color(218/255,164/255,22/255);
		} else if (keyword == 'initiative') {
			color = Color(251/255,135/255,12/255);
		} else if (
				keyword == 'front' ||
				keyword == 'rear' ||
				keyword == 'fronthalf' ||
				keyword == 'singleturret' ||
				keyword == 'doubleturret' ||
				keyword == 'bullseye') {
			color = Color(239/255,12/255,45/255);
			//color = Color(238/255,36/255,40/255); //new?
		} else if (keyword == 'charge') {
			color = Color(251/255,200/255,12/255);
		} else if (keyword == 'force') {
			color = Color(181/255,137/255,191/255);
		} else if (keyword == 'energy') {
			color = Color(214/255,177/255,211/255);
		} else if (keyword == 'agility') {
			//color = Color(154/255,216/255,30/255); //old
			color = Color(107/255,190/255,72/255);		
		} else if (keyword == 'hull') {
			color = Color(247/255,244/255,5/255);
		} else if (keyword == 'shield') {
			color = Color(140/255,220/255,235/255);
		} else {
			color = Color(1,1,1);
		}
		return color;
	};
	
	this.smallCaps = function smallCaps(text) {
		smallCapsedText = '';
		for(let i = 0; i < text.length; ++i) {
			if(text[i] == text[i].toUpperCase()) {
				smallCapsedText = smallCapsedText + text[i];
			} else {
				smallCapsedText = smallCapsedText + '<size 70%>' + text[i].toUpperCase() + '</size>';
			}
		}		
		return smallCapsedText;
	};
	
	this.textToIconChar = function textToIconChar(text) {
		iconChar = 'f';
		switch(String(text)) {
			case 'focus': iconChar = 'f'; break;
			case 'evade': iconChar = 'e'; break;
			case 'boost': iconChar = 'b'; break;
			case 'barrelroll': iconChar = 'r'; break;
			case 'lock': iconChar = 'l'; break;
			case 'cloak': iconChar = 'k'; break;
			case 'slam': iconChar = 's'; break;
			case 'rotate': iconChar = 'R'; break;
			case 'calculate': iconChar = 'a'; break;
			case 'reinforce': iconChar = 'i'; break;
			case 'recover': iconChar = 'v'; break;
			case 'coordinate': iconChar = 'o'; break;
			case 'jam': iconChar = 'j'; break;
			case 'reload': iconChar = '='; break;
			case 'hit': iconChar = 'd'; break;
			case 'damage': iconChar = 'd'; break;
			case 'critical': iconChar = 'c'; break;
			case 'crit': iconChar = 'c'; break;
			case 'charge': iconChar = 'g'; break;
			case 'force': iconChar = 'h'; break;
			case 'straight': iconChar = '8'; break;
			case 'leftturn': iconChar = '4'; break;
			case 'rightturn': iconChar = '6'; break;
			case 'leftbank': iconChar = '7'; break;
			case 'rightbank': iconChar = '9'; break;
			case 'leftsegnorsloop': iconChar = '1'; break;
			case 'rightsegnorsloop': iconChar = '3'; break;
			case 'leftallonroll': iconChar = ':'; break;
			case 'rightallonroll': iconChar = ';'; break;
			case 'koiogranturn': iconChar = '2'; break;
			case 'stationary': iconChar = '5'; break;
			case 'reversestraight': iconChar = 'K'; break;
			case 'rightreversebank': iconChar = 'L'; break;
			case 'leftreversebank': iconChar = 'J'; break;
			case 'front': iconChar = '{'; break;
			case 'rear': iconChar = '|'; break;
			case 'bullseye': iconChar = '}'; break;
			case 'singleturret': iconChar = 'p'; break;
			case 'doubleturret': iconChar = 'q'; break;
			case 'fronthalf': iconChar = '~'; break;
			case 'agility': iconChar = '^'; break;
			case 'shield': iconChar = '*'; break;
			case 'hull': iconChar = '&'; break;
			case 'astromech': iconChar = 'A'; break;
			case 'device': iconChar = 'B'; break;
			case 'cannon': iconChar = 'C'; break;
			case 'crew': iconChar = 'W'; break;
			case 'gunner': iconChar = 'Y'; break;
			case 'missile': iconChar = 'M'; break;
			case 'system': iconChar = 'S'; break;
			case 'team': iconChar = 'T'; break;
			case 'elite': iconChar = 'E'; break;
			case 'torpedo': iconChar = 'P'; break;
			case 'turret': iconChar = 'U'; break;
			case 'hardpoint': iconChar = 'H'; break;
			case 'team': iconChar = 'T'; break;
			case 'cargo': iconChar = 'G'; break;
			case 'salvaged': iconChar = 'V'; break;
			case 'illicit': iconChar = 'I'; break;
			case 'tech': iconChar = 'X'; break;
			case 'modification': iconChar = 'm'; break;
			case 'title': iconChar = 't'; break;
			case 'configuration': iconChar = 'n'; break;
		}		
		return iconChar;
	};
	
	this.textToShipChar = function textToShipChar(text) {
		iconChar = 'x';
		switch(String(text)) {
			case 'awing': iconChar = 'a'; break;
			case 'bwing': iconChar = 'b'; break;
			case 'vt49': iconChar = 'd'; break;
			case 'ewing': iconChar = 'e'; break;
			case 'firespray31': iconChar = 'f'; break;
			case 'hwk290': iconChar = 'h'; break;
			case 'attackshuttle': iconChar = 'g'; break;
			case 'aggressor': iconChar = 'i'; break;
			case 'kwing': iconChar = 'k'; break;
			case 'lambdashuttle': iconChar = 'l'; break;
			case 'yt1300': iconChar = 'm'; break;
			case 'yt2400': iconChar = 'o'; break;
			case 'vcx100': iconChar = 'G'; break;
			case 'arc170': iconChar = 'c'; break;
			case 'kihraxz': iconChar = 'r'; break;
			case 'm3a': iconChar = 's'; break;
			case 'g1a': iconChar = 'n'; break;
			case 'yv666': iconChar = 't'; break;
			case 'lancer': iconChar = 'L'; break;
			case 'fangfighter': iconChar = 'M'; break;
			case 'jumpmaster': iconChar = 'p'; break;
			case 'starviper': iconChar = 'v'; break;
			case 't65xwing': iconChar = 'x'; break;
			case 'xwing': iconChar = 'x'; break;
			case 't70xwing': iconChar = 'w'; break;
			case 'ywing': iconChar = 'y'; break;
			case 'headhunter': iconChar = 'z'; break;
			case 'tieadvanced': iconChar = 'A'; break;
			case 'tieprototype': iconChar = 'R'; break;
			case 'tiebomber': iconChar = 'B'; break;
			case 'tiedefender': iconChar = 'D'; break;
			case 'tielnfighter': iconChar = 'F'; break;
			case 'tiefighter': iconChar = 'F'; break;
			case 'tiefofighter': iconChar = 'O'; break;
			case 'tiesffighter': iconChar = 'S'; break;	
			case 'tieinterceptor': iconChar = 'I'; break;
			case 'tiepunisher': iconChar = 'N'; break;
			case 'tiephantom': iconChar = 'P'; break;
			case 'upsilonshuttle': iconChar = 'U'; break;
			case 'quadjumper': iconChar = 'q'; break;
			case 'tiestriker': iconChar = 'T'; break;
			case 'uwing': iconChar = 'u'; break;
			case 'tieaggressor': iconChar = 'A'; break;
			case 'scurrg': iconChar = 'G'; break;
			case 'auzituck': iconChar = 'n'; break;
			case 'sheatipede': iconChar = '%'; break;
			case 'starwing': iconChar = '&'; break;
			case 'gunboat': iconChar = '&'; break;
			case 'kimogila': iconChar = 'K'; break;
			case 'tiesilencer': iconChar = '$'; break;
			case 'bsf17bomber': iconChar = 'Z'; break;
		}
		return iconChar;
	};
	
	this.calculateDottedCircle = function calculateDottedCircle(pattern, isSidebar) {
		circleRadius = 34;
		a = 0.1; //alpha value of weakest dot
		b = 0.5; //alpha value of mid strength dot
		switch(pattern) {
			case 'agility':	pattern = [0, 0, 0, a, 1, b, 1, a, 1, b, 1, 1, a, b, 1, 1, a, 1, 1, b, a, a, 0, 0]; break;
			case 'hull':	pattern = [0, 0, 0, b, a, 1, b, 1, 1, a, 1, b, 1, 1, b, b, 1, b, a, 1, b, a, 0, 0]; break;
			case 'shield':	pattern = [0, 0, 0, a, a, b, 1, b, a, 1, b, b, 1, 1, a, a, 1, b, a, 1, b, 1, 0, 0]; break;
			case 'charge':	pattern = [0, 0, 0, b, 1, a, b, b, a, 1, a, 1, b, a, b, a, 1, a, 1, b, 1, 1, 0, 0]; break;
			case 'force':	pattern = [0, 0, 0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.80, 0.85, 0.9, 0.95, 1, 0, 0]; break;
			default: pattern = [0, 0, 0, a, b, b, a, a, b, 1, 1, a, b, 1, b, a, 1, b, b, 1, a, a, 0, 0]; // attack
		}
		dotsList = [];
		for(let i = 0; i < pattern.length; i++ ) {
			if(isSidebar) {
				x = circleRadius * Math.cos(Math.PI / 12 * i + Math.PI);
				y = circleRadius * Math.sin(Math.PI / 12 * i + Math.PI);
			} else {
				x = circleRadius * Math.cos(Math.PI / 12 * i + Math.PI / 2);
				y = circleRadius * Math.sin(Math.PI / 12 * i + Math.PI / 2);
			}
			dotsList.push([x, y, pattern[i]]);
		}	
		return dotsList;
	};
}

//
// Create the object and place it in the named object database;
// then we can look it up from other scripts in the same way, e.g.:
//
// const Xwing = Eons.namedObjects.Xwing;
// println(Xwing.titleFamily);
//

Eons.namedObjects.Xwing2 = new Xwing2Object();