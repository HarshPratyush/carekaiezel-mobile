interface AssignedComplaintStatus
{
    id:number,
    complainId:string,
    imageId:number,
    registerationDate:string,
    description:string,
    status:string,
    resolvedDate:string,
    remarksByMechanic:string,
    breakDownFrom:string,
    customerDetails:ProfieModel,
}