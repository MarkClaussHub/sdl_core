/**
 * @name MFT.ClimateController
 * 
 * @desc Climate module logic
 * 
 * @category	Controller
 * @filesource	app/controller/ClimateController.js
 * @version		2.0
 *
 * @author		Artem Petrosyan
 */

MFT.ClimateController = Em.Object.create({
	
	/** Model binding depends on application mode */
	modelBinding: FLAGS.EMULATE_CAN_CLIMATE ? 'MFT.ClimateModel' : 'MFT.ClimateModelCAN',
	
	/** Initial substate */
	activeState: 'climate.front',
	
	/** PROPERTY */
	
	/** Flag for front climate controls visibility */
	hideFront: false,
	
	/** Flag for rear climate controls visibility */
	hideRear: true,
	
	/** Flags for rear temperature mode labels */
	isRearFullHeated: false,
	isRearFullCooled: false,
	
	
	/** EVENT HENDLERS */
	
	/** FRONT CONTROLS */
	
	/** Set default climate values handler */
	onSetDefaults: function() {
		this.model.setDefaults();
	},
	
	/** Climate on/off handler */
	onActivate: function() {
		this.model.activate();
	},
	
	/** Show/hide climate rear controls */
	onToggleRear: function() {
		if ( MFT.States.currentState.name == 'front') {
			if ( MFT.helpMode ) {
				MFT.VideoPlayerController.start('climate_rear_Climate', 'climate.rear');
			} else {
				MFT.States.goToState('climate.rear');
			}			
		} else {
			MFT.States.goToState('climate.front');
		}
	},
	
	/** Driver temperature increase handler */
	onIncDriverTemp: function() {
		this.model.increaseDriverTemp();
	},
	
	/** Driver temperature decrease handler */
	onDecDriverTemp: function() {
		this.model.decreaseDriverTemp();
	},
	
	/** Passanger temperature increase handler */
	onIncPassangerTemp: function() {
		this.model.increasePassangerTemp();
	},
	
	/** Passanger temperature decrease handler */
	onDecPassangerTemp: function() {
		this.model.decreasePassangerTemp();
	},
	
	/** Dual Mode toggle handler */
	onToggleDualMode: function() {
		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_Dual');
			
			return;
		}
		
		this.model.toggleDualMode();
	},
	
	/** My temperature feature activate handler */
	onActivateMyTemp: function() {
		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_My_temp');
			
			return;
		}
		
		this.model.activateMyTemp();
	},
	
	/** Store my temperature feature handler */
	onStoreMyTemp: function() {		
		this.model.storeMyTemp();
		
		// Show popup
		$('#climate_storeTemp').fadeIn();
		
		// Hide popup after timeout
		setTimeout(function() {
			$('#climate_storeTemp').fadeOut();
		},2000);
	},
	
	/** Driver heated seat button handler */
	onChangeDriverHeatedSeat: function() {
		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_Heated_seats');
			
			return;
		}
		
		this.model.changeDriverHeatedSeat();
	},
	
	/** Driver cooled seat button handler */
	onChangeDriverCooledSeat: function() {
		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_Cooled_seats');
			
			return;
		}
		
		this.model.changeDriverCooledSeat();
	},
	
	/** Driver heated steer button handler */
	onChangeDriverHeatedSteer: function() {
		this.model.changeDriverHeatedSteer();
	},
	
	/** Passanger heated seat change button handler */
	onChangePassangerHeatedSeat: function() {
		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_Heated_seats');
			
			return;
		}
		
		this.model.changePassangerHeatedSeat();
	},
	
	/** Passanger cooled seat change button handler */
	onChangePassangerCooledSeat: function() {
		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_Cooled_seats');
			
			return;
		}
	
		this.model.changePassangerCooledSeat();
	},
	
	/* Wind shield button handler */
 	onToggleWindShield: function() {
 		this.model.toggleWindShield();
 	},
	
	/** Rear defrost button handler */
 	onToggleRearDeforost: function() {
 		this.model.toggleRearDeforost();
 	},
	
	/** Auto button handler */
 	onToggleAuto: function() {
 		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_Auto');
			
			return;
		}
 		
 		this.model.toggleAuto();
 	},
 	
 	/** AC button handler */
 	onToggleAc: function() {
 		this.model.toggleAc();
 	},
 	
 	/** Max AC button handler */
 	onToggleMaxAc: function() {
 		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_Max_AC');
			
			return;
		}
 		
 		this.model.toggleMaxAc();
 	},
 	
	/** Recirculation button handler */
 	onToggleRecirculation: function() {
 		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_Recirculation');
			
			return;
		}
 		
 		this.model.toggleRecirculation();
 	},
 	
 	/** Fan speed decrease handeler */
 	onDecFanSpeed: function() {
 		this.model.increaseFanSpeed();
 	},
 	
 	/** Fan speed increase handeler */
 	onIncFanSpeed: function() {
 		this.model.decreaseFanSpeed();
 	},
 	
 	/*
 	 * Airflow controls block
 	 * - defrost
 	 * - panel
 	 * - feet
 	 * - both (feet and panel)
 	 */
 	onDefrostAirflow: function() {
 		this.model.setDefrostAirflow();
 	},
 	
 	onPanelAirflow: function() {
 		this.model.setPanelAirflow();
 	},
 	
 	onFeetAirflow: function() {
 		this.model.setFeetAirflow();
 	},
 	
 	onBothAirflow: function() {
 		this.model.setBothAirflow();
 	},
 	
 	
 	/** REAR CONTROLS */
 	
 	/** Rear control button handler */
 	onToggleRearControl: function() {
 		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_rear_Control');
			
			return;
		}
 		
 		this.model.toggleRearControl();
 	},
 	
 	/** Rear power button handler */
 	onToggleRearPower: function() {
 		this.model.toggleRearPower();
 	},
 	
 	/** Rear fan speed decrease handeler */
 	onDecRearFanSpeed: function() {
 		this.model.increaseRearFanSpeed();
 	},
 	
 	/** Rear fan speed increase handeler */
 	onIncRearFanSpeed: function() {
 		this.model.decreaseRearFanSpeed();
 	},
 	
 	/** Rear temperature indicator click handeler for help mode */
 	onRearTempAction: function() {
 		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_rear_Temp');			
		}
 	},
 	
 	/** Rear temperature decrease handeler */
 	onDecRearTemp: function() {
 		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_rear_Temp');
			
			return;
		}
 		
 		this.model.increaseRearTemp();
 	},
 	
 	/** Rear temperatureincrease handeler */
 	onIncRearTemp: function() {
 		// Help mode video
		if ( MFT.helpMode ) {
			MFT.VideoPlayerController.start('climate_rear_Temp');
			
			return;
		}
 		
 		this.model.decreaseRearTemp();		
 	},
	
	/** PROPERTY OBSERVERS */
	
	/**
	 * Check temperature value
	 * for visual activation myTemp button 
	 *
	 * @property driverTemp, myTemp
	 * @return {boolean}
	 */
 	isMyTemp: function() {
 		if ( ( this.model.driverTemp.value === this.model.myTemp.value ) && this.model.on.value) {
 			return true
 		} else {
 			return false
 		}
 	}.property('model.driverTemp.value','model.myTemp.value','model.on.value'),
 	
 	
 	/**  */
 	isOff: function() {
		if(	!this.model.on.value && 
		!this.model.driverHeatedSeat.value && 
		!this.model.driverCooledSeat.value && 
		!this.model.passangerHeatedSeat.value &&
		!this.model.passangerCooledSeat.value ) {
			return true;
		} else {
				return false;
		}
 		
 	}.property(
 		'model.on.value',
 		'model.driverHeatedSeat.value',
 		'model.driverCooledSeat.value',
 		'model.passangerHeatedSeat.value',
 		'model.passangerCooledSeat.value'
 	),
 	
 	/** 
 	 * Check rear temperature value
 	 * for hide/show rear temp labels
 	 *
 	 * @observes rearTemp
 	 */
 	onRearTempChange: function() {
 		if ( this.model.rearTemp.value == 1 ) {
 			this.set('isRearFullCooled', true) 
 		} else {
 			this.set('isRearFullCooled', false) 
 		}
 		
 		if ( this.model.rearTemp.value == this.model.rearTemp.range ) {
 			this.set('isRearFullHeated', true) 
 		} else {
 			this.set('isRearFullHeated', false) 
 		}
 	}.observes('model.rearTemp.value')
});