import { useEffect, useState } from "react";
import { message } from "antd";
import { Tag, Button, Table } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import instance from "../utils/axios-instance.util";
import { API } from "../utils/api-path.util";
import AddPositionModal from "../components/AddPositionModal";

function PositionPage() {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const fetchData = async (page = pagination.current, pageSize = pagination.pageSize) => {
        setLoading(true);
        try {
            const response = await instance.get(API.POSITIONS.GET, { params: { page, limit: pageSize } });
            setPositions(response.data.positions);
            setPagination(prev => ({
                ...prev,
                total: response.data.totalModels,
                current: page,
                pageSize: pageSize,
            }));
        } catch (error) {
            message.error("Không thể tải dữ liệu vị trí công tác!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(1, 10);
    }, []);

    const handleCreatePosition = async (values) => {
        try {
            await instance.post(API.POSITIONS.POST, values);
            message.success("Tạo mới vị trí thành công!");
            setIsAddModalOpen(false);
            fetchData(pagination.current, pagination.pageSize);
        } catch (error) {
            message.error("Tạo mới vị trí thất bại!");
        }
    };

    const handleTableChange = (newPagination) => {
        fetchData(newPagination.current, newPagination.pageSize);
    };

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            width: 80,
            render: (_, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        { title: 'Mã', dataIndex: 'code', key: 'code', width: 120 },
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Mô tả', dataIndex: 'des', key: 'des' },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 150,
            render: (isActive) => (
                <Tag color={isActive ? 'success' : 'error'}>
                    {isActive ? 'Hoạt động' : 'Ngừng'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 120,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Button type="link" icon={<EditOutlined />} onClick={() => message.info(`Sửa: ${record.name}`)} />
                    <Button type="link" danger icon={<DeleteOutlined />} onClick={() => message.warning(`Xóa: ${record.name}`)} />
                </div>
            ),
        },
    ];

    return (
        <>
        <div className="flex justify-end items-center mb-4">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
                Tạo mới
            </Button>
        </div>
            <Table
                    columns={columns}
                    dataSource={positions}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                    rowKey="_id"
                    scroll={{ x: 'max-content' }}
                />
            <AddPositionModal
                isOpen={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                onCreate={handleCreatePosition}
            />
        </>
    );
}

export default PositionPage;