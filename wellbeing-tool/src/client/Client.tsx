
const createClient = (basePath: string) => ({
    responses: {
        put: async ({iconId}: {iconId: number}) => {
            const data = {
                "iconId": 1,
                "employeeId": 2,
            }

            return await fetch(`${basePath}/response/submit`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Headers': "*",
                    "Access-Control-Allow-Methods" : "GET, POST, OPTIONS, PUT, DELETE"
                }
            });
        },

        get: async ({employeeId}: any) => {
            const response = await fetch(`${basePath}/response/${employeeId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response.json();
        }
    },

    admin: {
        getAll: async() => {
            const response = await fetch(`${basePath}/responses/all`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response.json();
        }
    }

})

const client = createClient('http://localhost:5267')

export default client