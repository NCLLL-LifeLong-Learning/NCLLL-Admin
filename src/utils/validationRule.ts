export const validationRules = {
    required: (value: string) => {
        if (!value) return 'Required';
        return true;
    },
    email: (value: string) => {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(value)) return 'Invalid Email';
        return true;
    },
};
