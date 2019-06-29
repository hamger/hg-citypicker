/* eslint-env jest */
import CityPicker from '../index'

var city = [
  {
    value: '广东',
    child: [{
      value: '广州',
      child: [{ value: '越秀区' }, { value: '荔湾区' }]
    }]
  },
  {
    value: '北京',
    child: [{ value: '东城区' }, { value: '西城区' }]
  }
]

const picker = new CityPicker({
  data: city,
  style: {
    liHeight: 42,
    btnHeight: 50,
    btnLocation: 'bottom',
    btnOffset: '22px',
    titleColor: 'red',
    sureColor: 'red',
    cancelColor: 'red',
    btnBgColor: 'red',
    contentColor: 'red',
    contentBgColor: 'red',
    upShadowColor: 'red',
    downShadowColor: 'red',
    lineColor: 'red'
  },
  cancel () {
    console.log('取消选择')
  },
  onOk (arr) {
    console.log(arr)
  }
})
const picker2 = new CityPicker({
  data: city,
  onOk (arr) {
    console.log(arr)
  }
})

describe('picker test', () => {
  beforeAll(() => {
    console.error = error => {
      throw new Error(error)
    }
  })

  it('picker', () => {
    picker.show()
    picker.hide()
    picker.set({
      pickerNumber: 1,
      title: '选择城市',
      cancelText: 'cancel',
      okText: 'ok',
      initialOption: ['广东', '广州', '越秀区']
    })
    expect(picker.get('title')).toBe('选择城市')
    expect(picker.get('pickerNumber')).toBe(1)
    expect(picker.pickerNumber).toBe(undefined)
  })

  it('picker2', () => {
    expect(picker2.getResult()).toEqual(
      [
        {
          value: '广东',
          child: [{
            value: '广州',
            child: [{ value: '越秀区' }, { value: '荔湾区' }]
          }]
        },
        {
          value: '广州',
          child: [{ value: '越秀区' }, { value: '荔湾区' }]
        },
        {
          value: '越秀区'
        }
      ]
    )
  })
})
