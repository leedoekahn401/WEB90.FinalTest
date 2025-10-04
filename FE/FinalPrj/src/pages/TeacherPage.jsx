import { useEffect, useState } from "react";
import { message } from "antd";
import { Avatar, Button, Table, Input, Tag } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import AddTeacherModal from "../components/AddTeacherModal";
import instance from "../utils/axios-instance.util";
import { API } from "../utils/api-path.util";

const { Search } = Input;

function TeacherPage() {
    const [teachers, setTeachers] = useState([]);
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
    });

    

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const fetchData = async (page, pageSize) => {
        setLoading(true);
        try {
            const params = {
                page: page,
                limit: pageSize,
            };
            
            const teachersRes = await instance.get(API.TEACHERS.GET, { params });
            setTeachers(teachersRes.data.teachers);
            
            setPagination(prev => ({ 
                ...prev, 
                total: teachersRes.data.totalModels, 
                current: page,
                pageSize: pageSize,
            }));

        } catch (error) { 
            message.error("Không thể tải dữ liệu giáo viên!"); 
        } finally { 
            setLoading(false); 
        }
    };
    
    const fetchInitialData = async () => {
        try {
            const positionsRes = await instance.get(API.POSITIONS.GET);
            setPositions(positionsRes.data.positions);
        } catch (error) {
            console.log(error);
             message.error("Không thể tải danh sách chức vụ!"); 
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData(1, pagination.pageSize); 
        }, 300); 

        return () => {
            clearTimeout(handler);
        };
    }, [pagination.pageSize]); 

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleCreateTeacher = async (values) => {
        try {
            await instance.post(API.TEACHERS.POST, values);
            message.success("Tạo mới giáo viên thành công!");
            setIsAddModalOpen(false);
            fetchData(pagination.current, pagination.pageSize);
        } catch (error) { 
            console.log(error);
            message.error("Tạo mới giáo viên thất bại!"); 
        }
    };

    const handleViewDetails = (record) => {
        setSelectedTeacher(record);
        setIsViewModalOpen(true);
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
        { 
            title: 'Giáo viên', 
            dataIndex: 'name', 
            key: 'name', 
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <Avatar className="mr-3" />
                    <div>
                        <div className="font-medium">{record.name}</div>
                        <div className="text-xs text-gray-500">{record.email}</div>
                    </div>
                </div>
            )
        },
        { 
            title: 'Trình độ', 
            key: 'degree', 
            render: (_, record) => record.degrees?.[0] ? `${record.degrees[0].type} ${record.degrees[0].major}` : 'N/A' 
        },
        { 
            title: 'TT Công tác', 
            key: 'position', 
            render: (_, record) => record.positions?.map(pos => pos.name).join(', ') || 'N/A'
        },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { 
            title: 'Trạng thái', 
            dataIndex: 'isActive', 
            key: 'isActive', 
            render: (isActive) => <Tag color={isActive ? 'success' : 'error'}>{isActive ? 'Đang công tác' : 'Ngừng công tác'}</Tag> 
        },
        { 
            title: 'Hành động', 
            key: 'action', 
            render: (_, record) => <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewDetails(record)}>Chi tiết</Button> 
        },
    ];

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <Search 
                    placeholder="Tìm kiếm" 
                    className="max-w-xs" 
                    allowClear
                    enterButton 
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>Tạo mới</Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={teachers} 
                loading={loading} 
                pagination={pagination}
                onChange={handleTableChange}
                rowKey="_id" 
                scroll={{ x: 'max-content' }} 
            />
            <AddTeacherModal isOpen={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} onCreate={handleCreateTeacher} positions={positions}/>
        </>
    );
}

export default TeacherPage;