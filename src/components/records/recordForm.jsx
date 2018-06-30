import React, { Component } from 'react';
import * as RecordAPI from '../../utils/recordsAPI'

export default class RecordForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      date: '',
      title: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // 判断3个input是否有值
  valid () {
    return this.state.date && this.state.title && this.state.price
  }
  handleChange (ev) {
    let name, obj;
    name = ev.target.name;
    this.setState((
      obj = {},
      obj['' + name] = ev.target.value,
      obj
    ))
  }
  // 提交事件
  handleSubmit (ev) {
    ev.preventDefault();
    let {date, title, price} = this.state;
    RecordAPI.postList({
      date,
      title,
      price: Number.parseInt(price, 0)
    }).then(res => {
      this.props.handleChange(res.data)
      // console.log(res.data)
      this.setState({
        date: '',
        title: '',
        price: ''
      })
    })
  }

  render () {
    let {date, title, price} = this.state;
    return (
      <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
        <div className="form-group mr-1">
          <input type="text"
           className="form-control"
           placeholder="时间"
           value={date}
           name="date"
           onChange={this.handleChange}
           />
        </div>
        <div className="form-group mr-1">
          <input type="text"
            className="form-control"
            placeholder="事件"
            value={title}
            name="title"
            onChange={this.handleChange}
            />
        </div>
        <div className="form-group mr-1">
          <input type="text"
            className="form-control"
            placeholder="价格"
            value={price}
            name="price"
            onChange={this.handleChange}
            />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>添加</button>
      </form>
    )
  }
}