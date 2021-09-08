function getNumberSensorValue(sensorValue) {
  if (sensorValue === 0) {
    return 0;
  }

  if (sensorValue === 1) {
    return 1;
  }

  return sensorValue.toLocaleString();
}

function getSensorValueByType(sensorValue) {
  if (typeof sensorValue === 'number') {
    return getNumberSensorValue(sensorValue);
  }

  return sensorValue;
}

function isValidSensorValue(sensorData) {
  if (!sensorData) {
    return false;
  }

  if (sensorData[0] === null) {
    return false;
  }

  if (sensorData[0] === '') {
    return false;
  }

  return true;
}

function getSensorValueBySelectValue({ tagsValue, selectValue }) {
  if (!selectValue) {
    return 'Select Sensor';
  }

  if (!isValidSensorValue(tagsValue[selectValue])) {
    return '-';
  }

  // NOTE: GPS 데이터는 [lan, lon, gps-quality, timestamp, zda-timestamp]가 전부 필요하기 때문
  if (selectValue === 'GPS') {
    return tagsValue.GPS;
  }

  return getSensorValueByType(tagsValue[selectValue][0]);
}

function getSensorValueByTagsValue({ tagsValue, selectValue }) {
  if (tagsValue !== '' && typeof tagsValue === 'string') {
    return tagsValue;
  }

  // NOTE: tagsValue에 데이터가 없다면 'Data Loading'를 반환
  if (tagsValue) {
    return getSensorValueBySelectValue({ tagsValue, selectValue });
  }

  return 'Data Loading';
}

export default function getSensorValue(state) {
  return (selectValue) => getSensorValueByTagsValue({
    tagsValue: state.tagsValue,
    selectValue,
  });
}

// 작업 순서: 작은 것부터 리팩토링
// 해야 될 것: 테스트코드를 함수별로 만들기
// 느낀 점: 코드도 너무 길고 한 함수에서 수행하는 역할이 많다보니 테스트코드도 잘 짜지지 않음.
