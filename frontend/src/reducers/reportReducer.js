import reportService from "../services/reports";

const reducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_REPORTS":
            return action.data;
        case "CREATE_REPORT":
            return [...state, action.data];
        case "CLEAR_REPORTS":
            return [];
        case "REMOVE_REPORT":
            return state.filter(report => report._id !== action.id);
        default:
            return state;
    }
};

export const initReports = () => {
    return async dispatch => {
        const reports = await reportService.getReports();
        dispatch({
            type: "INIT_REPORTS",
            data: reports
        });
    };
};

export const createReport = (id, report) => {
    return async dispatch => {
        const newReport = await reportService.createReport(id, report);
        dispatch({
            type: "CREATE_REPORT",
            data: newReport
        });
    };
};

export const removeReport = id => {
    return async dispatch => {
        const deleted = await reportService.deleteReport(id);
        dispatch({
            type: "REMOVE_REPORT",
            id: id,
            data: deleted
        });
    };
};

export const clearReports = () => {
    return { type: "CLEAR_REPORTS" };
};

export default reducer;
