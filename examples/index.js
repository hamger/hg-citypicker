import CityPicker from '@';
// import CityPicker from '../dist/hg-citypicker.js';
import '../picker.css';

var picker = new CityPicker({
  data: city, // 符合格式的数组
  cancel: function () {
    console.log('取消城市选择');
  },
  initialOption: ['辽宁', '大连', '中山区'],
  success: function (arr) {
    console.log(arr);
    var arr2 = [];
    arr.forEach(function (val) {
      arr2.push(val.value);
    });
    document.getElementById('city-input' + this.pickerNumber).innerHTML = arr2;
  }
});

window.setInitailOption = function () {
  picker.setInitailOption(['湖北', '荆州', '荆州区'])
}

window.select = function (number) {
  picker.pickerNumber = number
  picker.setTitle(number + '号选择器')
  picker.show()
}
