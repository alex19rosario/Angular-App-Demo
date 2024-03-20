export class Customer{
    id: number;
    name: string;
    lastName:string;
    governmentId: string;
    age: number;
    sex: string;
    tel: string;
    email: string;

    constructor(id: number, name: string, lastname: string, governmentId: string, age:number, sex:string, tel: string, email:string){
        this.id = id;
        this.name = name;
        this.lastName = lastname;
        this.governmentId = governmentId;
        this.age = age;
        this.sex = sex;
        this.tel = tel;
        this.email = email;
    }
}
