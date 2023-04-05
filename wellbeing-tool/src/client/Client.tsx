
const createClient = (basePath: string) => ({
    responses: {
        put: async ({iconId}: {iconId: number}) => {
            const data = {
                iconId: iconId,
                employeeId: 'test',
            }

            return await fetch(`${basePath}/response/submit`, {
                method: 'PUT',
                body: '',
                headers: {
                    'Content-Type': 'application/json'
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

const client = createClient('http://localhost:8937')

export default client