import { Form, Modal, Button, Input, DatePicker, Select, Upload, Row, Col, Space, message } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const AddTeacherModal = ({ isOpen, onCancel, onCreate, positions = [] }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const onFinish = async (formValues) => {
        setIsSubmitting(true);
        
        const formattedValues = {
            userInfo: {
                name: formValues.name,
                dob: formValues.dob ? formValues.dob.format('YYYY-MM-DD') : null,
                phoneNumber: formValues.phoneNumber,
                email: formValues.email,
                identity: formValues.identity,
                address: formValues.address,
                avatar: formValues.avatar && formValues.avatar.length > 0 ? formValues.avatar[0].originFileObj : null,
            },
            teacherInfo: {
                startDate: formValues.startDate ? formValues.startDate.format('YYYY-MM-DD') : null,
                degrees: formValues.degrees || [],
            },
            positionInfo: {
                name: formValues.position,
            }
        };

        try {
            await onCreate(formattedValues);
            form.resetFields();
            setImageUrl(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e && e.fileList;
    };

    const handleAvatarChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });
    };

    return (
        <Modal 
            open={isOpen} 
            title="Tạo thông tin giáo viên" 
            onCancel={onCancel} 
            width={1000} 
            confirmLoading={isSubmitting}
            footer={[
                <Button key="back" onClick={onCancel} disabled={isSubmitting}>Hủy</Button>,
                <Button key="submit" type="primary" loading={isSubmitting} onClick={() => form.submit()}>Lưu</Button>
            ]}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={32}>
                    <Col xs={24} md={8} className="flex flex-col items-center">
                         <Form.Item name="avatar" valuePropName="fileList" getValueFromEvent={normFile} >
                            <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange} >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : ( <div> <UploadOutlined /> <div className="mt-2">Chọn ảnh</div> </div> )}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                        <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Thông tin cá nhân</h3>
                        <Row gutter={24}>
                            <Col span={12}><Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}><Input placeholder="VD: Nguyễn Văn A" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="dob" label="Ngày sinh" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}><DatePicker className="w-full" format="DD/MM/YYYY" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}><Input placeholder="Nhập số điện thoại" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}><Input placeholder="example@school.edu.vn" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="identity" label="Số CCCD" rules={[{ required: true, message: 'Vui lòng nhập số CCCD!' }]}><Input placeholder="Nhập số CCCD" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}><Input placeholder="Địa chỉ thường trú" /></Form.Item></Col>
                        </Row>
                    </Col>
                </Row>

                <h3 className="text-lg font-medium text-gray-700 my-4 border-b pb-2">Thông tin công tác</h3>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="position" label="Vị trí công tác" rules={[{ required: true, message: 'Vui lòng chọn vị trí!' }]}>
                            <Select placeholder="Chọn các vị trí công tác">
                                {positions.map(pos => <Option key={pos._id} value={pos.name}>{pos.name}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="startDate" label="Ngày bắt đầu công tác" rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
                            <DatePicker className="w-full" format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                </Row>
                
                <h3 className="text-lg font-medium text-gray-700 my-4 border-b pb-2">Học vị</h3>
                <Form.List name="degrees">
                    {(fields, { add, remove }) => (<>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} className="w-full mb-2" align="baseline">
                                <Form.Item {...restField} name={[name, 'type']} rules={[{ required: true, message: 'Bắt buộc' }]}>
                                    <Select placeholder="Bậc" className="min-w-[120px]">
                                        <Option value="Bachelor">Cử nhân</Option>
                                        <Option value="Master">Thạc sĩ</Option>
                                        <Option value="Doctorate">Tiến sĩ</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'school']} rules={[{ required: true, message: 'Bắt buộc' }]} className="flex-1"><Input placeholder="Trường" /></Form.Item>
                                <Form.Item {...restField} name={[name, 'major']} rules={[{ required: true, message: 'Bắt buộc' }]} className="flex-1"><Input placeholder="Chuyên ngành" /></Form.Item>
                                <Form.Item {...restField} name={[name, 'year']} rules={[{ required: true, message: 'Bắt buộc' }]}>
                                    <Input placeholder="Năm tốt nghiệp" type="number" />
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'isGraduated']} initialValue={true}>
                                    <Select placeholder="Trạng thái" className="min-w-[150px]">
                                        <Option value={true}>Đã tốt nghiệp</Option>
                                        <Option value={false}>Chưa tốt nghiệp</Option>
                                    </Select>
                                </Form.Item>
                                <DeleteOutlined onClick={() => remove(name)} className="text-red-500 hover:text-red-700" />
                            </Space>
                        ))}
                        <Form.Item><Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm học vị</Button></Form.Item>
                    </>)}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default AddTeacherModal;