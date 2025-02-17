export const apiUrl:string = import.meta.env.VITE_API_URL;
export const wsUrl:string = import.meta.env.VITE_WS_URL;


export const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
        received: "bg-blue-500",
        preparing: "bg-yellow-500",
        completed: "bg-green-500",
    };
    return statusColors[status] || "bg-gray-500";
};