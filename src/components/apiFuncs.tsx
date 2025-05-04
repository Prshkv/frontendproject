// Customers
export const getCustomers = async () => {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
    .then(response => {
        if (!response.ok)
        throw new Error("Error when fetching customers");

        return response.json();
    })
}

// Trainings
export const getTrainings = async () => {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
    .then(response => {
        if (!response.ok)
            throw new Error("Error when fetching trainings");

        

        return response.json();
    })
}