
export const handleReports = async (body: any, headers: any) => {
        console.log('OK HIER', body, ' xxx ', headers);
        const {action} = body;
        console.log('USER CONTROLLER', action);
        // if (ACTIONS.USER.CREATE_USER === action) {
        //     const {user} = body;
        //     try {
        //         console.log('CREATE CLIENT', user);
        //         if (user.variant.type === 'CLIENT') {
        //             return await createClient(user);
        //         }
        //         return await createMicrolancer(user);
        //     } catch (e) {
        //         return e;
        //     }
        // }
    };
