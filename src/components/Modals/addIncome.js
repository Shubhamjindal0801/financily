import React from "react";
import './styles.css'
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd'

function AddIncome({
    isIncomeModal,
    handleIncomeCancel,
    onFinish
}) {
    const [form] = Form.useForm()
    return (
        <Modal
            className="my-modal"
            style={{ fontWeight: 600 }}
            title="Add Income"
            visible={isIncomeModal}
            onCancel={handleIncomeCancel}
            footer={null}
        >
            <Form
                style={{height:'400px'}}
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values, 'income')
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Name"
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name of the transaction'
                        }
                    ]}
                >
                    <Input type="text" className="custom-input" />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Amount"
                    name='amount'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the income amount!'
                        }
                    ]}
                >
                    <Input type="number" className="custom-input" />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Date"
                    name='date'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the income date!'
                        }
                    ]}
                >
                    <DatePicker format='YYYY-MM-DD' className="custom-input" />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Tag"
                    name='tag'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a tag!'
                        }
                    ]}
                >
                    <Select className="select-input-2">
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value='freelance'>Freelance</Select.Option>
                        <Select.Option value='investement'>Investement</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button className="btn btn-blue btn-modal" type='primary' htmlType="submit">
                        Add Income
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddIncome