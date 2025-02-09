import { tableTheme } from "@/components/shared/Table/components/DataTable";
import { Table } from "flowbite-react";
import { useState } from "react";
import InputForm from "./InputForm";

interface ScoreData {
  SV1: string;
  SV2: string;
}

const dataTable = [
  {
    STT: "1.",
    isTitle: true,
    data: {
      "Tiêu chí": "Ý nghĩa khoa học, giá trị thực tiễn",
      "Điểm SV1": 3.0,
      "Điểm SV2": 3.0,
      ELOs: "LO2, LO3",
    },
  },
  {
    STT: "1.1",
    isTitle: false,
    data: {
      "Tiêu chí": "Tính mới và độ phức tạp",
      "Điểm SV1": 1.5,
      "Điểm SV2": 1.5,
      ELOs: "LO2",
    },
  },
  {
    STT: "1.2",
    isTitle: false,
    data: {
      "Tiêu chí": "Tính thực tiễn và đóng góp",
      "Điểm SV1": 1.5,
      "Điểm SV2": 1.5,
      ELOs: "LO3",
    },
  },
  {
    STT: "2.",
    isTitle: true,
    data: {
      "Tiêu chí": "Vận dụng kiến thức nền tảng và chuyên sâu ngành KTPM",
      "Điểm SV1": 3.0,
      "Điểm SV2": 3.0,
      ELOs: "LO3, LO4",
    },
  },
  {
    STT: "2.1",
    isTitle: false,
    data: {
      "Tiêu chí": "Khả năng tìm hiểu, phân tích yêu cầu và thiết kế hệ thống",
      "Điểm SV1": 1.0,
      "Điểm SV2": 1.0,
      ELOs: "LO3",
    },
  },
  {
    STT: "2.2",
    isTitle: false,
    data: {
      "Tiêu chí":
        "Khả năng hiện thực hoá, kiểm thử và vận hành hệ thống, đánh giá giải pháp",
      "Điểm SV1": 1.0,
      "Điểm SV2": 1.0,
      ELOs: "LO4",
    },
  },
  {
    STT: "2.3",
    isTitle: false,
    data: {
      "Tiêu chí":
        "Học hỏi và cập nhật kiến thức, công nghệ mới, khả năng học tập suốt đời",
      "Điểm SV1": 1.0,
      "Điểm SV2": 1.0,
      ELOs: "LO3",
    },
  },
  {
    STT: "3.",
    isTitle: true,
    data: {
      "Tiêu chí": "Trình bày kết quả",
      "Điểm SV1": 3.0,
      "Điểm SV2": 3.0,
      ELOs: "LO6, LO8",
    },
  },
  {
    STT: "3.1",
    isTitle: false,
    data: {
      "Tiêu chí": "Nội dung trình bày cuốn báo và sản phẩm (viết)",
      "Điểm SV1": 1.0,
      "Điểm SV2": 1.0,
      ELOs: "LO6, LO8",
    },
  },
  {
    STT: "3.2",
    isTitle: false,
    data: {
      "Tiêu chí": "Kỹ năng trình bày (nói)",
      "Điểm SV1": 1.0,
      "Điểm SV2": 1.0,
      ELOs: "LO6",
    },
  },
  {
    STT: "3.3",
    isTitle: false,
    data: {
      "Tiêu chí": "Trả lời các câu hỏi",
      "Điểm SV1": 1.0,
      "Điểm SV2": 1.0,
      ELOs: "LO8",
    },
  },
  {
    STT: "4.",
    isTitle: true,
    data: {
      "Tiêu chí": "Kỹ năng mềm",
      "Điểm SV1": 1.0,
      "Điểm SV2": 1.0,
      ELOs: "LO4, LO5, LO6, LO7",
    },
  },
  {
    STT: "4.1",
    isTitle: false,
    data: {
      "Tiêu chí":
        "Lập kế hoạch và quản lý thời gian, công việc của cá nhân hoặc đội nhóm",
      "Điểm SV1": 0.5,
      "Điểm SV2": 0.5,
      ELOs: "LO5, LO7",
    },
  },
  {
    STT: "4.2",
    isTitle: false,
    data: {
      "Tiêu chí":
        "Kỹ năng tìm hiểu, đọc hiểu tài liệu ngoại ngữ và khả năng tư duy, giải quyết vấn đề",
      "Điểm SV1": 0.5,
      "Điểm SV2": 0.5,
      ELOs: "LO4, LO6",
    },
  },
];

const TableForm = () => {
  const [formData, setFormData] = useState<Record<string, ScoreData>>(
    dataTable.reduce<Record<string, ScoreData>>((acc, item) => {
      acc[item.STT] = { SV1: "", SV2: "" };
      return acc;
    }, {})
  );
  const [sv1Score, setSv1Score] = useState<string>("");
  const [sv2Score, setSv2Score] = useState<string>("");

  const handleInputChange = (
    stt: string,
    key: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [stt]: {
        ...prev[stt],
        [key]: value,
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div
      className="
          scroll-container 
          overflow-auto
          max-w-full
          h-fit
          rounded-lg
          border-[1px]
          border-secondary-200
          "
    >
      <Table theme={tableTheme}>
        {/* HEADER */}
        <Table.Head
          theme={tableTheme?.head}
          className="sticky top-0 z-10 uppercase border-b bg-gray"
        >
          <Table.HeadCell
            theme={tableTheme?.head?.cell}
            className={` w-10 border-r-[1px] uppercase`}
          >
            STT
          </Table.HeadCell>

          {Object.keys(dataTable[0]?.data || {}).map((key, index) => {
            return (
              <Table.HeadCell
                key={`${key}_${index}`}
                theme={tableTheme?.head?.cell}
                className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
              >
                {key}
              </Table.HeadCell>
            );
          })}
        </Table.Head>

        {/* BODY */}
        <Table.Body className="text-left divide-y">
          {dataTable.map((dataItem, index) => {
            // isOnlyView={key === 'Tiêu chí' ? true : false }
            return (
              <Table.Row
                key={dataItem.STT}
                onClick={() => {}}
                className={`bg-background-secondary text-left duration-100`}
              >
                <Table.Cell
                  className={`
              w-20 border-r-[1px]  text-left  ${
                dataItem.isTitle ? "font-bold text-left" : "text-right"
              }`}
                >
                  <span>{dataItem.STT}</span>
                </Table.Cell>

                {Object.entries(dataItem.data).map(([key, value]) => {
                  return (
                    <Table.Cell
                      key={`${key}_${value}`}
                      theme={{
                        base: `group-first/body:group-first/row:first:rounded-tl-lg
                    group-first/body:group-first/row:last:rounded-tr-lg
                    group-last/body:group-last/row:first:rounded-bl-lg
                    group-last/body:group-last/row:last:rounded-br-lg
                    px-4 py-4 text-center text-secondary-900`,
                      }}
                      className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]

                      ${dataItem.isTitle ? "font-bold" : ""}
                      `}
                    >
                      {dataItem.isTitle &&
                      (key === "Điểm SV1" || key === "Điểm SV2") ? (
                        <span className="flex justify-end ml-1 whitespace-nowrap">
                          _ / {value}
                        </span>
                      ) : key === "Điểm SV1" || key === "Điểm SV2" ? (
                        <div className="flex justify-between items-center">
                          <InputForm
                            name={`${key}_${value}`}
                            placeholder=""
                            value={
                              formData[dataItem.STT]?.[
                                key === "Điểm SV1" ? "SV1" : "SV2"
                              ]
                            }
                            onChange={(e) =>
                              handleInputChange(
                                dataItem.STT,
                                key === "Điểm SV1" ? "SV1" : "SV2",
                                e.target.value
                              )
                            }
                            otherClassess="w-[100px]"
                          />
                          <span className="ml-1 whitespace-nowrap">
                            / {value}
                          </span>
                        </div>
                      ) : (
                        <span>{value}</span>
                      )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}

          {/* Tổng điểm */}
          <Table.Row className="bg-background-secondary">
            <Table.Cell
              colSpan={2}
              className="border-r-[1px] text-left  font-bold"
            >
              Tổng điểm
            </Table.Cell>

            <Table.Cell
              theme={{
                base: `group-first/body:group-first/row:first:rounded-tl-lg
                      group-first/body:group-first/row:last:rounded-tr-lg
                      group-last/body:group-last/row:first:rounded-bl-lg
                      group-last/body:group-last/row:last:rounded-br-lg
                      px-4 py-4 text-center text-secondary-900`,
              }}
              className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]`}
            >
              <span className="flex justify-end font-bold ml-1 whitespace-nowrap">
                _ / 10
              </span>
            </Table.Cell>

            <Table.Cell
              theme={{
                base: `group-first/body:group-first/row:first:rounded-tl-lg
                      group-first/body:group-first/row:last:rounded-tr-lg
                      group-last/body:group-last/row:first:rounded-bl-lg
                      group-last/body:group-last/row:last:rounded-br-lg
                      px-4 py-4 text-center text-secondary-900`,
              }}
              className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]
                        `}
            >
              <span className="flex justify-end font-bold ml-1 whitespace-nowrap">
                _ / 10
              </span>
            </Table.Cell>
            <Table.Cell className="border-r-[1px] text-left"></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableForm;
