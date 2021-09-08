const getSensorValue = (state) => (selectValue) => {
  // NOTE: state.tagsValue에 데이터가 없다면 'Data Loading'를 반환
  if (state.tagsValue) {
    // NOTE: state.tagsValue가 'No Data', 'Server Connect Failed', 'OPC Connect Failed'라면 이 값을 반환
    if (state.tagsValue === 'Server Connect Failed') return state.tagsValue;

    // NOTE: selectValue가 있다면 실행
    if (selectValue) {
      // NOTE: tag의 값이 없다면 '-'를 반환(e.g. { T_RESET: null })
      // NOTE: tag의 값은 존재하지만 내부 값이 null일 경우 '-' 반환(e.g. { T_RESET: [null, 0] })
      // NOTE: 0도 false이므로 state.tagsValue[selectValue][0] === null or '' 이렇게 명시해놓음
      if (!state.tagsValue[selectValue] || state.tagsValue[selectValue][0] === null || state.tagsValue[selectValue][0] === '') return '-';

      // NOTE: GPS 데이터는 [lan, lon, gps-quality, timestamp, zda-timestamp]가 전부 필요하기 때문
      if (selectValue === 'GPS') return state.tagsValue.GPS;

      // NOTE: tag의 값이 number 이라면 실행
      if (typeof state.tagsValue[selectValue][0] === 'number') {
        // NOTE: 0 일때, 1 일때는 true, false로 사용함
        if (state.tagsValue[selectValue][0] === 0) return 0;
        if (state.tagsValue[selectValue][0] === 1) return 1;
        return state.tagsValue[selectValue][0].toLocaleString();
      }

      // NOTE: tag의 값이 string이라면 실행
      if (typeof state.tagsValue[selectValue][0] === 'string') return state.tagsValue[selectValue][0];
    }

    // NOTE: selectValue가 없다면 실행
    if (!selectValue) return 'Select Sensor';
  }

  return 'Data Loading';
};

export default getSensorValue;
