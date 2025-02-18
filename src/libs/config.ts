export const apiUrl: string = "http://localhost:8000"
export const wsUrl: string = "ws://localhost:8000/ws"


export const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
        received: "bg-blue-500",
        preparing: "bg-yellow-500",
        completed: "bg-green-500",
    };
    return statusColors[status] || "bg-gray-500";
};