import React, { Component } from 'react';
// import axios from 'axios';
import Record from './record';
import RecordForm from './recordForm';
import Amount from './amount'
import * as RecordAPI from '../../utils/recordsAPI'


class Records extends Component {
  constructor () {
    super();
    this.state = {
      isLoaded: false, // 是否加载完成？
      error: false, // 加载错误显示的
      records: []
    }
  }
  componentDidMount () {
    RecordAPI.getList().then(res => {
      this.setState({
        records: res.data,
        isLoaded: true
      })
    })
    .catch(error => {
      this.setState({
        isLoaded: true,
        error
      })
    })
  }
  // 添加事件
  addRecord = (record) => {
    this.setState({
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record
      ]
    })
  }
  // 更新数据
  /**
   * 在一个数组中更新一个元素
   * @record 旧值
   * @data 服务器返回的更新后的值
   */
  updateRecord = (record, data) => {
    const a = {a: 'b'}; // 旧值
    const b = {a: 'c'}; // 新值
    // 新对象的值替换就对象的旧值，返回一个新对象
    const c = {
      ...a,
      ...b
    }
    console.log(c)
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        return item;
      }
      return {
        ...item,
        ...data
      }

    });
    this.setState({
      records: newRecords
    })
  }

  // 删除数据
  /**
   * 在一个数组中删除一个元素
   */
  deleteRecord = (date) => {
    const recordsIndex = this.state.records.indexOf(date)
    const newRecords = this.state.records.filter((item, index) => {
      return index !== recordsIndex
    })
    this.setState({
      records: newRecords
    })
  }

  // 收入
  income = () => {
    let income = this.state.records.filter(item => {
      return item.price >= 0
    })
    return income.reduce((prev, curr) => {
      return prev += Number.parseInt(curr.price, 0)
    }, 0)
  }

  // 支出
  out = () => {
    let income = this.state.records.filter(item => {
      return item.price <= 0
    })
    return income.reduce((prev, curr) => {
      return prev += Number.parseInt(curr.price, 0)
    }, 0)
  }

  // 余额
  surplus = () => {
    return this.income() + this.out()
  }


  render () {
    const {isLoaded, error, records} = this.state;
    let recordsComponent;
    if (!isLoaded) {
      recordsComponent = <div>正在加载中...</div>
    } else if (error) {
      recordsComponent = <div>Error: {error.message}</div>
    } else {
      recordsComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>时间</th>
              <th>项目</th>
              <th>价格</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => 
              <Record 
                // {...item}
                record={item}
                key={index} 
                handleUpdateRecord={this.updateRecord}
                handleDeleteRecord={this.deleteRecord}
              />
            )}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-2">
          <Amount text="收入" color="success" amount={this.income()} />
          <Amount text="支出" color="danger" amount={this.out()} />
          <Amount text="余额" color="info" amount={this.surplus()} />
        </div>
        <RecordForm handleChange={this.addRecord}/>
        {recordsComponent}
      </div>
    )
  }
}

export default Records;