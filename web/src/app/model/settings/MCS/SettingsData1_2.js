/**
 * @name MFT.SettingsData1_2
 * 
 * @desc  Multi contour seat data
 * 
 * @category model	
 * @filesource app/model/SettingsData1_2.js	
 * @version		2.0
 *
 * @author	Melnik Andriy		
 */

MFT.SettingsData1_2 = Em.Object.extend({

	/** Variables for controls data */
	driverSeat: {
		0: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		1: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		2: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		3: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		4: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		5: MFT.RangedValue.create({range: 4, value:0, cycle: false, minValue: 0}),

		6: MFT.RangedValue.create({range: 3, value:0, cycle: false, minValue: 0}),

		7: MFT.RangedValue.create({range: 4, value:0, cycle: false, minValue: 0}),

		8: MFT.RangedValue.create({range: 3, value:0, cycle: false, minValue: 0})
	},

	passengerSeat: {
		0: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		1: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		2: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		3: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		4: MFT.RangedValue.create({range: 10, value:0, cycle: false, minValue: 0}),

		5: MFT.RangedValue.create({range: 4, value:0, cycle: false, minValue: 0}),

		6: MFT.RangedValue.create({range: 3, value:0, cycle: false, minValue: 0}),

		7: MFT.RangedValue.create({range: 4, value:0, cycle: false, minValue: 0}),

		8: MFT.RangedValue.create({range: 3, value:0, cycle: false, minValue: 0})
	}
});