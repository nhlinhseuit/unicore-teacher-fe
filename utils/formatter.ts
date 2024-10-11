const FORMATTER = {
    toCurrency: (value: number) =>
        new Intl.NumberFormat("vn-VN", {
            style: "currency",
            currency: "VND",
        }).format(value),
    toShortDate: (value?: Date | string | number) =>
        value
            ? new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Asia/Ho_Chi_Minh",
              }).format(new Date(value))
            : "No data",
};

export default FORMATTER;
