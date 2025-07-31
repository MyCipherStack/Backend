

export class FilterDTO {
    page: number;
    limit: number;
    role?: string;
    status?: string;
    search?: string;

    constructor(data: { page?: string; limit?: string; role?: string; status?: string; search?: string }) {

        this.page = parseInt(data?.page as string || "1" )
        this.limit = parseInt(data?.limit as string || "10") 
        this.status = data.status as string;
        this.search = data.search as string;
        this.role = data?.role
        this.search = data.search
    }
}



