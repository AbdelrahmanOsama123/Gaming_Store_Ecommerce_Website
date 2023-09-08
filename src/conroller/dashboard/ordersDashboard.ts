import { DashboardQueries } from "../../services/dashboard";

const dashboad = new DashboardQueries();

export const getCurrentOrders = async(user_id:number) =>{
    const result = dashboad.getCurrentOrders(user_id);
    return result;
}

export const getCompletedOrders = async(user_id:number) =>{
    const result = dashboad.getCompletedOrders(user_id);
    return result;
}
