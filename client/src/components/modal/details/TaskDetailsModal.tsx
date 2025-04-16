import React from "react";

interface DetailsData {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    isCompleted: string;
}

interface Props {
    data: DetailsData;
    onClose: () => void;
}

function TaskDetailsModal({ data, onClose }: Props) {
    return (
        <div>
        
        </div>
    );
}

export default TaskDetailsModal