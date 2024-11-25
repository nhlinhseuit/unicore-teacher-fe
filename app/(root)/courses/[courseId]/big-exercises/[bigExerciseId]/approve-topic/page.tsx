"use client";

import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import { RegisterTopicTableType } from "@/constants";
import { mockDataStudentRegisterTopic } from "@/mocks";

const ApproveTopic = () => {
  return (
    <>
      <RegisterTopicTable
        type={RegisterTopicTableType.approveTopic}
        isEditTable={false}
        isMultipleDelete={false}
        dataTable={mockDataStudentRegisterTopic}
      />


    </>
  );
};

export default ApproveTopic;
