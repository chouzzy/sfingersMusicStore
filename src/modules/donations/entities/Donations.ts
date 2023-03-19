class Donations {

    id!:            string
    name!:          string
    email!:         string
    phoneNumber!:   string
    gender?:           string
    birth!:         string
    country!:       string
    state!:         string
    city!:          string
    address!:       string
    cpf!:           string
    rg!:           string
  
    valuePaid!:     number
    paymentMethod!: string
    paymentStatus!: string
    paymentDate!:   string
    createdAt!:     Date
}

export {Donations}