interface ComplainStatus{
    id:number,
    complainId:string,
    imageId:number,
    registrationDate:string,
    description:string,
    status:string,
    assignedTo:string,
    resolvedDate:string,
    remarksByMechanic:string,
    breakDownFrom:string,
    amountCharged:number,
    mechanicContactNumber:number,
    //for mechanic page
    customerContactNumber:number,
    customerName:string,
    latitude:string,
    longitutde:string,
    assignedDate:string,
    attachment:number,
    productName:string,
    categoryName:string,
    customerDetails,
    breakDownAt

}