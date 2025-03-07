export const fetchTransactions = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { customerId: 1, transactionId: 101, amount: 120, date: "2025-01-15" },
        { customerId: 1, transactionId: 102, amount: 75, date: "2025-02-20" },
        { customerId: 1, transactionId: 103, amount: 150, date: "2025-03-10" },
        { customerId: 2, transactionId: 201, amount: 200, date: "2025-01-10" },
        { customerId: 2, transactionId: 202, amount: 50, date: "2025-02-15" },
        { customerId: 2, transactionId: 203, amount: 90, date: "2025-03-05" },
        { customerId: 3, transactionId: 301, amount: 130, date: "2025-01-20" },
        { customerId: 3, transactionId: 302, amount: 60, date: "2025-02-25" },
        { customerId: 3, transactionId: 303, amount: 110, date: "2025-03-15" },
        { customerId: 4, transactionId: 401, amount: 80, date: "2025-01-25" },
        { customerId: 4, transactionId: 402, amount: 140, date: "2025-02-10" },
        { customerId: 4, transactionId: 403, amount: 95, date: "2025-03-20" },
        { customerId: 5, transactionId: 501, amount: 170, date: "2025-01-30" },
        { customerId: 5, transactionId: 502, amount: 85, date: "2025-02-05" },
        { customerId: 5, transactionId: 503, amount: 100, date: "2025-03-25" },
        { customerId: 6, transactionId: 601, amount: 60, date: "2025-01-05" },
        { customerId: 6, transactionId: 602, amount: 120, date: "2025-02-20" },
        { customerId: 6, transactionId: 603, amount: 75, date: "2025-03-10" },
        { customerId: 7, transactionId: 701, amount: 200, date: "2025-01-15" },
        { customerId: 7, transactionId: 702, amount: 50, date: "2025-02-25" },
        { customerId: 7, transactionId: 703, amount: 90, date: "2025-03-05" },
        { customerId: 8, transactionId: 801, amount: 130, date: "2025-01-20" },
        { customerId: 8, transactionId: 802, amount: 60, date: "2025-02-10" },
        { customerId: 8, transactionId: 803, amount: 110, date: "2025-03-15" },
        { customerId: 9, transactionId: 901, amount: 80, date: "2025-01-25" },
        { customerId: 9, transactionId: 902, amount: 95, date: "2025-02-15" },
        { customerId: 9, transactionId: 903, amount: 105, date: "2025-03-05" },
        { customerId: 10, transactionId: 1001, amount: 150, date: "2025-01-10" },
        { customerId: 10, transactionId: 1002, amount: 85, date: "2025-02-20" },
        { customerId: 10, transactionId: 1003, amount: 120, date: "2025-03-25" }
      ]);
    }, 1000);
  });
};