const { createApp, reactive, computed } = Vue;

DEFAULT_STATE = {
    isDefaultState: true,
    inputName: '',
    names: [],
    error: '',
    showError: false,
    result: ''
}

createApp({
    setup(){
        const data = reactive(DEFAULT_STATE);
        const isReady = computed(() => {
            return data.names.length >= 2
        })

        const addName = () => {
            const name = data.inputName;

            if (validate(name)) {
                data.showError = false;
                data.names.push(name);
                data.inputName = '';
            } else {
                data.showError = true;
            }
   
        }

        const removeName = (name) => {
            data.names = data.names.filter(n => n !== name);
        }

        const validate = (name) => {
            data.error = '';

            if (name === '') {
                data.error = 'Sorry, no empty names';
                return false;
            } else if (data.names.includes(name)) {
                data.error = 'Sorry, names must be unique';
                return false;
            }

            return true;
        }

        const getRandomName = () => {
            return data.names[Math.floor(Math.random() * data.names.length)];
        }
        const generateResult = () => {
            let rand = getRandomName();

            if (data.result !== '') {
                while (data.result === rand){
                    rand = getRandomName();
                }
            }

            data.result = rand;
        }

        const showResults = () => {
            generateResult();
            data.isDefaultState = false;
        }

        const resetApp = () => {
            data.isDefaultState = true,
            data.inputName = '',
            data.names = [],
            data.error = '',
            data.showError = false,
            data.result = ''
        }

        const goAgain = () => {
            generateResult();
        }

        return {
            data,
            addName,
            removeName,
            validate,
            isReady,
            showResults,
            resetApp,
            goAgain
        }

    }
}).mount('#app');