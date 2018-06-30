import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as RecordAPI from '../../utils/recordsAPI'

export default class Record extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editFlag: false
    }
  }
  // 编辑
  handleEdit = () => {
    this.setState({
      editFlag: !this.state.editFlag
    })
  }
  // 取消编辑
  cancel = () => {
    this.setState({
      editFlag: false
    })
  }
  // 更新数据
  handleUpdate = (ev) => {
    let data = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      price: Number.parseInt(this.refs.price.value, 0)
    }
    RecordAPI.update(this.props.record.id, data)
    .then(res => {
      // console.log(res.data)
      this.props.handleUpdateRecord(this.props.record, res.data)
      this.setState({
        editFlag: false
      })
    })
  }
  // 删除数据
  deleteRecord = () => {
    RecordAPI.remove(this.props.record.id).then(res => {
      this.props.handleDeleteRecord(this.props.record)
    })
  }

  recordRow () {
    let {date, title, price} = this.props.record
    return (
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{price}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={this.handleEdit}>编辑</button>
          <button className="btn btn-danger" onClick={this.deleteRecord}>删除</button>
        </td>
      </tr>
    )
  }
  // 编辑时显示
  recordForm () {
    let {date, title, price} = this.props.record
    return (
      <tr>
        <td>
          <input type="text"
            className="form-control"
            defaultValue={date}
            ref="date"
            />
        </td>
        <td>
          <input type="text"
            className="form-control"
            defaultValue={title}
            ref="title"
            />
        </td>
        <td>
          <input type="text"
            className="form-control"
            defaultValue={price}
            ref="price"
            />
        </td>
        <td>
          <button className="btn btn-info mr-1" onClick={this.handleUpdate}>确定</button>
          <button className="btn btn-danger" onClick={this.cancel}>取消</button>
        </td>
      </tr>
    )
  }

  render () {
    // let {date, title, price} = this.props
    if (this.state.editFlag) {
      return this.recordForm()
    } else {
      return this.recordRow()
    }
  }
}


// 参数类型验证
Record.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number
}

// export default record
