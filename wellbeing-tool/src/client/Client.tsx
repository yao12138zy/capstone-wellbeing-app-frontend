const createClient = (basePath: string) => ({
    responses: {
        put: async ({iconId, employeeID}: any) => {
            const data = {
                "iconId": iconId,
                "employeeId": employeeID,
            }

            return await fetch(`${basePath}/response/submit`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Headers': "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"
                }
            });
        },

        get: async ({employeeId, day}: any) => {
            const queryParams = Object.fromEntries(Object.entries({
                day: day,
            }).filter(([, v]) => !!v));
            const response = await fetch(`${basePath}/response/${employeeId}` + new URLSearchParams(queryParams), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response.json();
        }
    },

    admin: {
        getAll: async ({day}: any) => {
            const queryParams = Object.fromEntries(Object.entries({
                day: day,
            }).filter(([, v]) => !!v));
            const response = await fetch(`${basePath}/responses/all` + new URLSearchParams(queryParams), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response.json();
        },

        getGroup: async ({groupId, day}: any) => {
            const queryParams = Object.fromEntries(Object.entries({
                day: day,
            }).filter(([, v]) => !!v));
            const response = await fetch(`${basePath}/responses/${groupId}` + new URLSearchParams(queryParams), {
                method: 'GET',
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