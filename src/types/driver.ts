export type DriverEvent = {
    event: {
        name: string;
        time: string;
    };
    data: {
        driver_id: string;
        latitude: number;
        longitude: number;
        timestamp: string;
    };
};
