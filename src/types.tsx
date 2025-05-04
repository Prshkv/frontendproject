export type Customer = Omit<CustomerData, "_links">

export type CustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  city: string;
  _links: {
    self: {
        href: string;
    },
    customer: {
        href: string
    }
    trainings: {
        href: string
    }
  }
}

export type Training = {
    date: string;
    duration: number;
    activity: string;
    _links: {
        self: {
            href: string
        }
        training: {
            href: string
        }
        customer: {
            href: string
        }
    }
}
