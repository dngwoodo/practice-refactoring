import given from 'given2';
import TAGS_VALUE from './fixtures/tagsValue';

import getSensorValue from './index';

describe('getSensorValue', () => {
  beforeEach(() => {
    given('state', () => ({ tagsValue: TAGS_VALUE }));
  });

  it('returns sensor data', () => {
    expect(getSensorValue(given.state)('P_RESET')).toBe(TAGS_VALUE.P_RESET[0]);
  });

  context('with number type', () => {
    it('returns sensor data with 3 digit comma', () => {
      expect(getSensorValue(given.state)('BL2772_02_RUN')).toBe('1,000'); // [1000, 1]
    });

    it('returns 0 when sensor data is 0', () => {
      expect(getSensorValue(given.state)('G_RESET')).toBe(0); // [0, 1]
    });

    it('returns 1 when sensor data is 1', () => {
      expect(getSensorValue(given.state)('CSV2775_01_CLOSE')).toBe(1); // [1, 1]
    });
  });

  context('with GPS selectValue', () => {
    it('returns GPS data', () => {
      expect(getSensorValue(given.state)('GPS')).toEqual([]);
    });
  });

  context('with invalid sensor data', () => {
    it('returns "-" when sensor data is null', () => {
      expect(getSensorValue(given.state)('CANDin_01')).toBe('-'); // [null, 1]
    });

    it('returns "-" when sensor data is undefined', () => {
      expect(getSensorValue(given.state)('T_RESET')).toBe('-'); // null
    });

    it('returns "-" when sensor data is empty string', () => {
      expect(getSensorValue(given.state)('TEST')).toBe('-'); // ['', 1]
    });
  });

  context('with selectValue of empty string', () => {
    it('returns "Select Sensor" ', () => {
      expect(getSensorValue(given.state)('')).toBe('Select Sensor');
    });
  });

  context('with invalid tagsValue', () => {
    it('returns "Data Loading" when tagsValue is empty string', () => {
      given('state', () => ({ tagsValue: '' }));

      expect(getSensorValue(given.state)('CSV2775_01_CLOSE')).toBe('Data Loading');
    });

    it('returns "Server Connect Failed" when tagsValue is "Server Connect Failed"', () => {
      given('state', () => ({ tagsValue: 'Server Connect Failed' }));

      expect(getSensorValue(given.state)('CSV2775_01_CLOSE')).toBe('Server Connect Failed');
    });
  });
});
